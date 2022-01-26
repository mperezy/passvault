import { put, select, call, takeLeading } from 'redux-saga/effects';
import {
  editPasswordFromFirebase,
  selectPassword,
  selectPasswordIdPicked,
} from 'reduxStore/slices/passwordSlice';
import { updatePasswordByIdFromFirebase } from 'services/database';

// @ts-ignore
function* updatePasswordFlow({ payload }): Generator {
  try {
    const passwordId = yield select(selectPasswordIdPicked);
    const { socialMedia, password, description } = payload;

    // @ts-ignore
    return yield call(
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

// @ts-ignore
export const updatePasswordSaga = [takeLeading(editPasswordFromFirebase.type, updatePasswordFlow)];
