import { put, select, call, takeLeading } from 'redux-saga/effects';
import { getPasswordsFromFirebase, setPasswords } from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import { getPasswordsByUserId } from 'services/database';
import { setIsRequest, unsetIsRequest } from 'reduxStore/slices/applicationStatusSlice';

function* getPasswordsFlow(): Generator {
  try {
    const userId = yield select(selectUserId);
    const passwords = yield call(getPasswordsByUserId, userId);

    yield put(setIsRequest());
    yield put(setPasswords({ passwords }));
    yield put(unsetIsRequest());
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.log({ source: 'Exception from getPasswordsSaga', exception });
  }
}

export const getPasswordsSaga = [takeLeading(getPasswordsFromFirebase.type, getPasswordsFlow)];
