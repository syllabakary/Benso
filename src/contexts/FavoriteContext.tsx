import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoriteContextType {
  favorites: string[];
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (propertyId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Charger les favoris depuis le localStorage
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  const saveFavorites = (newFavorites: string[]) => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    }
    setFavorites(newFavorites);
  };

  const addToFavorites = (propertyId: string) => {
    if (!user) return;
    
    const newFavorites = [...favorites, propertyId];
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (propertyId: string) => {
    if (!user) return;
    
    const newFavorites = favorites.filter(id => id !== propertyId);
    saveFavorites(newFavorites);
  };

  const isFavorite = (propertyId: string): boolean => {
    return favorites.includes(propertyId);
  };

  const toggleFavorite = (propertyId: string) => {
    if (isFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  return (
    <FavoriteContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};