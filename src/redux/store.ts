import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";
import trashReducer from "./trashSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    trashedNotes: trashReducer,
    authValidator: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
