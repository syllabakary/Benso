import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export interface Reservation {
  id: string;
  propertyId?: string;
  userId?: string;
  nom: string;
  email: string;
  telephone: string;
  typeTransaction: 'louer' | 'acheter';
  typeBien: string;
  localisation: string;
  budgetMin?: number;
  budgetMax?: number;
  surfaceMin?: number;
  pieces?: string;
  dateVisite?: string;
  heureVisite?: 'matin' | 'apres-midi' | 'soir';
  commentaires?: string;
  status: 'en_attente' | 'confirme' | 'annule' | 'traite';
  createdAt: Date;
  updatedAt: Date;
}

interface ReservationContextType {
  reservations: Reservation[];
  createReservation: (data: Omit<Reservation, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  getUserReservations: () => Reservation[];
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  cancelReservation: (id: string) => void;
  isLoading: boolean;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const createReservation = async (data: Omit<Reservation, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newReservation: Reservation = {
        ...data,
        id: Date.now().toString(),
        userId: user?.id,
        status: 'en_attente',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setReservations(prev => [...prev, newReservation]);
      
      // Simulation envoi email
      console.log('Email de confirmation envoyé à:', data.email);
      
      return newReservation.id;
    } catch (error) {
      throw new Error('Erreur lors de la création de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserReservations = (): Reservation[] => {
    if (!user) return [];
    return reservations.filter(reservation => reservation.userId === user.id);
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id
          ? { ...reservation, status, updatedAt: new Date() }
          : reservation
      )
    );
  };

  const cancelReservation = (id: string) => {
    updateReservationStatus(id, 'annule');
  };

  return (
    <ReservationContext.Provider value={{
      reservations,
      createReservation,
      getUserReservations,
      updateReservationStatus,
      cancelReservation,
      isLoading
    }}>
      {children}
    </ReservationContext.Provider>
  );
};