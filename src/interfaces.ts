import React from "react";

export interface Message {
  sender: string;
  text: string;
}

export interface Conversation {
  recipients: string[];
  messages: Message[];
}
export interface FormattedConversation {
  conversation: Conversation;
  recipients: { id: string; name: string }[];
  selected: boolean;
  messages: FullMessage[];
}
export interface ConversationsContextValue {
  conversations: FormattedConversation[];
  createConversation: (recipients: string[]) => void;
  setSelectedConversationIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedConversation: FormattedConversation;
  sendMessage: ({ recipients, text }: SendMessage) => void;
}

export interface Contacts {
  id: string;
  name: string;
}
export interface ContactsContextValue {
  contacts: Contacts[];
  createContact: (id: string, name: string) => void;
}

export interface SendMessage {
  recipients: string[];
  text: string;
}

export interface AddMessageToConversation extends SendMessage {
  sender: string;
}

export interface FullMessage {
  senderName: string;
  fromMe: boolean;
  sender: string;
  text: string;
}
