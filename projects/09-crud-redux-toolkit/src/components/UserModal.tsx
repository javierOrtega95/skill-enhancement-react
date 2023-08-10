import { Button, Card, Flex, TextInput, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import { UserWithId } from "../store/users/slice";

interface Props {
  initialOpen: boolean;
  user?: UserWithId;
  onClose: () => void;
}

export function UserModal({ user, initialOpen, onClose }: Props) {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    const closeModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, []);

  useEffect(() => {
    setOpen(initialOpen);
  }, [initialOpen]);

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

    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        id="modal"
        className="py-12 backdrop-blur inset-0 h-screen flex transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        onClick={onClose}
        onKeyPress={() => {}}
      >
        <div
          role="alert"
          className="alert container m-auto w-11/12 md:w-2/3 max-w-lg"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyPress={() => {}}
        >
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
                <Button type="submit" variant="secondary">
                  {user ? "Update" : "Submit"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="ml-3"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Flex>

              <Button
                type="button"
                variant="light"
                className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                aria-label="close modal"
                role="button"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <title>Close modal</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
