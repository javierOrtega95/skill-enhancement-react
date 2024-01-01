import { Title } from "@tremor/react";
import { Toaster } from "sonner";
import "./App.css";
import ListOfUsers from "./users/components/ListOfUsers";

function App() {
  return (
    <>
      <Title className="text-center py-4">
        CRUD React Redux Toolkit + Rome Tools + Tremor
      </Title>
      <ListOfUsers />
      <Toaster richColors />
    </>
  );
}

export default App;
