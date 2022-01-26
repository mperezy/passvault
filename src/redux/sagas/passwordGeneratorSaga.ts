import { select, put, takeLeading } from 'redux-saga/effects';
import {
  generatePassword,
  selectIsEditMode,
  selectPasswordLength,
  selectPasswordPicked,
  setPassword,
} from 'reduxStore/slices/passwordSlice';
import { lower, upper, number, symbols } from 'utils/constants';
import { setPasswordGenerated } from 'utils/localStorageFuncs';

import {
  selectIsLowerCase,
  selectIsNumbers,
  selectIsSymbols,
  selectIsUpperCase,
} from 'reduxStore/slices/configuratorSlice';

export function* getPasswordGeneratorFlow(): Generator {
  try {
    const length = yield select(selectPasswordLength);
    const isUpperCase = yield select(selectIsUpperCase);
    const isLowerCase = yield select(selectIsLowerCase);
    const isNumbers = yield select(selectIsNumbers);
    const isSymbols = yield select(selectIsSymbols);

    const isEditMode = yield select(selectIsEditMode);
    const passwordPicked = yield select(selectPasswordPicked);

    const isUpper: string = isUpperCase ? upper : '';
    const isLower: string = isLowerCase ? lower : '';
    const isNumber: string = isNumbers ? number : '';
    const isSymbol: string = isSymbols ? symbols : '';

    const all = isUpper + isLower + isNumber + isSymbol;
    let password = '';

    // @ts-ignore
    for (let i = 0; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }

    setPasswordGenerated(password);

    if (isEditMode) {
      if (passwordPicked) {
        //TODO: This flow needs to be updated in future
        /* This condition will only be applied at the first time the user
         * click in edit password, the password picked will be set as
         * a generated password, and then will be deleted from the state.
         * */
        // @ts-ignore
        password = passwordPicked;
      }
    }
    return yield put(setPassword({ password }));
  } catch (exception) {
    console.log({ exception });
  }
}

export const passwordGeneratorSaga = [takeLeading(generatePassword.type, getPasswordGeneratorFlow)];
