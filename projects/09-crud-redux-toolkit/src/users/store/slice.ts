import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type UserId, type UserWithId } from "../types";

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
    addNewUser: (state, action: PayloadAction<UserWithId>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<UserWithId>) => {
      const { id, name, email, github } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.github = github;
      }
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, updateUser, deleteUserById } = usersSlice.actions;
