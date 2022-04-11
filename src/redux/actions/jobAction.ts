import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import easyinvoice from 'easyinvoice';
import dayjs from 'dayjs';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';
import { invoiceTemplate } from '../../utils/invoice_template';

import {
  addNewJob,
  setJobs,
  setSelectedJob,
  setJobData,
  setHasMore,
  setNewJob,
  setJobInCities,
} from '../reducers/jobReducer';
import { storage } from '../../firebase';
import { setViewedJobs } from '../reducers/authReducer';

export function* handlePostNewJob(action: any): any {
  try {
    const { file, newJob, isDraft, userId, setNewJobId, onInitialize } =
      action.payload;

    let logoURL: string | null = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fbStorageRef = ref(
        storage,
        `logos/${new Date().getTime()}.${fileExt}`
      );

      yield uploadBytes(fbStorageRef, file);
      logoURL = yield getDownloadURL(fbStorageRef);
    }

    let invoiceUrl;
    if (!isDraft) {
      const invoiceStorageRef = ref(
        storage,
        `invioces/${newJob.company_name}-${new Date().getTime()}.pdf`
      );

      const companyLogoUrl = yield getDownloadURL(
        ref(storage, 'static/web3jobs_logo.png')
      );

      const invoiceData = {
        customize: {
          // btoa === base64 encode
          template: btoa(invoiceTemplate), // Your template must be base64 encoded
        },
        images: {
          logo: companyLogoUrl || undefined,
        },
        // Your own data
        sender: {
          company: 'Web3Jobs GmbH',
          address: 'Dorfstraße 34',
          city: '6471 Arzl im Pitztal',
        },
        // Your recipient
        client: {
          company: newJob.company_name,
          address: newJob.invoiceAddress,
        },
        information: {
          number: '',
          date: dayjs().format('YYYY-MM-DD'),
          'due-date': '',
        },
        products: [
          {
            quantity: '1',
            description: 'Job Post',
            price: 0 * 0.8, // 0 for now
            'tax-rate': '',
          },
          ...(newJob.priceInfo?.sticky
            ? [
                {
                  quantity: '1',
                  description: 'Sticky',
                  price: (newJob.priceInfo?.sticky || 0) * 0.8,
                  'tax-rate': '',
                },
              ]
            : []),
          ...(newJob.priceInfo?.highlightColor
            ? [
                {
                  quantity: '1',
                  description: 'Color',
                  price: (newJob.priceInfo?.highlightColor || 0) * 0.8,
                  'tax-rate': '',
                },
              ]
            : []),
          {
            quantity: '1',
            description: 'Tax 20%',
            price: (newJob.price || 0) * 0.2,
            'tax-rate': '',
          },
        ],
        'bottom-notice': '',
        settings: {
          currency: 'USD', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
          // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
          // "tax-notation": "gst", // Defaults to 'vat'
          // "margin-top": 25, // Defaults to '25'
          // "margin-right": 25, // Defaults to '25'
          // "margin-left": 25, // Defaults to '25'
          // "margin-bottom": 25, // Defaults to '25'
          // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
          // "height": "1000px", // allowed units: mm, cm, in, px
          // "width": "500px", // allowed units: mm, cm, in, px
          // "orientation": "landscape", // portrait or landscape, defaults to portrait
        },
        // Translate your invoice to your preferred language
        translate: {
          // "invoice": "FACTUUR",  // Default to 'INVOICE'
          number: 'Invoice Id', // Defaults to 'Number'
          // "date": "Datum", // Default to 'Date'
          // "due-date": "Verloopdatum", // Defaults to 'Due Date'
          // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
          products: 'Description', // Defaults to 'Products'
          // "quantity": "Aantal", // Default to 'Quantity'
          // "price": "Prijs", // Defaults to 'Price'
          // "product-total": "Totaal", // Defaults to 'Total'
          // "total": "Totaal" // Defaults to 'Total'
        },
      };

      const invoiceRes = yield easyinvoice.createInvoice(invoiceData);

      yield uploadString(invoiceStorageRef, invoiceRes.pdf, 'base64', {
        contentType: 'application/pdf',
      });
      invoiceUrl = yield getDownloadURL(invoiceStorageRef);
    }

    const idToken = localStorage.getItem('jwt_token');
    const { data } = yield axios.post(
      `${process.env.REACT_APP_API_URL}/job/addNewJob`,
      {
        job: {
          ...newJob,
          logo: logoURL,
          invoiceURL: invoiceUrl || '',
        },
        isDraft,
        userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      }
    );

    if (data.success) {
      yield put(addNewJob(data.newJob));
      if (setNewJobId) {
        setNewJobId(data.newJob.id);
      }
      if (onInitialize) {
        onInitialize();
      }
    }
  } catch (e) {
    yield put(addNewJob(null));
  }
}

export function* getAllJobs(action: any): any {
  try {
    const params = action.payload;
    const { data }: any = yield axios.get(
      `${process.env.REACT_APP_API_URL}/job/getAllJobs`,
      {
        params,
      }
    );
    if (data.success) {
      yield put(setJobs(data.jobs));
      yield put(
        setJobData({
          totalJobsCount: data.totalJobs,
          totalProjectCount: data.totalCompanies,
          filterJobsCount: data.filterJobsCount,
          averagePrice: data.averagePrice,
        })
      );
      yield put(setHasMore(data.hasMore));
    }
  } catch (e) {
    yield put(setJobs(null));
  }
}

export function* getJobById(action: any): any {
  try {
    const { id } = action.payload;
    const { data }: any = yield axios.get(
      `${process.env.REACT_APP_API_URL}/job/getJobById`,
      {
        params: { id },
      }
    );
    if (data.success) {
      yield put(setSelectedJob(data.job));
    }
  } catch (e) {
    yield put(setSelectedJob(null));
  }
}

export function* handleViewJob(action: any): any {
  try {
    const { account, jobId } = action.payload;
    const { data }: any = yield axios.post(
      `${process.env.REACT_APP_API_URL}/job/viewJob`,
      {
        userId: account || '',
        jobId,
      }
    );
    if (data.success && account) {
      const { data }: any = yield axios.get(
        `${process.env.REACT_APP_API_URL}/job/getViewedJobs`,
        {
          params: { userId: account },
        }
      );
      if (data.success) {
        yield put(setViewedJobs(data.jobs));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* getJobCountByCity(): any {
  try {
    const { data }: any = yield axios.get(
      `${process.env.REACT_APP_API_URL}/job/getJobCountByCity`
    );
    if (data.success) {
      yield put(setJobInCities(data.data));
    }
  } catch (e) {
    yield put(setSelectedJob(null));
  }
}

export function* handleSetFavorite(action: any): any {
  try {
    const { jobId, userId } = action.payload;
    const { data }: any = yield axios.post(
      `${process.env.REACT_APP_API_URL}/job/setFavoriteJob`,
      {
        jobId,
        userId,
      }
    );
    if (data.success) {
      const newJob = data.newJob;
      yield put(setNewJob(newJob));
    }
  } catch (e) {
    yield put(setNewJob(null));
  }
}

export function* handleEditJob(action: any): any {
  try {
    const { job, userId, saveHistory, onSuccess } = action.payload;
    const idToken = localStorage.getItem('jwt_token');
    const { data }: any = yield axios.put(
      `${process.env.REACT_APP_API_URL}/job/editJobByManager`,
      {
        job,
        userId,
        saveHistory,
      },
      {
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      }
    );
    if (data.success) {
      const newJob = data.newJob;
      yield put(setNewJob(newJob));
      if (onSuccess) {
        onSuccess();
      }
    }
  } catch (e) {
    yield put(setNewJob(null));
  }
}
