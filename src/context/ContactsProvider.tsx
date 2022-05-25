import { createContext, useContext } from "react";
import UseLocalStorageContacts from "../hooks/UseLocalStorageContacts";

interface Props {
  children: JSX.Element;
}

interface Contacts {
  id: string;
  name: string;
}
export interface ContextValue {
  contacts: Contacts[];
  createContact: (id: string, name: string) => void;
}

const ContactsContext = createContext<ContextValue | null>(null);

export function useContacts(): ContextValue | null {
  return useContext(ContactsContext);
}

export function ContactProvider(props: Props): JSX.Element {
  const contactsObj = UseLocalStorageContacts("contacts", []);
  const [contacts, setContacts]: [
    Contacts[],
    React.Dispatch<React.SetStateAction<Contacts[]>>
  ] = [contactsObj.value, contactsObj.setValue];

  const createContact = (id: string, name: string) => {
    setContacts((prevContacts) => [...prevContacts, { id, name }]);
  };
  const contextValue: ContextValue = { contacts, createContact };

  return (
    <ContactsContext.Provider value={contextValue}>
      {props.children}
    </ContactsContext.Provider>
  );
}
