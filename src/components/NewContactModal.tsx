import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

interface Props {
  closeModal: () => void;
}

export default function NewContactModal(props: Props): JSX.Element {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const createContact = useContacts()?.createContact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idRef.current !== null && nameRef.current !== null && createContact) {
      createContact(idRef.current.value, nameRef.current.value);
      props.closeModal();
    } else {
      window.alert("Fill in both fields")
    }
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit" className="mt-2">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
