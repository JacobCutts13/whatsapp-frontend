import { Button, Container, Form } from "react-bootstrap";
import React, { useRef } from "react";
import { v4 as uuidV4 } from "uuid";

interface Props {
  onIdSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export default function Login(Props: Props): JSX.Element {
  const idRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idRef.current) {
      Props.onIdSubmit(idRef.current.value);
    }
  };

  const createId = () => {
    Props.onIdSubmit(uuidV4());
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button onClick={createId} variant="secondary">
          New Id
        </Button>
      </Form>
    </Container>
  );
}
