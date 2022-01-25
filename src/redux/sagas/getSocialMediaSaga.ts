import { call, put, takeLeading } from 'redux-saga/effects';
import {
  getSocialMediaListFromFirebase,
  setSocialMediaList,
  setSocialMediaSelected,
} from 'reduxStore/slices/socialMediaSlice';
import { getSocialMedia } from 'services/database';

function* getSocialMediaFlow(): Generator {
  try {
    const socialMediaList = yield call(getSocialMedia);
    const socialMediaSelected = {
      socialMediaSelected: socialMediaList[0].name || '',
    };

    yield put(setSocialMediaList({ socialMediaList }));

    return yield put(setSocialMediaSelected({ socialMediaSelected }));
  } catch (exception) {
    console.log({ source: 'Exception from getSocialMediaSaga', exception });
  }
}

export const getSocialMediaSaga = [
  takeLeading(getSocialMediaListFromFirebase.type, getSocialMediaFlow),
];
