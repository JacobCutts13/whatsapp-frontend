import { ListGroup } from "react-bootstrap";
import { useConversation } from "../context/ConversationsProvider";

export default function Conversations(): JSX.Element {
  const conversations = useConversation()?.conversations;
  const setSelectedConversationIndex =
    useConversation()?.setSelectedConversationIndex;
  return (
    <ListGroup variant="flush">
      {conversations !== undefined &&
        conversations.map((conversation, index) => (
          <ListGroup.Item
            key={index}
            action
            active={conversation.selected}
            onClick={() => {
              if (setSelectedConversationIndex !== undefined)
                setSelectedConversationIndex(index);
            }}
          >
            {conversation.recipients
              .map((recepient) => recepient.name)
              .join(", ")}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
}
