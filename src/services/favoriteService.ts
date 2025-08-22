import { apiService } from './Api';
import { Property } from '../types';

class FavoriteService {
  // Ajouter aux favoris
  async addToFavorites(propertyId: string): Promise<void> {
    return apiService.post('/favorites', { property_id: propertyId });
  }

  // Supprimer des favoris
  async removeFromFavorites(propertyId: string): Promise<void> {
    return apiService.delete(`/favorites/${propertyId}`);
  }

  // Récupérer mes favoris
  async getMyFavorites(): Promise<Property[]> {
    return apiService.get<Property[]>('/favorites');
  }

  // Vérifier si une propriété est en favori
  async isFavorite(propertyId: string): Promise<boolean> {
    try {
      const response = await apiService.get<{ is_favorite: boolean }>(`/favorites/check/${propertyId}`);
      return response.is_favorite;
    } catch {
      return false;
    }
  }
}

export const favoriteService = new FavoriteService();