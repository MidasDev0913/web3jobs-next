import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { setTags } from '../reducers/commonReducer';

export function* getFilterTags(action: any) {
  try {
    const { data } = yield call(
      axios.get,
      `${process.env.REACT_APP_API_URL}/getFilterTags`
    );
    if (data.success) {
      yield put(
        setTags(data.tags.map((tag: Record<string, string>) => tag.value))
      );
    }
  } catch (e: any) {
    console.log(e.message);
  }
}
