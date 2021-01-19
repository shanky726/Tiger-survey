import { configureStore } from "@reduxjs/toolkit";
import { surveySlice } from "./surveySlice";
import { responseSlice } from "./responseSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  surveys: surveySlice.reducer,
  responses: responseSlice.reducer,
});

export const store = configureStore({ reducer: rootReducer });
