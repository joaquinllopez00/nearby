import { combineReducers } from "redux";
import { coordsReducer } from "./coordsReducer";

const rootReducer = combineReducers({
  coordinates: coordsReducer,
});

export default rootReducer;
