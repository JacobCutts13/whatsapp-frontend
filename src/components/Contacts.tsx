import { ListGroup } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

export default function Contacts(): JSX.Element {
  const contacts = useContacts()?.contacts;
  return (
    <ListGroup variant="flush">
      {contacts !== undefined &&
        contacts.map((contact) => (
          <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
        ))}
    </ListGroup>
  );
}
