import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Box, FilterOptionsState, Typography } from '@mui/material';
import Moment from 'react-moment';
import { countries } from 'countries-list';

import {
  TJob,
  PostedJobTableData,
  ManageJobTableData,
  InvoiceTableData,
  PositionMap,
  TInvoice,
} from '../interfaces';

const chainInfoMap: any = {
  1: {
    chainName: 'Ethereum Mainnet',
    rpcUrls: ['https://main-light.eth.linkpool.io/'],
    nativeCurrency: {
      name: 'ETHEREUM',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  4: {
    chainName: 'Rinkeby Testnet',
    rpcUrls: ['https://rinkeby-light.eth.linkpool.io/'],
    nativeCurrency: {
      name: 'ETHEREUM',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  },
  56: {
    chainName: 'Binance Smart Chain',
    rpcUrls: [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed1.defibit.io',
    ],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  97: {
    chainName: 'Binance Smart Chain Testnet',
    rpcUrls: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
    ],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
};

export const insertItemToArray = (arr: any[], item: any) => {
  const index = arr.findIndex((i: any) => i === item);

  const updatedArr: any[] = [...arr];
  if (index === -1) {
    updatedArr.push(item);
  } else {
    updatedArr.splice(index, 1);
  }

  return updatedArr;
};

export const switchNetwork = (chainId: number): Promise<any> => {
  return new Promise((resolve) => {
    (window as any).ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
      .then(() => {
        resolve(true);
      })
      .catch((error: any) => {
        if (error.code === 4902) {
          (window as any).ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  ...chainInfoMap[chainId],
                },
              ],
            })
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              resolve(false);
            });
        } else {
          resolve(false);
        }
      });
  });
};

export const getAbbrAddress = (address: string, start: number, end: number) => {
  return `${address?.substring(0, start)}...${address?.substring(
    address?.length - end,
    address.length
  )}`;
};

export const getLibrary = (provider: any, connector: any): Web3Provider => {
  const library = new Web3Provider(provider, 'any');
  library.pollingInterval = 15000;
  return library;
};

export const getFontColorFromBG = (bgColor: string): string => {
  const colorItems = bgColor
    .substring(4, bgColor.length - 1)
    .replace(/ /g, '')
    .split(',')
    .map((item) => Number(item));

  return colorItems[0] * 0.299 + colorItems[1] * 0.587 + colorItems[2] * 0.114 >
    150
    ? '#000'
    : '#fff';
};

export const formatPriceAmount = (amount?: number, digits?: number): string => {
  if (!amount) return '0';

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return amount >= item.value;
    });
  return item
    ? (amount / item.value).toFixed(digits || 0).replace(rx, '$1') + item.symbol
    : '0';
};

export function getCaptialized(val: string): string {
  if (!val) return val;
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function getDaysArray(year: number, month: number) {
  const numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const daysArray = [];

  for (let i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
    daysArray.push(i + 1);
  }

  return daysArray;
}

export const getDaysOptions = (inputYear?: number, inputMonth?: number) => {
  const year = inputYear ?? new Date().getFullYear();
  const month = inputMonth ?? new Date().getMonth() + 1;
  const dayList = getDaysArray(year, month);

  return dayList.map((day, _i) => ({
    value: _i.toString(),
    text: day.toString(),
  }));
};

export const createPostedJobTableData = (job: TJob): PostedJobTableData => {
  const { id, logo, title, posted_at, views, applies, company_name } = job;
  return {
    id: id as string,
    name: (
      <Box display="flex" alignItems="center">
        {logo ? (
          <img
            src={logo}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              marginRight: 16,
            }}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={48}
            height={48}
            borderRadius="12px"
            mr={2}
            border="1px solid #fff"
          >
            <Typography fontSize={30} lineHeight={1.5} fontWeight={700}>
              {company_name?.charAt(0).toUpperCase()}
            </Typography>
          </Box>
        )}
        <Box>
          <Box display="flex" flexDirection="column">
            <Typography fontSize={14}>{company_name}</Typography>
            <Typography fontWeight={300} fontSize={12} color="#C4C4C4" mt={1}>
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
    // @ts-ignore
    date: <Moment fromNow>{posted_at}</Moment>,
    views: views || 0,
    applies: applies || 0,
  };
};

export const createManageJobTableData = (
  job: TJob,
  _i: number
): ManageJobTableData => {
  const { id, logo, title, posted_at, company_name, created_at, status } = job;
  return {
    id: id as string,
    name: (
      <Box display="flex" alignItems="center">
        <Typography fontWeight={500} width={36}>
          {_i + 1}.
        </Typography>
        {logo ? (
          <img
            src={logo}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              marginRight: 16,
            }}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={48}
            height={48}
            borderRadius="12px"
            mr={2}
            border="1px solid #fff"
          >
            <Typography fontSize={30} lineHeight={1.5} fontWeight={700}>
              {company_name?.charAt(0).toUpperCase()}
            </Typography>
          </Box>
        )}
        <Box display="flex" flexDirection="column">
          <Typography fontWeight={600} fontSize={14} lineHeight="21px">
            {title}
          </Typography>
          <Typography fontSize={12} lineHeight="18px" mt={0.5} color="#A3A3AD">
            {company_name}
          </Typography>
        </Box>
      </Box>
    ),
    price: job.salary?.min ? `$${job.salary?.min}` : '',
    date: (
      // @ts-ignore
      <Moment format="DD MMMM YYYY">
        {status === 'active' ? posted_at : created_at}
      </Moment>
    ),
    action: job.status,
  };
};

export const createInvoiceTableData = (
  invoice: TInvoice,
  _i: number
): InvoiceTableData => {
  const { id, logo, title, posted_at, position, status, salary, company_name } =
    invoice.job;
  return {
    id: invoice.id as string,
    name: (
      <Box display="flex" alignItems="center">
        <Typography fontWeight={500} width={36}>
          {_i + 1}.
        </Typography>
        {logo ? (
          <img
            src={logo}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              marginRight: 16,
            }}
          />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={48}
            height={48}
            borderRadius="12px"
            mr={2}
            border="1px solid #fff"
          >
            <Typography fontSize={30} lineHeight={1.5} fontWeight={700}>
              {company_name?.charAt(0).toUpperCase()}
            </Typography>
          </Box>
        )}
        <Box display="flex" flexDirection="column">
          <Typography fontWeight={600} fontSize={14} lineHeight="21px">
            {title}
          </Typography>
          <Typography fontSize={12} lineHeight="18px" mt={0.5}>
            {PositionMap[position]}
          </Typography>
        </Box>
      </Box>
    ),
    price: salary?.min ? `$${salary?.min}` : '',
    // @ts-ignore
    date: <Moment format="DD MMMM YYYY">{invoice.created_at}</Moment>,
    action: status,
  };
};

export function htmlDecode(input: string) {
  const elem = document.createElement('textarea');
  elem.innerHTML = input;
  return elem.value;
}

export const getLocationText = (job: TJob) => {
  return (
    (job.location
      ? `${job.location.city}${
          job.location.country ? ', ' + job.location.country : ''
        }`
      : '') + (job.isRemote ? (job.location ? ' - Remote' : 'Remote') : '')
  );
};

export const getCountryNames = () => {
  const list = Object.values(countries).map((c) => c.name);
  return list.concat(['England', 'Great Britain']).sort();
};

export const makeFirstCharUpper = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const makeWordsUpperCase = (str: string) => {
  if (!str) return;

  const arr = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = makeFirstCharUpper(arr[i]);
  }

  return arr.join(' ');
};

export const areSameInSearchBox = (
  options: string[],
  state: FilterOptionsState<string>
) => {
  return options.filter((a) =>
    a.split(' ').some((item) => item.startsWith(state.inputValue))
  );
};
