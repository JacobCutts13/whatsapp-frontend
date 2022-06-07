import { createContext, useContext, useState } from "react";
import { useContacts } from "./ContactsProvider";
import UseLocalStorageConversations from "../hooks/UseLocalStorageConversations";
import {
  Conversation,
  ConversationsContextValue,
  AddMessageToConversation,
  SendMessage,
} from "../interfaces";

interface Props {
  children: JSX.Element;
  id: string;
}

const ConversationContext = createContext<ConversationsContextValue | null>(
  null
);

export function useConversation(): ConversationsContextValue | null {
  return useContext(ConversationContext);
}

export function ConversationProvider(props: Props): JSX.Element {
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState<number>(0); //default select 1st convo
  const contacts = useContacts()?.contacts;
  const conversationObj = UseLocalStorageConversations("conversations", []);
  const [conversations, setConversations]: [
    Conversation[],
    React.Dispatch<React.SetStateAction<Conversation[]>>
  ] = [conversationObj.value, conversationObj.setValue];

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations) => [
      ...prevConversations,
      { recipients: recipients, messages: [] },
    ]);
  };

  const addMessageToConversation = ({
    recipients,
    text,
    sender,
  }: AddMessageToConversation): void => {
    setConversations((prevConversations) => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
        return conversation;
      });
      if (madeChange) {
        return newConversations;
      } else {
        return [
          ...prevConversations,
          { recipients: recipients, messages: [newMessage] },
        ];
      }
    });
  };

  const sendMessage = ({ recipients, text }: SendMessage) => {
    addMessageToConversation({ recipients, text, sender: props.id });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation?.recipients.map((recipient: string) => {
      const contact = contacts?.find((contact) => contact.id === recipient);
      const name = (contact && contact.name) || recipient; //use id if name not saved
      return { id: recipient, name };
    });
    const messages = conversation.messages.map((message) => {
      const contact = contacts?.find(
        (contact) => contact.id === message.sender
      );
      const name = (contact && contact.name) || message.sender; //use id if name not saved
      const fromMe = props.id === message.sender;
      return { ...message, senderName: name, fromMe: fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { conversation: conversation, messages, recipients, selected };
  });

  const contextValue: ConversationsContextValue = {
    conversations: formattedConversations,
    createConversation,
    setSelectedConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationContext.Provider value={contextValue}>
      {props.children}
    </ConversationContext.Provider>
  );
}

function arrayEquality(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  for (const index in a) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}
