import { configureStore } from "@reduxjs/toolkit";
import {
  persistanceLocalStorage,
  syncWithDatabase,
} from "../users/store/middleware";
import usersReducer from "../users/store/slice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorage, syncWithDatabase],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
