import { type Middleware } from "@reduxjs/toolkit";

export const persistanceLocalStorage: Middleware =
  (store) => (next) => (action) => {
    // before updating the state
    next(action);
    // after updating the state
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };
