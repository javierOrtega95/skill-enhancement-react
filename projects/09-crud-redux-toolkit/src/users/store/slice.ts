import { createSlice } from "@reduxjs/toolkit";
import { type UserWithId } from "../types";
import {
  handleAddNewUser,
  handleDeleteUserById,
  handleRollbackNewUser,
  handleUpdateUser,
} from "./actions";

const DEFAULT_STATE = [
  {
    id: crypto.randomUUID(),
    name: "Javier Ortega",
    email: "javierortegaweb@gmail.com",
    github: "javierOrtega95",
  },
  {
    id: crypto.randomUUID(),
    name: "Alicia Rebollo",
    email: "laRebo@gmail.com",
    github: "aliciarebo",
  },
];

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: handleAddNewUser,
    rollbackNewUser: handleRollbackNewUser,
    updateUser: handleUpdateUser,
    deleteUserById: handleDeleteUserById,
  },
});

export default usersSlice.reducer;

export const { addNewUser, rollbackNewUser, updateUser, deleteUserById } =
  usersSlice.actions;
