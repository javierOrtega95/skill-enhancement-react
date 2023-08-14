import { Button, Card } from "@tremor/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, onClose, children }: Props) {
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

  const handleCloseModal = () => {
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
            {children}
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
          </Card>
        </div>
      </div>
    </>
  );
}
