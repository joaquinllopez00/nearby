import { combineReducers } from "redux";
import { coordsReducer } from "./coordsReducer";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";
const rootReducer = combineReducers({
  coordinates: coordsReducer,
  events: eventReducer,
  user: userReducer,
});

export default rootReducer;
