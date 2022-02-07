import { call, put, takeLeading } from 'redux-saga/effects';
import { logger } from 'react-native-logs';

import {
  getSocialMediaListFromFirebase,
  setSocialMediaList,
} from 'reduxStore/slices/socialMediaSlice';
import { getSocialMedia } from 'services/database';
import { setIsRequest, unsetIsRequest } from 'reduxStore/slices/applicationStatusSlice';

const log = logger.createLogger();

function* getSocialMediaFlow(): Generator {
  try {
    yield put(setIsRequest());

    const socialMediaList = yield call(getSocialMedia);
    yield put(setSocialMediaList({ socialMediaList }));

    yield put(unsetIsRequest());
  } catch (exception) {
    log.error('GetSocialMediaSaga: ', { exception: exception.message });
  }
}

export const getSocialMediaSaga = [
  takeLeading(getSocialMediaListFromFirebase.type, getSocialMediaFlow),
];
