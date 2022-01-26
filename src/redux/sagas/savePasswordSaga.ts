import { put, select, call, takeLeading } from 'redux-saga/effects';
import { savePassword2Firebase, selectPassword } from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import { sendPassword2Firebase } from 'services/database';

// @ts-ignore
function* savePasswordFlow({ payload }): Generator {
  try {
    const userId = yield select(selectUserId);
    const { socialMedia, password, description } = payload;

    // @ts-ignore
    return yield call(sendPassword2Firebase, userId, password, description, socialMedia);
  } catch (exception) {
    console.log({ source: 'Exception from savePasswordSaga', exception });
  }
}

// @ts-ignore
export const savePasswordSaga = [takeLeading(savePassword2Firebase.type, savePasswordFlow)];
