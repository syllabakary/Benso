# BENSO - Documentation Complète

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Technologies utilisées](#technologies-utilisées)
4. [Installation et configuration](#installation-et-configuration)
5. [Structure des composants](#structure-des-composants)
6. [Contextes et état global](#contextes-et-état-global)
7. [Pages et fonctionnalités](#pages-et-fonctionnalités)
8. [API et intégrations](#api-et-intégrations)
9. [Déploiement](#déploiement)
10. [Maintenance](#maintenance)

---

## 🏠 Vue d'ensemble

**BENSO** est une plateforme immobilière moderne développée en React/TypeScript permettant aux utilisateurs de :

- **Acheter** des biens immobiliers
- **Louer** des propriétés
- **Réserver** des visites
- **Gérer** leurs favoris et réservations
- **Contacter** des agents immobiliers

### Objectifs du projet
- Offrir une expérience utilisateur premium
- Simplifier la recherche immobilière
- Faciliter la mise en relation acheteurs/vendeurs
- Proposer des outils de gestion personnalisés

---

## 🏗️ Architecture du projet

```
benso-frontend/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── AnimatedCounter.tsx
│   │   ├── CurrencyToggle.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── RecentProperties.tsx
│   │   ├── SearchForm.tsx
│   │   ├── SponsoredAds.tsx
│   │   └── financing/
│   │       └── FinancingCalculator.tsx
│   ├── contexts/          # Gestion d'état global
│   │   ├── AuthContext.tsx
│   │   ├── FavoriteContext.tsx
│   │   ├── PropertyContext.tsx
│   │   └── ReservationContext.tsx
│   ├── pages/            # Pages principales
│   │   ├── HomePage.tsx
│   │   ├── ResultsPage.tsx
│   │   ├── PropertyPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── ReservationPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── Apropo.tsx
│   ├── data/             # Données mockées
│   │   └── mockData.ts
│   ├── App.tsx           # Composant racine
│   ├── main.tsx          # Point d'entrée
│   └── index.css         # Styles globaux
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🛠️ Technologies utilisées

### Frontend Core
- **React 18.3.1** - Bibliothèque UI
- **TypeScript 5.5.3** - Typage statique
- **Vite 5.4.2** - Build tool moderne
- **React Router DOM 7.7.1** - Routage

### Styling & UI
- **Tailwind CSS 3.4.1** - Framework CSS utility-first
- **Lucide React 0.344.0** - Icônes modernes
- **PostCSS 8.4.35** - Traitement CSS

### Outils de développement
- **ESLint 9.9.1** - Linting JavaScript/TypeScript
- **TypeScript ESLint 8.3.0** - Règles ESLint pour TypeScript

---

## ⚙️ Installation et configuration

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-repo/benso-frontend.git
cd benso-frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview

# Linting
npm run lint
```

### Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=BENSO
VITE_WHATSAPP_NUMBER=33123456789
VITE_CONTACT_EMAIL=contact@benso.fr
VITE_CONTACT_PHONE=+33123456789
```

---

## 🧩 Structure des composants

### Composants principaux

#### `Header.tsx`
- Navigation principale
- Gestion de l'authentification
- Toggle de devise (EUR/FCFA)
- Menu responsive

#### `Footer.tsx`
- Liens institutionnels
- Informations de contact
- Réseaux sociaux
- Mentions légales

#### `PropertyCard.tsx`
- Affichage d'une propriété
- Gestion des favoris
- Formatage des prix
- Actions utilisateur

#### `SearchForm.tsx`
- Formulaire de recherche principal
- Filtres dynamiques
- Validation des données
- Redirection vers résultats

#### `FilterBar.tsx`
- Filtres avancés
- Sélection d'équipements
- Fourchettes de prix/surface
- Réinitialisation des filtres

### Composants utilitaires

#### `AnimatedCounter.tsx`
- Compteurs animés
- Intersection Observer
- Animations fluides

#### `CurrencyToggle.tsx`
- Conversion EUR/FCFA
- Context global
- Formatage automatique

#### `ErrorBoundary.tsx`
- Gestion d'erreurs React
- Fallback UI
- Logging des erreurs

---

## 🔄 Contextes et état global

### `AuthContext`
Gestion de l'authentification utilisateur

```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: UserData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
```

**Fonctionnalités :**
- Connexion/déconnexion
- Inscription utilisateur
- Persistance localStorage
- État de chargement

### `PropertyContext`
Gestion des propriétés et recherches

```typescript
interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  searchFilters: SearchFilters;
  setSearchFilters: (filters: SearchFilters) => void;
  applyFilters: () => void;
  getPropertyById: (id: string) => Property | undefined;
  // ... autres méthodes
}
```

**Fonctionnalités :**
- Catalogue de propriétés
- Filtrage avancé
- Recherche textuelle
- Propriétés sponsorisées/mises en avant

### `ReservationContext`
Gestion des réservations

```typescript
interface ReservationContextType {
  reservations: Reservation[];
  createReservation: (data: ReservationData) => Promise<string>;
  getUserReservations: () => Reservation[];
  updateReservationStatus: (id: string, status: Status) => void;
  cancelReservation: (id: string) => void;
}
```

### `FavoriteContext`
Gestion des favoris utilisateur

```typescript
interface FavoriteContextType {
  favorites: string[];
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  toggleFavorite: (propertyId: string) => void;
}
```

---

## 📄 Pages et fonctionnalités

### `HomePage.tsx`
**Page d'accueil premium**

**Sections :**
- Hero avec formulaire de recherche
- Statistiques animées
- Propriétés sponsorisées
- Annonces récentes
- Avantages BENSO
- Call-to-action

**Fonctionnalités :**
- Animations au scroll
- Recherche rapide
- Compteurs animés
- Carrousel de propriétés

### `ResultsPage.tsx`
**Page de résultats de recherche**

**Fonctionnalités :**
- Filtres intelligents
- Vue liste/carte
- Pagination
- Tri dynamique
- Suggestions de recherche
- Statistiques en temps réel

### `PropertyPage.tsx`
**Page détail d'une propriété**

**Sections :**
- Galerie photos
- Informations détaillées
- Caractéristiques
- Contact agent
- Biens similaires
- Calculateur de financement

### `ReservationPage.tsx`
**Formulaire de réservation en 3 étapes**

**Étapes :**
1. Informations personnelles
2. Critères de recherche
3. Préférences et validation

**Fonctionnalités :**
- Validation en temps réel
- Sauvegarde progressive
- Récapitulatif final
- Confirmation par email

### `DashboardPage.tsx`
**Tableau de bord utilisateur**

**Sections :**
- Statistiques personnelles
- Mes réservations
- Mes favoris
- Informations de profil
- Actions rapides

### `ContactPage.tsx`
**Page de contact**

**Fonctionnalités :**
- Formulaire de contact
- Informations pratiques
- Horaires d'ouverture
- Liens WhatsApp/téléphone
- Témoignages clients

### `AuthPage.tsx`
**Authentification**

**Modes :**
- Connexion
- Inscription
- Validation des données
- Gestion d'erreurs

---

## 🔌 API et intégrations

### Structure des données

#### Propriété
```typescript
interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  fullAddress: string;
  images: string[];
  features: string[];
  status: 'à vendre' | 'à louer' | 'réservé' | 'vendu' | 'loué';
  transactionType: 'vente' | 'location';
  description: string;
  agent: Agent;
  // ... autres propriétés
}
```

#### Utilisateur
```typescript
interface User {
  id: string;
  nom: string;
  age: number;
  email: string;
  localite: string;
  nationalite: string;
}
```

#### Réservation
```typescript
interface Reservation {
  id: string;
  propertyId?: string;
  userId?: string;
  nom: string;
  email: string;
  telephone: string;
  typeTransaction: 'louer' | 'acheter';
  typeBien: string;
  localisation: string;
  budgetMin?: number;
  budgetMax?: number;
  status: 'en_attente' | 'confirme' | 'annule' | 'traite';
  createdAt: Date;
  updatedAt: Date;
}
```

### Intégrations externes

#### WhatsApp Business
- Liens directs avec message pré-rempli
- Numéro configuré via variables d'environnement

#### Conversion de devises
- Taux EUR/FCFA : 1€ = 656 FCFA
- Conversion automatique
- Affichage dual

---

## 🚀 Déploiement

### Build de production

```bash
# Build optimisé
npm run build

# Vérification du build
npm run preview
```

### Optimisations incluses
- Tree shaking automatique
- Minification CSS/JS
- Compression des images
- Code splitting
- Lazy loading des composants

### Variables d'environnement production

```env
VITE_API_URL=https://api.benso.ci
VITE_APP_NAME=BENSO
VITE_WHATSAPP_NUMBER=2250707070707
VITE_CONTACT_EMAIL=contact@benso.ci
VITE_CONTACT_PHONE=+2250707070707
```

---

## 🔧 Maintenance

### Scripts disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build production
npm run preview      # Prévisualisation build
npm run lint         # Vérification code

# Maintenance
npm audit            # Audit sécurité
npm update           # Mise à jour dépendances
npm outdated         # Vérifier versions
```

### Bonnes pratiques

#### Code
- Utiliser TypeScript strict
- Composants fonctionnels avec hooks
- Props typées
- Gestion d'erreurs avec ErrorBoundary

#### Performance
- Lazy loading des pages
- Optimisation des images
- Memoization des composants coûteux
- Pagination des listes

#### Accessibilité
- Labels sur tous les inputs
- Navigation au clavier
- Contrastes respectés
- Textes alternatifs

#### SEO
- Meta tags dynamiques
- URLs sémantiques
- Sitemap XML
- Schema.org markup

---

## 📊 Métriques et monitoring

### Métriques clés
- Temps de chargement des pages
- Taux de conversion des formulaires
- Utilisation des filtres
- Propriétés les plus vues

### Outils recommandés
- Google Analytics 4
- Google Search Console
- Lighthouse CI
- Sentry pour les erreurs

---

## 🔐 Sécurité

### Mesures implémentées
- Validation côté client et serveur
- Sanitisation des inputs
- Protection XSS
- HTTPS obligatoire
- Headers de sécurité

### Données sensibles
- Pas de stockage de mots de passe côté client
- Tokens JWT sécurisés
- Chiffrement des communications
- Conformité RGPD

---

## 📞 Support et contact

### Équipe de développement
- **Lead Developer** : [Nom]
- **UI/UX Designer** : [Nom]
- **DevOps** : [Nom]

### Ressources
- Repository : [URL GitHub]
- Documentation API : [URL]
- Design System : [URL Figma]
- Slack : [Canal #benso-dev]

---

*Documentation mise à jour le : [Date]*
*Version : 1.0.0*