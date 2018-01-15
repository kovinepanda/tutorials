import { combineReducers } from "redux";
import user from "./reducers/user";
import locale from "./reducers/locale";
import characters from "./reducers/characters";

export default combineReducers({
  user,
  locale,
  characters
});
