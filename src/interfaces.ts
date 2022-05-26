import React from "react";

export interface Conversation {
    recpients: string[]
    messages: string[]
}
export interface FormattedConversation {
    conversation: Conversation;
    recpients: { id: string, name: string }[];
    selected: boolean;
}
export interface ConversationsContextValue {
    conversations: FormattedConversation[];
    createConversation: (recpients: string[]) => void;
    setSelectedConversationIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedConversation: FormattedConversation;
}

export interface Contacts {
    id: string;
    name: string;
}
export interface ContactsContextValue {
    contacts: Contacts[];
    createContact: (id: string, name: string) => void;
}