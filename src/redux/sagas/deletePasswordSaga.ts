import { put, select, call, takeLeading } from 'redux-saga/effects';
import { deletePasswordFromFirebase } from 'reduxStore/slices/passwordSlice';
import { deletePasswordById } from 'services/database';

// @ts-ignore
function* deletePasswordFlow({ payload }): Generator {
  try {
    const { passwordId } = payload;

    // @ts-ignore
    return yield call(deletePasswordById, passwordId);
  } catch (exception) {
    console.log({ source: 'Exception from savePasswordSaga', exception });
  }
}

// @ts-ignore
export const deletePasswordSaga = [
  takeLeading(deletePasswordFromFirebase.type, deletePasswordFlow),
];
