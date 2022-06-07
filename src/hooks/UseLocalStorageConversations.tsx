import React, { useState, useEffect } from "react";
import { Conversation } from "../interfaces";

const PREFIX = "whatsapp-clone-"; //to group all data stored in this app

export interface UseLocalStorageReturn {
  value: Conversation[];
  setValue: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

//set states and save to local storage
export default function UseLocalStorageConversations(
  key: string,
  initialValue: Conversation[]
): UseLocalStorageReturn {
  const prefixedKey = PREFIX + key;
  const [value, setValue]: [
    Conversation[],
    React.Dispatch<React.SetStateAction<Conversation[]>>
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
