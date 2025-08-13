import React, { createContext, useContext, useState, useEffect } from 'react';

interface Admin {
  id: string;
  nom: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  avatar?: string;
  permissions: string[];
  last_login: Date;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock admin data
const mockAdmins = [
  {
    id: '1',
    nom: 'Admin BENSO',
    email: 'admin@benso.ci',
    password: 'admin123', // En production, ce serait hashé
    role: 'super_admin' as const,
    avatar: '',
    permissions: ['all'],
    last_login: new Date()
  },
  {
    id: '2',
    nom: 'Modérateur BENSO',
    email: 'moderator@benso.ci',
    password: 'mod123',
    role: 'moderator' as const,
    permissions: ['properties', 'users', 'contacts'],
    last_login: new Date()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setIsLoading(true);
    const savedAdmin = localStorage.getItem('benso_admin');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdmin(adminData);
      } catch (error) {
        console.error('Error parsing saved admin data:', error);
        localStorage.removeItem('benso_admin');
      }
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundAdmin = mockAdmins.find(a => a.email === email && a.password === password);
    
    if (foundAdmin) {
      const { password: _, ...adminData } = foundAdmin;
      const adminWithLastLogin = {
        ...adminData,
        last_login: new Date()
      };
      
      setAdmin(adminWithLastLogin);
      localStorage.setItem('benso_admin', JSON.stringify(adminWithLastLogin));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('benso_admin');
  };

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};