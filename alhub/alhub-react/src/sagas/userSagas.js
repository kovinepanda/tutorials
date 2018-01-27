import { call, put } from "redux-saga/effects";
import { userLoggedIn } from "../actions/auth";
import api from "../api";
import { createUserFailure } from "../actions/users";

export function* createUserSaga(action) {
  try {
    const user = yield call(api.user.signup, action.user);
    localStorage.bookwormJWT = user.token;
    yield put(userLoggedIn(user));
  } catch (err) {
    yield put(createUserFailure(err.response.data.errors));
  }
}
