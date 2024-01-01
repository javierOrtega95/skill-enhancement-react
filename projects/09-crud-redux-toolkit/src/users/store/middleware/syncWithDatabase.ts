import { type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { createUser } from "../../../services/user.service";
import { rollbackNewUser } from "../slice";

export const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action;

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
        store.dispatch(rollbackNewUser(newUser));
      });
  }
};
