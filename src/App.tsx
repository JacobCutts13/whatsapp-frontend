import { useState } from "react";
import Login from "./components/login";

function App(): JSX.Element {
  const [id, setId] = useState<string>("");

  return (
    <>
      {id}
      <Login onIdSubmit={setId} />
    </>
  );
}

export default App;
