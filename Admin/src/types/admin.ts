export interface User {
  id: string;
  nom: string;
  email: string;
  email_verified_at?: Date;
  age: number;
  localite: string;
  nationalite: string;
  telephone?: string;
  avatar?: string;
  is_admin: boolean;
  is_active: boolean;
  last_login_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Agent {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  whatsapp: string;
  photo?: string;
  specialite?: string;
  description?: string;
  experience_years: number;
  rating: number;
  total_sales: number;
  languages: string[];
  certifications?: string[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Property {
  id: string;
  agent_id: string;
  reference: string;
  title: string;
  description: string;
  type: 'appartement' | 'maison' | 'studio' | 'terrain' | 'loft' | 'bureau' | 'commerce' | 'villa' | 'duplex';
  status: 'a_vendre' | 'a_louer' | 'reserve' | 'vendu' | 'loue' | 'retire';
  transaction_type: 'vente' | 'location';
  price: number;
  price_fcfa: number;
  charges?: number;
  deposit?: number;
  agency_fees?: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  total_floors?: number;
  year_built?: number;
  last_renovation?: number;
  condition_state: 'neuf' | 'renove' | 'bon_etat' | 'a_renover' | 'a_demolir';
  energy_class?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  heating_type?: 'central' | 'individual' | 'electric' | 'gas' | 'solar' | 'none';
  address: string;
  city: string;
  district?: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  has_balcony: boolean;
  has_terrace: boolean;
  has_garden: boolean;
  has_pool: boolean;
  has_garage: boolean;
  has_parking: boolean;
  has_elevator: boolean;
  has_cellar: boolean;
  has_air_conditioning: boolean;
  is_furnished: boolean;
  availability_date?: Date;
  is_featured: boolean;
  is_sponsored: boolean;
  is_exclusive: boolean;
  views_count: number;
  favorites_count: number;
  contacts_count: number;
  visits_count: number;
  is_active: boolean;
  published_at?: Date;
  expires_at?: Date;
  created_at: Date;
  updated_at: Date;
  agent?: Agent;
  images: PropertyImage[];
  features: PropertyFeature[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_path: string;
  image_url?: string;
  alt_text?: string;
  room_type?: string;
  is_main: boolean;
  order_index: number;
  file_size?: number;
  dimensions?: string;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  feature_type: 'equipment' | 'service' | 'proximity' | 'security' | 'comfort';
  feature_name: string;
  feature_value?: string;
  is_highlight: boolean;
  created_at: Date;
}

export interface Reservation {
  id: string;
  property_id?: string;
  user_id?: string;
  nom: string;
  email: string;
  telephone: string;
  type_transaction: 'louer' | 'acheter';
  type_bien?: string;
  localisation?: string;
  budget_min?: number;
  budget_max?: number;
  surface_min?: number;
  pieces?: string;
  date_visite?: Date;
  heure_visite?: 'matin' | 'apres-midi' | 'soir';
  commentaires?: string;
  status: 'en_attente' | 'confirme' | 'annule' | 'traite' | 'expire';
  assigned_agent_id?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  source: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  created_at: Date;
  updated_at: Date;
  expires_at?: Date;
  property?: Property;
  user?: User;
  assigned_agent?: Agent;
}

export interface Contact {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  category: 'general' | 'support' | 'commercial' | 'technique' | 'partenariat';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'nouveau' | 'en_cours' | 'traite' | 'ferme';
  assigned_to?: string;
  response_sent: boolean;
  ip_address?: string;
  user_agent?: string;
  source: string;
  created_at: Date;
  updated_at: Date;
  responded_at?: Date;
  assigned_agent?: Agent;
}

export interface Transaction {
  id: string;
  property_id: string;
  buyer_id?: string;
  seller_id?: string;
  agent_id: string;
  type: 'vente' | 'location';
  status: 'en_cours' | 'signe' | 'finalise' | 'annule';
  price_agreed: number;
  commission_rate: number;
  commission_amount: number;
  contract_date?: Date;
  completion_date?: Date;
  deposit_paid?: number;
  monthly_rent?: number;
  lease_duration?: number;
  notes?: string;
  documents: TransactionDocument[];
  created_at: Date;
  updated_at: Date;
  property?: Property;
  buyer?: User;
  seller?: User;
  agent?: Agent;
}

export interface TransactionDocument {
  id: string;
  transaction_id: string;
  document_type: 'contrat' | 'compromis' | 'acte' | 'diagnostic' | 'autre';
  document_name: string;
  file_path: string;
  file_url?: string;
  uploaded_by: string;
  is_signed: boolean;
  created_at: Date;
}

export interface DashboardStats {
  total_properties: number;
  available_properties: number;
  sold_properties: number;
  rented_properties: number;
  total_users: number;
  total_agents: number;
  pending_reservations: number;
  new_contacts: number;
  total_transactions: number;
  pending_transactions: number;
  completed_transactions: number;
  avg_sale_price: number;
  avg_rent_price: number;
  monthly_revenue: number;
  commission_earned: number;
  conversion_rate: number;
  avg_days_to_sell: number;
  avg_days_to_rent: number;
  top_performing_agents: Agent[];
  popular_locations: { city: string; count: number }[];
  monthly_stats: MonthlyStats[];
}

export interface MonthlyStats {
  month: string;
  sales: number;
  rentals: number;
  revenue: number;
  new_properties: number;
  new_users: number;
}

export interface Advertisement {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  link_url?: string;
  position: 'hero' | 'sidebar' | 'footer' | 'sponsored' | 'banner' | 'popup';
  page_location?: string;
  target_audience?: any;
  target_locations?: string[];
  is_active: boolean;
  start_date?: Date;
  end_date?: Date;
  daily_budget?: number;
  total_budget?: number;
  impressions_count: number;
  clicks_count: number;
  conversion_count: number;
  advertiser_name?: string;
  advertiser_contact?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SystemSettings {
  id: string;
  key_name: string;
  value: string;
  value_type: 'string' | 'number' | 'boolean' | 'json' | 'array';
  category: string;
  description?: string;
  is_public: boolean;
  is_editable: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AnalyticsData {
  property_views: { date: string; views: number }[];
  user_registrations: { date: string; registrations: number }[];
  transaction_volume: { date: string; volume: number; amount: number }[];
  popular_searches: { term: string; count: number }[];
  agent_performance: { agent_id: string; agent_name: string; sales: number; revenue: number }[];
  location_popularity: { location: string; properties: number; avg_price: number }[];
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  user?: User;
  property?: Property;
}

// Types pour les filtres et recherches
export interface PropertyFilters {
  type?: string;
  transaction_type?: string;
  status?: string;
  city?: string;
  price_min?: number;
  price_max?: number;
  surface_min?: number;
  surface_max?: number;
  rooms?: number;
  bedrooms?: number;
  is_featured?: boolean;
  is_sponsored?: boolean;
  agent_id?: string;
}

export interface UserFilters {
  is_active?: boolean;
  is_admin?: boolean;
  localite?: string;
  nationalite?: string;
  age_min?: number;
  age_max?: number;
}

export interface ReservationFilters {
  status?: string;
  priority?: string;
  type_transaction?: string;
  assigned_agent_id?: string;
  date_from?: Date;
  date_to?: Date;
}

export interface TransactionFilters {
  type?: string;
  status?: string;
  agent_id?: string;
  date_from?: Date;
  date_to?: Date;
  price_min?: number;
  price_max?: number;
}

// Types pour les formulaires
export interface PropertyFormData {
  title: string;
  description: string;
  type: string;
  transaction_type: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  district?: string;
  postal_code: string;
  agent_id: string;
  features: string[];
  images: File[];
}

export interface AgentFormData {
  nom: string;
  email: string;
  telephone: string;
  whatsapp: string;
  specialite?: string;
  description?: string;
  experience_years: number;
  languages: string[];
  photo?: File;
}

export interface UserFormData {
  nom: string;
  email: string;
  age: number;
  localite: string;
  nationalite: string;
  telephone?: string;
  is_admin: boolean;
}

export interface TransactionFormData {
  property_id: string;
  buyer_id?: string;
  seller_id?: string;
  agent_id: string;
  type: 'vente' | 'location';
  price_agreed: number;
  commission_rate: number;
  contract_date?: Date;
  completion_date?: Date;
  deposit_paid?: number;
  monthly_rent?: number;
  lease_duration?: number;
  notes?: string;
}