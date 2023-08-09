import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    // before updating the state
    next(action);
    // after updating the state
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
