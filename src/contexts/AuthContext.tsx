import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  nom: string;
  age: number;
  email: string;
  localite: string;
  nationalite: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ URL de base corrigée - pointe vers le préfixe auth
  const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/auth';

  useEffect(() => {
    const savedUser = localStorage.getItem('benso_user');
    const savedToken = localStorage.getItem('benso_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('🔐 Tentative de connexion vers:', `${API_BASE_URL}/login`);
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      console.log('✅ Réponse de connexion:', response.data);
      
      const { user, token } = response.data;

      setUser(user);
      localStorage.setItem('benso_user', JSON.stringify(user));
      localStorage.setItem('benso_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log('📤 Données envoyées:', userData);
      console.log('🎯 URL d\'inscription:', `${API_BASE_URL}/register`);
      
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      console.log('✅ Réponse d\'inscription:', response.data);
      
      const { user, token } = response.data;

      setUser(user);
      localStorage.setItem('benso_user', JSON.stringify(user));
      localStorage.setItem('benso_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } catch (error: any) {
      console.error('❌ Erreur d\'inscription:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('benso_user');
    localStorage.removeItem('benso_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};