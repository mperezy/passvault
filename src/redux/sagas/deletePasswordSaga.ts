import { put, select, call, takeLeading } from 'redux-saga/effects';
import { logger } from 'react-native-logs';

import {
  deletePasswordFromFirebase,
  selectPasswordIdPicked,
} from 'reduxStore/slices/passwordSlice';
import { deletePasswordById } from 'services/database';
import { setIsRequest, unsetIsRequest } from 'reduxStore/slices/applicationStatusSlice';

const log = logger.createLogger();

function* deletePasswordFlow(): Generator {
  try {
    const passwordId = yield select(selectPasswordIdPicked);

    yield put(setIsRequest());

    // @ts-ignore
    yield call(deletePasswordById, passwordId);

    yield put(unsetIsRequest());
  } catch (exception) {
    log.errpr('DeletePasswordSaga: ', { exception: exception.message });
  }
}

export const deletePasswordSaga = [
  // @ts-ignore
  takeLeading(deletePasswordFromFirebase.type, deletePasswordFlow),
];
