import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import UseLocalStorage from "./hooks/useLocalStorage";
import { ContactProvider } from "./context/ContactsProvider";

function App(): JSX.Element {
  const idStatesObj = UseLocalStorage("id", "");
  const [id, setId] = [idStatesObj.value, idStatesObj.setValue];

  const DashboardWrapped = (
    <ContactProvider>
      <Dashboard id={id} />
    </ContactProvider>
  );

  return <>{id ? DashboardWrapped : <Login onIdSubmit={setId} />}</>;
}

export default App;
