import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import UseLocalStorage from "./hooks/useLocalStorage";
import { ContactProvider } from "./context/ContactsProvider";
import { ConversationProvider } from "./context/ConversationsProvider";

function App(): JSX.Element {
  const idStatesObj = UseLocalStorage("id", "");
  const [id, setId] = [idStatesObj.value, idStatesObj.setValue];

  const DashboardWrapped = (
    <ContactProvider>
      <ConversationProvider>
        <Dashboard id={id} />
      </ConversationProvider>
    </ContactProvider>
  );

  return <>{id ? DashboardWrapped : <Login onIdSubmit={setId} />}</>;
}

export default App;
