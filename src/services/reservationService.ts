import { apiService } from './Api';
import { Reservation, ReservationData } from '../types';

class ReservationService {
  // Créer une réservation
  async createReservation(data: ReservationData): Promise<{ id: string; message: string }> {
    return apiService.post<{ id: string; message: string }>('/reservations', data);
  }

  // Récupérer mes réservations (utilisateur connecté)
  async getMyReservations(): Promise<Reservation[]> {
    return apiService.get<Reservation[]>('/reservations');
  }

  // Récupérer une réservation par ID
  async getReservationById(id: string): Promise<Reservation> {
    return apiService.get<Reservation>(`/reservations/${id}`);
  }

  // Annuler une réservation
  async cancelReservation(id: string): Promise<void> {
    return apiService.delete(`/reservations/${id}`);
  }

  // Mettre à jour une réservation
  async updateReservation(id: string, data: Partial<ReservationData>): Promise<Reservation> {
    return apiService.put<Reservation>(`/reservations/${id}`, data);
  }
}

export const reservationService = new ReservationService();