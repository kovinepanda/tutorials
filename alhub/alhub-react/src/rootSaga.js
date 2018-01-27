import { takeLatest } from "redux-saga";
import { CREATE_USER_REQUEST } from "./types";
import { createUserSaga } from "./sagas/userSagas";

export default function* rootSaga() {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga);
}
