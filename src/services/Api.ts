import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

class ApiService {
  private api: AxiosInstance;
  private versionPrefix = '/v1'; // On force le préfixe API v1 ici

  constructor() {
    // Nettoyer l'URL pour éviter les doubles slash
    let base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    base = base.replace(/\/+$/, ''); // Supprime le slash final

    this.api = axios.create({
      baseURL: base,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: true,
    });

    // Ajouter le token automatiquement si dispo
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Gestion des erreurs globales
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/auth';
        }
        return Promise.reject(error);
      }
    );
  }

  // Ajoute automatiquement le préfixe /v1
  private buildUrl(url: string): string {
    // Si l'URL a déjà le préfixe, on ne le rajoute pas
    if (url.startsWith(this.versionPrefix)) {
      return url;
    }
    return `${this.versionPrefix}${url.startsWith('/') ? url : `/${url}`}`;
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.api.get(this.buildUrl(url), { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post(this.buildUrl(url), data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put(this.buildUrl(url), data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete(this.buildUrl(url));
    return response.data;
  }

  async uploadFile<T>(url: string, file: File, additionalData?: any): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    const response = await this.api.post(this.buildUrl(url), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const apiService = new ApiService();