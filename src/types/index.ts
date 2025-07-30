export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'visitor' | 'tenant' | 'landlord' | 'admin' | 'agent';
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  preferences?: UserPreferences;
  subscription?: Subscription;
  agencyId?: string;
  licenseNumber?: string;
  specializations?: string[];
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  searchAlerts: boolean;
  language: 'fr' | 'en' | 'es';
  currency: 'EUR' | 'USD';
}

export interface Subscription {
  plan: 'free' | 'premium' | 'pro';
  startDate: Date;
  endDate: Date;
  features: string[];
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'studio' | 'room' | 'office' | 'commercial' | 'land';
  transactionType: 'rent' | 'sale' | 'both';
  price: number;
  salePrice?: number;
  currency: string;
  area: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  totalFloors?: number;
  furnished: boolean;
  parking: boolean;
  balcony: boolean;
  garden: boolean;
  elevator: boolean;
  terrace: boolean;
  pool: boolean;
  garage: boolean;
  cellar: boolean;
  airConditioning: boolean;
  heating: 'electric' | 'gas' | 'central' | 'none';
  energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  constructionYear?: number;
  lastRenovation?: number;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    district?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: PropertyImage[];
  videos?: PropertyVideo[];
  virtualTour?: string;
  virtualTour360?: string;
  documents?: PropertyDocument[];
  landlordId: string;
  landlord?: User;
  agentId?: string;
  agent?: User;
  available: boolean;
  availableFrom: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  featured: boolean;
  verified: boolean;
  status: 'active' | 'inactive' | 'pending' | 'rented' | 'sold' | 'reserved';
  visits: Visit[];
  analytics: PropertyAnalytics;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  rules: PropertyRules;
  costs: PropertyCosts;
  marketEstimation?: PropertyEstimation;
  guarantees?: PropertyGuarantees;
  diagnostics?: PropertyDiagnostic[];
}

export interface PropertyEstimation {
  estimatedPrice: number;
  pricePerSqm: number;
  marketTrend: 'rising' | 'stable' | 'declining';
  confidenceLevel: number;
  lastUpdated: Date;
  comparableProperties: string[];
}

export interface PropertyGuarantees {
  resaleGuarantee?: {
    guaranteedPrice: number;
    validUntil: Date;
    conditions: string[];
  };
  rentalGuarantee?: {
    guaranteedRent: number;
    duration: number;
    conditions: string[];
  };
  unpaidRentInsurance?: {
    coverage: number;
    premium: number;
    conditions: string[];
  };
}

export interface PropertyDiagnostic {
  id: string;
  type: 'energy' | 'asbestos' | 'lead' | 'termites' | 'gas' | 'electricity' | 'noise';
  result: string;
  validUntil: Date;
  documentUrl: string;
  inspector: string;
}

export interface Agency {
  id: string;
  name: string;
  logo?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  website?: string;
  agents: User[];
  specializations: string[];
  certifications: string[];
  stats: {
    totalSales: number;
    totalRentals: number;
    averageRating: number;
    yearsInBusiness: number;
  };
}

export interface FinancingSimulation {
  id: string;
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  insuranceCost?: number;
  notaryFees?: number;
}

export interface PropertyAlert {
  id: string;
  userId: string;
  name: string;
  filters: SearchFilters;
  active: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  lastSent?: Date;
  matchCount: number;
  createdAt: Date;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface RentalManagement {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  agentId?: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  deposit: number;
  charges: number;
  status: 'active' | 'ended' | 'pending';
  rentPayments: RentPayment[];
  maintenanceRequests: MaintenanceRequest[];
  documents: RentalDocument[];
}

export interface RentPayment {
  id: string;
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'late' | 'partial';
  paymentMethod?: string;
  reference?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  category: 'plumbing' | 'electrical' | 'heating' | 'cleaning' | 'other';
  createdDate: Date;
  completedDate?: Date;
  cost?: number;
  assignedTo?: string;
  photos?: string[];
}

export interface RentalDocument {
  id: string;
  name: string;
  type: 'lease' | 'inventory' | 'insurance' | 'guarantee' | 'other';
  url: string;
  uploadDate: Date;
  expiryDate?: Date;
}

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  order: number;
  room?: string;
}

export interface PropertyVideo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  title?: string;
}

export interface PropertyDocument {
  id: string;
  name: string;
  url: string;
  type: 'contract' | 'energy_certificate' | 'floor_plan' | 'other';
  size: number;
}

export interface PropertyAnalytics {
  totalViews: number;
  uniqueViews: number;
  favorites: number;
  contacts: number;
  visits: number;
  viewsHistory: ViewHistory[];
}

export interface ViewHistory {
  date: Date;
  views: number;
  uniqueViews: number;
}

export interface NearbyPlace {
  name: string;
  type: 'transport' | 'school' | 'hospital' | 'shopping' | 'restaurant' | 'park';
  distance: number;
  walkTime?: number;
}

export interface PropertyRules {
  pets: boolean;
  smoking: boolean;
  parties: boolean;
  children: boolean;
  minimumStay?: number;
  maximumOccupants: number;
}

export interface PropertyCosts {
  rent: number;
  charges?: number;
  deposit: number;
  agencyFees?: number;
  utilities?: {
    electricity?: number;
    gas?: number;
    water?: number;
    internet?: number;
  };
}

export interface Visit {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  feedback?: VisitFeedback;
}

export interface VisitFeedback {
  rating: number;
  comment?: string;
  interested: boolean;
}

export interface SearchFilters {
  query?: string;
  transactionType?: 'rent' | 'sale' | 'both';
  type?: Property['type'][];
  priceMin?: number;
  priceMax?: number;
  salePriceMin?: number;
  salePriceMax?: number;
  areaMin?: number;
  areaMax?: number;
  rooms?: number[];
  bedrooms?: number[];
  bathrooms?: number[];
  city?: string;
  district?: string;
  postalCodes?: string[];
  furnished?: boolean;
  parking?: boolean;
  balcony?: boolean;
  garden?: boolean;
  elevator?: boolean;
  terrace?: boolean;
  pool?: boolean;
  garage?: boolean;
  pets?: boolean;
  energyClass?: Property['energyClass'][];
  constructionYearMin?: number;
  constructionYearMax?: number;
  availableFrom?: Date;
  radius?: number;
  coordinates?: { lat: number; lng: number };
  sortBy?: 'price_asc' | 'price_desc' | 'date_desc' | 'date_asc' | 'area_desc' | 'area_asc' | 'relevance';
  withVirtualTour?: boolean;
  withGuarantee?: boolean;
  agencyOnly?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  propertyId?: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'visit_request' | 'visit_confirmation';
  read: boolean;
  createdAt: Date;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  propertyId?: string;
  property?: Property;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
  notes?: string;
}

export interface Alert {
  id: string;
  userId: string;
  name: string;
  filters: SearchFilters;
  active: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  lastSent?: Date;
  matchCount: number;
  createdAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  landlordId: string;
  rating: number;
  comment: string;
  aspects: {
    cleanliness: number;
    location: number;
    value: number;
    communication: number;
  };
  createdAt: Date;
  verified: boolean;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: 'property' | 'user' | 'message';
  targetId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'visit' | 'alert' | 'system' | 'payment';
  title: string;
  content: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  totalViews: number;
  totalContacts: number;
  totalVisits: number;
  averageRating: number;
  monthlyRevenue?: number;
  occupancyRate?: number;
}

export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalTransactions: number;
  monthlyGrowth: {
    users: number;
    properties: number;
    revenue: number;
  };
  topCities: { city: string; count: number }[];
  usersByRole: { role: string; count: number }[];
}