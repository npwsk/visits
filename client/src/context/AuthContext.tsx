import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { User } from '../types';

interface AuthContextProps {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: React.Dispatch<User>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Ошибка при получении данных пользователя:', error);
                    localStorage.removeItem('token'); // Удаляем токен, если ошибка
                }
            }
        };
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await axios.post('/auth/login', { email, password });
        const { token } = res.data;
        if (token) {
          localStorage.setItem('token', token);
        }
        const response = await axios.get('/auth/me');
        const user = response.data;
        if (user) {
            setUser(user);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
