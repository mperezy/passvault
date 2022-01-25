import { all } from 'redux-saga/effects';
import { passwordGeneratorSaga } from 'reduxStore/sagas/passwordGeneratorSaga';
import { getPasswordsSaga } from 'reduxStore/sagas/getPasswordsSaga';
import { getSocialMediaSaga } from 'reduxStore/sagas/getSocialMediaSaga';
import { savePasswordSaga } from 'reduxStore/sagas/savePasswordSaga';

export default function* IndexSagas() {
  yield all([
    ...passwordGeneratorSaga,
    ...getPasswordsSaga,
    ...getSocialMediaSaga,
    ...savePasswordSaga,
  ]);
}
