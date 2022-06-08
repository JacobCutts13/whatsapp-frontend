import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import UseLocalStorage from "./hooks/useLocalStorage";
import { ContactProvider } from "./context/ContactsProvider";
import { ConversationProvider } from "./context/ConversationsProvider";
import { SocketProvider } from "./context/SocketProvider";

function App(): JSX.Element {
  const idStatesObj = UseLocalStorage("id", "");
  const [id, setId] = [idStatesObj.value, idStatesObj.setValue];

  const DashboardWrapped = (
    <SocketProvider id={id}>
      <ContactProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactProvider>
    </SocketProvider>
  );

  return <>{id ? DashboardWrapped : <Login onIdSubmit={setId} />}</>;
}

export default App;
