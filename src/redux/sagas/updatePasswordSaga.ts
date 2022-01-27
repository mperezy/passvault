import { put, select, call, takeLeading } from 'redux-saga/effects';
import {
  editPasswordFromFirebase,
  selectPassword,
  selectPasswordIdPicked,
} from 'reduxStore/slices/passwordSlice';
import { updatePasswordByIdFromFirebase } from 'services/database';

function* updatePasswordFlow({ payload }: any): Generator {
  try {
    const passwordId = yield select(selectPasswordIdPicked);
    const { socialMedia, password, description } = payload;

    return yield call(
      // @ts-ignore
      updatePasswordByIdFromFirebase,
      passwordId,
      password,
      description,
      socialMedia
    );
  } catch (exception) {
    console.log({ source: 'Exception from savePasswordSaga', exception });
  }
}

export const updatePasswordSaga = [takeLeading(editPasswordFromFirebase.type, updatePasswordFlow)];
