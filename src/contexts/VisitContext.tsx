import React, { createContext, useContext, useState } from 'react';
import { Visit } from '../types';

interface VisitContextType {
  visits: Visit[];
  addVisit: (visit: Omit<Visit, 'id'>) => void;
  updateVisit: (visitId: string, status: Visit['status']) => void;
  getVisitsByProperty: (propertyId: string) => Visit[];
  getVisitsByLandlord: (landlordId: string) => Visit[];
  getPendingVisitsCount: (landlordId: string) => number;
}

const VisitContext = createContext<VisitContextType | undefined>(undefined);

export const useVisit = () => {
  const context = useContext(VisitContext);
  if (context === undefined) {
    throw new Error('useVisit must be used within a VisitProvider');
  }
  return context;
};

export const VisitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visits, setVisits] = useState<Visit[]>([]);

  const addVisit = (visitData: Omit<Visit, 'id'>) => {
    const newVisit: Visit = {
      ...visitData,
      id: Date.now().toString()
    };
    setVisits(prev => [...prev, newVisit]);
    
    // Simulation de notification en temps réel au propriétaire
    console.log('🔔 Nouvelle demande de visite reçue !', newVisit);
  };

  const updateVisit = (visitId: string, status: Visit['status']) => {
    setVisits(prev => 
      prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, status }
          : visit
      )
    );
    
    // Simulation de notification au locataire
    console.log(`📅 Statut de visite mis à jour: ${status}`);
  };

  const getVisitsByProperty = (propertyId: string) => {
    return visits.filter(visit => visit.propertyId === propertyId);
  };

  const getVisitsByLandlord = (landlordId: string) => {
    return visits.filter(visit => visit.landlordId === landlordId);
  };

  const getPendingVisitsCount = (landlordId: string) => {
    return visits.filter(visit => 
      visit.landlordId === landlordId && visit.status === 'pending'
    ).length;
  };

  return (
    <VisitContext.Provider value={{
      visits,
      addVisit,
      updateVisit,
      getVisitsByProperty,
      getVisitsByLandlord,
      getPendingVisitsCount
    }}>
      {children}
    </VisitContext.Provider>
  );
};