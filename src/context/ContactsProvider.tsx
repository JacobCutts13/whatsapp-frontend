import { createContext, useContext } from "react";
import UseLocalStorageContacts from "../hooks/UseLocalStorageContacts";
import { Contacts, ContactsContextValue } from "../interfaces";

interface Props {
  children: JSX.Element;
}

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function useContacts(): ContactsContextValue | null {
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
  const contextValue: ContactsContextValue = { contacts, createContact };

  return (
    <ContactsContext.Provider value={contextValue}>
      {props.children}
    </ContactsContext.Provider>
  );
}
