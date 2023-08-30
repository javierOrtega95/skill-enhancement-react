import { useAppDispatch } from "../../store/hooks/store";
import {
  UserId,
  UserWithId,
  addNewUser,
  deleteUserById,
  updateUser,
} from "../store/slice";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addUser = (user: UserWithId) => {
    dispatch(addNewUser(user));
  };

  const editUser = (user: UserWithId) => {
    dispatch(updateUser(user));
  };

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  return { addUser, editUser, removeUser };
};
