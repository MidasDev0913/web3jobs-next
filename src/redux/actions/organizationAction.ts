import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
  setOrganizations,
  setComapnies,
} from '../reducers/organizationReducer';

export function* getAllOrganizations(action: any): any {
  try {
    const { userId } = action.payload;
    const { data }: any = yield axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/getOrganizationsByUserId`,
      {
        params: { userId },
      }
    );
    if (data.success) {
      yield put(setOrganizations(data.organizations));
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

export function* getAllCompanies(action: any): any {
  try {
    const { userId } = action.payload;
    const { data }: any = yield axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/organization/getCompaniesByUserId`,
      {
        params: { userId },
      }
    );
    if (data.success) {
      yield put(setComapnies(data.companies));
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
