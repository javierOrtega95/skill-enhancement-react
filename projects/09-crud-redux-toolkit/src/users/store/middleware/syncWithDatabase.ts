import { type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  createUser,
  deleteUser,
  editUser,
} from "../../../services/user.service";
import { type UserWithId } from "../../types";
import {
  rollbackDeleteUser,
  rollbackNewUser,
  rollbackUpdateUser,
} from "../slice";

export const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;

  const prevState = store.getState();

  next(action);

  if (type === "users/addNewUser") {
    const newUser = payload;

    createUser(newUser)
      .then((res) => {
        if (res.ok) {
          toast.success("User created successfully!");
        } else {
          throw new Error("Error creating an user");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        store.dispatch(rollbackNewUser(newUser.id));
      });
  } else if (type === "users/updateUser") {
    const newUser = payload;
    const prevUser = (prevState.users as UserWithId[]).find(
      (user: UserWithId) => user.id === newUser.id,
    );

    editUser(newUser)
      .then((res) => {
        if (res.ok) {
          toast.success("User updated successfully!");
        } else {
          throw new Error("Error creating an user");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        if (prevUser) store.dispatch(rollbackUpdateUser(prevUser));
      });
  } else if (type === "users/deleteUserById") {
    const userId = payload;
    const userToRemove = (prevState.users as UserWithId[]).find(
      (user: UserWithId) => user.id === userId,
    );

    deleteUser(userId)
      .then((res) => {
        if (res.ok) {
          toast.success("The user has been deleted successfully!");
        } else {
          throw new Error("Error deleting a user");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        if (userToRemove) store.dispatch(rollbackDeleteUser(userToRemove));
      });
  }
};
