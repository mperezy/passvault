import { all } from 'redux-saga/effects';
import { passwordGeneratorSaga } from 'reduxStore/sagas/passwordGeneratorSaga';

export default function* IndexSagas() {
  yield all([...passwordGeneratorSaga]);
}
