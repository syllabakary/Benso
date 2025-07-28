import { Property, User, Conversation, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'jean.dupont@email.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    phone: '+33 6 12 34 56 78',
    role: 'landlord',
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    preferences: {
      notifications: { email: true, sms: false, push: true },
      searchAlerts: true,
      language: 'fr',
      currency: 'EUR'
    }
  },
  {
    id: '2',
    email: 'marie.martin@email.com',
    firstName: 'Marie',
    lastName: 'Martin',
    phone: '+33 6 98 76 54 32',
    role: 'tenant',
    isVerified: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    preferences: {
      notifications: { email: true, sms: true, push: true },
      searchAlerts: true,
      language: 'fr',
      currency: 'EUR'
    }
  },
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Magnifique appartement 3 pièces avec balcon',
    description: 'Superbe appartement de 75m² situé dans un quartier calme et résidentiel. Entièrement rénové avec des matériaux de qualité. Cuisine équipée, salle de bain moderne, parquet au sol. Balcon avec vue dégagée. Proche transports et commerces.',
    type: 'apartment',
    price: 1200,
    currency: 'EUR',
    area: 75,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    floor: 3,
    totalFloors: 5,
    furnished: false,
    parking: true,
    balcony: true,
    garden: false,
    elevator: true,
    terrace: false,
    pool: false,
    garage: false,
    cellar: false,
    airConditioning: false,
    heating: 'central',
    energyClass: 'C',
    address: {
      street: '15 rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    images: [
      { id: '1', url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'salon' },
      { id: '2', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', order: 2, room: 'cuisine' },
      { id: '3', url: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800', order: 3, room: 'chambre' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-03-01'),
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    views: 245,
    featured: true,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 245,
      uniqueViews: 189,
      favorites: 12,
      contacts: 8,
      visits: 3,
      viewsHistory: []
    },
    amenities: ['wifi', 'heating', 'elevator'],
    nearbyPlaces: [
      { name: 'Métro République', type: 'transport', distance: 200, walkTime: 3 },
      { name: 'École primaire', type: 'school', distance: 300, walkTime: 4 },
      { name: 'Supermarché', type: 'shopping', distance: 150, walkTime: 2 }
    ],
    rules: {
      pets: false,
      smoking: false,
      parties: false,
      children: true,
      maximumOccupants: 4
    },
    costs: {
      rent: 1200,
      charges: 150,
      deposit: 2400,
      agencyFees: 600
    }
  },
  {
    id: '2',
    title: 'Studio moderne meublé - Centre ville',
    description: 'Studio de 35m² entièrement meublé et équipé. Idéal pour étudiant ou jeune professionnel. Kitchenette équipée, salle d\'eau avec douche. Situé en plein centre-ville, à 2 minutes du métro.',
    type: 'studio',
    price: 750,
    currency: 'EUR',
    area: 35,
    rooms: 1,
    bedrooms: 0,
    bathrooms: 1,
    floor: 2,
    totalFloors: 4,
    furnished: true,
    parking: false,
    balcony: false,
    garden: false,
    elevator: false,
    terrace: false,
    pool: false,
    garage: false,
    cellar: false,
    airConditioning: false,
    heating: 'electric',
    energyClass: 'D',
    address: {
      street: '8 avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      country: 'France',
      coordinates: { lat: 45.7640, lng: 4.8357 }
    },
    images: [
      { id: '4', url: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'studio' },
      { id: '5', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', order: 2, room: 'salle de bain' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-02-15'),
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    views: 189,
    featured: false,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 189,
      uniqueViews: 156,
      favorites: 8,
      contacts: 5,
      visits: 2,
      viewsHistory: []
    },
    amenities: ['wifi', 'furnished'],
    nearbyPlaces: [],
    rules: {
      pets: false,
      smoking: false,
      parties: false,
      children: true,
      maximumOccupants: 2
    },
    costs: {
      rent: 750,
      charges: 80,
      deposit: 1500
    }
  },
  {
    id: '3',
    title: 'Maison familiale avec jardin - 4 chambres',
    description: 'Belle maison de 120m² avec jardin de 200m². 4 chambres, 2 salles de bain, cuisine ouverte sur salon. Garage pour 2 voitures. Quartier résidentiel calme, proche écoles et commerces.',
    type: 'house',
    price: 1800,
    currency: 'EUR',
    area: 120,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 2,
    furnished: false,
    parking: true,
    balcony: false,
    garden: true,
    elevator: false,
    terrace: true,
    pool: false,
    garage: true,
    cellar: true,
    airConditioning: false,
    heating: 'gas',
    energyClass: 'B',
    address: {
      street: '25 rue du Jardin',
      city: 'Marseille',
      postalCode: '13001',
      country: 'France',
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    images: [
      { id: '6', url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'extérieur' },
      { id: '7', url: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800', order: 2, room: 'salon' },
      { id: '8', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', order: 3, room: 'cuisine' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-04-01'),
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    views: 312,
    featured: true,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 312,
      uniqueViews: 267,
      favorites: 18,
      contacts: 12,
      visits: 6,
      viewsHistory: []
    },
    amenities: ['garden', 'garage', 'terrace'],
    nearbyPlaces: [],
    rules: {
      pets: true,
      smoking: false,
      parties: false,
      children: true,
      maximumOccupants: 6
    },
    costs: {
      rent: 1800,
      charges: 200,
      deposit: 3600,
      agencyFees: 900
    }
  },
  {
    id: '4',
    title: 'Appartement 2 pièces rénové - Proche métro',
    description: 'Appartement de 55m² entièrement rénové. Cuisine équipée, parquet, salle de bain moderne. À 3 minutes à pied du métro. Idéal couple ou célibataire.',
    type: 'apartment',
    price: 950,
    currency: 'EUR',
    area: 55,
    rooms: 2,
    bedrooms: 1,
    bathrooms: 1,
    floor: 1,
    totalFloors: 3,
    furnished: false,
    parking: false,
    balcony: true,
    garden: false,
    elevator: false,
    terrace: false,
    pool: false,
    garage: false,
    cellar: false,
    airConditioning: false,
    heating: 'central',
    energyClass: 'C',
    address: {
      street: '42 boulevard Saint-Michel',
      city: 'Toulouse',
      postalCode: '31000',
      country: 'France',
      coordinates: { lat: 43.6047, lng: 1.4442 }
    },
    images: [
      { id: '9', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'salon' },
      { id: '10', url: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800', order: 2, room: 'chambre' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-03-15'),
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    views: 156,
    featured: false,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 156,
      uniqueViews: 134,
      favorites: 6,
      contacts: 4,
      visits: 2,
      viewsHistory: []
    },
    amenities: ['balcony'],
    nearbyPlaces: [],
    rules: {
      pets: false,
      smoking: false,
      parties: false,
      children: true,
      maximumOccupants: 3
    },
    costs: {
      rent: 950,
      charges: 100,
      deposit: 1900
    }
  },
  {
    id: '5',
    title: 'Chambre meublée en colocation',
    description: 'Chambre de 15m² dans appartement en colocation. Cuisine et salon partagés. Ambiance conviviale, colocataires étudiants/jeunes professionnels. Charges incluses.',
    type: 'room',
    price: 450,
    currency: 'EUR',
    area: 15,
    rooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    floor: 4,
    totalFloors: 6,
    furnished: true,
    parking: false,
    balcony: false,
    garden: false,
    elevator: true,
    terrace: false,
    pool: false,
    garage: false,
    cellar: false,
    airConditioning: false,
    heating: 'electric',
    energyClass: 'E',
    address: {
      street: '18 rue Étudiante',
      city: 'Bordeaux',
      postalCode: '33000',
      country: 'France',
      coordinates: { lat: 44.8378, lng: -0.5792 }
    },
    images: [
      { id: '11', url: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'chambre' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-02-20'),
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-08'),
    views: 98,
    featured: false,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 98,
      uniqueViews: 87,
      favorites: 3,
      contacts: 2,
      visits: 1,
      viewsHistory: []
    },
    amenities: ['furnished', 'elevator'],
    nearbyPlaces: [],
    rules: {
      pets: false,
      smoking: false,
      parties: false,
      children: true,
      maximumOccupants: 1
    },
    costs: {
      rent: 450,
      charges: 50,
      deposit: 900
    }
  },
  {
    id: '6',
    title: 'Bureau moderne - Quartier d\'affaires',
    description: 'Bureau de 40m² dans immeuble moderne. Open space modulable, climatisation, fibre optique. Parking et sécurité 24h/24. Idéal startup ou profession libérale.',
    type: 'office',
    price: 1100,
    currency: 'EUR',
    area: 40,
    rooms: 2,
    bedrooms: 0,
    bathrooms: 1,
    floor: 8,
    totalFloors: 12,
    furnished: false,
    parking: true,
    balcony: false,
    garden: false,
    elevator: true,
    terrace: false,
    pool: false,
    garage: false,
    cellar: false,
    airConditioning: true,
    heating: 'central',
    energyClass: 'A',
    address: {
      street: '100 avenue Business',
      city: 'Nice',
      postalCode: '06000',
      country: 'France',
      coordinates: { lat: 43.7102, lng: 7.2620 }
    },
    images: [
      { id: '12', url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800', order: 1, room: 'bureau' },
      { id: '13', url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', order: 2, room: 'salle de réunion' }
    ],
    landlordId: '1',
    available: true,
    availableFrom: new Date('2024-03-10'),
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-02-12'),
    views: 67,
    featured: false,
    verified: true,
    status: 'active',
    visits: [],
    analytics: {
      totalViews: 67,
      uniqueViews: 58,
      favorites: 2,
      contacts: 3,
      visits: 1,
      viewsHistory: []
    },
    amenities: ['parking', 'elevator', 'airConditioning'],
    nearbyPlaces: [],
    rules: {
      pets: false,
      smoking: false,
      parties: false,
      children: false,
      maximumOccupants: 10
    },
    costs: {
      rent: 1100,
      charges: 250,
      deposit: 2200
    }
  }
];

// Add landlord info to properties
mockProperties.forEach(property => {
  property.landlord = mockUsers.find(user => user.id === property.landlordId);
});

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[1], mockUsers[0]],
    propertyId: '1',
    property: mockProperties[0],
    lastMessage: {
      id: '1',
      conversationId: '1',
      senderId: mockUsers[1].id,
      receiverId: mockUsers[0].id,
      content: 'Bonjour, je suis intéressée par votre appartement...',
      type: 'text',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    unreadCount: 2,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 6,
  activeProperties: 6,
  totalViews: 1067,
  totalContacts: 34,
  totalVisits: 15,
  averageRating: 4.5,
  monthlyRevenue: 8500,
  occupancyRate: 85
};