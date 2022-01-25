import { all } from 'redux-saga/effects';
import { passwordGeneratorSaga } from 'reduxStore/sagas/passwordGeneratorSaga';
import { getPasswordsSaga } from 'reduxStore/sagas/getPasswordsSaga';
import { getSocialMediaSaga } from 'reduxStore/sagas/getSocialMediaSaga';
import { savePasswordSaga } from 'reduxStore/sagas/savePasswordSaga';
import { deletePasswordSaga } from 'reduxStore/sagas/deletePasswordSaga';
import { updatePasswordSaga } from 'reduxStore/sagas/updatePassword';

export default function* IndexSagas() {
  yield all([
    ...passwordGeneratorSaga,
    ...getPasswordsSaga,
    ...getSocialMediaSaga,
    ...savePasswordSaga,
    ...deletePasswordSaga,
    ...updatePasswordSaga,
  ]);
}
