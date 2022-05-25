import { useState } from "react";
import { Tab, Nav, Modal } from "react-bootstrap";
import Contacts from "./Contacts";
import Conversations from "./Conversations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

interface Props {
  id: string;
}
const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar(props: Props): JSX.Element {
  const [activeKey, setActiveKey] = useState<string>(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <div style={{ width: "250px" }} className="d-flex  flex-column">
      <Tab.Container
        activeKey={activeKey}
        onSelect={(value) =>
          value !== null ? setActiveKey(value) : setActiveKey(CONVERSATIONS_KEY)
        }
      >
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link className="cursor-pointer" eventKey={CONVERSATIONS_KEY}>
              Conversations
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="cursor-pointer" eventKey={CONTACTS_KEY}>
              Contacts
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{props.id}</span>
        </div>
        <button onClick={() => setModalOpen(true)} className="rounded-0">
          New {conversationsOpen ? "Conversation" : "Contact"}
        </button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
