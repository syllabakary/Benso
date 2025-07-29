import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, SearchFilters } from '../types';
import { mockProperties } from '../data/mockData';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: SearchFilters;
  favorites: string[];
  searchQuery: string;
  viewMode: 'grid' | 'map' | 'split';
  selectedProperty: Property | null;
  loading: boolean;
  setFilters: (filters: SearchFilters) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'map' | 'split') => void;
  setSelectedProperty: (property: Property | null) => void;
  toggleFavorite: (propertyId: string) => void;
  addProperty: (property: Property) => void;
  updateProperty: (propertyId: string, updates: Partial<Property>) => void;
  deleteProperty: (propertyId: string) => void;
  incrementViews: (propertyId: string) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('benso_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('benso_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter properties based on search criteria
  const filteredProperties = React.useMemo(() => {
    return properties.filter(property => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchText = `${property.title} ${property.description} ${property.address.city} ${property.address.street}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }

      // Property type
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(property.type)) return false;
      }

      // Price range
      if (filters.priceMin && property.price < filters.priceMin) return false;
      if (filters.priceMax && property.price > filters.priceMax) return false;

      // Area range
      if (filters.areaMin && property.area < filters.areaMin) return false;
      if (filters.areaMax && property.area > filters.areaMax) return false;

      // Rooms
      if (filters.rooms && filters.rooms.length > 0) {
        if (!filters.rooms.includes(property.rooms)) return false;
      }

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms.length > 0) {
        if (!filters.bedrooms.includes(property.bedrooms)) return false;
      }

      // City
      if (filters.city) {
        if (!property.address.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      }

      // Amenities
      if (filters.furnished !== undefined && property.furnished !== filters.furnished) return false;
      if (filters.parking !== undefined && property.parking !== filters.parking) return false;
      if (filters.balcony !== undefined && property.balcony !== filters.balcony) return false;
      if (filters.garden !== undefined && property.garden !== filters.garden) return false;
      if (filters.elevator !== undefined && property.elevator !== filters.elevator) return false;

      return true;
    });
  }, [properties, filters, searchQuery]);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const addProperty = (property: Property) => {
    setProperties(prev => [...prev, property]);
  };

  const updateProperty = (propertyId: string, updates: Partial<Property>) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { ...property, ...updates, updatedAt: new Date() }
          : property
      )
    );
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  const incrementViews = (propertyId: string) => {
    setProperties(prev => 
      prev.map(property => 
        property.id === propertyId 
          ? { 
              ...property, 
              views: property.views + 1,
              analytics: {
                ...property.analytics,
                totalViews: property.analytics.totalViews + 1,
                uniqueViews: property.analytics.uniqueViews + 1
              }
            }
          : property
      )
    );
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      filters,
      favorites,
      searchQuery,
      viewMode,
      selectedProperty,
      loading,
      setFilters,
      setSearchQuery,
      setViewMode,
      setSelectedProperty,
      toggleFavorite,
      addProperty,
      updateProperty,
      deleteProperty,
      incrementViews
    }}>
      {children}
    </PropertyContext.Provider>
  );
};