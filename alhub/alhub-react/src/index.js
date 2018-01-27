import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import lt from "react-intl/locale-data/lt";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userFetched, fetchCurrentUser } from "./actions/users";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";
import { localetSet } from "./actions/locale";
import rootSaga from "./rootSaga";

addLocaleData(en);
addLocaleData(lt);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
);
sagaMiddleware.run(rootSaga);

if (localStorage.bookwormJWT) {
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(fetchCurrentUser());
} else {
  store.dispatch(userFetched({}));
}

if (localStorage.alhubLang) {
  store.dispatch(localetSet(localStorage.alhubLang));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
