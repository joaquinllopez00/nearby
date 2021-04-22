import { combineReducers } from "redux";
import { coordsReducer } from "./coordsReducer";
import { eventReducer } from "./eventReducer";
const rootReducer = combineReducers({
  coordinates: coordsReducer,
  events: eventReducer,
});

export default rootReducer;
