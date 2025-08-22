# BENSO Admin Panel - Guide Développeur

## 🚀 Guide de Développement Technique

### 📋 Prérequis Techniques

#### Environnement de Développement
```bash
# Versions requises
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.30.0

# Éditeur recommandé
Visual Studio Code avec extensions :
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
```

#### Installation du Projet
```bash
# Cloner le repository
git clone https://github.com/benso/admin-panel.git
cd benso-admin-panel

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### 🏗️ Architecture Technique Détaillée

#### Stack Technologique
```typescript
// Package.json - Dépendances principales
{
  "dependencies": {
    "react": "^18.3.1",              // Bibliothèque UI
    "react-dom": "^18.3.1",          // DOM renderer
    "typescript": "^5.5.3",          // Typage statique
    "vite": "^5.4.2",               // Build tool moderne
    "tailwindcss": "^3.4.1",        // Framework CSS utility-first
    "lucide-react": "^0.344.0",     // Icônes modernes
    "react-router-dom": "^6.8.0"    // Routage SPA
  },
  "devDependencies": {
    "@types/react": "^18.3.5",      // Types React
    "@types/react-dom": "^18.3.0",  // Types React DOM
    "eslint": "^9.9.1",             // Linting
    "prettier": "^3.0.0",           // Formatage code
    "autoprefixer": "^10.4.18",     // Préfixes CSS
    "postcss": "^8.4.35"            // Traitement CSS
  }
}
```

#### Structure des Dossiers Détaillée
```
src/
├── components/                 # Composants réutilisables
│   ├── admin/                 # Composants spécifiques admin
│   │   ├── Dashboard.tsx      # Tableau de bord principal
│   │   ├── PropertiesManager.tsx  # Gestion propriétés
│   │   ├── PropertyForm.tsx   # Formulaire propriété
│   │   ├── UsersManager.tsx   # Gestion utilisateurs
│   │   ├── AgentsManager.tsx  # Gestion agents
│   │   ├── ReservationsManager.tsx  # Gestion réservations
│   │   ├── ContactsManager.tsx     # Gestion contacts
│   │   ├── TransactionsManager.tsx # Gestion transactions
│   │   ├── AdvertisementsManager.tsx # Gestion publicités
│   │   ├── AnalyticsManager.tsx    # Analytics et rapports
│   │   ├── SettingsManager.tsx     # Paramètres système
│   │   ├── AdminSidebar.tsx   # Navigation latérale
│   │   ├── AdminHeader.tsx    # En-tête admin
│   │   └── LoginForm.tsx      # Formulaire connexion
│   ├── ui/                    # Composants UI génériques
│   │   ├── Button.tsx         # Bouton réutilisable
│   │   ├── Modal.tsx          # Modal générique
│   │   ├── Input.tsx          # Champ de saisie
│   │   ├── Select.tsx         # Liste déroulante
│   │   ├── Table.tsx          # Tableau générique
│   │   └── LoadingSpinner.tsx # Indicateur de chargement
│   └── common/                # Composants communs
│       ├── ErrorBoundary.tsx  # Gestion d'erreurs React
│       ├── ProtectedRoute.tsx # Route protégée
│       └── Layout.tsx         # Layout principal
├── contexts/                  # Gestion d'état global
│   ├── AuthContext.tsx        # Authentification
│   ├── AdminContext.tsx       # Données admin
│   └── ThemeContext.tsx       # Thème et préférences
├── hooks/                     # Hooks personnalisés
│   ├── useAuth.ts            # Hook authentification
│   ├── useLocalStorage.ts    # Persistance locale
│   ├── useDebounce.ts        # Debouncing
│   ├── usePagination.ts      # Pagination
│   └── useFilters.ts         # Filtres
├── services/                  # Services et API
│   ├── api.ts                # Client API principal
│   ├── auth.service.ts       # Service authentification
│   ├── properties.service.ts # Service propriétés
│   ├── users.service.ts      # Service utilisateurs
│   └── upload.service.ts     # Service upload fichiers
├── types/                     # Définitions TypeScript
│   ├── admin.ts              # Types admin
│   ├── api.ts                # Types API
│   ├── auth.ts               # Types authentification
│   └── common.ts             # Types communs
├── utils/                     # Utilitaires
│   ├── constants.ts          # Constantes
│   ├── helpers.ts            # Fonctions utilitaires
│   ├── validators.ts         # Validation
│   ├── formatters.ts         # Formatage données
│   └── storage.ts            # Gestion stockage
├── styles/                    # Styles
│   ├── globals.css           # Styles globaux
│   ├── components.css        # Styles composants
│   └── utilities.css         # Classes utilitaires
├── assets/                    # Ressources statiques
│   ├── images/               # Images
│   ├── icons/                # Icônes
│   └── fonts/                # Polices
├── pages/                     # Pages principales
│   ├── AdminPage.tsx         # Page admin principale
│   ├── LoginPage.tsx         # Page de connexion
│   └── NotFoundPage.tsx      # Page 404
├── App.tsx                    # Composant racine
├── main.tsx                   # Point d'entrée
└── vite-env.d.ts             # Types Vite
```

### 🔧 Configuration Technique

#### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Résolution des chemins
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  
  // Configuration du serveur de développement
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  // Configuration du build
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          admin: ['./src/components/admin'],
          utils: ['./src/utils']
        }
      }
    }
  },
  
  // Optimisation des dépendances
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
```

#### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    
    // Linting strict
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    // Chemins d'alias
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@contexts/*": ["./src/contexts/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@types/*": ["./src/types/*"],
      "@utils/*": ["./src/utils/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [
    { "path": "./tsconfig.node.json" }
  ]
}
```

#### Tailwind CSS Configuration
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Couleurs BENSO
      colors: {
        benso: {
          50: '#fff3e6',
          100: '#ffe4cc',
          200: '#ffc999',
          300: '#ffad66',
          400: '#ff9412',  // Couleur principale
          500: '#e67e22',
          600: '#cc6600',
          700: '#b35900',
          800: '#994d00',
          900: '#6d3900'   // Couleur foncée
        }
      },
      
      // Polices personnalisées
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      
      // Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      
      // Espacements personnalisés
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      // Breakpoints personnalisés
      screens: {
        'xs': '475px',
        '3xl': '1600px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
```

### 🎯 Composants Principaux

#### AuthContext - Gestion de l'Authentification
```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@services/auth.service';
import { Admin, LoginCredentials } from '@types/auth';

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<Admin>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérification de l'authentification au démarrage
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('benso_admin_token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      const adminData = await authService.verifyToken(token);
      setAdmin(adminData);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('benso_admin_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      
      if (response.success) {
        setAdmin(response.admin);
        localStorage.setItem('benso_admin_token', response.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setAdmin(null);
    localStorage.removeItem('benso_admin_token');
    // Redirection vers la page de connexion
    window.location.href = '/admin/login';
  };

  const updateProfile = async (data: Partial<Admin>): Promise<void> => {
    try {
      const updatedAdmin = await authService.updateProfile(data);
      setAdmin(updatedAdmin);
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    checkAuth,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### AdminContext - Gestion des Données
```typescript
// src/contexts/AdminContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Property, 
  User, 
  Agent, 
  Reservation, 
  Contact, 
  Transaction,
  DashboardStats,
  PropertyFilters,
  PropertyFormData 
} from '@types/admin';
import { propertiesService } from '@services/properties.service';
import { usersService } from '@services/users.service';
import { agentsService } from '@services/agents.service';

interface AdminContextType {
  // États des données
  dashboardStats: DashboardStats;
  properties: Property[];
  filteredProperties: Property[];
  users: User[];
  agents: Agent[];
  reservations: Reservation[];
  contacts: Contact[];
  transactions: Transaction[];
  
  // États de chargement
  isLoading: boolean;
  
  // Filtres
  propertyFilters: PropertyFilters;
  setPropertyFilters: (filters: PropertyFilters) => void;
  
  // Méthodes CRUD - Propriétés
  createProperty: (data: PropertyFormData) => Promise<Property>;
  updateProperty: (id: string, data: Partial<PropertyFormData>) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
  togglePropertyFeature: (id: string) => Promise<void>;
  togglePropertySponsored: (id: string) => Promise<void>;
  updatePropertyStatus: (id: string, status: string) => Promise<void>;
  
  // Méthodes CRUD - Utilisateurs
  createUser: (data: any) => Promise<User>;
  updateUser: (id: string, data: any) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  updateUserStatus: (id: string, isActive: boolean) => Promise<void>;
  
  // Méthodes utilitaires
  refreshData: () => Promise<void>;
  exportData: (type: string, filters?: any) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  // États des données
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({} as DashboardStats);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // États de chargement
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtres
  const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({});

  // Chargement initial des données
  useEffect(() => {
    loadInitialData();
  }, []);

  // Application des filtres
  useEffect(() => {
    applyPropertyFilters();
  }, [properties, propertyFilters]);

  const loadInitialData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Chargement parallèle des données
      const [
        propertiesData,
        usersData,
        agentsData,
        reservationsData,
        contactsData,
        transactionsData,
        statsData
      ] = await Promise.all([
        propertiesService.getAll(),
        usersService.getAll(),
        agentsService.getAll(),
        // ... autres services
      ]);

      setProperties(propertiesData);
      setUsers(usersData);
      setAgents(agentsData);
      setReservations(reservationsData);
      setContacts(contactsData);
      setTransactions(transactionsData);
      setDashboardStats(statsData);
      
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyPropertyFilters = (): void => {
    let filtered = [...properties];

    // Application des filtres
    if (propertyFilters.type) {
      filtered = filtered.filter(p => p.type === propertyFilters.type);
    }
    
    if (propertyFilters.status) {
      filtered = filtered.filter(p => p.status === propertyFilters.status);
    }
    
    if (propertyFilters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(propertyFilters.city!.toLowerCase())
      );
    }
    
    if (propertyFilters.price_min) {
      filtered = filtered.filter(p => p.price >= propertyFilters.price_min!);
    }
    
    if (propertyFilters.price_max) {
      filtered = filtered.filter(p => p.price <= propertyFilters.price_max!);
    }

    setFilteredProperties(filtered);
  };

  // Méthodes CRUD - Propriétés
  const createProperty = async (data: PropertyFormData): Promise<Property> => {
    try {
      setIsLoading(true);
      const newProperty = await propertiesService.create(data);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (error) {
      console.error('Failed to create property:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id: string, data: Partial<PropertyFormData>): Promise<Property> => {
    try {
      setIsLoading(true);
      const updatedProperty = await propertiesService.update(id, data);
      setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
      return updatedProperty;
    } catch (error) {
      console.error('Failed to update property:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      await propertiesService.delete(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete property:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const togglePropertyFeature = async (id: string): Promise<void> => {
    try {
      const property = properties.find(p => p.id === id);
      if (!property) return;

      const updatedProperty = await propertiesService.update(id, {
        is_featured: !property.is_featured
      });
      
      setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
    } catch (error) {
      console.error('Failed to toggle property feature:', error);
      throw error;
    }
  };

  const refreshData = async (): Promise<void> => {
    await loadInitialData();
  };

  const exportData = async (type: string, filters?: any): Promise<void> => {
    try {
      setIsLoading(true);
      // Logique d'export selon le type
      console.log(`Exporting ${type} data with filters:`, filters);
      // Ici, vous implémenteriez l'export réel
    } catch (error) {
      console.error('Failed to export data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AdminContextType = {
    dashboardStats,
    properties,
    filteredProperties,
    users,
    agents,
    reservations,
    contacts,
    transactions,
    isLoading,
    propertyFilters,
    setPropertyFilters,
    createProperty,
    updateProperty,
    deleteProperty,
    togglePropertyFeature,
    togglePropertySponsored: async (id: string) => {
      // Implémentation similaire à togglePropertyFeature
    },
    updatePropertyStatus: async (id: string, status: string) => {
      // Implémentation de mise à jour du statut
    },
    createUser: async (data: any) => {
      // Implémentation création utilisateur
      return {} as User;
    },
    updateUser: async (id: string, data: any) => {
      // Implémentation mise à jour utilisateur
      return {} as User;
    },
    deleteUser: async (id: string) => {
      // Implémentation suppression utilisateur
    },
    updateUserStatus: async (id: string, isActive: boolean) => {
      // Implémentation changement statut utilisateur
    },
    refreshData,
    exportData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
```

### 🔌 Services API

#### Service Principal API
```typescript
// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Intercepteur de requête - Ajout du token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('benso_admin_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur de réponse - Gestion des erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expiré ou invalide
          localStorage.removeItem('benso_admin_token');
          window.location.href = '/admin/login';
        }
        
        if (error.response?.status === 403) {
          // Accès refusé
          console.error('Access denied:', error.response.data);
        }
        
        if (error.response?.status >= 500) {
          // Erreur serveur
          console.error('Server error:', error.response.data);
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Méthodes HTTP génériques
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  // Upload de fichiers
  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    };

    return this.post<T>(url, formData, config);
  }

  // Upload multiple
  async uploadFiles<T>(url: string, files: File[], onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    };

    return this.post<T>(url, formData, config);
  }
}

export const apiService = new ApiService();
```

#### Service Propriétés
```typescript
// src/services/properties.service.ts
import { apiService } from './api';
import { Property, PropertyFormData, PropertyFilters, PropertyImage } from '@types/admin';

class PropertiesService {
  private readonly baseUrl = '/admin/properties';

  async getAll(filters?: PropertyFilters): Promise<Property[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const url = params.toString() ? `${this.baseUrl}?${params}` : this.baseUrl;
    return apiService.get<Property[]>(url);
  }

  async getById(id: string): Promise<Property> {
    return apiService.get<Property>(`${this.baseUrl}/${id}`);
  }

  async create(data: PropertyFormData): Promise<Property> {
    return apiService.post<Property>(this.baseUrl, data);
  }

  async update(id: string, data: Partial<PropertyFormData>): Promise<Property> {
    return apiService.patch<Property>(`${this.baseUrl}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${id}`);
  }

  async updateStatus(id: string, status: string): Promise<Property> {
    return apiService.patch<Property>(`${this.baseUrl}/${id}/status`, { status });
  }

  async toggleFeature(id: string): Promise<Property> {
    return apiService.patch<Property>(`${this.baseUrl}/${id}/toggle-feature`);
  }

  async toggleSponsored(id: string): Promise<Property> {
    return apiService.patch<Property>(`${this.baseUrl}/${id}/toggle-sponsored`);
  }

  async uploadImages(id: string, files: File[], onProgress?: (progress: number) => void): Promise<PropertyImage[]> {
    return apiService.uploadFiles<PropertyImage[]>(`${this.baseUrl}/${id}/images`, files, onProgress);
  }

  async deleteImage(propertyId: string, imageId: string): Promise<void> {
    return apiService.delete<void>(`${this.baseUrl}/${propertyId}/images/${imageId}`);
  }

  async setMainImage(propertyId: string, imageId: string): Promise<PropertyImage> {
    return apiService.patch<PropertyImage>(`${this.baseUrl}/${propertyId}/images/${imageId}/main`);
  }

  async getStatistics(): Promise<any> {
    return apiService.get<any>(`${this.baseUrl}/statistics`);
  }

  async export(filters?: PropertyFilters, format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const params = new URLSearchParams();
    params.append('format', format);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }

    const response = await apiService.get<Blob>(`${this.baseUrl}/export?${params}`, {
      responseType: 'blob'
    });
    
    return response;
  }
}

export const propertiesService = new PropertiesService();
```

### 🎨 Composants UI Réutilisables

#### Composant Button
```typescript
// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@utils/helpers';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-benso-400 text-white hover:bg-benso-500 focus:ring-benso-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader className="w-4 h-4 mr-2 animate-spin" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
```

#### Composant Modal
```typescript
// src/components/ui/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@utils/helpers';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Gestion de la touche Escape
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Gestion du focus
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Prévention du scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={modalRef}
          className={cn(
            'relative bg-white rounded-lg shadow-xl w-full',
            sizes[size],
            'max-h-[90vh] overflow-hidden',
            className
          )}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### 🧪 Tests et Qualité

#### Configuration Jest
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

#### Tests Unitaires
```typescript
// src/components/ui/Button.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-benso-400');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="danger">Delete</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });

  it('renders with icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<Button icon={<TestIcon />}>With Icon</Button>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
```

#### Tests d'Intégration
```typescript
// src/components/admin/PropertiesManager.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PropertiesManager } from './PropertiesManager';
import { AdminProvider } from '@contexts/AdminContext';
import { AuthProvider } from '@contexts/AuthContext';

// Mock des services
jest.mock('@services/properties.service');

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      <AdminProvider>
        {component}
      </AdminProvider>
    </AuthProvider>
  );
};

describe('PropertiesManager', () => {
  beforeEach(() => {
    // Reset des mocks
    jest.clearAllMocks();
  });

  it('displays properties list', async () => {
    renderWithProviders(<PropertiesManager />);
    
    await waitFor(() => {
      expect(screen.getByText('Gestion des Propriétés')).toBeInTheDocument();
    });
  });

  it('opens property form when clicking add button', async () => {
    renderWithProviders(<PropertiesManager />);
    
    const addButton = screen.getByText('Nouvelle Propriété');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter une propriété')).toBeInTheDocument();
    });
  });

  it('filters properties correctly', async () => {
    renderWithProviders(<PropertiesManager />);
    
    const typeFilter = screen.getByLabelText('Type de bien');
    fireEvent.change(typeFilter, { target: { value: 'villa' } });
    
    await waitFor(() => {
      // Vérifier que seules les villas sont affichées
      expect(screen.queryByText('Appartement')).not.toBeInTheDocument();
    });
  });
});
```

### 🚀 Optimisations et Performance

#### Lazy Loading des Composants
```typescript
// src/pages/AdminPage.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';

// Lazy loading des composants admin
const Dashboard = lazy(() => import('@components/admin/Dashboard'));
const PropertiesManager = lazy(() => import('@components/admin/PropertiesManager'));
const UsersManager = lazy(() => import('@components/admin/UsersManager'));
const AgentsManager = lazy(() => import('@components/admin/AgentsManager'));

export const AdminPage: React.FC = () => {
  return (
    <div className="admin-layout">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<PropertiesManager />} />
          <Route path="/users" element={<UsersManager />} />
          <Route path="/agents" element={<AgentsManager />} />
        </Routes>
      </Suspense>
    </div>
  );
};
```

#### Hooks d'Optimisation
```typescript
// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// src/hooks/usePagination.ts
import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

export function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }, [currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  return {
    currentPage,
    totalPages,
    ...paginatedData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}
```

#### Mémorisation des Composants
```typescript
// src/components/admin/PropertyCard.tsx
import React, { memo } from 'react';
import { Property } from '@types/admin';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onToggleFeature: (id: string) => void;
}

export const PropertyCard = memo<PropertyCardProps>(({ 
  property, 
  onEdit, 
  onDelete, 
  onToggleFeature 
}) => {
  return (
    <div className="property-card">
      {/* Contenu de la carte */}
    </div>
  );
}, (prevProps, nextProps) => {
  // Comparaison personnalisée pour éviter les re-renders inutiles
  return (
    prevProps.property.id === nextProps.property.id &&
    prevProps.property.updated_at === nextProps.property.updated_at
  );
});

PropertyCard.displayName = 'PropertyCard';
```

### 📦 Build et Déploiement

#### Scripts NPM
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:staging": "tsc && vite build --mode staging",
    "build:production": "tsc && vite build --mode production",
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "analyze": "npx vite-bundle-analyzer dist/stats.html",
    "clean": "rm -rf dist node_modules/.vite",
    "prepare": "husky install"
  }
}
```

#### Configuration des Environnements
```bash
# .env.development
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=BENSO Admin (Dev)
VITE_ENVIRONMENT=development
VITE_DEBUG=true

# .env.staging
VITE_API_URL=https://staging-api.benso.ci
VITE_APP_NAME=BENSO Admin (Staging)
VITE_ENVIRONMENT=staging
VITE_DEBUG=false

# .env.production
VITE_API_URL=https://api.benso.ci
VITE_APP_NAME=BENSO Admin
VITE_ENVIRONMENT=production
VITE_DEBUG=false
VITE_SENTRY_DSN=https://your-sentry-dsn
```

---

## 🔧 Maintenance et Debugging

### 📊 Monitoring et Logs
```typescript
// src/utils/logger.ts
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;

  private constructor() {
    this.logLevel = import.meta.env.VITE_DEBUG === 'true' ? LogLevel.DEBUG : LogLevel.INFO;
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (level < this.logLevel) return;

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    
    console.log(`[${timestamp}] ${levelName}: ${message}`, data || '');

    // Envoi vers service de logging en production
    if (import.meta.env.VITE_ENVIRONMENT === 'production') {
      this.sendToLoggingService(level, message, data);
    }
  }

  private async sendToLoggingService(level: LogLevel, message: string, data?: any): Promise<void> {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: LogLevel[level],
          message,
          data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      console.error('Failed to send log to service:', error);
    }
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | any): void {
    this.log(LogLevel.ERROR, message, error);
  }
}

export const logger = Logger.getInstance();
```

### 🐛 Debugging et Troubleshooting

#### Error Boundary Avancé
```typescript
// src/components/common/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error('React Error Boundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });

    // Envoi vers service de monitoring (ex: Sentry)
    if (import.meta.env.VITE_SENTRY_DSN) {
      // Sentry.captureException(error, { contexts: { react: errorInfo } });
    }

    this.setState({
      error,
      errorInfo
    });
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  private handleGoHome = (): void => {
    window.location.href = '/admin/dashboard';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Une erreur s'est produite
            </h2>
            
            <p className="text-gray-600 mb-6">
              Nous nous excusons pour ce désagrément. L'erreur a été signalée à notre équipe technique.
            </p>

            {import.meta.env.VITE_DEBUG === 'true' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-medium">Détails de l'erreur</summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-benso-400 text-white px-4 py-2 rounded-lg hover:bg-benso-500 transition-colors"
              >
                Recharger la page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 📞 Support et Ressources

### 🆘 Guide de Dépannage

#### Problèmes Courants

**1. Erreur de build TypeScript**
```bash
# Vérifier les types
npm run type-check

# Nettoyer et réinstaller
npm run clean
npm install

# Build avec logs détaillés
npm run build -- --verbose
```

**2. Problèmes de performance**
```bash
# Analyser le bundle
npm run analyze

# Profiler les composants React
# Utiliser React DevTools Profiler
```

**3. Erreurs d'API**
```typescript
// Vérifier la configuration API
console.log('API URL:', import.meta.env.VITE_API_URL);

// Vérifier le token d'authentification
console.log('Token:', localStorage.getItem('benso_admin_token'));
```

### 📚 Ressources de Développement

#### Documentation Officielle
- **React** : https://react.dev/
- **TypeScript** : https://www.typescriptlang.org/docs/
- **Vite** : https://vitejs.dev/guide/
- **Tailwind CSS** : https://tailwindcss.com/docs

#### Outils Recommandés
- **VS Code Extensions** : ES7+ React snippets, TypeScript Importer
- **Chrome DevTools** : React Developer Tools, Redux DevTools
- **Testing** : Jest, React Testing Library
- **Monitoring** : Sentry, LogRocket

### 👥 Équipe et Contacts

#### Développeurs
- **Lead Developer** : [Nom] - [email]
- **Frontend Developer** : [Nom] - [email]
- **UI/UX Designer** : [Nom] - [email]

#### Processus de Contribution
1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commit** les changements (`git commit -m 'Add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

---

*Documentation développeur mise à jour le : 1er Décembre 2024*
*Version : 1.0.0*
*Équipe : BENSO Tech Team*