import { select, call, takeLeading } from 'redux-saga/effects';
import { logger } from 'react-native-logs';

import { savePassword2Firebase } from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import { sendPassword2Firebase } from 'services/database';

const log = logger.createLogger();

function* savePasswordFlow({ payload }: Params): Generator {
  try {
    const userId = yield select(selectUserId);
    const { socialMedia, password, description } = payload;

    // @ts-ignore
    yield call(sendPassword2Firebase, userId, password, description, socialMedia);
  } catch (exception) {
    log.error('SavePasswordSaga: ', { exception });
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
