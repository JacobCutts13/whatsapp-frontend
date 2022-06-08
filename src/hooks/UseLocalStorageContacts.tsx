import React, { useState, useEffect } from "react";

const PREFIX = "whatsapp-clone-"; //to group all data stored in this app

export interface UseLocalStorageReturn {
  value: Contact[];
  setValue: React.Dispatch<React.SetStateAction<Contact[]>>;
}
interface Contact {
  id: string;
  name: string;
}

//set states and save to local storage
export default function UseLocalStorageContacts(
  key: string,
  initialValue: Contact[]
): UseLocalStorageReturn {
  const prefixedKey = PREFIX + key;
  const [value, setValue]: [
    Contact[],
    React.Dispatch<React.SetStateAction<Contact[]>>
  ] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    // if (typeof initialValue === "function") {
    //     return initialValue()
    // }
    else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, initialValue, value]);

  return { value: value, setValue: setValue };
}
