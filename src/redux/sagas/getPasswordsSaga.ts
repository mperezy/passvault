import { put, select, call, takeLeading } from 'redux-saga/effects';
import { getPasswordsFromFirebase, setPasswords } from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import { getPasswordsByUserId } from 'services/database';

export function* getPasswordsFlow(): Generator {
  try {
    const userId = yield select(selectUserId);
    const passwords = yield call(getPasswordsByUserId, userId);

    return yield put(setPasswords({ passwords }));
  } catch (exception) {
    console.log({ source: 'Exception from getPasswordsSaga', exception });
  }
}

export const getPasswordsSaga = [takeLeading(getPasswordsFromFirebase.type, getPasswordsFlow)];
