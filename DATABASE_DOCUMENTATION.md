# BENSO - Documentation Complète Base de Données

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture de la base de données](#architecture-de-la-base-de-données)
3. [Schémas détaillés des tables](#schémas-détaillés-des-tables)
4. [Relations et contraintes](#relations-et-contraintes)
5. [Index et performances](#index-et-performances)
6. [Procédures stockées](#procédures-stockées)
7. [Triggers et automatisations](#triggers-et-automatisations)
8. [Sécurité et permissions](#sécurité-et-permissions)
9. [Sauvegarde et restauration](#sauvegarde-et-restauration)
10. [Migrations et versioning](#migrations-et-versioning)
11. [Optimisations et monitoring](#optimisations-et-monitoring)
12. [Scripts utiles](#scripts-utiles)

---

## 🗄️ Vue d'ensemble

### Objectif de la base de données
La base de données BENSO est conçue pour gérer une plateforme immobilière complète permettant :
- **Gestion des utilisateurs** avec authentification sécurisée
- **Catalogue de propriétés** avec métadonnées riches et recherche avancée
- **Système de réservations** et gestion des visites
- **Gestion des agents** immobiliers avec performance tracking
- **Favoris utilisateurs** et préférences personnalisées
- **Système de contact** et notifications automatisées
- **Publicités** et contenu sponsorisé avec analytics
- **Configuration système** flexible et évolutive

### Caractéristiques techniques
- **SGBD** : MySQL 8.0+ (InnoDB)
- **Charset** : utf8mb4_unicode_ci (support emoji et caractères spéciaux)
- **Contraintes** : Clés étrangères avec CASCADE approprié
- **Sécurité** : Row Level Security (RLS) et audit complet
- **Performance** : Index optimisés et requêtes préparées
- **Scalabilité** : Architecture modulaire et extensible

---

## 🏗️ Architecture de la base de données

```
benso_database/
├── core/                    # Tables principales
│   ├── users               # Utilisateurs et authentification
│   ├── agents              # Agents immobiliers
│   └── settings            # Configuration système
├── properties/             # Gestion immobilière
│   ├── properties          # Biens immobiliers
│   ├── property_images     # Images des biens
│   ├── property_features   # Caractéristiques détaillées
│   └── property_analytics  # Statistiques et métriques
├── transactions/           # Interactions utilisateurs
│   ├── reservations        # Réservations et demandes
│   ├── contacts           # Messages de contact
│   └── favorites          # Favoris utilisateurs
├── content/               # Contenu et marketing
│   ├── advertisements     # Publicités et sponsoring
│   └── testimonials       # Témoignages clients
├── analytics/             # Données analytiques
│   ├── user_sessions      # Sessions utilisateurs
│   ├── search_logs        # Historique des recherches
│   └── performance_metrics # Métriques de performance
└── audit/                 # Audit et logs
    ├── activity_logs      # Logs d'activité
    └── data_changes       # Historique des modifications
```

---

## 📊 Schémas détaillés des tables

### 🔐 Table `users` - Gestion des utilisateurs

**Objectif** : Stockage sécurisé des informations utilisateurs avec authentification

```sql
CREATE TABLE users (
    -- Identifiant unique
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY 
        COMMENT 'Identifiant unique auto-incrémenté',
    
    -- Informations personnelles
    nom VARCHAR(255) NOT NULL 
        COMMENT 'Nom complet de l\'utilisateur (prénom + nom)',
    email VARCHAR(255) UNIQUE NOT NULL 
        COMMENT 'Adresse email unique pour connexion',
    email_verified_at TIMESTAMP NULL 
        COMMENT 'Date de vérification de l\'email (NULL si non vérifié)',
    
    -- Authentification
    password VARCHAR(255) NOT NULL 
        COMMENT 'Mot de passe hashé avec bcrypt (coût 12)',
    remember_token VARCHAR(100) NULL 
        COMMENT 'Token pour "Se souvenir de moi"',
    
    -- Données démographiques
    age INT NOT NULL 
        COMMENT 'Âge de l\'utilisateur (minimum 18 ans)',
    localite VARCHAR(255) NOT NULL 
        COMMENT 'Ville ou région de résidence',
    nationalite VARCHAR(255) NOT NULL 
        COMMENT 'Nationalité de l\'utilisateur',
    
    -- Contact optionnel
    telephone VARCHAR(20) NULL 
        COMMENT 'Numéro de téléphone au format international',
    whatsapp VARCHAR(20) NULL 
        COMMENT 'Numéro WhatsApp (peut différer du téléphone)',
    
    -- Profil utilisateur
    avatar VARCHAR(500) NULL 
        COMMENT 'URL de l\'image de profil',
    bio TEXT NULL 
        COMMENT 'Biographie ou description personnelle',
    
    -- Statuts et permissions
    is_admin BOOLEAN DEFAULT FALSE 
        COMMENT 'Droits administrateur (FALSE par défaut)',
    is_active BOOLEAN DEFAULT TRUE 
        COMMENT 'Compte actif (peut être désactivé)',
    is_verified BOOLEAN DEFAULT FALSE 
        COMMENT 'Profil vérifié par l\'équipe',
    
    -- Préférences utilisateur
    language ENUM('fr', 'en') DEFAULT 'fr' 
        COMMENT 'Langue préférée de l\'interface',
    currency ENUM('EUR', 'FCFA') DEFAULT 'EUR' 
        COMMENT 'Devise préférée pour l\'affichage',
    notifications_email BOOLEAN DEFAULT TRUE 
        COMMENT 'Accepte les notifications par email',
    notifications_sms BOOLEAN DEFAULT FALSE 
        COMMENT 'Accepte les notifications par SMS',
    
    -- Tracking et analytics
    last_login_at TIMESTAMP NULL 
        COMMENT 'Dernière connexion de l\'utilisateur',
    login_count INT DEFAULT 0 
        COMMENT 'Nombre total de connexions',
    ip_address VARCHAR(45) NULL 
        COMMENT 'Dernière adresse IP (IPv4 ou IPv6)',
    user_agent TEXT NULL 
        COMMENT 'Dernier User-Agent du navigateur',
    
    -- Métadonnées temporelles
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        COMMENT 'Date de création du compte',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        COMMENT 'Dernière modification du profil',
    deleted_at TIMESTAMP NULL 
        COMMENT 'Date de suppression (soft delete)',
    
    -- Index pour optimiser les performances
    INDEX idx_email (email) COMMENT 'Index unique sur email pour connexion rapide',
    INDEX idx_active_users (is_active, deleted_at) COMMENT 'Index pour filtrer les utilisateurs actifs',
    INDEX idx_last_login (last_login_at) COMMENT 'Index pour statistiques de connexion',
    INDEX idx_location (localite, nationalite) COMMENT 'Index pour recherches géographiques',
    
    -- Contraintes de validation
    CONSTRAINT chk_age_valid CHECK (age >= 18 AND age <= 120),
    CONSTRAINT chk_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Table principale des utilisateurs avec authentification et profils complets';
```

### 🏢 Table `agents` - Agents immobiliers

**Objectif** : Gestion des agents immobiliers avec suivi des performances

```sql
CREATE TABLE agents (
    -- Identifiant unique
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY 
        COMMENT 'Identifiant unique de l\'agent',
    
    -- Informations personnelles
    nom VARCHAR(255) NOT NULL 
        COMMENT 'Nom complet de l\'agent immobilier',
    email VARCHAR(255) UNIQUE NOT NULL 
        COMMENT 'Email professionnel unique',
    
    -- Contact professionnel
    telephone VARCHAR(20) NOT NULL 
        COMMENT 'Téléphone principal de l\'agent',
    whatsapp VARCHAR(20) NOT NULL 
        COMMENT 'Numéro WhatsApp Business pour contact client',
    telephone_fixe VARCHAR(20) NULL 
        COMMENT 'Téléphone fixe du bureau (optionnel)',
    
    -- Profil professionnel
    photo VARCHAR(500) NULL 
        COMMENT 'URL de la photo professionnelle',
    specialite VARCHAR(255) NULL 
        COMMENT 'Spécialité (vente, location, investissement, etc.)',
    description TEXT NULL 
        COMMENT 'Présentation professionnelle de l\'agent',
    
    -- Expérience et qualifications
    experience_years INT DEFAULT 0 
        COMMENT 'Nombre d\'années d\'expérience dans l\'immobilier',
    certifications JSON NULL 
        COMMENT 'Liste des certifications professionnelles',
    languages JSON NULL 
        COMMENT 'Langues parlées avec niveau',
    
    -- Localisation et secteurs
    agence_principale VARCHAR(255) NULL 
        COMMENT 'Agence principale de rattachement',
    secteurs_activite JSON NULL 
        COMMENT 'Zones géographiques d\'intervention',
    
    -- Performance et statistiques
    rating DECIMAL(3,2) DEFAULT 0.00 
        COMMENT 'Note moyenne client (0.00 à 5.00)',
    total_sales INT DEFAULT 0 
        COMMENT 'Nombre total de ventes réalisées',
    total_rentals INT DEFAULT 0 
        COMMENT 'Nombre total de locations réalisées',
    revenue_generated DECIMAL(15,2) DEFAULT 0.00 
        COMMENT 'Chiffre d\'affaires généré (en euros)',
    
    -- Disponibilité et horaires
    horaires_travail JSON NULL 
        COMMENT 'Horaires de travail par jour de la semaine',
    disponible_weekend BOOLEAN DEFAULT FALSE 
        COMMENT 'Disponible le weekend',
    
    -- Statuts
    is_active BOOLEAN DEFAULT TRUE 
        COMMENT 'Agent actif et disponible',
    is_featured BOOLEAN DEFAULT FALSE 
        COMMENT 'Agent mis en avant sur le site',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Index de performance
    INDEX idx_active_agents (is_active, is_featured),
    INDEX idx_specialite (specialite),
    INDEX idx_rating (rating DESC),
    INDEX idx_performance (total_sales DESC, total_rentals DESC),
    
    -- Contraintes
    CONSTRAINT chk_rating_range CHECK (rating >= 0.00 AND rating <= 5.00),
    CONSTRAINT chk_experience_positive CHECK (experience_years >= 0)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Agents immobiliers avec profils complets et suivi des performances';
```

### 🏠 Table `properties` - Biens immobiliers

**Objectif** : Catalogue complet des biens immobiliers avec toutes leurs caractéristiques

```sql
CREATE TABLE properties (
    -- Identifiant et référence
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY 
        COMMENT 'Identifiant unique du bien',
    agent_id BIGINT UNSIGNED NOT NULL 
        COMMENT 'Agent responsable du bien',
    reference VARCHAR(50) UNIQUE NOT NULL 
        COMMENT 'Référence unique du bien (ex: BENSO-2024-001)',
    
    -- Informations de base
    title VARCHAR(255) NOT NULL 
        COMMENT 'Titre attractif de l\'annonce',
    description TEXT NOT NULL 
        COMMENT 'Description détaillée du bien',
    
    -- Classification du bien
    type ENUM(
        'appartement', 'maison', 'studio', 'terrain', 'loft', 
        'bureau', 'commerce', 'villa', 'duplex', 'triplex',
        'penthouse', 'entrepot', 'garage', 'parking'
    ) NOT NULL COMMENT 'Type de bien immobilier',
    
    status ENUM(
        'a_vendre', 'a_louer', 'reserve', 'vendu', 'loue', 
        'retire', 'en_travaux', 'en_attente'
    ) NOT NULL COMMENT 'Statut actuel du bien',
    
    transaction_type ENUM('vente', 'location', 'vente_location') NOT NULL 
        COMMENT 'Type de transaction proposée',
    
    -- Pricing et coûts
    price DECIMAL(12,2) NOT NULL 
        COMMENT 'Prix principal en euros',
    price_fcfa DECIMAL(15,2) GENERATED ALWAYS AS (price * 655.957) STORED 
        COMMENT 'Prix automatiquement converti en FCFA',
    charges DECIMAL(8,2) NULL 
        COMMENT 'Charges mensuelles (copropriété, etc.)',
    deposit DECIMAL(10,2) NULL 
        COMMENT 'Dépôt de garantie demandé',
    agency_fees DECIMAL(8,2) NULL 
        COMMENT 'Frais d\'agence',
    notary_fees DECIMAL(8,2) NULL 
        COMMENT 'Frais de notaire estimés',
    
    -- Caractéristiques physiques principales
    surface DECIMAL(8,2) NOT NULL 
        COMMENT 'Surface habitable en m²',
    surface_terrain DECIMAL(10,2) NULL 
        COMMENT 'Surface du terrain en m² (si applicable)',
    surface_balcon DECIMAL(6,2) NULL 
        COMMENT 'Surface des balcons/terrasses en m²',
    
    -- Distribution des pièces
    rooms INT NOT NULL 
        COMMENT 'Nombre total de pièces',
    bedrooms INT NOT NULL 
        COMMENT 'Nombre de chambres',
    bathrooms INT NOT NULL 
        COMMENT 'Nombre de salles de bain',
    toilets INT DEFAULT 0 
        COMMENT 'Nombre de WC séparés',
    kitchens INT DEFAULT 1 
        COMMENT 'Nombre de cuisines',
    
    -- Informations sur l'immeuble
    floor INT NULL 
        COMMENT 'Étage du bien (NULL pour maison)',
    total_floors INT NULL 
        COMMENT 'Nombre total d\'étages de l\'immeuble',
    year_built INT NULL 
        COMMENT 'Année de construction',
    last_renovation INT NULL 
        COMMENT 'Année de dernière rénovation',
    
    -- État et performance énergétique
    condition_state ENUM(
        'neuf', 'excellent', 'tres_bon', 'bon', 'correct', 
        'a_renover', 'a_restaurer', 'a_demolir'
    ) NOT NULL COMMENT 'État général du bien',
    
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NULL 
        COMMENT 'Classe énergétique DPE',
    energy_consumption DECIMAL(6,2) NULL 
        COMMENT 'Consommation énergétique en kWh/m²/an',
    
    heating_type ENUM(
        'central', 'individual', 'electric', 'gas', 'fuel', 
        'solar', 'heat_pump', 'wood', 'none'
    ) NULL COMMENT 'Type de chauffage',
    
    -- Localisation détaillée
    address TEXT NOT NULL 
        COMMENT 'Adresse complète du bien',
    city VARCHAR(255) NOT NULL 
        COMMENT 'Ville',
    district VARCHAR(255) NULL 
        COMMENT 'Quartier ou arrondissement',
    postal_code VARCHAR(10) NOT NULL 
        COMMENT 'Code postal',
    country VARCHAR(100) DEFAULT 'Côte d\'Ivoire' 
        COMMENT 'Pays',
    
    -- Géolocalisation
    latitude DECIMAL(10, 8) NULL 
        COMMENT 'Coordonnée GPS latitude',
    longitude DECIMAL(11, 8) NULL 
        COMMENT 'Coordonnée GPS longitude',
    
    -- Équipements et caractéristiques booléennes
    has_balcony BOOLEAN DEFAULT FALSE COMMENT 'Présence d\'un balcon',
    has_terrace BOOLEAN DEFAULT FALSE COMMENT 'Présence d\'une terrasse',
    has_garden BOOLEAN DEFAULT FALSE COMMENT 'Présence d\'un jardin',
    has_pool BOOLEAN DEFAULT FALSE COMMENT 'Présence d\'une piscine',
    has_garage BOOLEAN DEFAULT FALSE COMMENT 'Présence d\'un garage',
    has_parking BOOLEAN DEFAULT FALSE COMMENT 'Place de parking',
    has_elevator BOOLEAN DEFAULT FALSE COMMENT 'Ascenseur dans l\'immeuble',
    has_cellar BOOLEAN DEFAULT FALSE COMMENT 'Cave ou sous-sol',
    has_air_conditioning BOOLEAN DEFAULT FALSE COMMENT 'Climatisation',
    has_fireplace BOOLEAN DEFAULT FALSE COMMENT 'Cheminée',
    has_security BOOLEAN DEFAULT FALSE COMMENT 'Système de sécurité',
    has_intercom BOOLEAN DEFAULT FALSE COMMENT 'Interphone',
    has_fiber BOOLEAN DEFAULT FALSE COMMENT 'Fibre optique',
    is_furnished BOOLEAN DEFAULT FALSE COMMENT 'Bien meublé',
    is_accessible_pmr BOOLEAN DEFAULT FALSE COMMENT 'Accessible PMR',
    
    -- Disponibilité et visibilité
    availability_date DATE NULL 
        COMMENT 'Date de disponibilité du bien',
    is_featured BOOLEAN DEFAULT FALSE 
        COMMENT 'Bien mis en avant (premium)',
    is_sponsored BOOLEAN DEFAULT FALSE 
        COMMENT 'Bien sponsorisé (publicité payante)',
    is_exclusive BOOLEAN DEFAULT FALSE 
        COMMENT 'Exclusivité agence',
    is_virtual_tour BOOLEAN DEFAULT FALSE 
        COMMENT 'Visite virtuelle disponible',
    virtual_tour_url VARCHAR(500) NULL 
        COMMENT 'URL de la visite virtuelle',
    
    -- Statistiques et analytics
    views_count INT DEFAULT 0 
        COMMENT 'Nombre de vues de l\'annonce',
    favorites_count INT DEFAULT 0 
        COMMENT 'Nombre d\'ajouts en favoris',
    contacts_count INT DEFAULT 0 
        COMMENT 'Nombre de demandes de contact',
    visits_count INT DEFAULT 0 
        COMMENT 'Nombre de visites physiques',
    shares_count INT DEFAULT 0 
        COMMENT 'Nombre de partages sur réseaux sociaux',
    
    -- Gestion des annonces
    is_active BOOLEAN DEFAULT TRUE 
        COMMENT 'Annonce active et visible',
    published_at TIMESTAMP NULL 
        COMMENT 'Date de première publication',
    expires_at TIMESTAMP NULL 
        COMMENT 'Date d\'expiration de l\'annonce',
    priority_level ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal' 
        COMMENT 'Niveau de priorité pour l\'affichage',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL COMMENT 'Soft delete',
    
    -- Clé étrangère
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE,
    
    -- Index pour les performances de recherche
    INDEX idx_agent (agent_id),
    INDEX idx_type_transaction (type, transaction_type),
    INDEX idx_status_active (status, is_active),
    INDEX idx_price_range (price, transaction_type),
    INDEX idx_surface_range (surface),
    INDEX idx_location (city, district),
    INDEX idx_featured_sponsored (is_featured, is_sponsored, priority_level),
    INDEX idx_published (published_at, expires_at),
    INDEX idx_availability (availability_date, is_active),
    
    -- Index géospatial pour recherche par proximité
    SPATIAL INDEX idx_coordinates (latitude, longitude),
    
    -- Index composites pour recherches complexes
    INDEX idx_search_basic (type, transaction_type, city, is_active),
    INDEX idx_search_price (transaction_type, price, surface, is_active),
    INDEX idx_search_rooms (bedrooms, rooms, type, is_active),
    
    -- Index full-text pour recherche textuelle
    FULLTEXT INDEX idx_fulltext_search (title, description, address),
    
    -- Contraintes de validation
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT chk_surface_positive CHECK (surface > 0),
    CONSTRAINT chk_rooms_logical CHECK (rooms >= bedrooms AND bedrooms >= 0),
    CONSTRAINT chk_floor_logical CHECK (floor IS NULL OR total_floors IS NULL OR floor <= total_floors),
    CONSTRAINT chk_year_built_realistic CHECK (year_built IS NULL OR (year_built >= 1800 AND year_built <= YEAR(CURDATE()) + 5)),
    CONSTRAINT chk_coordinates_valid CHECK (
        (latitude IS NULL AND longitude IS NULL) OR 
        (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
    )
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Catalogue complet des biens immobiliers avec toutes caractéristiques et métadonnées';
```

### 📸 Table `property_images` - Images des biens

**Objectif** : Gestion optimisée des images avec métadonnées complètes

```sql
CREATE TABLE property_images (
    -- Identifiant
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL 
        COMMENT 'Référence vers le bien immobilier',
    
    -- Informations sur l'image
    image_path VARCHAR(500) NOT NULL 
        COMMENT 'Chemin de stockage de l\'image',
    image_url VARCHAR(500) NULL 
        COMMENT 'URL publique CDN de l\'image',
    thumbnail_url VARCHAR(500) NULL 
        COMMENT 'URL de la miniature optimisée',
    
    -- Métadonnées de l'image
    alt_text VARCHAR(255) NULL 
        COMMENT 'Texte alternatif pour l\'accessibilité',
    caption TEXT NULL 
        COMMENT 'Légende descriptive de l\'image',
    room_type VARCHAR(100) NULL 
        COMMENT 'Type de pièce photographiée',
    
    -- Organisation et affichage
    is_main BOOLEAN DEFAULT FALSE 
        COMMENT 'Image principale du bien',
    is_featured BOOLEAN DEFAULT FALSE 
        COMMENT 'Image mise en avant',
    order_index INT DEFAULT 0 
        COMMENT 'Ordre d\'affichage dans la galerie',
    
    -- Informations techniques
    file_name VARCHAR(255) NOT NULL 
        COMMENT 'Nom original du fichier',
    file_size INT NULL 
        COMMENT 'Taille du fichier en bytes',
    mime_type VARCHAR(100) NULL 
        COMMENT 'Type MIME de l\'image',
    dimensions VARCHAR(20) NULL 
        COMMENT 'Dimensions (largeur x hauteur)',
    width INT NULL COMMENT 'Largeur en pixels',
    height INT NULL COMMENT 'Hauteur en pixels',
    
    -- Traitement et qualité
    is_processed BOOLEAN DEFAULT FALSE 
        COMMENT 'Image traitée et optimisée',
    quality_score TINYINT NULL 
        COMMENT 'Score qualité de l\'image (1-10)',
    has_watermark BOOLEAN DEFAULT FALSE 
        COMMENT 'Filigrane appliqué',
    
    -- Métadonnées EXIF (optionnelles)
    camera_model VARCHAR(100) NULL 
        COMMENT 'Modèle d\'appareil photo',
    taken_at TIMESTAMP NULL 
        COMMENT 'Date de prise de vue',
    photographer VARCHAR(100) NULL 
        COMMENT 'Nom du photographe',
    
    -- Gestion
    is_active BOOLEAN DEFAULT TRUE 
        COMMENT 'Image active et visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clé étrangère
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Index
    INDEX idx_property_images (property_id, order_index),
    INDEX idx_main_image (property_id, is_main),
    INDEX idx_room_type (room_type),
    INDEX idx_active_images (is_active, is_processed),
    
    -- Contraintes
    CONSTRAINT chk_dimensions_positive CHECK (
        (width IS NULL OR width > 0) AND (height IS NULL OR height > 0)
    ),
    CONSTRAINT chk_quality_score_range CHECK (
        quality_score IS NULL OR (quality_score >= 1 AND quality_score <= 10)
    ),
    UNIQUE KEY unique_main_per_property (property_id, is_main) -- Une seule image principale par bien
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Images des biens immobiliers avec métadonnées complètes et optimisation';
```

### 🔧 Table `property_features` - Caractéristiques détaillées

**Objectif** : Stockage flexible des caractéristiques et équipements

```sql
CREATE TABLE property_features (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    
    -- Classification des caractéristiques
    feature_category ENUM(
        'equipment',      -- Équipements (lave-vaisselle, etc.)
        'service',        -- Services (gardien, etc.)
        'proximity',      -- Proximité (métro, écoles, etc.)
        'security',       -- Sécurité (alarme, etc.)
        'comfort',        -- Confort (climatisation, etc.)
        'exterior',       -- Extérieur (jardin, piscine, etc.)
        'technical',      -- Technique (fibre, etc.)
        'accessibility'   -- Accessibilité (PMR, etc.)
    ) NOT NULL COMMENT 'Catégorie de la caractéristique',
    
    feature_name VARCHAR(100) NOT NULL 
        COMMENT 'Nom de la caractéristique',
    feature_value VARCHAR(255) NULL 
        COMMENT 'Valeur si applicable (ex: "50 Mbps" pour fibre)',
    feature_description TEXT NULL 
        COMMENT 'Description détaillée si nécessaire',
    
    -- Importance et affichage
    is_highlight BOOLEAN DEFAULT FALSE 
        COMMENT 'Caractéristique mise en avant',
    display_order INT DEFAULT 0 
        COMMENT 'Ordre d\'affichage',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clés étrangères et index
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    INDEX idx_property_features (property_id, feature_category),
    INDEX idx_feature_name (feature_name),
    INDEX idx_highlights (is_highlight, display_order),
    
    -- Contrainte d'unicité
    UNIQUE KEY unique_feature_per_property (property_id, feature_name)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Caractéristiques détaillées et équipements des biens immobiliers';
```

### 📅 Table `reservations` - Réservations et demandes

**Objectif** : Gestion complète des demandes de réservation et visites

```sql
CREATE TABLE reservations (
    -- Identifiant unique
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Références optionnelles
    property_id BIGINT UNSIGNED NULL 
        COMMENT 'Bien spécifique (NULL pour recherche générale)',
    user_id BIGINT UNSIGNED NULL 
        COMMENT 'Utilisateur connecté (NULL pour visiteur)',
    assigned_agent_id BIGINT UNSIGNED NULL 
        COMMENT 'Agent assigné au traitement',
    
    -- Informations de contact (obligatoires)
    nom VARCHAR(255) NOT NULL 
        COMMENT 'Nom complet du demandeur',
    email VARCHAR(255) NOT NULL 
        COMMENT 'Email de contact',
    telephone VARCHAR(20) NOT NULL 
        COMMENT 'Numéro de téléphone',
    
    -- Type de demande
    type_transaction ENUM('louer', 'acheter', 'investir', 'estimer') NOT NULL 
        COMMENT 'Type de transaction souhaitée',
    
    -- Critères de recherche
    type_bien VARCHAR(100) NULL 
        COMMENT 'Type de bien recherché',
    localisation VARCHAR(255) NULL 
        COMMENT 'Zone géographique souhaitée',
    budget_min DECIMAL(12,2) NULL 
        COMMENT 'Budget minimum en euros',
    budget_max DECIMAL(12,2) NULL 
        COMMENT 'Budget maximum en euros',
    surface_min DECIMAL(8,2) NULL 
        COMMENT 'Surface minimum souhaitée',
    surface_max DECIMAL(8,2) NULL 
        COMMENT 'Surface maximum souhaitée',
    pieces VARCHAR(50) NULL 
        COMMENT 'Nombre de pièces souhaité',
    
    -- Préférences de visite
    date_visite_souhaitee DATE NULL 
        COMMENT 'Date de visite souhaitée',
    heure_visite ENUM('matin', 'apres-midi', 'soir', 'flexible') NULL 
        COMMENT 'Créneau horaire préféré',
    date_visite_confirmee DATETIME NULL 
        COMMENT 'Date et heure confirmées de la visite',
    
    -- Informations complémentaires
    commentaires TEXT NULL 
        COMMENT 'Commentaires et demandes spéciales',
    urgence ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal' 
        COMMENT 'Niveau d\'urgence de la demande',
    
    -- Suivi et statut
    status ENUM(
        'en_attente',     -- Nouvelle demande
        'en_cours',       -- En cours de traitement
        'confirme',       -- Visite confirmée
        'reporte',        -- Visite reportée
        'realise',        -- Visite réalisée
        'annule',         -- Annulée par le client
        'expire',         -- Expirée sans suite
        'converti'        -- Convertie en transaction
    ) DEFAULT 'en_attente' COMMENT 'Statut de la réservation',
    
    -- Suivi commercial
    source VARCHAR(50) DEFAULT 'website' 
        COMMENT 'Source de la demande (website, phone, etc.)',
    campaign_id VARCHAR(100) NULL 
        COMMENT 'ID de campagne marketing si applicable',
    conversion_probability TINYINT NULL 
        COMMENT 'Probabilité de conversion (1-10)',
    
    -- Feedback et résultat
    feedback_client TEXT NULL 
        COMMENT 'Retour du client après visite',
    rating_service TINYINT NULL 
        COMMENT 'Note du service (1-5)',
    resultat_visite ENUM(
        'interesse', 'tres_interesse', 'pas_interesse', 
        'dossier_depose', 'offre_faite', 'autre'
    ) NULL COMMENT 'Résultat de la visite',
    
    -- Métadonnées techniques
    ip_address VARCHAR(45) NULL 
        COMMENT 'Adresse IP du demandeur',
    user_agent TEXT NULL 
        COMMENT 'User agent du navigateur',
    referrer VARCHAR(500) NULL 
        COMMENT 'Page de provenance',
    
    -- Gestion temporelle
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL 
        COMMENT 'Date d\'expiration automatique',
    
    -- Clés étrangères
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    
    -- Index pour performance
    INDEX idx_status_date (status, created_at),
    INDEX idx_agent_assigned (assigned_agent_id, status),
    INDEX idx_property_reservations (property_id, status),
    INDEX idx_user_reservations (user_id, created_at DESC),
    INDEX idx_transaction_type (type_transaction, status),
    INDEX idx_urgence (urgence, status),
    INDEX idx_expiration (expires_at, status),
    
    -- Contraintes de validation
    CONSTRAINT chk_budget_logical CHECK (
        budget_min IS NULL OR budget_max IS NULL OR budget_min <= budget_max
    ),
    CONSTRAINT chk_surface_logical CHECK (
        surface_min IS NULL OR surface_max IS NULL OR surface_min <= surface_max
    ),
    CONSTRAINT chk_rating_range CHECK (
        rating_service IS NULL OR (rating_service >= 1 AND rating_service <= 5)
    )
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Réservations et demandes de visite avec suivi commercial complet';
```

### 📞 Table `contacts` - Messages de contact

**Objectif** : Gestion centralisée de tous les contacts clients

```sql
CREATE TABLE contacts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Informations de contact
    nom VARCHAR(255) NOT NULL 
        COMMENT 'Nom du contact',
    email VARCHAR(255) NOT NULL 
        COMMENT 'Email de contact',
    telephone VARCHAR(20) NULL 
        COMMENT 'Téléphone optionnel',
    entreprise VARCHAR(255) NULL 
        COMMENT 'Entreprise si contact professionnel',
    
    -- Message
    sujet VARCHAR(255) NOT NULL 
        COMMENT 'Sujet du message',
    message TEXT NOT NULL 
        COMMENT 'Contenu du message',
    
    -- Classification et priorité
    category ENUM(
        'general',        -- Demande générale
        'support',        -- Support technique
        'commercial',     -- Demande commerciale
        'technique',      -- Question technique
        'partenariat',    -- Demande de partenariat
        'reclamation',    -- Réclamation
        'suggestion'      -- Suggestion d'amélioration
    ) DEFAULT 'general' COMMENT 'Catégorie du message',
    
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal' 
        COMMENT 'Priorité du traitement',
    
    -- Suivi et traitement
    status ENUM(
        'nouveau',        -- Nouveau message
        'lu',            -- Message lu
        'en_cours',      -- En cours de traitement
        'en_attente',    -- En attente de retour client
        'traite',        -- Traité et résolu
        'ferme',         -- Fermé définitivement
        'spam'           -- Marqué comme spam
    ) DEFAULT 'nouveau' COMMENT 'Statut du traitement',
    
    assigned_to BIGINT UNSIGNED NULL 
        COMMENT 'Agent assigné au traitement',
    
    -- Réponse et résolution
    response_message TEXT NULL 
        COMMENT 'Message de réponse envoyé',
    response_sent BOOLEAN DEFAULT FALSE 
        COMMENT 'Réponse envoyée au client',
    resolution_notes TEXT NULL 
        COMMENT 'Notes de résolution interne',
    
    -- Satisfaction client
    satisfaction_rating TINYINT NULL 
        COMMENT 'Note de satisfaction client (1-5)',
    satisfaction_comment TEXT NULL 
        COMMENT 'Commentaire de satisfaction',
    
    -- Métadonnées techniques
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    source VARCHAR(50) DEFAULT 'website' 
        COMMENT 'Source du contact (website, phone, email, etc.)',
    
    -- Gestion temporelle
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    responded_at TIMESTAMP NULL 
        COMMENT 'Date de première réponse',
    resolved_at TIMESTAMP NULL 
        COMMENT 'Date de résolution',
    
    -- Clé étrangère
    FOREIGN KEY (assigned_to) REFERENCES agents(id) ON DELETE SET NULL,
    
    -- Index
    INDEX idx_status_priority (status, priority),
    INDEX idx_category_date (category, created_at),
    INDEX idx_assigned_agent (assigned_to, status),
    INDEX idx_response_tracking (response_sent, responded_at),
    
    -- Contraintes
    CONSTRAINT chk_satisfaction_range CHECK (
        satisfaction_rating IS NULL OR (satisfaction_rating >= 1 AND satisfaction_rating <= 5)
    )
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Messages de contact avec suivi complet et gestion de la satisfaction';
```

### ❤️ Table `favorites` - Favoris utilisateurs

**Objectif** : Gestion des biens favoris avec métadonnées

```sql
CREATE TABLE favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL 
        COMMENT 'Utilisateur propriétaire du favori',
    property_id BIGINT UNSIGNED NOT NULL 
        COMMENT 'Bien ajouté en favori',
    
    -- Métadonnées du favori
    notes TEXT NULL 
        COMMENT 'Notes personnelles de l\'utilisateur',
    tags JSON NULL 
        COMMENT 'Tags personnalisés pour organisation',
    
    -- Alertes et notifications
    alert_price_change BOOLEAN DEFAULT FALSE 
        COMMENT 'Alerte en cas de changement de prix',
    alert_status_change BOOLEAN DEFAULT FALSE 
        COMMENT 'Alerte en cas de changement de statut',
    last_price DECIMAL(12,2) NULL 
        COMMENT 'Dernier prix connu pour comparaison',
    
    -- Interaction
    view_count INT DEFAULT 0 
        COMMENT 'Nombre de fois consulté depuis ajout en favori',
    last_viewed_at TIMESTAMP NULL 
        COMMENT 'Dernière consultation',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clés étrangères
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    -- Index
    INDEX idx_user_favorites (user_id, created_at DESC),
    INDEX idx_property_favorites (property_id),
    INDEX idx_alerts (alert_price_change, alert_status_change),
    
    -- Contrainte d'unicité
    UNIQUE KEY unique_favorite (user_id, property_id)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Favoris utilisateurs avec alertes et métadonnées personnalisées';
```

### 📢 Table `advertisements` - Publicités et sponsoring

**Objectif** : Gestion complète des publicités avec analytics

```sql
CREATE TABLE advertisements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Contenu publicitaire
    title VARCHAR(255) NOT NULL 
        COMMENT 'Titre de la publicité',
    description TEXT NULL 
        COMMENT 'Description détaillée',
    image_url VARCHAR(500) NOT NULL 
        COMMENT 'URL de l\'image principale',
    link_url VARCHAR(500) NULL 
        COMMENT 'URL de destination au clic',
    call_to_action VARCHAR(100) NULL 
        COMMENT 'Texte du bouton d\'action',
    
    -- Positionnement et affichage
    position ENUM(
        'hero',           -- Bannière principale
        'sidebar',        -- Barre latérale
        'footer',         -- Pied de page
        'sponsored',      -- Contenu sponsorisé
        'banner_top',     -- Bannière haute
        'banner_bottom',  -- Bannière basse
        'popup',          -- Pop-up
        'inline'          -- Intégré dans le contenu
    ) NOT NULL COMMENT 'Position d\'affichage',
    
    page_location VARCHAR(100) NULL 
        COMMENT 'Page spécifique (home, search, property, etc.)',
    display_order INT DEFAULT 0 
        COMMENT 'Ordre d\'affichage si plusieurs pubs',
    
    -- Ciblage et audience
    target_audience JSON NULL 
        COMMENT 'Critères de ciblage (âge, localisation, etc.)',
    target_locations JSON NULL 
        COMMENT 'Villes ou régions ciblées',
    target_property_types JSON NULL 
        COMMENT 'Types de biens ciblés',
    
    -- Planification et budget
    is_active BOOLEAN DEFAULT TRUE 
        COMMENT 'Publicité active',
    start_date DATE NULL 
        COMMENT 'Date de début de campagne',
    end_date DATE NULL 
        COMMENT 'Date de fin de campagne',
    daily_budget DECIMAL(8,2) NULL 
        COMMENT 'Budget quotidien maximum',
    total_budget DECIMAL(10,2) NULL 
        COMMENT 'Budget total de la campagne',
    cost_per_click DECIMAL(6,2) NULL 
        COMMENT 'Coût par clic',
    
    -- Statistiques et performance
    impressions_count INT DEFAULT 0 
        COMMENT 'Nombre d\'affichages',
    clicks_count INT DEFAULT 0 
        COMMENT 'Nombre de clics',
    conversion_count INT DEFAULT 0 
        COMMENT 'Nombre de conversions',
    total_spent DECIMAL(10,2) DEFAULT 0.00 
        COMMENT 'Montant total dépensé',
    
    -- Informations annonceur
    advertiser_name VARCHAR(255) NULL 
        COMMENT 'Nom de l\'annonceur',
    advertiser_contact VARCHAR(255) NULL 
        COMMENT 'Contact de l\'annonceur',
    advertiser_type ENUM('internal', 'external', 'partner') DEFAULT 'external' 
        COMMENT 'Type d\'annonceur',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Index pour performance
    INDEX idx_active_ads (is_active, position, display_order),
    INDEX idx_date_range (start_date, end_date, is_active),
    INDEX idx_page_position (page_location, position),
    INDEX idx_performance (clicks_count DESC, impressions_count DESC),
    INDEX idx_advertiser (advertiser_type, advertiser_name),
    
    -- Contraintes
    CONSTRAINT chk_budget_positive CHECK (
        (daily_budget IS NULL OR daily_budget > 0) AND 
        (total_budget IS NULL OR total_budget > 0)
    ),
    CONSTRAINT chk_dates_logical CHECK (
        start_date IS NULL OR end_date IS NULL OR start_date <= end_date
    )
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Publicités et contenu sponsorisé avec analytics et ciblage avancé';
```

### ⚙️ Table `settings` - Configuration système

**Objectif** : Configuration flexible et évolutive du système

```sql
CREATE TABLE settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    
    -- Identification du paramètre
    key_name VARCHAR(255) UNIQUE NOT NULL 
        COMMENT 'Clé unique du paramètre',
    value TEXT NULL 
        COMMENT 'Valeur du paramètre (peut être JSON)',
    default_value TEXT NULL 
        COMMENT 'Valeur par défaut',
    
    -- Métadonnées du paramètre
    value_type ENUM(
        'string', 'number', 'boolean', 'json', 
        'array', 'email', 'url', 'color', 'date'
    ) DEFAULT 'string' COMMENT 'Type de données',
    
    category VARCHAR(100) DEFAULT 'general' 
        COMMENT 'Catégorie du paramètre',
    subcategory VARCHAR(100) NULL 
        COMMENT 'Sous-catégorie pour organisation',
    
    -- Description et aide
    label VARCHAR(255) NULL 
        COMMENT 'Libellé pour interface admin',
    description TEXT NULL 
        COMMENT 'Description détaillée du paramètre',
    help_text TEXT NULL 
        COMMENT 'Texte d\'aide pour l\'administrateur',
    
    -- Validation et contraintes
    validation_rules JSON NULL 
        COMMENT 'Règles de validation (min, max, regex, etc.)',
    possible_values JSON NULL 
        COMMENT 'Valeurs possibles pour les énumérations',
    
    -- Visibilité et permissions
    is_public BOOLEAN DEFAULT FALSE 
        COMMENT 'Visible côté client (API publique)',
    is_editable BOOLEAN DEFAULT TRUE 
        COMMENT 'Modifiable via interface admin',
    requires_restart BOOLEAN DEFAULT FALSE 
        COMMENT 'Nécessite un redémarrage pour prise en compte',
    
    -- Organisation interface admin
    display_order INT DEFAULT 0 
        COMMENT 'Ordre d\'affichage dans l\'admin',
    is_featured BOOLEAN DEFAULT FALSE 
        COMMENT 'Paramètre important à mettre en avant',
    
    -- Historique et audit
    last_modified_by VARCHAR(255) NULL 
        COMMENT 'Dernier utilisateur ayant modifié',
    previous_value TEXT NULL 
        COMMENT 'Valeur précédente pour rollback',
    
    -- Métadonnées
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Index
    INDEX idx_category (category, subcategory),
    INDEX idx_public_settings (is_public, key_name),
    INDEX idx_admin_display (category, display_order, is_featured),
    
    -- Contraintes
    CONSTRAINT chk_key_format CHECK (key_name REGEXP '^[a-z][a-z0-9_]*$')
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Configuration système flexible avec validation et historique';
```

---

## 🔗 Relations et contraintes

### Diagramme des relations principales

```
┌─────────────┐    1:N    ┌─────────────────┐    1:N    ┌─────────────────┐
│    agents   │ ────────→ │   properties    │ ────────→ │ property_images │
└─────────────┘           └─────────────────┘           └─────────────────┘
                                   │ 1:N
                                   ↓
                          ┌─────────────────┐
                          │property_features│
                          └─────────────────┘

┌─────────────┐    1:N    ┌─────────────────┐    N:1    ┌─────────────────┐
│    users    │ ────────→ │   favorites     │ ←──────── │   properties    │
└─────────────┘           └─────────────────┘           └─────────────────┘
       │ 1:N
       ↓
┌─────────────────┐    N:1    ┌─────────────────┐
│  reservations   │ ←──────── │   properties    │
└─────────────────┘           └─────────────────┘
       │ N:1
       ↓
┌─────────────┐
│   agents    │
└─────────────┘
```

### Contraintes d'intégrité détaillées

```sql
-- Contraintes de validation métier
ALTER TABLE users 
ADD CONSTRAINT chk_user_age_realistic 
CHECK (age >= 18 AND age <= 120);

ALTER TABLE properties 
ADD CONSTRAINT chk_property_logic 
CHECK (
    price > 0 AND 
    surface > 0 AND 
    rooms >= bedrooms AND 
    bedrooms >= 0 AND
    bathrooms >= 0
);

ALTER TABLE reservations 
ADD CONSTRAINT chk_reservation_budget 
CHECK (budget_min IS NULL OR budget_max IS NULL OR budget_min <= budget_max);

-- Contraintes de cohérence temporelle
ALTER TABLE properties 
ADD CONSTRAINT chk_property_dates 
CHECK (
    (published_at IS NULL OR expires_at IS NULL OR published_at <= expires_at) AND
    (year_built IS NULL OR year_built <= YEAR(CURDATE()))
);

-- Contraintes de géolocalisation
ALTER TABLE properties 
ADD CONSTRAINT chk_coordinates_valid 
CHECK (
    (latitude IS NULL AND longitude IS NULL) OR 
    (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
);
```

---

## 📈 Index et performances

### Stratégie d'indexation

```sql
-- Index composites pour recherches fréquentes
CREATE INDEX idx_property_search_basic ON properties 
(type, transaction_type, city, is_active, price);

CREATE INDEX idx_property_search_advanced ON properties 
(type, transaction_type, city, bedrooms, surface, price, is_active);

-- Index pour tri et pagination
CREATE INDEX idx_properties_listing ON properties 
(is_featured DESC, is_sponsored DESC, created_at DESC, id);

-- Index géospatial pour recherche par proximité
CREATE SPATIAL INDEX idx_property_location ON properties (latitude, longitude);

-- Index full-text pour recherche textuelle
CREATE FULLTEXT INDEX idx_property_fulltext ON properties 
(title, description, address);

-- Index pour analytics et statistiques
CREATE INDEX idx_property_analytics ON properties 
(created_at, type, transaction_type, city, price);

CREATE INDEX idx_reservation_analytics ON reservations 
(created_at, status, type_transaction, assigned_agent_id);
```

### Requêtes optimisées

```sql
-- Recherche de propriétés avec filtres multiples
PREPARE stmt_search_properties FROM '
SELECT p.*, a.nom as agent_name, a.telephone as agent_phone,
       pi.image_url as main_image,
       COUNT(f.id) as favorites_count
FROM properties p
JOIN agents a ON p.agent_id = a.id
LEFT JOIN property_images pi ON p.id = pi.property_id AND pi.is_main = 1
LEFT JOIN favorites f ON p.id = f.property_id
WHERE p.is_active = 1
  AND (? IS NULL OR p.type = ?)
  AND (? IS NULL OR p.transaction_type = ?)
  AND (? IS NULL OR p.city LIKE CONCAT("%", ?, "%"))
  AND (? IS NULL OR p.price >= ?)
  AND (? IS NULL OR p.price <= ?)
  AND (? IS NULL OR p.surface >= ?)
  AND (? IS NULL OR p.bedrooms >= ?)
GROUP BY p.id
ORDER BY p.is_featured DESC, p.is_sponsored DESC, p.created_at DESC
LIMIT ? OFFSET ?';

-- Statistiques dashboard optimisées
CREATE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM properties WHERE is_active = 1) as total_properties,
    (SELECT COUNT(*) FROM properties WHERE is_active = 1 AND status IN ('a_vendre', 'a_louer')) as available_properties,
    (SELECT COUNT(*) FROM users WHERE is_active = 1) as total_users,
    (SELECT COUNT(*) FROM reservations WHERE status = 'en_attente') as pending_reservations,
    (SELECT AVG(price) FROM properties WHERE is_active = 1 AND transaction_type = 'vente') as avg_sale_price,
    (SELECT AVG(price) FROM properties WHERE is_active = 1 AND transaction_type = 'location') as avg_rent_price,
    (SELECT COUNT(*) FROM contacts WHERE status = 'nouveau') as new_contacts;
```

---

## 🔄 Procédures stockées

### Procédures de gestion des propriétés

```sql
DELIMITER //

-- Procédure pour mettre à jour les statistiques d'une propriété
CREATE PROCEDURE UpdatePropertyStats(IN property_id BIGINT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    UPDATE properties p SET
        favorites_count = (
            SELECT COUNT(*) FROM favorites f WHERE f.property_id = p.id
        ),
        contacts_count = (
            SELECT COUNT(*) FROM reservations r 
            WHERE r.property_id = p.id AND r.status != 'spam'
        )
    WHERE p.id = property_id;
    
    COMMIT;
END //

-- Procédure pour archiver les propriétés expirées
CREATE PROCEDURE ArchiveExpiredProperties()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE prop_id BIGINT;
    DECLARE cur CURSOR FOR 
        SELECT id FROM properties 
        WHERE expires_at < NOW() AND is_active = 1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    START TRANSACTION;
    
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO prop_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        UPDATE properties 
        SET is_active = 0, status = 'expire' 
        WHERE id = prop_id;
        
        INSERT INTO activity_logs (table_name, record_id, action, details, created_at)
        VALUES ('properties', prop_id, 'auto_archive', 'Property expired automatically', NOW());
        
    END LOOP;
    CLOSE cur;
    
    COMMIT;
END //

DELIMITER ;
```

---

## 🔒 Sécurité et permissions

### Utilisateurs et rôles

```sql
-- Utilisateur application (lecture/écriture limitée)
CREATE USER 'benso_app'@'%' IDENTIFIED BY 'secure_app_password_2024!';
GRANT SELECT, INSERT, UPDATE ON benso.users TO 'benso_app'@'%';
GRANT SELECT, INSERT, UPDATE ON benso.properties TO 'benso_app'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON benso.favorites TO 'benso_app'@'%';
GRANT SELECT, INSERT, UPDATE ON benso.reservations TO 'benso_app'@'%';
GRANT SELECT, INSERT ON benso.contacts TO 'benso_app'@'%';
GRANT SELECT ON benso.agents TO 'benso_app'@'%';
GRANT SELECT ON benso.settings TO 'benso_app'@'%';

-- Utilisateur admin (accès complet)
CREATE USER 'benso_admin'@'%' IDENTIFIED BY 'ultra_secure_admin_2024!@#';
GRANT ALL PRIVILEGES ON benso.* TO 'benso_admin'@'%';

-- Utilisateur lecture seule (analytics et rapports)
CREATE USER 'benso_readonly'@'%' IDENTIFIED BY 'readonly_analytics_2024';
GRANT SELECT ON benso.* TO 'benso_readonly'@'%';

-- Utilisateur backup
CREATE USER 'benso_backup'@'localhost' IDENTIFIED BY 'backup_secure_2024';
GRANT SELECT, LOCK TABLES, SHOW VIEW ON benso.* TO 'benso_backup'@'localhost';
```

### Triggers de sécurité et audit

```sql
DELIMITER //

-- Audit des modifications sensibles sur les propriétés
CREATE TRIGGER audit_properties_changes
AFTER UPDATE ON properties
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price OR OLD.status != NEW.status OR OLD.is_active != NEW.is_active THEN
        INSERT INTO activity_logs (
            table_name, record_id, action, 
            old_values, new_values, 
            user_name, ip_address, created_at
        ) VALUES (
            'properties', NEW.id, 'UPDATE',
            JSON_OBJECT(
                'price', OLD.price, 
                'status', OLD.status, 
                'is_active', OLD.is_active
            ),
            JSON_OBJECT(
                'price', NEW.price, 
                'status', NEW.status, 
                'is_active', NEW.is_active
            ),
            USER(), 
            @user_ip_address,
            NOW()
        );
    END IF;
END //

-- Mise à jour automatique des compteurs
CREATE TRIGGER update_property_favorites_count
AFTER INSERT ON favorites
FOR EACH ROW
BEGIN
    UPDATE properties 
    SET favorites_count = favorites_count + 1,
        updated_at = NOW()
    WHERE id = NEW.property_id;
END //

CREATE TRIGGER decrease_property_favorites_count
AFTER DELETE ON favorites
FOR EACH ROW
BEGIN
    UPDATE properties 
    SET favorites_count = GREATEST(0, favorites_count - 1),
        updated_at = NOW()
    WHERE id = OLD.property_id;
END //

-- Validation automatique des données
CREATE TRIGGER validate_property_data
BEFORE INSERT ON properties
FOR EACH ROW
BEGIN
    -- Générer une référence unique si non fournie
    IF NEW.reference IS NULL OR NEW.reference = '' THEN
        SET NEW.reference = CONCAT('BENSO-', YEAR(NOW()), '-', LPAD(LAST_INSERT_ID(), 6, '0'));
    END IF;
    
    -- Valider la cohérence des données
    IF NEW.bedrooms > NEW.rooms THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Le nombre de chambres ne peut pas dépasser le nombre de pièces';
    END IF;
    
    -- Définir la date de publication si non spécifiée
    IF NEW.published_at IS NULL AND NEW.is_active = 1 THEN
        SET NEW.published_at = NOW();
    END IF;
END //

DELIMITER ;
```

---

## 💾 Sauvegarde et restauration

### Script de sauvegarde automatique

```bash
#!/bin/bash
# backup_benso_complete.sh - Sauvegarde complète avec rotation

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/benso"
DB_NAME="benso"
DB_USER="benso_backup"
DB_PASS="backup_secure_2024"
RETENTION_DAYS=30
S3_BUCKET="benso-backups"

# Créer le répertoire de sauvegarde
mkdir -p $BACKUP_DIR/{daily,weekly,monthly}

# Sauvegarde complète avec compression
echo "Début de la sauvegarde complète - $(date)"
mysqldump -u $DB_USER -p$DB_PASS \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --hex-blob \
    --opt \
    $DB_NAME | gzip > $BACKUP_DIR/daily/benso_full_$DATE.sql.gz

# Vérifier la sauvegarde
if [ $? -eq 0 ]; then
    echo "Sauvegarde complète réussie"
    
    # Upload vers S3 (optionnel)
    if command -v aws &> /dev/null; then
        aws s3 cp $BACKUP_DIR/daily/benso_full_$DATE.sql.gz s3://$S3_BUCKET/daily/
    fi
else
    echo "Erreur lors de la sauvegarde complète"
    exit 1
fi

# Sauvegarde structure seule
mysqldump -u $DB_USER -p$DB_PASS \
    --no-data \
    --routines \
    --triggers \
    --events \
    $DB_NAME | gzip > $BACKUP_DIR/daily/benso_structure_$DATE.sql.gz

# Sauvegarde données critiques uniquement
mysqldump -u $DB_USER -p$DB_PASS \
    --single-transaction \
    $DB_NAME users agents properties reservations contacts | \
    gzip > $BACKUP_DIR/daily/benso_critical_$DATE.sql.gz

# Sauvegarde hebdomadaire (dimanche)
if [ $(date +%u) -eq 7 ]; then
    cp $BACKUP_DIR/daily/benso_full_$DATE.sql.gz $BACKUP_DIR/weekly/
fi

# Sauvegarde mensuelle (1er du mois)
if [ $(date +%d) -eq 01 ]; then
    cp $BACKUP_DIR/daily/benso_full_$DATE.sql.gz $BACKUP_DIR/monthly/
fi

# Nettoyage des anciennes sauvegardes
find $BACKUP_DIR/daily -name "*.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR/weekly -name "*.gz" -mtime +90 -delete
find $BACKUP_DIR/monthly -name "*.gz" -mtime +365 -delete

# Log de fin
echo "Sauvegarde terminée - $(date)"
echo "Taille de la sauvegarde: $(du -h $BACKUP_DIR/daily/benso_full_$DATE.sql.gz | cut -f1)"
```

### Script de restauration

```bash
#!/bin/bash
# restore_benso.sh - Script de restauration avec vérifications

BACKUP_FILE=$1
DB_NAME="benso"
DB_USER="benso_admin"
DB_PASS="ultra_secure_admin_2024!@#"

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: $0 <backup_file.sql.gz>"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Fichier de sauvegarde non trouvé: $BACKUP_FILE"
    exit 1
fi

echo "ATTENTION: Cette opération va remplacer toutes les données de la base $DB_NAME"
read -p "Êtes-vous sûr de vouloir continuer? (oui/non): " confirm

if [ "$confirm" != "oui" ]; then
    echo "Restauration annulée"
    exit 0
fi

# Sauvegarde de sécurité avant restauration
echo "Création d'une sauvegarde de sécurité..."
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > /tmp/benso_before_restore_$(date +%Y%m%d_%H%M%S).sql.gz

# Restauration
echo "Début de la restauration..."
if [[ $BACKUP_FILE == *.gz ]]; then
    gunzip -c "$BACKUP_FILE" | mysql -u $DB_USER -p$DB_PASS $DB_NAME
else
    mysql -u $DB_USER -p$DB_PASS $DB_NAME < "$BACKUP_FILE"
fi

if [ $? -eq 0 ]; then
    echo "Restauration réussie"
    
    # Vérifications post-restauration
    echo "Vérification de l'intégrité..."
    mysql -u $DB_USER -p$DB_PASS $DB_NAME -e "
        SELECT 'users' as table_name, COUNT(*) as count FROM users
        UNION ALL
        SELECT 'properties', COUNT(*) FROM properties
        UNION ALL
        SELECT 'agents', COUNT(*) FROM agents
        UNION ALL
        SELECT 'reservations', COUNT(*) FROM reservations;
    "
else
    echo "Erreur lors de la restauration"
    exit 1
fi
```

---

## 🔄 Migrations et versioning

### Structure des migrations

```sql
-- Migration: 001_create_initial_schema.sql
-- Version: 1.0.0
-- Description: Création du schéma initial de la base de données BENSO
-- Date: 2024-01-01
-- Auteur: Équipe BENSO

/*
# Migration 001: Schéma Initial

## Objectif
Création de toutes les tables principales de la plateforme BENSO avec :
- Gestion des utilisateurs et agents
- Catalogue de propriétés complet
- Système de réservations
- Gestion des favoris et contacts
- Configuration système

## Tables créées
1. `users` - Utilisateurs de la plateforme
2. `agents` - Agents immobiliers
3. `properties` - Biens immobiliers
4. `property_images` - Images des biens
5. `property_features` - Caractéristiques détaillées
6. `reservations` - Réservations et demandes
7. `contacts` - Messages de contact
8. `favorites` - Favoris utilisateurs
9. `advertisements` - Publicités
10. `settings` - Configuration système

## Index créés
- Index de performance pour recherches
- Index géospatiaux pour localisation
- Index full-text pour recherche textuelle
- Index composites pour requêtes complexes

## Contraintes
- Contraintes d'intégrité référentielle
- Contraintes de validation métier
- Contraintes de cohérence des données

## Données initiales
- Configuration système de base
- Paramètres par défaut
*/

-- Vérification de la version MySQL
SELECT VERSION() as mysql_version;

-- Création des tables dans l'ordre des dépendances
-- [Contenu des CREATE TABLE déjà définis ci-dessus]

-- Insertion des données de configuration initiale
INSERT INTO settings (key_name, value, value_type, category, description, is_public) VALUES
('site_name', 'BENSO', 'string', 'general', 'Nom du site', true),
('site_description', 'Plateforme immobilière premium en Côte d\'Ivoire', 'string', 'general', 'Description du site', true),
('currency_primary', 'EUR', 'string', 'financial', 'Devise principale', true),
('currency_secondary', 'FCFA', 'string', 'financial', 'Devise secondaire', true),
('exchange_rate_eur_fcfa', '655.957', 'number', 'financial', 'Taux de change EUR vers FCFA', true),
('max_images_per_property', '15', 'number', 'properties', 'Nombre maximum d\'images par propriété', false),
('reservation_expiry_days', '30', 'number', 'reservations', 'Durée de validité des réservations en jours', false),
('contact_response_time_hours', '24', 'number', 'support', 'Temps de réponse garanti pour les contacts', true),
('featured_properties_limit', '10', 'number', 'properties', 'Nombre maximum de biens mis en avant', false),
('search_results_per_page', '12', 'number', 'search', 'Nombre de résultats par page', false);

-- Création des index de performance
-- [Index déjà définis dans les CREATE TABLE]

-- Vérification de l'intégrité
SELECT 'Migration 001 completed successfully' as status;
```

### Script de gestion des migrations

```bash
#!/bin/bash
# migrate.sh - Gestionnaire de migrations pour BENSO

MIGRATION_DIR="./migrations"
DB_NAME="benso"
DB_USER="benso_admin"
DB_PASS="ultra_secure_admin_2024!@#"
LOG_FILE="/var/log/benso_migrations.log"

# Fonction de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Créer la table de suivi des migrations
create_migration_table() {
    mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF
CREATE TABLE IF NOT EXISTS schema_migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version VARCHAR(50) NOT NULL UNIQUE,
    filename VARCHAR(255) NOT NULL,
    description TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    execution_time_ms INT,
    checksum VARCHAR(64),
    INDEX idx_version (version),
    INDEX idx_executed_at (executed_at)
);
EOF
}

# Calculer le checksum d'un fichier
calculate_checksum() {
    sha256sum "$1" | cut -d' ' -f1
}

# Exécuter une migration
execute_migration() {
    local migration_file=$1
    local filename=$(basename "$migration_file")
    local version=$(echo "$filename" | grep -o '^[0-9]\+')
    
    log "Début de la migration $filename"
    
    # Vérifier si déjà exécutée
    local count=$(mysql -u $DB_USER -p$DB_PASS $DB_NAME -se "
        SELECT COUNT(*) FROM schema_migrations WHERE filename='$filename'
    ")
    
    if [ "$count" -gt "0" ]; then
        log "Migration $filename déjà exécutée, ignorée"
        return 0
    fi
    
    # Calculer le checksum
    local checksum=$(calculate_checksum "$migration_file")
    
    # Mesurer le temps d'exécution
    local start_time=$(date +%s%3N)
    
    # Exécuter la migration dans une transaction
    mysql -u $DB_USER -p$DB_PASS $DB_NAME << EOF
START TRANSACTION;

-- Exécuter le contenu de la migration
$(cat "$migration_file")

-- Enregistrer la migration
INSERT INTO schema_migrations (version, filename, description, checksum, execution_time_ms)
VALUES (
    '$version',
    '$filename',
    'Migration executed automatically',
    '$checksum',
    $(($(date +%s%3N) - start_time))
);

COMMIT;
EOF
    
    if [ $? -eq 0 ]; then
        log "✓ Migration $filename exécutée avec succès"
        return 0
    else
        log "✗ Erreur lors de l'exécution de $filename"
        return 1
    fi
}

# Fonction principale
main() {
    log "Début du processus de migration"
    
    # Créer la table de migrations si nécessaire
    create_migration_table
    
    # Exécuter les migrations dans l'ordre
    local error_count=0
    for migration in $(ls $MIGRATION_DIR/*.sql | sort -V); do
        if ! execute_migration "$migration"; then
            ((error_count++))
        fi
    done
    
    if [ $error_count -eq 0 ]; then
        log "Toutes les migrations ont été exécutées avec succès"
        
        # Afficher le statut final
        mysql -u $DB_USER -p$DB_PASS $DB_NAME -e "
            SELECT 
                version,
                filename,
                executed_at,
                CONCAT(execution_time_ms, ' ms') as execution_time
            FROM schema_migrations 
            ORDER BY version DESC 
            LIMIT 10;
        "
    else
        log "Erreur: $error_count migration(s) ont échoué"
        exit 1
    fi
}

# Exécuter le script
main "$@"
```

---

## 📊 Optimisations et monitoring

### Configuration MySQL optimisée

```ini
# my.cnf - Configuration optimisée pour BENSO
[mysqld]

# Paramètres de base
server-id = 1
port = 3306
socket = /var/run/mysqld/mysqld.sock
datadir = /var/lib/mysql

# Mémoire et cache
innodb_buffer_pool_size = 4G          # 70-80% de la RAM disponible
innodb_log_file_size = 512M           # 25% du buffer pool
innodb_log_buffer_size = 64M
query_cache_size = 256M
query_cache_type = 1
query_cache_limit = 2M

# Connexions
max_connections = 500
max_user_connections = 450
thread_cache_size = 50
table_open_cache = 4000

# Performance InnoDB
innodb_flush_log_at_trx_commit = 2    # Performance vs sécurité
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1
innodb_read_io_threads = 8
innodb_write_io_threads = 8
innodb_io_capacity = 2000
innodb_io_capacity_max = 4000

# Optimisations pour recherche full-text
ft_min_word_len = 2
ft_stopword_file = ''
ft_query_expansion_limit = 20

# Logs et monitoring
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 1
log_queries_not_using_indexes = 1
log_slow_admin_statements = 1

# Sécurité
bind-address = 127.0.0.1
skip-name-resolve = 1
sql_mode = STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO

# Charset
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[mysql]
default-character-set = utf8mb4

[client]
default-character-set = utf8mb4
```

### Scripts de monitoring

```sql
-- Monitoring des performances
CREATE VIEW performance_overview AS
SELECT 
    -- Statistiques générales
    (SELECT COUNT(*) FROM properties WHERE is_active = 1) as active_properties,
    (SELECT COUNT(*) FROM users WHERE is_active = 1) as active_users,
    (SELECT COUNT(*) FROM reservations WHERE status = 'en_attente') as pending_reservations,
    
    -- Performance des requêtes
    (SELECT COUNT(*) FROM information_schema.processlist WHERE command != 'Sleep') as active_queries,
    (SELECT AVG(time) FROM information_schema.processlist WHERE command != 'Sleep') as avg_query_time,
    
    -- Utilisation de la mémoire
    (SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) 
     FROM information_schema.tables 
     WHERE table_schema = 'benso') as db_size_mb,
    
    -- Statistiques des tables principales
    (SELECT table_rows FROM information_schema.tables 
     WHERE table_schema = 'benso' AND table_name = 'properties') as properties_count,
    (SELECT table_rows FROM information_schema.tables 
     WHERE table_schema = 'benso' AND table_name = 'users') as users_count;

-- Requêtes lentes et problématiques
SELECT 
    DIGEST_TEXT as query_pattern,
    COUNT_STAR as execution_count,
    ROUND(AVG_TIMER_WAIT/1000000000, 2) as avg_time_seconds,
    ROUND(MAX_TIMER_WAIT/1000000000, 2) as max_time_seconds,
    ROUND(SUM_ROWS_EXAMINED/COUNT_STAR, 0) as avg_rows_examined,
    ROUND(SUM_ROWS_SENT/COUNT_STAR, 0) as avg_rows_sent
FROM performance_schema.events_statements_summary_by_digest
WHERE DIGEST_TEXT IS NOT NULL
  AND DIGEST_TEXT NOT LIKE '%performance_schema%'
  AND DIGEST_TEXT NOT LIKE '%information_schema%'
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 20;

-- Utilisation des index
SELECT 
    OBJECT_SCHEMA as database_name,
    OBJECT_NAME as table_name,
    INDEX_NAME,
    COUNT_FETCH as select_count,
    COUNT_INSERT as insert_count,
    COUNT_UPDATE as update_count,
    COUNT_DELETE as delete_count,
    ROUND((COUNT_FETCH + COUNT_INSERT + COUNT_UPDATE + COUNT_DELETE), 0) as total_operations
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'benso'
  AND INDEX_NAME IS NOT NULL
ORDER BY total_operations DESC;
```

---

## 🛠️ Scripts utiles

### Script de maintenance automatique

```sql
DELIMITER //

-- Procédure de maintenance complète
CREATE PROCEDURE MaintenanceComplete()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- 1. Nettoyer les données expirées
    DELETE FROM reservations 
    WHERE status = 'expire' 
      AND created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
    
    DELETE FROM contacts 
    WHERE status IN ('traite', 'ferme') 
      AND updated_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
    
    -- 2. Mettre à jour les statistiques des propriétés
    UPDATE properties p SET 
        favorites_count = (
            SELECT COUNT(*) FROM favorites f WHERE f.property_id = p.id
        ),
        contacts_count = (
            SELECT COUNT(*) FROM reservations r 
            WHERE r.property_id = p.id AND r.status != 'spam'
        );
    
    -- 3. Mettre à jour les statistiques des agents
    UPDATE agents a SET 
        total_sales = (
            SELECT COUNT(*) FROM properties p 
            WHERE p.agent_id = a.id AND p.status = 'vendu'
        ),
        total_rentals = (
            SELECT COUNT(*) FROM properties p 
            WHERE p.agent_id = a.id AND p.status = 'loue'
        );
    
    -- 4. Archiver les propriétés expirées
    UPDATE properties 
    SET is_active = 0, status = 'expire' 
    WHERE expires_at < NOW() AND is_active = 1;
    
    -- 5. Optimiser les tables principales
    -- Note: OPTIMIZE TABLE ne peut pas être dans une transaction
    
    COMMIT;
    
    -- Log de la maintenance
    INSERT INTO activity_logs (table_name, action, details, created_at)
    VALUES ('system', 'maintenance', 'Maintenance automatique exécutée', NOW());
    
END //

DELIMITER ;

-- Programmer l'exécution via événement MySQL
CREATE EVENT IF NOT EXISTS maintenance_hebdomadaire
ON SCHEDULE EVERY 1 WEEK
STARTS '2024-01-07 02:00:00'  -- Dimanche à 2h du matin
DO
  CALL MaintenanceComplete();
```

### Script de génération de données de test

```sql
DELIMITER //

CREATE PROCEDURE GenerateTestData()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE agent_count INT DEFAULT 10;
    DECLARE property_count INT DEFAULT 1000;
    DECLARE user_count INT DEFAULT 500;
    
    -- Générer des agents de test
    WHILE i <= agent_count DO
        INSERT INTO agents (
            nom, email, telephone, whatsapp, specialite, 
            experience_years, rating, is_active
        ) VALUES (
            CONCAT('Agent Test ', i),
            CONCAT('agent', i, '@benso-test.com'),
            CONCAT('+225070707', LPAD(i, 4, '0')),
            CONCAT('225070707', LPAD(i, 4, '0')),
            ELT(FLOOR(RAND() * 3) + 1, 'vente', 'location', 'investissement'),
            FLOOR(RAND() * 15) + 1,
            ROUND(RAND() * 2 + 3, 2),  -- Rating entre 3.00 et 5.00
            1
        );
        SET i = i + 1;
    END WHILE;
    
    -- Générer des utilisateurs de test
    SET i = 1;
    WHILE i <= user_count DO
        INSERT INTO users (
            nom, email, age, localite, nationalite, 
            is_active, password
        ) VALUES (
            CONCAT('Utilisateur Test ', i),
            CONCAT('user', i, '@test.com'),
            FLOOR(RAND() * 50) + 20,  -- Âge entre 20 et 70
            ELT(FLOOR(RAND() * 5) + 1, 'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'),
            'Ivoirienne',
            1,
            '$2y$12$dummy.hash.for.testing.purposes.only'
        );
        SET i = i + 1;
    END WHILE;
    
    -- Générer des propriétés de test
    SET i = 1;
    WHILE i <= property_count DO
        INSERT INTO properties (
            agent_id, reference, title, description, type, status, 
            transaction_type, price, surface, rooms, bedrooms, bathrooms,
            address, city, postal_code, is_active
        ) VALUES (
            FLOOR(RAND() * agent_count) + 1,
            CONCAT('TEST-', YEAR(NOW()), '-', LPAD(i, 6, '0')),
            CONCAT('Propriété test ', i),
            'Description générée automatiquement pour les tests de performance et de fonctionnalité.',
            ELT(FLOOR(RAND() * 6) + 1, 'appartement', 'maison', 'studio', 'villa', 'loft', 'duplex'),
            ELT(FLOOR(RAND() * 2) + 1, 'a_vendre', 'a_louer'),
            ELT(FLOOR(RAND() * 2) + 1, 'vente', 'location'),
            FLOOR(RAND() * 800000) + 50000,  -- Prix entre 50k et 850k
            FLOOR(RAND() * 200) + 20,        -- Surface entre 20 et 220 m²
            FLOOR(RAND() * 8) + 1,           -- Pièces entre 1 et 8
            FLOOR(RAND() * 5) + 1,           -- Chambres entre 1 et 5
            FLOOR(RAND() * 3) + 1,           -- SDB entre 1 et 3
            CONCAT('Adresse test ', i, ', Rue de la Paix'),
            ELT(FLOOR(RAND() * 5) + 1, 'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'),
            LPAD(FLOOR(RAND() * 99999), 5, '0'),
            1
        );
        SET i = i + 1;
    END WHILE;
    
    SELECT 'Données de test générées avec succès' as message,
           agent_count as agents_created,
           user_count as users_created,
           property_count as properties_created;
           
END //

DELIMITER ;
```

---

## 📞 Support et maintenance

### Contacts techniques
- **Architecte Base de Données** : [Nom] - [email]
- **DBA Principal** : [Nom] - [email]
- **Développeur Backend** : [Nom] - [email]
- **DevOps** : [Nom] - [email]

### Procédures d'urgence

#### 1. Panne de base de données
```bash
# Vérifier le statut du service
systemctl status mysql

# Redémarrer le service
sudo systemctl restart mysql

# Vérifier les logs d'erreur
tail -f /var/log/mysql/error.log

# Basculer sur le serveur de secours si nécessaire
# [Procédure de failover à définir selon l'infrastructure]
```

#### 2. Corruption de données
```bash
# Arrêter l'application
sudo systemctl stop benso-app

# Vérifier l'intégrité des tables
mysqlcheck -u benso_admin -p --check --all-databases

# Réparer si nécessaire
mysqlcheck -u benso_admin -p --repair benso

# Restaurer depuis la dernière sauvegarde si corruption majeure
./restore_benso.sh /var/backups/benso/daily/benso_full_latest.sql.gz
```

#### 3. Performance dégradée
```sql
-- Identifier les requêtes lentes
SELECT * FROM performance_overview;

-- Analyser les verrous
SHOW PROCESSLIST;

-- Vérifier l'utilisation des index
SELECT * FROM sys.schema_unused_indexes WHERE object_schema = 'benso';

-- Optimiser les tables si nécessaire
OPTIMIZE TABLE properties, users, reservations;
```

### Documentation complémentaire
- **Schéma ER complet** : `docs/database_er_diagram.pdf`
- **Dictionnaire de données** : `docs/data_dictionary.xlsx`
- **Procédures de sauvegarde** : `docs/backup_procedures.md`
- **Guide de performance** : `docs/performance_tuning.md`
- **Procédures d'urgence** : `docs/emergency_procedures.md`

---

## 📈 Métriques et KPI

### Métriques de performance
- **Temps de réponse moyen** : < 200ms pour les requêtes simples
- **Débit** : > 1000 requêtes/seconde
- **Disponibilité** : 99.9% (objectif SLA)
- **Taille de base** : Croissance < 10% par mois

### Métriques métier
- **Propriétés actives** : Nombre de biens disponibles
- **Taux de conversion** : Réservations → Transactions
- **Satisfaction client** : Note moyenne des contacts
- **Performance agents** : Ventes par agent

---

*Documentation mise à jour le : 2024-12-01*  
*Version de la base de données : 2.0.0*  
*Auteur : Équipe Technique BENSO*