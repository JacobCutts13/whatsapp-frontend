import { useState, useEffect } from 'react'

const PREFIX = 'whatsapp-clone-' //to group all data stored in this app

export default function UseLocalStorage(key: string, initialValue: string): JSX.Element {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.get(prefixedKey)
    })

    return (
        <div>

        </div>
    )
}