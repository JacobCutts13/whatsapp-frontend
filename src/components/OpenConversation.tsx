import React, { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConversation } from "../context/ConversationsProvider";

export default function OpenConversation(): JSX.Element {
  const [text, setText] = useState<string>("");
  const sendMessage = useConversation()?.sendMessage;
  const selectedConversation = useConversation()?.selectedConversation;
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendMessage && selectedConversation) {
      sendMessage({
        recipients: selectedConversation?.recipients.map(
          (recipient) => recipient.id
        ),
        text: text,
      });
    }
    setText("");
  };
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation?.messages.map((message, index) => (
            <div
              key={index}
              ref={
                index === selectedConversation.messages.length - 1
                  ? setRef
                  : null
              }
              className={
                "my-1 d-flex flex-column " + message.fromMe
                  ? "align-self-end"
                  : ""
              }
            >
              <div
                className={
                  "rounded px-2 py-1 " + message.fromMe
                    ? "bg-primary text-white"
                    : "border"
                }
              >
                {message.text}
              </div>
              <div
                className={
                  "text-muted small " + message.fromMe ? "text-right" : ""
                }
              >
                {message.fromMe ? "You" : message.senderName}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
