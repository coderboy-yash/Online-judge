// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('user');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <UserContext.Provider value={{ username }}>
            {children}
        </UserContext.Provider>
    );
};
