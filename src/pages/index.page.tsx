import axios from 'axios';

import HomePage from './home/index.page';
import { JOB_PAGE_SIZE } from '../utils/constants';
import { NextPageContext } from 'next';

const Home = (props: any) => {
  return <HomePage {...props} />;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const { query } = ctx;

  const activeTags =
    typeof query.tags === 'string'
      ? [query.tags]
      : Array.isArray(query.tags)
      ? query.tags
      : [];
  const promises: any[] = [];
  promises.push(
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/getAllJobs`, {
      params: {
        ...query,
        company: query.company,
        city: query.city,
        isRemote: query.isRemote && query.isRemote === 'true',
        favorite: query.favorite && query.favorite === 'true',
        location: query.location,
        search:
          (query.searchKey as string)?.toLowerCase() === 'united states'
            ? 'USA'
            : (query.searchKey as string)?.toLowerCase() === 'united kingdom'
            ? 'UK'
            : query.searchKey,
        page: Number(query.page || '0'),
        pageSize: JOB_PAGE_SIZE,
        tags: activeTags || [],
        userId: (query.account as string)?.toLowerCase(),
        position: query.position === 'all' ? '' : query.position,
        salary: Number(query.salary || '') * 1000,
      },
    })
  );
  promises.push(
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/getJobCountByCity`)
  );
  promises.push(axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getFilterTags`));

  const res: any[] = await Promise.all(promises);

  return {
    props: {
      jobData: res[0].data,
      jobsInCities: res[1]?.data?.data,
      tags: (res[2]?.data?.tags || []).map((item: any) => item.value),
    },
  };
};

export default Home;
