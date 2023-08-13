import { Button, Card, Flex, TextInput, Title } from "@tremor/react";
import { Modal } from "../../components/Modal";
import { UserWithId } from "../store/slice";

interface Props {
  open: boolean;
  user?: UserWithId;
  onClose: () => void;
}

export function UserModal({ open, user, onClose }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const newUser = {
      id: user ? user.id : crypto.randomUUID(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      github: formData.get("github") as string,
    };

    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Card>
          <form id="userForm" onSubmit={handleSubmit}>
            <Title>{user ? "Edit" : "Create"} user</Title>

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
        </Card>
      </Modal>
    </>
  );
}
