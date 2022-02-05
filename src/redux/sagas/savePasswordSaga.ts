import { select, call, takeLeading } from 'redux-saga/effects';
import { savePassword2Firebase } from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import { sendPassword2Firebase } from 'services/database';

function* savePasswordFlow({ payload }: Params): Generator {
  try {
    const userId = yield select(selectUserId);
    const { socialMedia, password, description } = payload;

    // @ts-ignore
    yield call(sendPassword2Firebase, userId, password, description, socialMedia);
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.log({ source: 'Exception from savePasswordSaga', exception });
  }
}

// @ts-ignore
export const savePasswordSaga = [takeLeading(savePassword2Firebase.type, savePasswordFlow)];

interface Params {
  payload: {
    socialMedia: string;
    password: string;
    description: string;
  };
}
