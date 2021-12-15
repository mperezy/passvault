import { all } from 'redux-saga/effects';
import { passwordGeneratorSaga } from 'reduxStore/sagas/passwordGeneratorSaga';
import { getPasswordsSaga } from 'reduxStore/sagas/getPasswordsSaga';

export default function* IndexSagas() {
  yield all([...passwordGeneratorSaga, ...getPasswordsSaga]);
}
