import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth') || 'null'));

  const saveAuth = (nextAuth) => {
    setAuth(nextAuth);
    localStorage.setItem('auth', JSON.stringify(nextAuth));
  };

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    saveAuth(data);
    toast.success('Welcome back!');
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    saveAuth(data);
    toast.success('Account created');
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
    toast.success('Signed out');
  };

  const value = {
    user: auth?.user || null,
    token: auth?.token || null,
    login,
    register,
    logout,
    isAuthenticated: Boolean(auth?.token),
    isAdmin: auth?.user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
