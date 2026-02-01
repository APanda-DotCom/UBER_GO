import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';


// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(); 

const socket = io(import.meta.env.VITE_BASE_URL); // replace with your server URL

const SocketProvider = ({ children }) => {

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    // const sendMessage = (eventname, message) => {
    //     socket.emit(eventname, message);
    // };

    // const reviveMessage = (eventname, callback) => {
    //     socket.on(eventname, callback);
    // };

    return (
        <SocketContext.Provider value={{ socket }}> 
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;