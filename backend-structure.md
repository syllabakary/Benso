# BENSO - Structure Backend Laravel

## 📁 Structure des Dossiers

```
benso-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── AdminController.php
│   │   │   │   ├── PropertyController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── ReservationController.php
│   │   │   │   ├── ContactController.php
│   │   │   │   └── AdvertisementController.php
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PropertyController.php
│   │   │   │   ├── SearchController.php
│   │   │   │   ├── ReservationController.php
│   │   │   │   ├── ContactController.php
│   │   │   │   └── FavoriteController.php
│   │   │   └── Web/
│   │   │       ├── HomeController.php
│   │   │       └── PropertyController.php
│   │   ├── Middleware/
│   │   │   ├── AdminMiddleware.php
│   │   │   └── CorsMiddleware.php
│   │   └── Requests/
│   │       ├── PropertyRequest.php
│   │       ├── ReservationRequest.php
│   │       └── ContactRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Property.php
│   │   ├── PropertyImage.php
│   │   ├── PropertyFeature.php
│   │   ├── Reservation.php
│   │   ├── Contact.php
│   │   ├── Favorite.php
│   │   ├── Advertisement.php
│   │   ├── Agent.php
│   │   └── Setting.php
│   ├── Services/
│   │   ├── PropertyService.php
│   │   ├── SearchService.php
│   │   ├── NotificationService.php
│   │   └── FileUploadService.php
│   └── Traits/
│       ├── HasImages.php
│       └── Searchable.php
├── database/
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_users_table.php
│   │   ├── 2024_01_01_000001_create_agents_table.php
│   │   ├── 2024_01_01_000002_create_properties_table.php
│   │   ├── 2024_01_01_000003_create_property_images_table.php
│   │   ├── 2024_01_01_000004_create_property_features_table.php
│   │   ├── 2024_01_01_000005_create_reservations_table.php
│   │   ├── 2024_01_01_000006_create_contacts_table.php
│   │   ├── 2024_01_01_000007_create_favorites_table.php
│   │   ├── 2024_01_01_000008_create_advertisements_table.php
│   │   └── 2024_01_01_000009_create_settings_table.php
│   ├── seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── UserSeeder.php
│   │   ├── AgentSeeder.php
│   │   ├── PropertySeeder.php
│   │   └── SettingSeeder.php
│   └── factories/
│       ├── UserFactory.php
│       ├── PropertyFactory.php
│       └── ReservationFactory.php
├── resources/
│   ├── views/
│   │   ├── admin/
│   │   │   ├── dashboard.blade.php
│   │   │   ├── properties/
│   │   │   ├── users/
│   │   │   ├── reservations/
│   │   │   └── settings/
│   │   └── emails/
│   │       ├── reservation-confirmation.blade.php
│   │       └── contact-notification.blade.php
│   └── lang/
│       ├── en/
│       └── fr/
├── routes/
│   ├── api.php
│   ├── web.php
│   └── admin.php
├── storage/
│   ├── app/
│   │   ├── public/
│   │   │   ├── properties/
│   │   │   └── advertisements/
│   └── logs/
├── config/
│   ├── cors.php
│   ├── filesystems.php
│   └── mail.php
└── public/
    ├── admin/
    │   ├── css/
    │   └── js/
    └── uploads/
```

## 🗄️ Schéma de Base de Données

### Table: users
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    localite VARCHAR(255) NOT NULL,
    nationalite VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NULL,
    avatar VARCHAR(255) NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Table: agents
```sql
CREATE TABLE agents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    photo VARCHAR(255) NULL,
    specialite VARCHAR(255) NULL,
    description TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Table: properties
```sql
CREATE TABLE properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agent_id BIGINT UNSIGNED NOT NULL,
    reference VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('appartement', 'maison', 'studio', 'terrain', 'loft', 'bureau', 'commerce') NOT NULL,
    status ENUM('a_vendre', 'a_louer', 'reserve', 'vendu', 'loue') NOT NULL,
    transaction_type ENUM('vente', 'location') NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    charges DECIMAL(8,2) NULL,
    surface DECIMAL(8,2) NOT NULL,
    rooms INT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    floor INT NULL,
    year_built INT NULL,
    condition ENUM('neuf', 'renove', 'bon_etat', 'a_renover') NOT NULL,
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NULL,
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    availability_date DATE NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_sponsored BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE
);
```

### Table: property_images
```sql
CREATE TABLE property_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255) NULL,
    is_main BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### Table: property_features
```sql
CREATE TABLE property_features (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    feature VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);
```

### Table: reservations
```sql
CREATE TABLE reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NULL,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    type_transaction ENUM('louer', 'acheter') NOT NULL,
    type_bien VARCHAR(100) NULL,
    localisation VARCHAR(255) NULL,
    budget_min DECIMAL(12,2) NULL,
    budget_max DECIMAL(12,2) NULL,
    surface_min DECIMAL(8,2) NULL,
    pieces VARCHAR(50) NULL,
    date_visite DATE NULL,
    heure_visite ENUM('matin', 'apres-midi', 'soir') NULL,
    commentaires TEXT NULL,
    status ENUM('en_attente', 'confirme', 'annule', 'traite') DEFAULT 'en_attente',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### Table: contacts
```sql
CREATE TABLE contacts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NULL,
    sujet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('nouveau', 'en_cours', 'traite') DEFAULT 'nouveau',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Table: favorites
```sql
CREATE TABLE favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    property_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, property_id)
);
```

### Table: advertisements
```sql
CREATE TABLE advertisements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image VARCHAR(255) NOT NULL,
    link VARCHAR(255) NULL,
    position ENUM('hero', 'sidebar', 'footer', 'sponsored') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE NULL,
    end_date DATE NULL,
    clicks_count INT DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Table: settings
```sql
CREATE TABLE settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NULL,
    type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

## 🚀 Installation et Configuration

### 1. Prérequis
- PHP 8.1+
- Composer
- MySQL 8.0+
- Node.js 16+
- Redis (optionnel)

### 2. Installation
```bash
# Cloner le projet
git clone https://github.com/votre-repo/benso-backend.git
cd benso-backend

# Installer les dépendances PHP
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=benso
DB_USERNAME=root
DB_PASSWORD=

# Exécuter les migrations
php artisan migrate

# Exécuter les seeders
php artisan db:seed

# Créer le lien symbolique pour le stockage
php artisan storage:link

# Installer les dépendances frontend (pour l'admin)
npm install
npm run build

# Démarrer le serveur
php artisan serve
```

### 3. Configuration Email
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre-email@gmail.com
MAIL_PASSWORD=votre-mot-de-passe
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@benso.com
MAIL_FROM_NAME="BENSO"
```

### 4. Configuration CORS
```env
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

## 📋 API Endpoints

### Authentification
- `POST /api/register` - Inscription
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion
- `GET /api/user` - Profil utilisateur

### Propriétés
- `GET /api/properties` - Liste des propriétés
- `GET /api/properties/{id}` - Détail d'une propriété
- `GET /api/properties/search` - Recherche avancée
- `GET /api/properties/featured` - Propriétés mises en avant
- `GET /api/properties/sponsored` - Propriétés sponsorisées

### Réservations
- `POST /api/reservations` - Créer une réservation
- `GET /api/reservations` - Mes réservations (authentifié)

### Favoris
- `POST /api/favorites` - Ajouter aux favoris
- `DELETE /api/favorites/{id}` - Supprimer des favoris
- `GET /api/favorites` - Mes favoris

### Contact
- `POST /api/contact` - Envoyer un message

### Admin
- `GET /admin/dashboard` - Tableau de bord
- `GET /admin/properties` - Gestion des propriétés
- `GET /admin/users` - Gestion des utilisateurs
- `GET /admin/reservations` - Gestion des réservations
- `GET /admin/contacts` - Gestion des contacts

## 🔧 Commandes Artisan Personnalisées

```bash
# Générer des données de test
php artisan benso:generate-test-data

# Nettoyer les images non utilisées
php artisan benso:clean-unused-images

# Envoyer les notifications de réservation
php artisan benso:send-reservation-notifications

# Mettre à jour les statistiques
php artisan benso:update-statistics
```

## 📊 Panneau d'Administration

### Fonctionnalités Admin
- Dashboard avec statistiques
- Gestion des propriétés (CRUD)
- Gestion des utilisateurs
- Gestion des réservations
- Gestion des contacts
- Gestion des publicités
- Configuration du site
- Rapports et statistiques

### Accès Admin
- URL: `/admin`
- Email par défaut: `admin@benso.com`
- Mot de passe par défaut: `password`

## 🔒 Sécurité

### Mesures Implémentées
- Authentification JWT
- Validation des données
- Protection CSRF
- Limitation du taux de requêtes
- Chiffrement des mots de passe
- Validation des uploads
- Nettoyage des données

### Variables d'Environnement Sensibles
```env
APP_KEY=base64:...
DB_PASSWORD=...
JWT_SECRET=...
MAIL_PASSWORD=...
```

## 📱 Intégrations

### WhatsApp
- Liens directs vers WhatsApp Business
- Messages pré-remplis avec référence propriété

### Email
- Notifications de réservation
- Confirmations de contact
- Newsletters (optionnel)

### Cartes
- Intégration Google Maps
- Géolocalisation des propriétés
- Calcul de distances

## 🚀 Déploiement

### Production
```bash
# Optimiser l'application
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Configurer les permissions
chmod -R 755 storage bootstrap/cache
```

### Variables d'Environnement Production
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://benso.com
```

Cette structure backend Laravel est complète et prête pour le développement. Elle inclut toutes les fonctionnalités demandées avec une architecture propre et scalable.