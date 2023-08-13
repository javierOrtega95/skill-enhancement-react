import { Title } from "@tremor/react";
import "./App.css";
import ListOfUsers from "./users/components/ListOfUsers";

function App() {
  return (
    <>
      <Title>CRUD React Redux Toolkit + Rome Tools + Tremor</Title>
      <ListOfUsers />
    </>
  );
}

export default App;
