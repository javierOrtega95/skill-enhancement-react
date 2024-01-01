import { PayloadAction } from "@reduxjs/toolkit";
import { type UserId, type UserWithId } from "../types";

export function handleAddNewUser(
  state: UserWithId[],
  action: PayloadAction<UserWithId>,
) {
  state.push(action.payload);
}

export function handleUpdateUser(
  state: UserWithId[],
  action: PayloadAction<UserWithId>,
) {
  const { id, name, email, github } = action.payload;
  const existingUser = state.find((user) => user.id === id);
  if (existingUser) {
    existingUser.name = name;
    existingUser.email = email;
    existingUser.github = github;
  }
}

export function handleDeleteUserById(
  state: UserWithId[],
  action: PayloadAction<UserId>,
) {
  const id = action.payload;
  return state.filter((user) => user.id !== id);
}
