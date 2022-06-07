import { useConversation } from "../context/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

interface Props {
  id: string;
}

export default function Dashboard(props: Props): JSX.Element {
  const selectedConversation = useConversation()?.selectedConversation;

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={props.id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
