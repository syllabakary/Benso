import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  fullAddress: string;
  images: string[];
  features: string[];
  status: 'à vendre' | 'à louer' | 'réservé' | 'vendu' | 'loué';
  transactionType: 'vente' | 'location';
  description: string;
  yearBuilt?: number;
  floor?: number;
  energyClass?: string;
  charges?: number;
  availability?: string;
  isSponsored: boolean;
  isFeatured: boolean;
  viewsCount: number;
  agent: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    photo?: string;
  };
}

export interface SearchFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  transactionType: string;
  minSurface: string;
  maxSurface: string;
  rooms: string;
  bedrooms: string;
  equipments: string[];
}

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
  getPropertyById: (id: string) => Property | undefined;
  getSponsoredProperties: () => Property[];
  getFeaturedProperties: () => Property[];
  getSimilarProperties: (propertyId: string) => Property[];
  incrementViews: (propertyId: string) => void;
  isLoading: boolean;
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    transactionType: 'location',
    minSurface: '',
    maxSurface: '',
    rooms: '',
    bedrooms: '',
    equipments: []
  });

  // Données fictives enrichies
  const mockProperties: Property[] = [
    {
      id: '1',
      title: 'Appartement moderne 3 pièces avec balcon',
      price: 1200,
      surface: 65,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      location: 'Paris 11ème',
      fullAddress: '15 Rue de la République, 75011 Paris',
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
      ],
      features: ['Balcon', 'Parking', 'Ascenseur', 'Climatisation'],
      status: 'à louer',
      transactionType: 'location',
      description: 'Magnifique appartement lumineux et parfaitement agencé, situé dans un immeuble moderne. Il se compose d\'un grand séjour avec balcon, cuisine équipée, deux chambres spacieuses, salle de bain moderne et parking privé.',
      yearBuilt: 2018,
      floor: 4,
      energyClass: 'B',
      charges: 150,
      availability: '2025-02-01',
      isSponsored: true,
      isFeatured: true,
      viewsCount: 245,
      agent: {
        name: 'Sophie Martin',
        phone: '+33123456789',
        whatsapp: '33123456789',
        email: 'sophie.martin@benso.fr',
        photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
      }
    },
    {
      id: '2',
      title: 'Villa de luxe avec piscine et jardin',
      price: 850000,
      surface: 200,
      rooms: 7,
      bedrooms: 4,
      bathrooms: 3,
      location: 'Nice',
      fullAddress: '25 Avenue des Palmiers, 06000 Nice',
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
      ],
      features: ['Piscine', 'Jardin', 'Garage', 'Terrasse', 'Vue mer'],
      status: 'à vendre',
      transactionType: 'vente',
      description: 'Exceptionnelle villa contemporaine avec vue mer panoramique. Prestations haut de gamme, piscine chauffée, jardin paysager de 1000m². Idéale pour une famille recherchant le luxe et la tranquillité.',
      yearBuilt: 2020,
      energyClass: 'A',
      isSponsored: true,
      isFeatured: true,
      viewsCount: 892,
      agent: {
        name: 'Marc Dubois',
        phone: '+33123456790',
        whatsapp: '33123456790',
        email: 'marc.dubois@benso.fr'
      }
    },
    {
      id: '3',
      title: 'Studio lumineux centre-ville',
      price: 750,
      surface: 25,
      rooms: 1,
      bedrooms: 0,
      bathrooms: 1,
      location: 'Lyon 2ème',
      fullAddress: '8 Place Bellecour, 69002 Lyon',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
      features: ['Meublé', 'Proche métro', 'Fibre optique'],
      status: 'à louer',
      transactionType: 'location',
      description: 'Charmant studio entièrement meublé au cœur de Lyon. Parfait pour étudiant ou jeune actif. Toutes commodités à proximité.',
      yearBuilt: 2015,
      floor: 2,
      energyClass: 'C',
      charges: 80,
      availability: '2025-01-15',
      isSponsored: false,
      isFeatured: true,
      viewsCount: 156,
      agent: {
        name: 'Julie Moreau',
        phone: '+33123456791',
        whatsapp: '33123456791',
        email: 'julie.moreau@benso.fr'
      }
    },
    {
      id: '4',
      title: 'Maison familiale avec jardin',
      price: 450000,
      surface: 120,
      rooms: 5,
      bedrooms: 3,
      bathrooms: 2,
      location: 'Marseille',
      fullAddress: '12 Rue des Oliviers, 13008 Marseille',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      features: ['Jardin', 'Garage', 'Cave', 'Cheminée'],
      status: 'à vendre',
      transactionType: 'vente',
      description: 'Belle maison familiale dans quartier résidentiel calme. Grand jardin, garage double, cave. Idéale pour famille avec enfants.',
      yearBuilt: 2010,
      energyClass: 'C',
      isSponsored: false,
      isFeatured: false,
      viewsCount: 78,
      agent: {
        name: 'Pierre Leroy',
        phone: '+33123456792',
        whatsapp: '33123456792',
        email: 'pierre.leroy@benso.fr'
      }
    },
    {
      id: '5',
      title: 'Loft industriel rénové',
      price: 2200,
      surface: 90,
      rooms: 2,
      bedrooms: 1,
      bathrooms: 1,
      location: 'Bordeaux',
      fullAddress: '45 Quai des Chartrons, 33000 Bordeaux',
      images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
      features: ['Loft', 'Climatisation', 'Parking', 'Terrasse'],
      status: 'à louer',
      transactionType: 'location',
      description: 'Magnifique loft industriel entièrement rénové avec goût. Volumes exceptionnels, terrasse privative, parking sécurisé.',
      yearBuilt: 1920,
      floor: 3,
      energyClass: 'B',
      charges: 200,
      availability: '2025-03-01',
      isSponsored: true,
      isFeatured: false,
      viewsCount: 334,
      agent: {
        name: 'Anne Petit',
        phone: '+33123456793',
        whatsapp: '33123456793',
        email: 'anne.petit@benso.fr'
      }
    },
    {
      id: '6',
      title: 'Duplex avec terrasse panoramique',
      price: 1600,
      surface: 85,
      rooms: 4,
      bedrooms: 2,
      bathrooms: 2,
      location: 'Toulouse',
      fullAddress: '30 Rue du Capitole, 31000 Toulouse',
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
      features: ['Terrasse', 'Duplex', 'Cave', 'Parking'],
      status: 'à louer',
      transactionType: 'location',
      description: 'Superbe duplex avec terrasse panoramique sur la ville rose. Prestations de qualité, cave et parking inclus.',
      yearBuilt: 2016,
      floor: 5,
      energyClass: 'B',
      charges: 120,
      availability: '2025-02-15',
      isSponsored: false,
      isFeatured: true,
      viewsCount: 189,
      agent: {
        name: 'Thomas Bernard',
        phone: '+33123456794',
        whatsapp: '33123456794',
        email: 'thomas.bernard@benso.fr'
      }
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setIsLoading(false);
    }, 1000);
  }, []);

  const applyFilters = () => {
    let filtered = [...properties];

    // Filtre par localisation
    if (searchFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        property.fullAddress.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    // Filtre par type de transaction
    if (searchFilters.transactionType) {
      filtered = filtered.filter(property =>
        property.transactionType === searchFilters.transactionType
      );
    }

    // Filtre par type de bien
    if (searchFilters.propertyType) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchFilters.propertyType.toLowerCase())
      );
    }

    // Filtre par prix
    if (searchFilters.minPrice) {
      filtered = filtered.filter(property =>
        property.price >= parseInt(searchFilters.minPrice)
      );
    }
    if (searchFilters.maxPrice) {
      filtered = filtered.filter(property =>
        property.price <= parseInt(searchFilters.maxPrice)
      );
    }

    // Filtre par surface
    if (searchFilters.minSurface) {
      filtered = filtered.filter(property =>
        property.surface >= parseInt(searchFilters.minSurface)
      );
    }
    if (searchFilters.maxSurface) {
      filtered = filtered.filter(property =>
        property.surface <= parseInt(searchFilters.maxSurface)
      );
    }

    // Filtre par nombre de pièces
    if (searchFilters.rooms) {
      const roomsNum = parseInt(searchFilters.rooms);
      if (roomsNum === 5) {
        filtered = filtered.filter(property => property.rooms >= 5);
      } else {
        filtered = filtered.filter(property => property.rooms === roomsNum);
      }
    }

    // Filtre par équipements
    if (searchFilters.equipments.length > 0) {
      filtered = filtered.filter(property =>
        searchFilters.equipments.every(equipment =>
          property.features.some(feature =>
            feature.toLowerCase().includes(equipment.toLowerCase())
          )
        )
      );
    }

    setFilteredProperties(filtered);
  };

  const getPropertyById = (id: string): Property | undefined => {
    return properties.find(property => property.id === id);
  };

  const getSponsoredProperties = (): Property[] => {
    return properties.filter(property => property.isSponsored);
  };

  const getFeaturedProperties = (): Property[] => {
    return properties.filter(property => property.isFeatured);
  };

  const getSimilarProperties = (propertyId: string): Property[] => {
    const currentProperty = getPropertyById(propertyId);
    if (!currentProperty) return [];

    return properties
      .filter(property => 
        property.id !== propertyId &&
        property.transactionType === currentProperty.transactionType &&
        Math.abs(property.price - currentProperty.price) <= currentProperty.price * 0.3
      )
      .slice(0, 3);
  };

  const incrementViews = (propertyId: string) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, viewsCount: property.viewsCount + 1 }
          : property
      )
    );
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      searchFilters,
      setSearchFilters,
      applyFilters,
      getPropertyById,
      getSponsoredProperties,
      getFeaturedProperties,
      getSimilarProperties,
      incrementViews,
      isLoading
    }}>
      {children}
    </PropertyContext.Provider>
  );
};