import React, { useState, useEffect } from "react";

const PREFIX = "whatsapp-clone-"; //to group all data stored in this app

export interface UseLocalStorageReturn {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

//set states and save to local storage
export default function UseLocalStorage(
  key: string,
  initialValue: string
): UseLocalStorageReturn {
  const prefixedKey = PREFIX + key;
  const [value, setValue]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
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
