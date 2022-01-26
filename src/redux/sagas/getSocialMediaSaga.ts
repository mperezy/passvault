import { call, put, takeLeading, select } from 'redux-saga/effects';
import {
  getSocialMediaListFromFirebase,
  setSocialMediaList,
  setSocialMediaPicked,
} from 'reduxStore/slices/socialMediaSlice';
import {
  selectIsCreateMode,
  selectIsEditMode,
  selectPasswordPicked,
  setPassword,
  setPasswordPicked,
} from 'reduxStore/slices/passwordSlice';
import { getSocialMedia } from 'services/database';

function* getSocialMediaFlow(): Generator {
  try {
    const isCreateMode = yield select(selectIsCreateMode);
    const isEditMode = yield select(selectIsEditMode);
    const passwordPicked = yield select(selectPasswordPicked);

    const socialMediaList = yield call(getSocialMedia);
    // @ts-ignore
    const socialMediaSelected = socialMediaList[0].name;

    yield put(setSocialMediaList({ socialMediaList }));

    if (isCreateMode) {
      yield put(setSocialMediaPicked({ socialMediaPicked: socialMediaSelected }));
    } else if (isEditMode) {
      //TODO: This flow needs to be updated in future
      /* this flow is only to put the passwordPicked in the
       * text input in Password Generator and then delete it
       * passwordPicked state.
       * */
      yield put(setPassword({ password: passwordPicked }));
      yield put(setPasswordPicked({ passwordPicked: '' }));
    }
  } catch (exception) {
    console.log({ source: 'Exception from getSocialMediaSaga', exception });
  }
}

export const getSocialMediaSaga = [
  takeLeading(getSocialMediaListFromFirebase.type, getSocialMediaFlow),
];
