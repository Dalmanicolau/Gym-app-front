import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        
        if (loggedUser) {
            try {
                const parsedUser = JSON.parse(loggedUser);  // Verifica si es JSON válido
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data:", error);  // Si el JSON no es válido
            }
        }
        setLoading(false); // Finaliza la carga después de verificar el usuario
    }, []);
    
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };
    
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
