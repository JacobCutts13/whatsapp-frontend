import { createContext, useContext, useState } from "react";
import { useContacts } from "./ContactsProvider";
import UseLocalStorageConversations from "../hooks/UseLocalStorageConversations";
import { Conversation, ConversationsContextValue } from "../interfaces"

interface Props {
    children: JSX.Element;
}

const ConversationContext = createContext<ConversationsContextValue | null>(null);

export function useConversation(): ConversationsContextValue | null {
    return useContext(ConversationContext);
}

export function ConversationProvider(props: Props): JSX.Element {
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0) //default select 1st convo
    const contacts = useContacts()?.contacts
    const conversationObj = UseLocalStorageConversations("conversations", []);
    const [conversations, setConversations]: [
        Conversation[],
        React.Dispatch<React.SetStateAction<Conversation[]>>
    ] = [conversationObj.value, conversationObj.setValue];

    const createConversation = (recpients: string[]) => {
        setConversations((prevConversations) => [...prevConversations, { recpients: recpients, messages: [] }]);
    };

    const formattedConversations = conversations.map((conversation, index) => {
        const recpients = conversation.recpients.map(recipient => {
            const contact = contacts?.find(contact => (
                contact.id === recipient
            ))
            const name = (contact && contact.name) || recipient  //use id if name not saved
            return { id: recipient, name }
        })
        const selected = index === selectedConversationIndex
        return { conversation: conversation, recpients, selected }
    })

    const contextValue: ConversationsContextValue = {
        conversations: formattedConversations,
        createConversation,
        setSelectedConversationIndex: setSelectedConversationIndex,
        selectedConversation: formattedConversations[selectedConversationIndex]
    };

    return (
        <ConversationContext.Provider value={contextValue}>
            {props.children}
        </ConversationContext.Provider>
    );
}
