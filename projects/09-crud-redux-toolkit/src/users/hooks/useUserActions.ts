import { useAppDispatch } from "../../store/hooks/store";
import { UserId, deleteUserById } from "../store/slice";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  return { removeUser };
};
