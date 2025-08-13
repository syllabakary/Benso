import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Agent, Property, Reservation, Contact, Transaction, DashboardStats, 
  Advertisement, SystemSettings, AnalyticsData, Favorite, PropertyFilters,
  UserFilters, ReservationFilters, TransactionFilters, PropertyFormData,
  AgentFormData, UserFormData, TransactionFormData, MonthlyStats
} from '../types/admin';

interface AdminContextType {
  // Dashboard
  dashboardStats: DashboardStats;
  analyticsData: AnalyticsData;
  
  // Users
  users: User[];
  filteredUsers: User[];
  userFilters: UserFilters;
  
  // Agents
  agents: Agent[];
  
  // Properties
  properties: Property[];
  filteredProperties: Property[];
  propertyFilters: PropertyFilters;
  
  // Reservations
  reservations: Reservation[];
  filteredReservations: Reservation[];
  reservationFilters: ReservationFilters;
  
  // Contacts
  contacts: Contact[];
  
  // Transactions
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  transactionFilters: TransactionFilters;
  
  // Favorites
  favorites: Favorite[];
  
  // Advertisements
  advertisements: Advertisement[];
  
  // Settings
  settings: SystemSettings[];
  
  // Loading states
  isLoading: boolean;
  
  // Methods - Users
  createUser: (userData: UserFormData) => Promise<User>;
  updateUser: (userId: string, userData: Partial<UserFormData>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
  updateUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  setUserFilters: (filters: UserFilters) => void;
  
  // Methods - Agents
  createAgent: (agentData: AgentFormData) => Promise<Agent>;
  updateAgent: (agentId: string, agentData: Partial<AgentFormData>) => Promise<Agent>;
  deleteAgent: (agentId: string) => Promise<void>;
  updateAgentStatus: (agentId: string, isActive: boolean) => Promise<void>;
  
  // Methods - Properties
  createProperty: (propertyData: PropertyFormData) => Promise<Property>;
  updateProperty: (propertyId: string, propertyData: Partial<PropertyFormData>) => Promise<Property>;
  deleteProperty: (propertyId: string) => Promise<void>;
  togglePropertyFeature: (propertyId: string) => Promise<void>;
  togglePropertySponsored: (propertyId: string) => Promise<void>;
  updatePropertyStatus: (propertyId: string, status: string) => Promise<void>;
  setPropertyFilters: (filters: PropertyFilters) => void;
  
  // Methods - Reservations
  updateReservationStatus: (reservationId: string, status: string) => Promise<void>;
  assignReservationToAgent: (reservationId: string, agentId: string) => Promise<void>;
  updateReservationPriority: (reservationId: string, priority: string) => Promise<void>;
  setReservationFilters: (filters: ReservationFilters) => void;
  
  // Methods - Contacts
  updateContactStatus: (contactId: string, status: string) => Promise<void>;
  assignContactToAgent: (contactId: string, agentId: string) => Promise<void>;
  markContactAsResponded: (contactId: string) => Promise<void>;
  
  // Methods - Transactions
  createTransaction: (transactionData: TransactionFormData) => Promise<Transaction>;
  updateTransaction: (transactionId: string, transactionData: Partial<TransactionFormData>) => Promise<Transaction>;
  updateTransactionStatus: (transactionId: string, status: string) => Promise<void>;
  setTransactionFilters: (filters: TransactionFilters) => void;
  
  // Methods - General
  refreshData: () => Promise<void>;
  exportData: (type: string, filters?: any) => Promise<void>;
  bulkAction: (type: string, ids: string[], action: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Mock data générée selon la structure de base de données
const generateMockData = () => {
  // Agents
  const mockAgents: Agent[] = [
    {
      id: '1',
      nom: 'Koffi André',
      email: 'k.andre@benso.ci',
      telephone: '+225 07 08 09 10',
      whatsapp: '+225 07 08 09 10',
      specialite: 'Vente résidentielle',
      description: 'Expert en immobilier résidentiel avec 8 ans d\'expérience à Abidjan',
      experience_years: 8,
      rating: 4.8,
      total_sales: 145,
      languages: ['Français', 'Anglais', 'Baoulé'],
      certifications: ['Certification FNAIM', 'Expert immobilier certifié'],
      is_active: true,
      created_at: new Date('2023-01-10'),
      updated_at: new Date('2024-11-30')
    },
    {
      id: '2',
      nom: 'Aya Diabaté',
      email: 'a.diabate@benso.ci',
      telephone: '+225 07 09 10 11',
      whatsapp: '+225 07 09 10 11',
      specialite: 'Location et gestion',
      description: 'Spécialisée dans la location et la gestion de biens immobiliers',
      experience_years: 5,
      rating: 4.6,
      total_sales: 89,
      languages: ['Français', 'Anglais'],
      certifications: ['Gestionnaire immobilier certifié'],
      is_active: true,
      created_at: new Date('2023-06-15'),
      updated_at: new Date('2024-11-28')
    },
    {
      id: '3',
      nom: 'Mamadou Traoré',
      email: 'm.traore@benso.ci',
      telephone: '+225 07 10 11 12',
      whatsapp: '+225 07 10 11 12',
      specialite: 'Immobilier commercial',
      description: 'Expert en transactions commerciales et investissement immobilier',
      experience_years: 12,
      rating: 4.9,
      total_sales: 203,
      languages: ['Français', 'Anglais', 'Dioula'],
      certifications: ['Expert immobilier commercial', 'Conseiller en investissement'],
      is_active: true,
      created_at: new Date('2022-03-20'),
      updated_at: new Date('2024-12-01')
    }
  ];

  // Users
  const mockUsers: User[] = [
    {
      id: '1',
      nom: 'Jean Kouassi',
      email: 'jean.kouassi@gmail.com',
      age: 34,
      localite: 'Abidjan',
      nationalite: 'Ivoirienne',
      telephone: '+225 07 07 07 01',
      is_admin: false,
      is_active: true,
      created_at: new Date('2024-01-15'),
      updated_at: new Date('2024-11-30'),
      last_login_at: new Date('2024-12-01')
    },
    {
      id: '2',
      nom: 'Marie Traoré',
      email: 'marie.traore@yahoo.fr',
      age: 28,
      localite: 'Bouaké',
      nationalite: 'Ivoirienne',
      telephone: '+225 05 04 03 02',
      is_admin: false,
      is_active: true,
      last_login_at: new Date('2024-12-01'),
      created_at: new Date('2024-02-20'),
      updated_at: new Date('2024-11-29')
    },
    {
      id: '3',
      nom: 'Admin BENSO',
      email: 'admin@benso.ci',
      age: 35,
      localite: 'Abidjan',
      nationalite: 'Ivoirienne',
      telephone: '+225 07 00 00 00',
      is_admin: true,
      is_active: true,
      created_at: new Date('2023-01-01'),
      updated_at: new Date('2024-12-01'),
      last_login_at: new Date('2024-12-01')
    }
  ];

  // Properties
  const mockProperties: Property[] = [
    {
      id: '1',
      agent_id: '1',
      reference: 'BENSO-001',
      title: 'Villa moderne 4 chambres - Cocody Angré',
      description: 'Magnifique villa contemporaine avec piscine et jardin tropical. Située dans un quartier résidentiel calme et sécurisé.',
      type: 'villa',
      status: 'a_vendre',
      transaction_type: 'vente',
      price: 350000,
      price_fcfa: 229588500,
      charges: 50000,
      agency_fees: 17500,
      surface: 250,
      rooms: 6,
      bedrooms: 4,
      bathrooms: 3,
      floor: 0,
      total_floors: 2,
      year_built: 2020,
      condition_state: 'neuf',
      energy_class: 'B',
      heating_type: 'central',
      address: '123 Boulevard de la République, Angré 7ème Tranche',
      city: 'Abidjan',
      district: 'Cocody',
      postal_code: '01234',
      country: 'Côte d\'Ivoire',
      latitude: 5.3599517,
      longitude: -3.9810768,
      has_balcony: true,
      has_terrace: true,
      has_garden: true,
      has_pool: true,
      has_garage: true,
      has_parking: true,
      has_elevator: false,
      has_cellar: false,
      has_air_conditioning: true,
      is_furnished: false,
      availability_date: new Date('2024-12-15'),
      is_featured: true,
      is_sponsored: false,
      is_exclusive: true,
      views_count: 245,
      favorites_count: 18,
      contacts_count: 12,
      visits_count: 8,
      is_active: true,
      published_at: new Date('2024-11-15'),
      created_at: new Date('2024-11-15'),
      updated_at: new Date('2024-11-30'),
      images: [
        {
          id: '1',
          property_id: '1',
          image_path: '/uploads/properties/villa-cocody-1.jpg',
          image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt_text: 'Vue extérieure de la villa',
          room_type: 'exterieur',
          is_main: true,
          order_index: 1,
          file_size: 2048576,
          dimensions: '1920x1080',
          created_at: new Date('2024-11-15'),
          updated_at: new Date('2024-11-15')
        }
      ],
      features: [
        {
          id: '1',
          property_id: '1',
          feature_type: 'security',
          feature_name: 'Système de sécurité',
          feature_value: '24h/24',
          is_highlight: true,
          created_at: new Date('2024-11-15')
        },
        {
          id: '2',
          property_id: '1',
          feature_type: 'comfort',
          feature_name: 'Climatisation',
          feature_value: 'Toutes pièces',
          is_highlight: true,
          created_at: new Date('2024-11-15')
        }
      ]
    },
    {
      id: '2',
      agent_id: '2',
      reference: 'BENSO-002',
      title: 'Appartement 3P standing - Plateau',
      description: 'Appartement de standing dans résidence sécurisée avec vue panoramique sur la lagune.',
      type: 'appartement',
      status: 'a_louer',
      transaction_type: 'location',
      price: 1200,
      price_fcfa: 787148,
      charges: 150,
      deposit: 2400,
      surface: 85,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 1,
      floor: 8,
      total_floors: 12,
      year_built: 2018,
      condition_state: 'bon_etat',
      energy_class: 'C',
      heating_type: 'individual',
      address: '45 Avenue Chardy, Immeuble Le Prestige',
      city: 'Abidjan',
      district: 'Plateau',
      postal_code: '01000',
      country: 'Côte d\'Ivoire',
      latitude: 5.3197222,
      longitude: -4.0225,
      has_balcony: true,
      has_terrace: false,
      has_garden: false,
      has_pool: false,
      has_garage: false,
      has_parking: true,
      has_elevator: true,
      has_cellar: false,
      has_air_conditioning: true,
      is_furnished: true,
      availability_date: new Date('2024-12-01'),
      is_featured: false,
      is_sponsored: true,
      is_exclusive: false,
      views_count: 156,
      favorites_count: 12,
      contacts_count: 8,
      visits_count: 5,
      is_active: true,
      published_at: new Date('2024-11-20'),
      created_at: new Date('2024-11-20'),
      updated_at: new Date('2024-11-28'),
      images: [
        {
          id: '2',
          property_id: '2',
          image_path: '/uploads/properties/appart-plateau-1.jpg',
          image_url: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800',
          alt_text: 'Salon de l\'appartement',
          room_type: 'salon',
          is_main: true,
          order_index: 1,
          file_size: 1536000,
          dimensions: '1600x900',
          created_at: new Date('2024-11-20'),
          updated_at: new Date('2024-11-20')
        }
      ],
      features: [
        {
          id: '3',
          property_id: '2',
          feature_type: 'proximity',
          feature_name: 'Centre-ville',
          feature_value: '5 min à pied',
          is_highlight: true,
          created_at: new Date('2024-11-20')
        }
      ]
    }
  ];

  // Reservations
  const mockReservations: Reservation[] = [
    {
      id: '1',
      property_id: '1',
      user_id: '1',
      nom: 'Jean Kouassi',
      email: 'jean.kouassi@gmail.com',
      telephone: '+225 07 07 07 01',
      type_transaction: 'acheter',
      type_bien: 'villa',
      localisation: 'Cocody',
      budget_min: 300000,
      budget_max: 400000,
      surface_min: 200,
      pieces: '4-5',
      date_visite: new Date('2024-12-05'),
      heure_visite: 'apres-midi',
      commentaires: 'Intéressé par cette villa, disponible le weekend',
      status: 'en_attente',
      assigned_agent_id: '1',
      priority: 'high',
      source: 'website',
      ip_address: '192.168.1.100',
      created_at: new Date('2024-12-01'),
      updated_at: new Date('2024-12-01')
    },
    {
      id: '2',
      nom: 'Marie Traoré',
      email: 'marie.traore@yahoo.fr',
      telephone: '+225 07 08 09 10',
      type_transaction: 'louer',
      type_bien: 'appartement',
      localisation: 'Plateau',
      budget_min: 800,
      budget_max: 1500,
      surface_min: 70,
      pieces: '2-3',
      status: 'confirme',
      assigned_agent_id: '2',
      priority: 'normal',
      source: 'website',
      created_at: new Date('2024-11-28'),
      updated_at: new Date('2024-11-30')
    }
  ];

  // Contacts
  const mockContacts: Contact[] = [
    {
      id: '1',
      nom: 'Paul Brou',
      email: 'paul.brou@gmail.com',
      telephone: '+225 05 04 03 02',
      sujet: 'Information sur les villas à Cocody',
      message: 'Bonjour, je souhaiterais avoir des informations sur vos villas disponibles dans le secteur de Cocody. Mon budget est d\'environ 300 000€.',
      category: 'commercial',
      priority: 'normal',
      status: 'nouveau',
      response_sent: false,
      source: 'website',
      created_at: new Date('2024-12-01'),
      updated_at: new Date('2024-12-01')
    },
    {
      id: '2',
      nom: 'Fatou Camara',
      email: 'fatou.camara@yahoo.fr',
      telephone: '+225 01 02 03 04',
      sujet: 'Problème avec mon compte',
      message: 'Je n\'arrive pas à accéder à mon compte depuis hier soir. Pouvez-vous m\'aider ?',
      category: 'support',
      priority: 'high',
      status: 'en_cours',
      assigned_to: '1',
      response_sent: false,
      source: 'website',
      created_at: new Date('2024-11-30'),
      updated_at: new Date('2024-12-01')
    }
  ];

  // Transactions
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      property_id: '1',
      buyer_id: '1',
      agent_id: '1',
      type: 'vente',
      status: 'en_cours',
      price_agreed: 340000,
      commission_rate: 5,
      commission_amount: 17000,
      contract_date: new Date('2024-12-01'),
      completion_date: new Date('2024-12-30'),
      deposit_paid: 34000,
      notes: 'Vente en cours, compromis signé',
      documents: [],
      created_at: new Date('2024-12-01'),
      updated_at: new Date('2024-12-01')
    },
    {
      id: '2',
      property_id: '2',
      buyer_id: '2',
      agent_id: '2',
      type: 'location',
      status: 'finalise',
      price_agreed: 1200,
      commission_rate: 8.33,
      commission_amount: 100,
      contract_date: new Date('2024-11-25'),
      completion_date: new Date('2024-11-30'),
      monthly_rent: 1200,
      lease_duration: 12,
      notes: 'Bail signé pour 12 mois',
      documents: [],
      created_at: new Date('2024-11-25'),
      updated_at: new Date('2024-11-30')
    }
  ];

  // Monthly Stats
  const mockMonthlyStats: MonthlyStats[] = [
    { month: '2024-07', sales: 12, rentals: 28, revenue: 125000, new_properties: 45, new_users: 89 },
    { month: '2024-08', sales: 15, rentals: 32, revenue: 142000, new_properties: 52, new_users: 95 },
    { month: '2024-09', sales: 18, rentals: 35, revenue: 158000, new_properties: 48, new_users: 102 },
    { month: '2024-10', sales: 22, rentals: 41, revenue: 175000, new_properties: 56, new_users: 118 },
    { month: '2024-11', sales: 25, rentals: 38, revenue: 189000, new_properties: 61, new_users: 134 },
    { month: '2024-12', sales: 8, rentals: 15, revenue: 67000, new_properties: 23, new_users: 45 }
  ];

  // Dashboard Stats
  const mockDashboardStats: DashboardStats = {
    total_properties: mockProperties.length,
    available_properties: mockProperties.filter(p => ['a_vendre', 'a_louer'].includes(p.status)).length,
    sold_properties: mockProperties.filter(p => p.status === 'vendu').length,
    rented_properties: mockProperties.filter(p => p.status === 'loue').length,
    total_users: mockUsers.length,
    total_agents: mockAgents.length,
    pending_reservations: mockReservations.filter(r => r.status === 'en_attente').length,
    new_contacts: mockContacts.filter(c => c.status === 'nouveau').length,
    total_transactions: mockTransactions.length,
    pending_transactions: mockTransactions.filter(t => t.status === 'en_cours').length,
    completed_transactions: mockTransactions.filter(t => t.status === 'finalise').length,
    avg_sale_price: 345000,
    avg_rent_price: 1200,
    monthly_revenue: 189000,
    commission_earned: 17100,
    conversion_rate: 12.5,
    avg_days_to_sell: 45,
    avg_days_to_rent: 15,
    top_performing_agents: mockAgents.slice(0, 3),
    popular_locations: [
      { city: 'Abidjan', count: 1247 },
      { city: 'Bouaké', count: 234 },
      { city: 'Daloa', count: 156 }
    ],
    monthly_stats: mockMonthlyStats
  };

  return {
    mockAgents,
    mockUsers,
    mockProperties,
    mockReservations,
    mockContacts,
    mockTransactions,
    mockDashboardStats
  };
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mockData = generateMockData();
  
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(mockData.mockDashboardStats);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    property_views: [],
    user_registrations: [],
    transaction_volume: [],
    popular_searches: [],
    agent_performance: [],
    location_popularity: []
  });
  
  const [users, setUsers] = useState<User[]>(mockData.mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockData.mockUsers);
  const [userFilters, setUserFilters] = useState<UserFilters>({});
  
  const [agents, setAgents] = useState<Agent[]>(mockData.mockAgents);
  
  const [properties, setProperties] = useState<Property[]>(mockData.mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockData.mockProperties);
  const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({});
  
  const [reservations, setReservations] = useState<Reservation[]>(mockData.mockReservations);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>(mockData.mockReservations);
  const [reservationFilters, setReservationFilters] = useState<ReservationFilters>({});
  
  const [contacts, setContacts] = useState<Contact[]>(mockData.mockContacts);
  
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockData.mockTransactions);
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({});
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [settings, setSettings] = useState<SystemSettings[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    applyUserFilters();
  }, [userFilters, users]);

  useEffect(() => {
    applyPropertyFilters();
  }, [propertyFilters, properties]);

  useEffect(() => {
    applyReservationFilters();
  }, [reservationFilters, reservations]);

  useEffect(() => {
    applyTransactionFilters();
  }, [transactionFilters, transactions]);

  const applyUserFilters = () => {
    let filtered = [...users];
    
    if (userFilters.is_active !== undefined) {
      filtered = filtered.filter(user => user.is_active === userFilters.is_active);
    }
    if (userFilters.is_admin !== undefined) {
      filtered = filtered.filter(user => user.is_admin === userFilters.is_admin);
    }
    if (userFilters.localite) {
      filtered = filtered.filter(user => 
        user.localite.toLowerCase().includes(userFilters.localite!.toLowerCase())
      );
    }
    if (userFilters.nationalite) {
      filtered = filtered.filter(user => 
        user.nationalite.toLowerCase().includes(userFilters.nationalite!.toLowerCase())
      );
    }
    if (userFilters.age_min) {
      filtered = filtered.filter(user => user.age >= userFilters.age_min!);
    }
    if (userFilters.age_max) {
      filtered = filtered.filter(user => user.age <= userFilters.age_max!);
    }
    
    setFilteredUsers(filtered);
  };

  const applyPropertyFilters = () => {
    let filtered = [...properties];
    
    if (propertyFilters.type) {
      filtered = filtered.filter(property => property.type === propertyFilters.type);
    }
    if (propertyFilters.transaction_type) {
      filtered = filtered.filter(property => property.transaction_type === propertyFilters.transaction_type);
    }
    if (propertyFilters.status) {
      filtered = filtered.filter(property => property.status === propertyFilters.status);
    }
    if (propertyFilters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(propertyFilters.city!.toLowerCase())
      );
    }
    if (propertyFilters.price_min) {
      filtered = filtered.filter(property => property.price >= propertyFilters.price_min!);
    }
    if (propertyFilters.price_max) {
      filtered = filtered.filter(property => property.price <= propertyFilters.price_max!);
    }
    if (propertyFilters.surface_min) {
      filtered = filtered.filter(property => property.surface >= propertyFilters.surface_min!);
    }
    if (propertyFilters.surface_max) {
      filtered = filtered.filter(property => property.surface <= propertyFilters.surface_max!);
    }
    if (propertyFilters.rooms) {
      filtered = filtered.filter(property => property.rooms === propertyFilters.rooms);
    }
    if (propertyFilters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms === propertyFilters.bedrooms);
    }
    if (propertyFilters.is_featured !== undefined) {
      filtered = filtered.filter(property => property.is_featured === propertyFilters.is_featured);
    }
    if (propertyFilters.is_sponsored !== undefined) {
      filtered = filtered.filter(property => property.is_sponsored === propertyFilters.is_sponsored);
    }
    if (propertyFilters.agent_id) {
      filtered = filtered.filter(property => property.agent_id === propertyFilters.agent_id);
    }
    
    setFilteredProperties(filtered);
  };

  const applyReservationFilters = () => {
    let filtered = [...reservations];
    
    if (reservationFilters.status) {
      filtered = filtered.filter(reservation => reservation.status === reservationFilters.status);
    }
    if (reservationFilters.priority) {
      filtered = filtered.filter(reservation => reservation.priority === reservationFilters.priority);
    }
    if (reservationFilters.type_transaction) {
      filtered = filtered.filter(reservation => reservation.type_transaction === reservationFilters.type_transaction);
    }
    if (reservationFilters.assigned_agent_id) {
      filtered = filtered.filter(reservation => reservation.assigned_agent_id === reservationFilters.assigned_agent_id);
    }
    if (reservationFilters.date_from) {
      filtered = filtered.filter(reservation => reservation.created_at >= reservationFilters.date_from!);
    }
    if (reservationFilters.date_to) {
      filtered = filtered.filter(reservation => reservation.created_at <= reservationFilters.date_to!);
    }
    
    setFilteredReservations(filtered);
  };

  const applyTransactionFilters = () => {
    let filtered = [...transactions];
    
    if (transactionFilters.type) {
      filtered = filtered.filter(transaction => transaction.type === transactionFilters.type);
    }
    if (transactionFilters.status) {
      filtered = filtered.filter(transaction => transaction.status === transactionFilters.status);
    }
    if (transactionFilters.agent_id) {
      filtered = filtered.filter(transaction => transaction.agent_id === transactionFilters.agent_id);
    }
    if (transactionFilters.date_from) {
      filtered = filtered.filter(transaction => transaction.created_at >= transactionFilters.date_from!);
    }
    if (transactionFilters.date_to) {
      filtered = filtered.filter(transaction => transaction.created_at <= transactionFilters.date_to!);
    }
    if (transactionFilters.price_min) {
      filtered = filtered.filter(transaction => transaction.price_agreed >= transactionFilters.price_min!);
    }
    if (transactionFilters.price_max) {
      filtered = filtered.filter(transaction => transaction.price_agreed <= transactionFilters.price_max!);
    }
    
    setFilteredTransactions(filtered);
  };

  // User methods
  const createUser = async (userData: UserFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, userData: Partial<UserFormData>): Promise<User> => {
    setIsLoading(true);
    try {
      const updatedUser = users.find(u => u.id === userId);
      if (!updatedUser) throw new Error('User not found');
      
      const updated = { ...updatedUser, ...userData, updated_at: new Date() };
      setUsers(prev => prev.map(u => u.id === userId ? updated : u));
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    setIsLoading(true);
    try {
      setUsers(prev => prev.filter(u => u.id !== userId));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, isActive: boolean): Promise<void> => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, is_active: isActive, updated_at: new Date() } : user
    ));
  };

  // Agent methods
  const createAgent = async (agentData: AgentFormData): Promise<Agent> => {
    setIsLoading(true);
    try {
      const newAgent: Agent = {
        id: Date.now().toString(),
        ...agentData,
        rating: 0,
        total_sales: 0,
        certifications: [],
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAgent = async (agentId: string, agentData: Partial<AgentFormData>): Promise<Agent> => {
    setIsLoading(true);
    try {
      const updatedAgent = agents.find(a => a.id === agentId);
      if (!updatedAgent) throw new Error('Agent not found');
      
      const updated = { ...updatedAgent, ...agentData, updated_at: new Date() };
      setAgents(prev => prev.map(a => a.id === agentId ? updated : a));
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAgent = async (agentId: string): Promise<void> => {
    setIsLoading(true);
    try {
      setAgents(prev => prev.filter(a => a.id !== agentId));
    } finally {
      setIsLoading(false);
    }
  };

  const updateAgentStatus = async (agentId: string, isActive: boolean): Promise<void> => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, is_active: isActive, updated_at: new Date() } : agent
    ));
  };

  // Property methods
  const createProperty = async (propertyData: PropertyFormData): Promise<Property> => {
    setIsLoading(true);
    try {
      const newProperty: Property = {
        id: Date.now().toString(),
        reference: `BENSO-${Date.now()}`,
        ...propertyData,
        price_fcfa: propertyData.price * 655.957,
        status: 'a_vendre',
        condition_state: 'bon_etat',
        country: 'Côte d\'Ivoire',
        has_balcony: false,
        has_terrace: false,
        has_garden: false,
        has_pool: false,
        has_garage: false,
        has_parking: true,
        has_elevator: false,
        has_cellar: false,
        has_air_conditioning: false,
        is_furnished: false,
        is_featured: false,
        is_sponsored: false,
        is_exclusive: false,
        views_count: 0,
        favorites_count: 0,
        contacts_count: 0,
        visits_count: 0,
        is_active: true,
        published_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        images: [],
        features: []
      };
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (propertyId: string, propertyData: Partial<PropertyFormData>): Promise<Property> => {
    setIsLoading(true);
    try {
      const updatedProperty = properties.find(p => p.id === propertyId);
      if (!updatedProperty) throw new Error('Property not found');
      
      const updated = { 
        ...updatedProperty, 
        ...propertyData, 
        price_fcfa: propertyData.price ? propertyData.price * 655.957 : updatedProperty.price_fcfa,
        updated_at: new Date() 
      };
      setProperties(prev => prev.map(p => p.id === propertyId ? updated : p));
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (propertyId: string): Promise<void> => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  const togglePropertyFeature = async (propertyId: string): Promise<void> => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { ...property, is_featured: !property.is_featured, updated_at: new Date() } : property
    ));
  };

  const togglePropertySponsored = async (propertyId: string): Promise<void> => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { ...property, is_sponsored: !property.is_sponsored, updated_at: new Date() } : property
    ));
  };

  const updatePropertyStatus = async (propertyId: string, status: string): Promise<void> => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { ...property, status: status as any, updated_at: new Date() } : property
    ));
  };

  const schedulePropertyPublication = async (propertyId: string, publishDate: Date): Promise<void> => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { 
        ...property, 
        published_at: publishDate,
        is_active: publishDate <= new Date(),
        updated_at: new Date() 
      } : property
    ));
  };

  const togglePropertyActive = async (propertyId: string): Promise<void> => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { ...property, is_active: !property.is_active, updated_at: new Date() } : property
    ));
  };
  // Reservation methods
  const updateReservationStatus = async (reservationId: string, status: string): Promise<void> => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === reservationId ? { ...reservation, status: status as any, updated_at: new Date() } : reservation
    ));
  };

  const assignReservationToAgent = async (reservationId: string, agentId: string): Promise<void> => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === reservationId ? { ...reservation, assigned_agent_id: agentId, updated_at: new Date() } : reservation
    ));
  };

  const updateReservationPriority = async (reservationId: string, priority: string): Promise<void> => {
    setReservations(prev => prev.map(reservation => 
      reservation.id === reservationId ? { ...reservation, priority: priority as any, updated_at: new Date() } : reservation
    ));
  };

  // Contact methods
  const updateContactStatus = async (contactId: string, status: string): Promise<void> => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, status: status as any, updated_at: new Date() } : contact
    ));
  };

  const assignContactToAgent = async (contactId: string, agentId: string): Promise<void> => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, assigned_to: agentId, updated_at: new Date() } : contact
    ));
  };

  const markContactAsResponded = async (contactId: string): Promise<void> => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId ? { ...contact, response_sent: true, responded_at: new Date(), updated_at: new Date() } : contact
    ));
  };

  // Transaction methods
  const createTransaction = async (transactionData: TransactionFormData): Promise<Transaction> => {
    setIsLoading(true);
    try {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionData,
        status: 'en_cours',
        commission_amount: transactionData.price_agreed * (transactionData.commission_rate / 100),
        documents: [],
        created_at: new Date(),
        updated_at: new Date()
      };
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransaction = async (transactionId: string, transactionData: Partial<TransactionFormData>): Promise<Transaction> => {
    setIsLoading(true);
    try {
      const updatedTransaction = transactions.find(t => t.id === transactionId);
      if (!updatedTransaction) throw new Error('Transaction not found');
      
      const updated = { 
        ...updatedTransaction, 
        ...transactionData,
        commission_amount: transactionData.price_agreed && transactionData.commission_rate 
          ? transactionData.price_agreed * (transactionData.commission_rate / 100)
          : updatedTransaction.commission_amount,
        updated_at: new Date() 
      };
      setTransactions(prev => prev.map(t => t.id === transactionId ? updated : t));
      return updated;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransactionStatus = async (transactionId: string, status: string): Promise<void> => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === transactionId ? { ...transaction, status: status as any, updated_at: new Date() } : transaction
    ));
  };

  // General methods
  const refreshData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh dashboard stats
      const newStats = { ...dashboardStats };
      setDashboardStats(newStats);
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async (type: string, filters?: any): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting ${type} data with filters:`, filters);
    } finally {
      setIsLoading(false);
    }
  };

  const bulkAction = async (type: string, ids: string[], action: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate bulk action
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Bulk ${action} on ${type}:`, ids);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AdminContextType = {
    dashboardStats,
    analyticsData,
    users,
    filteredUsers,
    userFilters,
    agents,
    properties,
    filteredProperties,
    propertyFilters,
    reservations,
    filteredReservations,
    reservationFilters,
    contacts,
    transactions,
    filteredTransactions,
    transactionFilters,
    favorites,
    advertisements,
    settings,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus,
    setUserFilters,
    createAgent,
    updateAgent,
    deleteAgent,
    updateAgentStatus,
    createProperty,
    updateProperty,
    deleteProperty,
    togglePropertyFeature,
    togglePropertySponsored,
    updatePropertyStatus,
    schedulePropertyPublication,
    togglePropertyActive,
    setPropertyFilters,
    updateReservationStatus,
    assignReservationToAgent,
    updateReservationPriority,
    setReservationFilters,
    updateContactStatus,
    assignContactToAgent,
    markContactAsResponded,
    createTransaction,
    updateTransaction,
    updateTransactionStatus,
    setTransactionFilters,
    refreshData,
    exportData,
    bulkAction
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};