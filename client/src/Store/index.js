import { configureStore, createSlice } from "@reduxjs/toolkit";
import {apiSlice} from '../Api/apiSlice';

const initialState = { currentWindow: "home" };

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    changeWindow(state, action) {
      state.currentWindow = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    window: windowSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  }
});

export const windowActions = windowSlice.actions;
export default store;
