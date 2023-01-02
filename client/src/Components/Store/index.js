import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    window: windowSlice.reducer,
  },
});

export const windowActions = windowSlice.actions;
export default store;
