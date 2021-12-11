import { select, put, takeLeading } from 'redux-saga/effects';
import {
  generatePassword,
  selectPasswordLength,
  setPassword,
} from 'reduxStore/slices/passwordSlice';
import { lower, upper, number, symbols } from 'utils/constants';

export function* getPasswordGeneratorFlow(): Generator {
  try {
    const length = yield select(selectPasswordLength);
    const all = lower + upper + number + symbols;
    let password = '';

    // @ts-ignore
    for (let i = 0; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }

    console.log({ length, password });

    return yield put(setPassword({ password }));
  } catch (exception) {
    console.log({ exception });
  }
}

export const passwordGeneratorSaga = [takeLeading(generatePassword.type, getPasswordGeneratorFlow)];
