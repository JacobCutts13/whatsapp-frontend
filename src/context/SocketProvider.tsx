import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface Props {
    children: JSX.Element;
    id: string;
}

const SocketContext = createContext<Socket | null>(null);

export function useSocket(): Socket | null {
    return useContext(SocketContext);
}

export function SocketProvider(props: Props): JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect((): (() => void) => {
        const newSocket = io("https://whatsapp-jacob.herokuapp.com/", { query: { id: props.id } });
        setSocket(newSocket);

        return () => newSocket.close(); //close socket
    }, [props.id]);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
}
