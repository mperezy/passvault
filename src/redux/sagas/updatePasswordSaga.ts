import { select, call, takeLeading, put } from 'redux-saga/effects';
import { logger } from 'react-native-logs';

import {
  editPasswordFromFirebase,
  selectPassword,
  selectPasswordDescriptionPicked,
  selectPasswordIdPicked,
} from 'reduxStore/slices/passwordSlice';
import { updatePasswordByIdFromFirebase } from 'services/database';
import { selectSocialMediaPicked } from 'reduxStore/slices/socialMediaSlice';
import { setIsRequest, unsetIsRequest } from 'reduxStore/slices/applicationStatusSlice';

const log = logger.createLogger();

function* updatePasswordFlow(): Generator {
  try {
    const passwordId = yield select(selectPasswordIdPicked);
    const socialMedia = yield select(selectSocialMediaPicked);
    const password = yield select(selectPassword);
    const description = yield select(selectPasswordDescriptionPicked);

    yield put(setIsRequest());
    yield call(
      // @ts-ignore
      updatePasswordByIdFromFirebase,
      passwordId,
      password,
      description,
      socialMedia
    );
    yield put(unsetIsRequest());
  } catch (exception) {
    log.error('UpdatePasswordSaga: ', { exception });
  }
}

export const updatePasswordSaga = [takeLeading(editPasswordFromFirebase.type, updatePasswordFlow)];
