import { createSlice } from "@reduxjs/toolkit";
import { type UserWithId } from "../types";
import {
  handleAddNewUser,
  handleDeleteUserById,
  handleUpdateUser,
} from "./reducer";

const DEFAULT_STATE = [
  {
    id: 1,
    name: "Javier Ortega",
    email: "javierortegaweb@gmail.com",
    github: "javierOrtega95",
  },
  {
    id: 2,
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
    rollbackNewUser: handleDeleteUserById,
    updateUser: handleUpdateUser,
    rollbackUpdateUser: handleUpdateUser,
    deleteUserById: handleDeleteUserById,
    rollbackDeleteUser: handleAddNewUser,
  },
});

export default usersSlice.reducer;

export const {
  addNewUser,
  rollbackNewUser,
  updateUser,
  rollbackUpdateUser,
  deleteUserById,
  rollbackDeleteUser,
} = usersSlice.actions;
