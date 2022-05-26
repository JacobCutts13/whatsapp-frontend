import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useConversation } from "../context/ConversationsProvider"
import { useContacts } from "../context/ContactsProvider"

interface Props {
  closeModal: () => void;
}

export default function NewConversationModal(props: Props): JSX.Element {
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])
  const createConversation = useConversation()?.createConversation;
  const contacts = useContacts()?.contacts;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (createConversation) {
      createConversation(selectedContactIds)
      props.closeModal();
    } else {
      window.alert("Fill in both fields")
    }
  };

  const handleCheckBoxChange = (id: string) => {
    setSelectedContactIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(prevId => prevId !== id)
      }
      return [...prevIds, id]
    })
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts?.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id) ? 1 : 0}
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  )
}
