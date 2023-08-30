import { Button, Flex, TextInput, Title } from "@tremor/react";
import { Modal } from "../../components/Modal";
import { useUserActions } from "../hooks/useUserActions";
import { UserWithId } from "../store/slice";

interface Props {
  open: boolean;
  user?: UserWithId;
  onClose: () => void;
}

export function UserForm({ open, user, onClose }: Props) {
  const { addUser, editUser } = useUserActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const newUser = {
      id: user?.id || crypto.randomUUID(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      github: formData.get("github") as string,
    };

    user ? editUser(newUser) : addUser(newUser);

    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Title>{user ? "Edit" : "Create"} user</Title>
        <form id="userForm" onSubmit={handleSubmit}>
          <TextInput
            autoFocus
            name="name"
            placeholder="Name"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            defaultValue={user?.name}
          />

          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            defaultValue={user?.email}
          />

          <TextInput
            name="github"
            placeholder="Github"
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            defaultValue={user?.github}
          />

          <Flex justifyContent="start">
            <Button type="submit">{user ? "Update" : "Submit"}</Button>
            <Button
              type="button"
              variant="secondary"
              className="ml-3"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
}
