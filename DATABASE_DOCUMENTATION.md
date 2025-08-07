# BENSO - Documentation Base de Données

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture de la base de données](#architecture-de-la-base-de-données)
3. [Schémas des tables](#schémas-des-tables)
4. [Relations entre tables](#relations-entre-tables)
5. [Index et performances](#index-et-performances)
6. [Procédures stockées](#procédures-stockées)
7. [Sécurité et permissions](#sécurité-et-permissions)
8. [Sauvegarde et restauration](#sauvegarde-et-restauration)
9. [Migrations](#migrations)
10. [Optimisations](#optimisations)

---

## 🗄️ Vue d'ensemble

La base de données BENSO est conçue pour gérer une plateforme immobilière complète avec :

- **Gestion des utilisateurs** et authentification
- **Catalogue de propriétés** avec métadonnées riches
- **Système de réservations** et visites
- **Gestion des agents** immobiliers
- **Favoris et préférences** utilisateurs
- **Système de contact** et notifications
- **Publicités** et contenu sponsorisé
- **Configuration** système

### Caractéristiques techniques
- **SGBD** : MySQL 8.0+
- **Moteur** : InnoDB
- **Charset** : utf8mb4_unicode_ci
- **Contraintes** : Clés étrangères activées
- **Sécurité** : Row Level Security (RLS)

---

## 🏗️ Architecture de la base de données

```
benso_database/
├── users/                 # Gestion utilisateurs
│   ├── users
│   └── user_preferences
├── properties/            # Catalogue immobilier
│   ├── properties
│   ├── property_images
│   ├── property_features
│   └── property_analytics
├── agents/               # Agents immobiliers
│   └── agents
├── transactions/         # Réservations et contacts
│   ├── reservations
│   └── contacts
├── favorites/           # Système de favoris
│   └── favorites
├── content/            # Contenu et publicités
│   ├── advertisements
│   └── settings
└── logs/              # Audit et logs
    └── activity_logs
```

---

## 📊 Schémas des tables

### Table `users`
**Gestion des utilisateurs de la plateforme**

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL COMMENT 'Nom complet de l\'utilisateur',
    email VARCHAR(255) UNIQUE NOT NULL COMMENT 'Email unique',
    email_verified_at TIMESTAMP NULL COMMENT 'Date de vérification email',
    password VARCHAR(255) NOT NULL COMMENT 'Mot de passe hashé',
    age INT NOT NULL COMMENT 'Âge de l\'utilisateur',
    localite VARCHAR(255) NOT NULL COMMENT 'Ville/région',
    nationalite VARCHAR(255) NOT NULL COMMENT 'Nationalité',
    telephone VARCHAR(20) NULL COMMENT 'Numéro de téléphone',
    avatar VARCHAR(255) NULL COMMENT 'URL de l\'avatar',
    is_admin BOOLEAN DEFAULT FALSE COMMENT 'Statut administrateur',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Compte actif',
    last_login_at TIMESTAMP NULL COMMENT 'Dernière connexion',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_active (is_active),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `agents`
**Agents immobiliers et commerciaux**

```sql
CREATE TABLE agents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL COMMENT 'Nom de l\'agent',
    email VARCHAR(255) UNIQUE NOT NULL COMMENT 'Email professionnel',
    telephone VARCHAR(20) NOT NULL COMMENT 'Téléphone principal',
    whatsapp VARCHAR(20) NOT NULL COMMENT 'Numéro WhatsApp Business',
    photo VARCHAR(255) NULL COMMENT 'Photo de profil',
    specialite VARCHAR(255) NULL COMMENT 'Spécialité (vente, location, etc.)',
    description TEXT NULL COMMENT 'Présentation de l\'agent',
    experience_years INT DEFAULT 0 COMMENT 'Années d\'expérience',
    rating DECIMAL(3,2) DEFAULT 0.00 COMMENT 'Note moyenne (0-5)',
    total_sales INT DEFAULT 0 COMMENT 'Nombre de ventes réalisées',
    languages JSON NULL COMMENT 'Langues parlées',
    certifications JSON NULL COMMENT 'Certifications professionnelles',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Agent actif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_specialite (specialite),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `properties`
**Catalogue des biens immobiliers**

```sql
CREATE TABLE properties (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agent_id BIGINT UNSIGNED NOT NULL COMMENT 'Agent responsable',
    reference VARCHAR(50) UNIQUE NOT NULL COMMENT 'Référence unique du bien',
    title VARCHAR(255) NOT NULL COMMENT 'Titre de l\'annonce',
    description TEXT NOT NULL COMMENT 'Description détaillée',
    
    -- Type et transaction
    type ENUM('appartement', 'maison', 'studio', 'terrain', 'loft', 'bureau', 'commerce', 'villa', 'duplex') NOT NULL,
    status ENUM('a_vendre', 'a_louer', 'reserve', 'vendu', 'loue', 'retire') NOT NULL,
    transaction_type ENUM('vente', 'location') NOT NULL,
    
    -- Prix et charges
    price DECIMAL(12,2) NOT NULL COMMENT 'Prix principal',
    price_fcfa DECIMAL(15,2) GENERATED ALWAYS AS (price * 655.957) STORED COMMENT 'Prix en FCFA',
    charges DECIMAL(8,2) NULL COMMENT 'Charges mensuelles',
    deposit DECIMAL(10,2) NULL COMMENT 'Dépôt de garantie',
    agency_fees DECIMAL(8,2) NULL COMMENT 'Frais d\'agence',
    
    -- Caractéristiques physiques
    surface DECIMAL(8,2) NOT NULL COMMENT 'Surface en m²',
    rooms INT NOT NULL COMMENT 'Nombre de pièces',
    bedrooms INT NOT NULL COMMENT 'Nombre de chambres',
    bathrooms INT NOT NULL COMMENT 'Nombre de salles de bain',
    floor INT NULL COMMENT 'Étage',
    total_floors INT NULL COMMENT 'Nombre d\'étages total',
    year_built INT NULL COMMENT 'Année de construction',
    last_renovation INT NULL COMMENT 'Année de dernière rénovation',
    
    -- État et performance énergétique
    condition_state ENUM('neuf', 'renove', 'bon_etat', 'a_renover', 'a_demolir') NOT NULL,
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NULL,
    heating_type ENUM('central', 'individual', 'electric', 'gas', 'solar', 'none') NULL,
    
    -- Localisation
    address TEXT NOT NULL COMMENT 'Adresse complète',
    city VARCHAR(255) NOT NULL COMMENT 'Ville',
    district VARCHAR(255) NULL COMMENT 'Quartier/arrondissement',
    postal_code VARCHAR(10) NOT NULL COMMENT 'Code postal',
    country VARCHAR(100) DEFAULT 'Côte d\'Ivoire',
    latitude DECIMAL(10, 8) NULL COMMENT 'Coordonnée GPS latitude',
    longitude DECIMAL(11, 8) NULL COMMENT 'Coordonnée GPS longitude',
    
    -- Équipements et caractéristiques
    has_balcony BOOLEAN DEFAULT FALSE,
    has_terrace BOOLEAN DEFAULT FALSE,
    has_garden BOOLEAN DEFAULT FALSE,
    has_pool BOOLEAN DEFAULT FALSE,
    has_garage BOOLEAN DEFAULT FALSE,
    has_parking BOOLEAN DEFAULT TRUE,
    has_elevator BOOLEAN DEFAULT FALSE,
    has_cellar BOOLEAN DEFAULT FALSE,
    has_air_conditioning BOOLEAN DEFAULT FALSE,
    is_furnished BOOLEAN DEFAULT FALSE,
    
    -- Disponibilité et visibilité
    availability_date DATE NULL COMMENT 'Date de disponibilité',
    is_featured BOOLEAN DEFAULT FALSE COMMENT 'Bien mis en avant',
    is_sponsored BOOLEAN DEFAULT FALSE COMMENT 'Bien sponsorisé',
    is_exclusive BOOLEAN DEFAULT FALSE COMMENT 'Exclusivité agence',
    
    -- Statistiques
    views_count INT DEFAULT 0 COMMENT 'Nombre de vues',
    favorites_count INT DEFAULT 0 COMMENT 'Nombre de favoris',
    contacts_count INT DEFAULT 0 COMMENT 'Nombre de contacts',
    visits_count INT DEFAULT 0 COMMENT 'Nombre de visites',
    
    -- Métadonnées
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Annonce active',
    published_at TIMESTAMP NULL COMMENT 'Date de publication',
    expires_at TIMESTAMP NULL COMMENT 'Date d\'expiration',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE CASCADE,
    
    -- Index pour les performances
    INDEX idx_agent (agent_id),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_transaction (transaction_type),
    INDEX idx_price (price),
    INDEX idx_surface (surface),
    INDEX idx_city (city),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    INDEX idx_sponsored (is_sponsored),
    INDEX idx_published (published_at),
    INDEX idx_location (latitude, longitude),
    
    -- Index composites pour les recherches fréquentes
    INDEX idx_search_basic (type, transaction_type, is_active),
    INDEX idx_search_price (transaction_type, price, is_active),
    INDEX idx_search_location (city, type, transaction_type, is_active),
    
    -- Index full-text pour la recherche textuelle
    FULLTEXT INDEX idx_fulltext (title, description, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `property_images`
**Images des propriétés**

```sql
CREATE TABLE property_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    image_path VARCHAR(500) NOT NULL COMMENT 'Chemin vers l\'image',
    image_url VARCHAR(500) NULL COMMENT 'URL publique de l\'image',
    alt_text VARCHAR(255) NULL COMMENT 'Texte alternatif',
    room_type VARCHAR(100) NULL COMMENT 'Type de pièce (salon, cuisine, etc.)',
    is_main BOOLEAN DEFAULT FALSE COMMENT 'Image principale',
    order_index INT DEFAULT 0 COMMENT 'Ordre d\'affichage',
    file_size INT NULL COMMENT 'Taille du fichier en bytes',
    dimensions VARCHAR(20) NULL COMMENT 'Dimensions (ex: 1920x1080)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    INDEX idx_property (property_id),
    INDEX idx_main (is_main),
    INDEX idx_order (order_index),
    UNIQUE KEY unique_main_per_property (property_id, is_main)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `property_features`
**Caractéristiques et équipements des propriétés**

```sql
CREATE TABLE property_features (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NOT NULL,
    feature_type ENUM('equipment', 'service', 'proximity', 'security', 'comfort') NOT NULL,
    feature_name VARCHAR(100) NOT NULL COMMENT 'Nom de la caractéristique',
    feature_value VARCHAR(255) NULL COMMENT 'Valeur si applicable',
    is_highlight BOOLEAN DEFAULT FALSE COMMENT 'Caractéristique mise en avant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    INDEX idx_property (property_id),
    INDEX idx_type (feature_type),
    INDEX idx_highlight (is_highlight),
    UNIQUE KEY unique_feature_per_property (property_id, feature_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `reservations`
**Réservations et demandes de visite**

```sql
CREATE TABLE reservations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT UNSIGNED NULL COMMENT 'Propriété spécifique (optionnel)',
    user_id BIGINT UNSIGNED NULL COMMENT 'Utilisateur connecté (optionnel)',
    
    -- Informations contact
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    
    -- Critères de recherche
    type_transaction ENUM('louer', 'acheter') NOT NULL,
    type_bien VARCHAR(100) NULL,
    localisation VARCHAR(255) NULL,
    budget_min DECIMAL(12,2) NULL,
    budget_max DECIMAL(12,2) NULL,
    surface_min DECIMAL(8,2) NULL,
    pieces VARCHAR(50) NULL COMMENT 'Nombre de pièces souhaité',
    
    -- Préférences de visite
    date_visite DATE NULL,
    heure_visite ENUM('matin', 'apres-midi', 'soir') NULL,
    commentaires TEXT NULL,
    
    -- Suivi
    status ENUM('en_attente', 'confirme', 'annule', 'traite', 'expire') DEFAULT 'en_attente',
    assigned_agent_id BIGINT UNSIGNED NULL COMMENT 'Agent assigné',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    source VARCHAR(50) DEFAULT 'website' COMMENT 'Source de la réservation',
    
    -- Métadonnées
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    referrer VARCHAR(500) NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL COMMENT 'Date d\'expiration de la demande',
    
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_agent_id) REFERENCES agents(id) ON DELETE SET NULL,
    
    INDEX idx_property (property_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_agent (assigned_agent_id),
    INDEX idx_transaction (type_transaction),
    INDEX idx_created (created_at),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `contacts`
**Messages de contact général**

```sql
CREATE TABLE contacts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NULL,
    sujet VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Classification
    category ENUM('general', 'support', 'commercial', 'technique', 'partenariat') DEFAULT 'general',
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    
    -- Suivi
    status ENUM('nouveau', 'en_cours', 'traite', 'ferme') DEFAULT 'nouveau',
    assigned_to BIGINT UNSIGNED NULL COMMENT 'Assigné à un agent',
    response_sent BOOLEAN DEFAULT FALSE,
    
    -- Métadonnées
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    source VARCHAR(50) DEFAULT 'website',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    responded_at TIMESTAMP NULL,
    
    FOREIGN KEY (assigned_to) REFERENCES agents(id) ON DELETE SET NULL,
    
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_priority (priority),
    INDEX idx_assigned (assigned_to),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `favorites`
**Favoris des utilisateurs**

```sql
CREATE TABLE favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    property_id BIGINT UNSIGNED NOT NULL,
    notes TEXT NULL COMMENT 'Notes personnelles de l\'utilisateur',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_favorite (user_id, property_id),
    INDEX idx_user (user_id),
    INDEX idx_property (property_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `advertisements`
**Publicités et contenu sponsorisé**

```sql
CREATE TABLE advertisements (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image_url VARCHAR(500) NOT NULL,
    link_url VARCHAR(500) NULL,
    
    -- Positionnement
    position ENUM('hero', 'sidebar', 'footer', 'sponsored', 'banner', 'popup') NOT NULL,
    page_location VARCHAR(100) NULL COMMENT 'Page spécifique (home, search, etc.)',
    
    -- Ciblage
    target_audience JSON NULL COMMENT 'Critères de ciblage',
    target_locations JSON NULL COMMENT 'Villes ciblées',
    
    -- Planification
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE NULL,
    end_date DATE NULL,
    daily_budget DECIMAL(8,2) NULL,
    total_budget DECIMAL(10,2) NULL,
    
    -- Statistiques
    impressions_count INT DEFAULT 0,
    clicks_count INT DEFAULT 0,
    conversion_count INT DEFAULT 0,
    
    -- Métadonnées
    advertiser_name VARCHAR(255) NULL,
    advertiser_contact VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_position (position),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_page (page_location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table `settings`
**Configuration système**

```sql
CREATE TABLE settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NULL,
    value_type ENUM('string', 'number', 'boolean', 'json', 'array') DEFAULT 'string',
    category VARCHAR(100) DEFAULT 'general',
    description TEXT NULL,
    is_public BOOLEAN DEFAULT FALSE COMMENT 'Visible côté client',
    is_editable BOOLEAN DEFAULT TRUE COMMENT 'Modifiable via admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_public (is_public)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔗 Relations entre tables

### Diagramme des relations

```
users (1) ←→ (N) favorites (N) ←→ (1) properties
users (1) ←→ (N) reservations (N) ←→ (1) properties
agents (1) ←→ (N) properties
agents (1) ←→ (N) reservations (assigned)
agents (1) ←→ (N) contacts (assigned)
properties (1) ←→ (N) property_images
properties (1) ←→ (N) property_features
```

### Contraintes d'intégrité

```sql
-- Contraintes de validation
ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 18 AND age <= 120);
ALTER TABLE properties ADD CONSTRAINT chk_price CHECK (price > 0);
ALTER TABLE properties ADD CONSTRAINT chk_surface CHECK (surface > 0);
ALTER TABLE properties ADD CONSTRAINT chk_rooms CHECK (rooms >= 0);

-- Contraintes de cohérence
ALTER TABLE properties ADD CONSTRAINT chk_bedrooms_rooms 
    CHECK (bedrooms <= rooms);
ALTER TABLE properties ADD CONSTRAINT chk_floor_total 
    CHECK (floor IS NULL OR total_floors IS NULL OR floor <= total_floors);
```

---

## 📈 Index et performances

### Index principaux

```sql
-- Index de recherche fréquente
CREATE INDEX idx_properties_search ON properties 
    (type, transaction_type, city, price, is_active);

-- Index géospatial
CREATE SPATIAL INDEX idx_properties_location ON properties (latitude, longitude);

-- Index pour les statistiques
CREATE INDEX idx_properties_stats ON properties 
    (created_at, is_active, is_featured);

-- Index pour les favoris par utilisateur
CREATE INDEX idx_favorites_user_recent ON favorites 
    (user_id, created_at DESC);
```

### Optimisations de requêtes

```sql
-- Vue pour les propriétés avec statistiques
CREATE VIEW properties_with_stats AS
SELECT 
    p.*,
    COUNT(f.id) as favorites_total,
    COUNT(pi.id) as images_count,
    AVG(a.rating) as agent_rating
FROM properties p
LEFT JOIN favorites f ON p.id = f.property_id
LEFT JOIN property_images pi ON p.id = pi.property_id
LEFT JOIN agents a ON p.agent_id = a.id
WHERE p.is_active = TRUE
GROUP BY p.id;

-- Vue pour les recherches populaires
CREATE VIEW popular_searches AS
SELECT 
    city,
    type,
    transaction_type,
    COUNT(*) as search_count,
    AVG(price) as avg_price
FROM properties 
WHERE is_active = TRUE 
    AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY city, type, transaction_type
ORDER BY search_count DESC;
```

---

## 🔒 Sécurité et permissions

### Utilisateurs de base de données

```sql
-- Utilisateur application (lecture/écriture limitée)
CREATE USER 'benso_app'@'%' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON benso.* TO 'benso_app'@'%';
GRANT DELETE ON benso.favorites TO 'benso_app'@'%';
GRANT DELETE ON benso.property_images TO 'benso_app'@'%';

-- Utilisateur admin (accès complet)
CREATE USER 'benso_admin'@'%' IDENTIFIED BY 'admin_secure_password';
GRANT ALL PRIVILEGES ON benso.* TO 'benso_admin'@'%';

-- Utilisateur lecture seule (analytics)
CREATE USER 'benso_readonly'@'%' IDENTIFIED BY 'readonly_password';
GRANT SELECT ON benso.* TO 'benso_readonly'@'%';
```

### Triggers de sécurité

```sql
-- Audit des modifications sensibles
CREATE TRIGGER audit_properties_update
AFTER UPDATE ON properties
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price OR OLD.status != NEW.status THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, user, timestamp)
        VALUES ('properties', NEW.id, 'UPDATE', 
                JSON_OBJECT('price', OLD.price, 'status', OLD.status),
                JSON_OBJECT('price', NEW.price, 'status', NEW.status),
                USER(), NOW());
    END IF;
END;

-- Mise à jour automatique des compteurs
CREATE TRIGGER update_favorites_count
AFTER INSERT ON favorites
FOR EACH ROW
BEGIN
    UPDATE properties 
    SET favorites_count = favorites_count + 1 
    WHERE id = NEW.property_id;
END;

CREATE TRIGGER update_favorites_count_delete
AFTER DELETE ON favorites
FOR EACH ROW
BEGIN
    UPDATE properties 
    SET favorites_count = favorites_count - 1 
    WHERE id = OLD.property_id;
END;
```

---

## 💾 Sauvegarde et restauration

### Script de sauvegarde automatique

```bash
#!/bin/bash
# backup_benso.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/benso"
DB_NAME="benso"
DB_USER="benso_admin"

# Sauvegarde complète
mysqldump -u $DB_USER -p $DB_NAME > $BACKUP_DIR/benso_full_$DATE.sql

# Sauvegarde structure seule
mysqldump -u $DB_USER -p --no-data $DB_NAME > $BACKUP_DIR/benso_structure_$DATE.sql

# Sauvegarde données critiques uniquement
mysqldump -u $DB_USER -p $DB_NAME users properties agents reservations > $BACKUP_DIR/benso_critical_$DATE.sql

# Compression
gzip $BACKUP_DIR/benso_*_$DATE.sql

# Nettoyage (garder 30 jours)
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
```

### Restauration

```bash
# Restauration complète
gunzip -c benso_full_20241201_120000.sql.gz | mysql -u benso_admin -p benso

# Restauration sélective
mysql -u benso_admin -p benso < benso_critical_20241201_120000.sql
```

---

## 🔄 Migrations

### Structure des migrations

```sql
-- Migration: 001_create_initial_tables.sql
-- Description: Création des tables principales
-- Date: 2024-01-01

-- Création des tables dans l'ordre des dépendances
CREATE TABLE agents (...);
CREATE TABLE users (...);
CREATE TABLE properties (...);
-- etc.

-- Insertion des données de base
INSERT INTO settings (key_name, value, description) VALUES
('site_name', 'BENSO', 'Nom du site'),
('currency_rate_eur_fcfa', '655.957', 'Taux de change EUR vers FCFA'),
('max_images_per_property', '10', 'Nombre maximum d\'images par propriété');
```

### Script de migration

```bash
#!/bin/bash
# migrate.sh

MIGRATION_DIR="./migrations"
DB_NAME="benso"
DB_USER="benso_admin"

# Créer table de suivi des migrations
mysql -u $DB_USER -p $DB_NAME << EOF
CREATE TABLE IF NOT EXISTS migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_filename (filename)
);
EOF

# Exécuter les migrations non appliquées
for migration in $MIGRATION_DIR/*.sql; do
    filename=$(basename "$migration")
    
    # Vérifier si déjà exécutée
    count=$(mysql -u $DB_USER -p $DB_NAME -se "SELECT COUNT(*) FROM migrations WHERE filename='$filename'")
    
    if [ "$count" -eq "0" ]; then
        echo "Exécution de $filename..."
        mysql -u $DB_USER -p $DB_NAME < "$migration"
        
        # Marquer comme exécutée
        mysql -u $DB_USER -p $DB_NAME -e "INSERT INTO migrations (filename) VALUES ('$filename')"
        echo "✓ $filename exécutée avec succès"
    else
        echo "- $filename déjà exécutée"
    fi
done
```

---

## ⚡ Optimisations

### Configuration MySQL recommandée

```ini
# my.cnf - Configuration optimisée pour BENSO

[mysqld]
# Mémoire
innodb_buffer_pool_size = 2G
innodb_log_file_size = 256M
query_cache_size = 128M
query_cache_type = 1

# Connexions
max_connections = 200
max_user_connections = 180

# Performance
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1

# Recherche full-text
ft_min_word_len = 3
ft_stopword_file = ''

# Logs
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

### Requêtes optimisées fréquentes

```sql
-- Recherche de propriétés avec filtres
PREPARE search_properties FROM '
SELECT p.*, a.nom as agent_name, a.telephone as agent_phone,
       (SELECT image_url FROM property_images pi WHERE pi.property_id = p.id AND pi.is_main = 1 LIMIT 1) as main_image
FROM properties p
JOIN agents a ON p.agent_id = a.id
WHERE p.is_active = 1
  AND p.type = COALESCE(?, p.type)
  AND p.transaction_type = COALESCE(?, p.transaction_type)
  AND p.city LIKE COALESCE(CONCAT("%", ?, "%"), p.city)
  AND p.price BETWEEN COALESCE(?, 0) AND COALESCE(?, 999999999)
  AND p.surface BETWEEN COALESCE(?, 0) AND COALESCE(?, 9999)
ORDER BY p.is_featured DESC, p.created_at DESC
LIMIT ? OFFSET ?';

-- Statistiques dashboard
CREATE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM properties WHERE is_active = 1) as total_properties,
    (SELECT COUNT(*) FROM properties WHERE is_active = 1 AND status IN ('a_vendre', 'a_louer')) as available_properties,
    (SELECT COUNT(*) FROM users WHERE is_active = 1) as total_users,
    (SELECT COUNT(*) FROM reservations WHERE status = 'en_attente') as pending_reservations,
    (SELECT AVG(price) FROM properties WHERE is_active = 1 AND transaction_type = 'vente') as avg_sale_price,
    (SELECT AVG(price) FROM properties WHERE is_active = 1 AND transaction_type = 'location') as avg_rent_price;
```

### Maintenance automatique

```sql
-- Procédure de nettoyage automatique
DELIMITER //
CREATE PROCEDURE CleanupOldData()
BEGIN
    -- Supprimer les réservations expirées
    DELETE FROM reservations 
    WHERE status = 'expire' 
      AND created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
    
    -- Supprimer les contacts traités anciens
    DELETE FROM contacts 
    WHERE status = 'traite' 
      AND updated_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
    
    -- Mettre à jour les statistiques des propriétés
    UPDATE properties p SET 
        favorites_count = (SELECT COUNT(*) FROM favorites f WHERE f.property_id = p.id),
        views_count = COALESCE(views_count, 0);
    
    -- Optimiser les tables
    OPTIMIZE TABLE properties, favorites, reservations;
END //
DELIMITER ;

-- Programmer l'exécution (via cron)
-- 0 2 * * 0 mysql -u benso_admin -p benso -e "CALL CleanupOldData();"
```

---

## 📊 Monitoring et métriques

### Requêtes de monitoring

```sql
-- Performance des requêtes
SELECT 
    DIGEST_TEXT,
    COUNT_STAR,
    AVG_TIMER_WAIT/1000000000 as avg_time_sec,
    SUM_ROWS_EXAMINED/COUNT_STAR as avg_rows_examined
FROM performance_schema.events_statements_summary_by_digest
WHERE DIGEST_TEXT LIKE '%properties%'
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 10;

-- Utilisation des index
SELECT 
    OBJECT_SCHEMA,
    OBJECT_NAME,
    INDEX_NAME,
    COUNT_FETCH,
    COUNT_INSERT,
    COUNT_UPDATE,
    COUNT_DELETE
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'benso'
ORDER BY COUNT_FETCH DESC;

-- Taille des tables
SELECT 
    TABLE_NAME,
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS 'Size (MB)',
    TABLE_ROWS
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'benso'
ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC;
```

---

## 🔧 Outils de développement

### Scripts utiles

```bash
# reset_dev_db.sh - Réinitialisation base de développement
#!/bin/bash
mysql -u root -p << EOF
DROP DATABASE IF EXISTS benso_dev;
CREATE DATABASE benso_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE benso_dev;
SOURCE ./schema/full_schema.sql;
SOURCE ./seeds/dev_data.sql;
EOF

# generate_test_data.sh - Génération de données de test
#!/bin/bash
mysql -u benso_admin -p benso_dev << EOF
-- Générer 1000 propriétés de test
INSERT INTO properties (agent_id, reference, title, description, type, status, transaction_type, price, surface, rooms, bedrooms, bathrooms, address, city, postal_code)
SELECT 
    (RAND() * 10) + 1,
    CONCAT('TEST-', LPAD(ROW_NUMBER() OVER (), 6, '0')),
    CONCAT('Propriété test ', ROW_NUMBER() OVER ()),
    'Description générée automatiquement pour les tests',
    ELT(FLOOR(RAND() * 5) + 1, 'appartement', 'maison', 'studio', 'villa', 'loft'),
    ELT(FLOOR(RAND() * 2) + 1, 'a_vendre', 'a_louer'),
    ELT(FLOOR(RAND() * 2) + 1, 'vente', 'location'),
    FLOOR(RAND() * 500000) + 50000,
    FLOOR(RAND() * 200) + 20,
    FLOOR(RAND() * 8) + 1,
    FLOOR(RAND() * 5) + 1,
    FLOOR(RAND() * 3) + 1,
    CONCAT('Adresse test ', ROW_NUMBER() OVER ()),
    ELT(FLOOR(RAND() * 5) + 1, 'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'),
    LPAD(FLOOR(RAND() * 99999), 5, '0')
FROM information_schema.columns LIMIT 1000;
EOF
```

---

## 📞 Support et maintenance

### Contacts techniques
- **DBA Principal** : [Nom] - [email]
- **Développeur Backend** : [Nom] - [email]
- **DevOps** : [Nom] - [email]

### Procédures d'urgence
1. **Panne de base de données** : Basculer sur le serveur de secours
2. **Corruption de données** : Restaurer depuis la dernière sauvegarde
3. **Performance dégradée** : Vérifier les requêtes lentes et les index

### Documentation complémentaire
- **Schéma ER** : `docs/database_schema.pdf`
- **Dictionnaire de données** : `docs/data_dictionary.xlsx`
- **Procédures de sauvegarde** : `docs/backup_procedures.md`

---

*Documentation mise à jour le : [Date]*
*Version de la base de données : 1.0.0*