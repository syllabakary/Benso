import { apiService } from './api';
import { Property, SearchFilters, PaginatedResponse } from '../types';

export interface PropertySearchParams {
  page?: number;
  limit?: number;
  type?: string;
  transaction_type?: string;
  city?: string;
  price_min?: number;
  price_max?: number;
  surface_min?: number;
  surface_max?: number;
  bedrooms?: number;
  features?: string[];
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

class PropertyService {
  // Récupérer toutes les propriétés avec pagination
  async getProperties(params?: PropertySearchParams): Promise<PaginatedResponse<Property>> {
    return apiService.get<PaginatedResponse<Property>>('/properties', params);
  }

  // Récupérer une propriété par ID
  async getPropertyById(id: string): Promise<Property> {
    return apiService.get<Property>(`/properties/${id}`);
  }

  // Recherche avancée
  async searchProperties(filters: SearchFilters): Promise<PaginatedResponse<Property>> {
    return apiService.get<PaginatedResponse<Property>>('/properties/search', filters);
  }

  // Propriétés mises en avant
  async getFeaturedProperties(): Promise<Property[]> {
    return apiService.get<Property[]>('/properties/featured');
  }

  // Propriétés sponsorisées
  async getSponsoredProperties(): Promise<Property[]> {
    return apiService.get<Property[]>('/properties/sponsored');
  }

  // Propriétés récentes
  async getRecentProperties(limit: number = 8): Promise<Property[]> {
    return apiService.get<Property[]>('/properties/recent', { limit });
  }

  // Propriétés similaires
  async getSimilarProperties(propertyId: string, limit: number = 4): Promise<Property[]> {
    return apiService.get<Property[]>(`/properties/${propertyId}/similar`, { limit });
  }

  // Incrémenter le nombre de vues
  async incrementViews(propertyId: string): Promise<void> {
    return apiService.post(`/properties/${propertyId}/view`);
  }

  // Statistiques des propriétés
  async getPropertyStats(): Promise<any> {
    return apiService.get('/properties/stats');
  }
}

export const propertyService = new PropertyService();