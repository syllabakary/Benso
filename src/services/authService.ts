import { apiService } from './api';
import { User, LoginCredentials, RegisterData } from '../types';

interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

class AuthService {
  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    // Stocker le token et l'utilisateur
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  // Inscription
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData);
    
    // Stocker le token et l'utilisateur
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // Récupérer l'utilisateur connecté
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/user');
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Récupérer l'utilisateur depuis le localStorage
  getCurrentUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Mettre à jour le profil
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response = await apiService.put<User>('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }
}

export const authService = new AuthService();