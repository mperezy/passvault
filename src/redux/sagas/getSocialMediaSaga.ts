import { call, put, takeLeading, select } from 'redux-saga/effects';
import {
  getSocialMediaListFromFirebase,
  selectSocialMediaPicked,
  setSocialMediaList,
  setSocialMediaPicked,
} from 'reduxStore/slices/socialMediaSlice';
import {
  selectIsEditMode,
  selectPasswordPicked,
  setPassword,
} from 'reduxStore/slices/passwordSlice';
import { getSocialMedia } from 'services/database';

function* getSocialMediaFlow(): Generator {
  try {
    const passwordPicked = yield select(selectPasswordPicked);
    const socialMediaPicked = yield select(selectSocialMediaPicked);
    const isEditMode = yield select(selectIsEditMode);
    const socialMediaList = yield call(getSocialMedia);
    const socialMediaSelected = socialMediaPicked ? socialMediaPicked : socialMediaList[0].name;
    yield put(setSocialMediaList({ socialMediaList }));

    yield put(setSocialMediaPicked({ socialMediaPicked: socialMediaSelected }));

    if (isEditMode) {
      return yield put(setPassword({ password: passwordPicked }));
    } else {
      return;
    }
  } catch (exception) {
    console.log({ source: 'Exception from getSocialMediaSaga', exception });
  }
}

export const getSocialMediaSaga = [
  takeLeading(getSocialMediaListFromFirebase.type, getSocialMediaFlow),
];
