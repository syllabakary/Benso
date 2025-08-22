import { apiService } from './Api';
import { User, LoginCredentials, RegisterData } from '../types';

interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

class AuthService {
  // Connexion
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/v1/auth/login', credentials);
      
      // Stocker le token et l'utilisateur
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch {
      console.warn('API non disponible, utilisation des données mockées');
      // Fallback to mock data for demo purposes
      const mockUser: User = {
        id: '1',
        nom: 'Utilisateur Démo',
        email: credentials.email,
        age: 30,
        localite: 'Paris',
        nationalite: 'Française',
        telephone: '+33 6 12 34 56 78',
        is_admin: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock-token-' + Date.now(),
        expires_in: 3600
      };
      
      localStorage.setItem('auth_token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
  }

  // Inscription
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/v1/auth/register', userData);
      
      // Stocker le token et l'utilisateur
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch {
      console.warn('API non disponible, utilisation des données mockées');
      // Fallback to mock data for demo purposes
      const mockUser: User = {
        id: '2',
        nom: userData.nom,
        email: userData.email,
        age: userData.age,
        localite: userData.localite,
        nationalite: userData.nationalite,
        telephone: userData.telephone,
        is_admin: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock-token-' + Date.now(),
        expires_in: 3600
      };
      
      localStorage.setItem('auth_token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      await apiService.post('/v1/auth/logout');
    } catch {
      console.warn('API non disponible, déconnexion locale uniquement');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // Récupérer l'utilisateur connecté
  async getCurrentUser(): Promise<User> {
    try {
      return await apiService.get<User>('/v1/auth/user');
    } catch {
      console.warn('API non disponible, utilisation des données mockées');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
      throw new Error('Aucun utilisateur connecté');
    }
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
    try {
      const response = await apiService.put<User>('/v1/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch {
      console.warn('API non disponible, mise à jour locale uniquement');
      const currentUser = this.getCurrentUserFromStorage();
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      throw new Error('Aucun utilisateur connecté');
    }
  }
}

export const authService = new AuthService();