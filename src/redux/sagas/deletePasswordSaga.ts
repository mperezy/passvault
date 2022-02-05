import { put, select, call, takeLeading } from 'redux-saga/effects';
import {
  deletePasswordFromFirebase,
  selectPasswordIdPicked,
} from 'reduxStore/slices/passwordSlice';
import { deletePasswordById } from 'services/database';
import { setIsRequest, unsetIsRequest } from 'reduxStore/slices/applicationStatusSlice';

function* deletePasswordFlow(): Generator {
  try {
    const passwordId = yield select(selectPasswordIdPicked);

    yield put(setIsRequest());

    // @ts-ignore
    yield call(deletePasswordById, passwordId);

    yield put(unsetIsRequest());
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.log({ source: 'Exception from savePasswordSaga', exception });
  }
}

export const deletePasswordSaga = [
  // @ts-ignore
  takeLeading(deletePasswordFromFirebase.type, deletePasswordFlow),
];
