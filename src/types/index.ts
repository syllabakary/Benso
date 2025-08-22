// User types
export interface User {
    id: string;
    nom: string;
    email: string;
    age: number;
    localite: string;
    nationalite: string;
    telephone?: string;
    avatar?: string;
    is_admin: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
    remember?: boolean;
  }
  
  export interface RegisterData {
    nom: string;
    email: string;
    password: string;
    password_confirmation: string;
    age: number;
    localite: string;
    nationalite: string;
    telephone?: string;
  }
  
  // Property types
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
    charges?: number;
    surface: number;
    rooms: number;
    bedrooms: number;
    bathrooms: number;
    floor?: number;
    year_built?: number;
    condition_state: 'neuf' | 'excellent' | 'tres_bon' | 'bon' | 'correct' | 'a_renover';
    energy_class?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    address: string;
    city: string;
    district?: string;
    postal_code: string;
    latitude?: number;
    longitude?: number;
    features: PropertyFeature[];
    images: PropertyImage[];
    agent: Agent;
    has_balcony: boolean;
    has_terrace: boolean;
    has_garden: boolean;
    has_pool: boolean;
    has_garage: boolean;
    has_parking: boolean;
    has_elevator: boolean;
    has_air_conditioning: boolean;
    is_featured: boolean;
    is_sponsored: boolean;
    views_count: number;
    favorites_count: number;
    availability_date?: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface PropertyImage {
    id: string;
    image_url: string;
    alt_text?: string;
    is_main: boolean;
    order_index: number;
  }
  
  export interface PropertyFeature {
    id: string;
    feature_name: string;
    feature_value?: string;
    feature_category: string;
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
    rating: number;
    is_active: boolean;
  }
  
  // Search and filter types
  export interface SearchFilters {
    type?: string;
    transaction_type?: string;
    city?: string;
    district?: string;
    price_min?: number;
    price_max?: number;
    surface_min?: number;
    surface_max?: number;
    bedrooms?: number;
    rooms?: number;
    features?: string[];
    has_balcony?: boolean;
    has_garden?: boolean;
    has_pool?: boolean;
    has_garage?: boolean;
    has_parking?: boolean;
    has_elevator?: boolean;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }
  
  // Reservation types
  export interface ReservationData {
    property_id?: string;
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
    date_visite?: string;
    heure_visite?: 'matin' | 'apres-midi' | 'soir';
    commentaires?: string;
  }
  
  export interface Reservation {
    id: string;
    property_id?: string;
    property?: Property;
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
    date_visite?: string;
    heure_visite?: 'matin' | 'apres-midi' | 'soir';
    commentaires?: string;
    status: 'en_attente' | 'confirme' | 'annule' | 'traite';
    created_at: string;
    updated_at: string;
  }
  
  // Utility types
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
  }