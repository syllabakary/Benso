# BENSO Admin Panel - Documentation API

## 🌐 Documentation API Complète

### 📋 Vue d'ensemble

L'API BENSO Admin fournit tous les endpoints nécessaires pour la gestion complète de la plateforme immobilière. Elle suit les principes REST et utilise JSON pour les échanges de données.

#### Informations Générales
- **Base URL** : `https://api.bensoonline.com/admin`
- **Version** : v1
- **Format** : JSON
- **Authentification** : Bearer Token (JWT)
- **Encodage** : UTF-8

#### Standards Utilisés
- **HTTP Status Codes** : Codes de statut standard
- **Pagination** : Cursor-based et offset-based
- **Filtrage** : Query parameters
- **Tri** : Query parameter `sort`
- **Recherche** : Query parameter `search`

---

## 🔐 Authentification

### Endpoints d'Authentification

#### POST /auth/login
Connexion administrateur

**Request Body:**
```json
{
  "email": "admin@benso.ci",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "1",
      "nom": "Admin BENSO",
      "email": "admin@benso.ci",
      "role": "super_admin",
      "permissions": ["all"],
      "avatar": null,
      "last_login": "2024-12-01T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2024-12-02T10:30:00Z"
  },
  "message": "Connexion réussie"
}
```

**Response (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email ou mot de passe incorrect"
  }
}
```

#### POST /auth/logout
Déconnexion

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Déconnexion réussie"
}
```

#### GET /auth/me
Vérification du token et récupération du profil

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "nom": "Admin BENSO",
    "email": "admin@benso.ci",
    "role": "super_admin",
    "permissions": ["all"],
    "last_login": "2024-12-01T10:30:00Z"
  }
}
```

#### POST /auth/refresh
Renouvellement du token

**Request Body:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_token_here",
    "expires_at": "2024-12-02T10:30:00Z"
  }
}
```

---

## 🏠 Gestion des Propriétés

### GET /properties
Récupération de la liste des propriétés

**Query Parameters:**
```
?page=1
&limit=20
&type=villa
&status=a_vendre
&city=Abidjan
&price_min=100000
&price_max=500000
&surface_min=50
&surface_max=300
&agent_id=1
&is_featured=true
&is_sponsored=false
&search=villa+cocody
&sort=created_at:desc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "1",
        "agent_id": "1",
        "reference": "BENSO-001",
        "title": "Villa moderne 4 chambres - Cocody Angré",
        "description": "Magnifique villa contemporaine...",
        "type": "villa",
        "status": "a_vendre",
        "transaction_type": "vente",
        "price": 350000,
        "price_fcfa": 229588500,
        "charges": 50000,
        "surface": 250,
        "rooms": 6,
        "bedrooms": 4,
        "bathrooms": 3,
        "address": "123 Boulevard de la République",
        "city": "Abidjan",
        "district": "Cocody",
        "postal_code": "01234",
        "country": "Côte d'Ivoire",
        "latitude": 5.3599517,
        "longitude": -3.9810768,
        "has_pool": true,
        "has_garage": true,
        "is_featured": true,
        "is_sponsored": false,
        "views_count": 245,
        "favorites_count": 18,
        "is_active": true,
        "published_at": "2024-11-15T10:00:00Z",
        "created_at": "2024-11-15T09:30:00Z",
        "updated_at": "2024-11-30T14:20:00Z",
        "agent": {
          "id": "1",
          "nom": "Koffi André",
          "email": "k.andre@benso.ci",
          "telephone": "+225 07 08 09 10",
          "specialite": "Vente résidentielle"
        },
        "images": [
          {
            "id": "1",
            "image_url": "https://cdn.benso.ci/properties/villa-1-main.jpg",
            "alt_text": "Vue extérieure de la villa",
            "is_main": true,
            "order_index": 1
          }
        ],
        "features": [
          {
            "id": "1",
            "feature_type": "security",
            "feature_name": "Système de sécurité",
            "feature_value": "24h/24",
            "is_highlight": true
          }
        ]
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 1247,
      "total_pages": 63,
      "has_next": true,
      "has_prev": false
    },
    "filters_applied": {
      "type": "villa",
      "city": "Abidjan"
    }
  }
}
```

### GET /properties/{id}
Récupération d'une propriété spécifique

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "agent_id": "1",
    "reference": "BENSO-001",
    // ... toutes les propriétés de la propriété
    "agent": { /* détails agent */ },
    "images": [ /* toutes les images */ ],
    "features": [ /* toutes les caractéristiques */ ],
    "analytics": {
      "views_today": 12,
      "views_week": 89,
      "views_month": 245,
      "favorites_count": 18,
      "contacts_count": 12,
      "visits_scheduled": 3
    }
  }
}
```

### POST /properties
Création d'une nouvelle propriété

**Request Body:**
```json
{
  "agent_id": "1",
  "title": "Villa moderne 4 chambres - Cocody Angré",
  "description": "Magnifique villa contemporaine avec piscine...",
  "type": "villa",
  "transaction_type": "vente",
  "price": 350000,
  "surface": 250,
  "rooms": 6,
  "bedrooms": 4,
  "bathrooms": 3,
  "address": "123 Boulevard de la République, Angré 7ème Tranche",
  "city": "Abidjan",
  "district": "Cocody",
  "postal_code": "01234",
  "has_pool": true,
  "has_garage": true,
  "has_garden": true,
  "features": [
    {
      "feature_type": "security",
      "feature_name": "Système de sécurité",
      "feature_value": "24h/24",
      "is_highlight": true
    }
  ]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "reference": "BENSO-123",
    // ... propriété créée avec tous les champs
  },
  "message": "Propriété créée avec succès"
}
```

### PUT /properties/{id}
Mise à jour complète d'une propriété

**Request Body:**
```json
{
  "title": "Villa moderne 4 chambres - Cocody Angré (Mise à jour)",
  "price": 360000,
  "description": "Description mise à jour...",
  // ... autres champs à mettre à jour
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    // ... propriété mise à jour
  },
  "message": "Propriété mise à jour avec succès"
}
```

### PATCH /properties/{id}/status
Mise à jour du statut d'une propriété

**Request Body:**
```json
{
  "status": "vendu"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "status": "vendu",
    "updated_at": "2024-12-01T15:30:00Z"
  },
  "message": "Statut mis à jour avec succès"
}
```

### PATCH /properties/{id}/toggle-feature
Basculer le statut "mis en avant"

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "is_featured": true,
    "updated_at": "2024-12-01T15:30:00Z"
  },
  "message": "Propriété mise en avant"
}
```

### DELETE /properties/{id}
Suppression d'une propriété

**Response (200):**
```json
{
  "success": true,
  "message": "Propriété supprimée avec succès"
}
```

### POST /properties/{id}/images
Upload d'images pour une propriété

**Request:** Multipart form data
```
files[0]: image1.jpg
files[1]: image2.jpg
main_image_index: 0
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": "img_1",
        "property_id": "1",
        "image_url": "https://cdn.benso.ci/properties/1/image1.jpg",
        "is_main": true,
        "order_index": 1
      },
      {
        "id": "img_2",
        "property_id": "1",
        "image_url": "https://cdn.benso.ci/properties/1/image2.jpg",
        "is_main": false,
        "order_index": 2
      }
    ]
  },
  "message": "Images uploadées avec succès"
}
```

### DELETE /properties/{id}/images/{image_id}
Suppression d'une image

**Response (200):**
```json
{
  "success": true,
  "message": "Image supprimée avec succès"
}
```

---

## 👥 Gestion des Utilisateurs

### GET /users
Liste des utilisateurs

**Query Parameters:**
```
?page=1
&limit=20
&is_active=true
&is_admin=false
&localite=Abidjan
&search=jean
&sort=created_at:desc
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "1",
        "nom": "Jean Kouassi",
        "email": "jean.kouassi@gmail.com",
        "age": 34,
        "localite": "Abidjan",
        "nationalite": "Ivoirienne",
        "telephone": "+225 07 07 07 01",
        "avatar": null,
        "is_admin": false,
        "is_active": true,
        "last_login_at": "2024-12-01T08:30:00Z",
        "created_at": "2024-01-15T10:00:00Z",
        "updated_at": "2024-11-30T14:20:00Z",
        "stats": {
          "favorites_count": 5,
          "reservations_count": 2,
          "contacts_sent": 8
        }
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 3456,
      "total_pages": 173
    }
  }
}
```

### POST /users
Création d'un utilisateur

**Request Body:**
```json
{
  "nom": "Marie Traoré",
  "email": "marie.traore@yahoo.fr",
  "password": "motdepasse123",
  "age": 28,
  "localite": "Bouaké",
  "nationalite": "Ivoirienne",
  "telephone": "+225 05 04 03 02",
  "is_admin": false
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "456",
    "nom": "Marie Traoré",
    "email": "marie.traore@yahoo.fr",
    // ... autres champs (sans password)
  },
  "message": "Utilisateur créé avec succès"
}
```

### PATCH /users/{id}/status
Activation/désactivation d'un utilisateur

**Request Body:**
```json
{
  "is_active": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "is_active": false,
    "updated_at": "2024-12-01T15:30:00Z"
  },
  "message": "Statut utilisateur mis à jour"
}
```

---

## 🏢 Gestion des Agents

### GET /agents
Liste des agents immobiliers

**Response (200):**
```json
{
  "success": true,
  "data": {
    "agents": [
      {
        "id": "1",
        "nom": "Koffi André",
        "email": "k.andre@benso.ci",
        "telephone": "+225 07 08 09 10",
        "whatsapp": "+225 07 08 09 10",
        "photo": "https://cdn.benso.ci/agents/andre.jpg",
        "specialite": "Vente résidentielle",
        "description": "Expert en immobilier résidentiel...",
        "experience_years": 8,
        "rating": 4.8,
        "total_sales": 145,
        "languages": ["Français", "Anglais", "Baoulé"],
        "certifications": ["Certification FNAIM"],
        "is_active": true,
        "created_at": "2023-01-10T10:00:00Z",
        "stats": {
          "properties_count": 23,
          "active_properties": 18,
          "sales_this_month": 3,
          "revenue_this_month": 45000
        }
      }
    ]
  }
}
```

### POST /agents
Création d'un agent

**Request Body:**
```json
{
  "nom": "Aya Diabaté",
  "email": "a.diabate@benso.ci",
  "telephone": "+225 07 09 10 11",
  "whatsapp": "+225 07 09 10 11",
  "specialite": "Location et gestion",
  "description": "Spécialisée dans la location...",
  "experience_years": 5,
  "languages": ["Français", "Anglais"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "789",
    // ... agent créé
  },
  "message": "Agent créé avec succès"
}
```

---

## 📅 Gestion des Réservations

### GET /reservations
Liste des réservations

**Query Parameters:**
```
?status=en_attente
&priority=high
&type_transaction=acheter
&assigned_agent_id=1
&date_from=2024-12-01
&date_to=2024-12-31
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reservations": [
      {
        "id": "1",
        "property_id": "1",
        "user_id": "1",
        "nom": "Jean Kouassi",
        "email": "jean.kouassi@gmail.com",
        "telephone": "+225 07 07 07 01",
        "type_transaction": "acheter",
        "type_bien": "villa",
        "localisation": "Cocody",
        "budget_min": 300000,
        "budget_max": 400000,
        "surface_min": 200,
        "pieces": "4-5",
        "date_visite": "2024-12-05",
        "heure_visite": "apres-midi",
        "commentaires": "Intéressé par cette villa...",
        "status": "en_attente",
        "assigned_agent_id": "1",
        "priority": "high",
        "source": "website",
        "created_at": "2024-12-01T10:30:00Z",
        "property": {
          "id": "1",
          "title": "Villa moderne 4 chambres",
          "reference": "BENSO-001"
        },
        "assigned_agent": {
          "id": "1",
          "nom": "Koffi André",
          "telephone": "+225 07 08 09 10"
        }
      }
    ]
  }
}
```

### PATCH /reservations/{id}/status
Mise à jour du statut d'une réservation

**Request Body:**
```json
{
  "status": "confirme"
}
```

### PATCH /reservations/{id}/assign
Assignation à un agent

**Request Body:**
```json
{
  "assigned_agent_id": "2"
}
```

---

## 💬 Gestion des Contacts

### GET /contacts
Liste des messages de contact

**Response (200):**
```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "1",
        "nom": "Paul Brou",
        "email": "paul.brou@gmail.com",
        "telephone": "+225 05 04 03 02",
        "sujet": "Information sur les villas à Cocody",
        "message": "Bonjour, je souhaiterais avoir des informations...",
        "category": "commercial",
        "priority": "normal",
        "status": "nouveau",
        "assigned_to": null,
        "response_sent": false,
        "source": "website",
        "created_at": "2024-12-01T14:20:00Z",
        "assigned_agent": null
      }
    ]
  }
}
```

### PATCH /contacts/{id}/status
Mise à jour du statut d'un contact

**Request Body:**
```json
{
  "status": "traite"
}
```

### POST /contacts/{id}/respond
Répondre à un contact

**Request Body:**
```json
{
  "response": "Bonjour Paul, merci pour votre message...",
  "send_email": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "status": "traite",
    "response_sent": true,
    "responded_at": "2024-12-01T16:30:00Z"
  },
  "message": "Réponse envoyée avec succès"
}
```

---

## 💰 Gestion des Transactions

### GET /transactions
Liste des transactions

**Response (200):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "1",
        "property_id": "1",
        "buyer_id": "1",
        "seller_id": null,
        "agent_id": "1",
        "type": "vente",
        "status": "en_cours",
        "price_agreed": 340000,
        "commission_rate": 5,
        "commission_amount": 17000,
        "contract_date": "2024-12-01",
        "completion_date": "2024-12-30",
        "deposit_paid": 34000,
        "notes": "Vente en cours, compromis signé",
        "created_at": "2024-12-01T10:00:00Z",
        "property": {
          "id": "1",
          "title": "Villa moderne 4 chambres",
          "reference": "BENSO-001"
        },
        "buyer": {
          "id": "1",
          "nom": "Jean Kouassi",
          "email": "jean.kouassi@gmail.com"
        },
        "agent": {
          "id": "1",
          "nom": "Koffi André"
        }
      }
    ]
  }
}
```

### POST /transactions
Création d'une transaction

**Request Body:**
```json
{
  "property_id": "1",
  "buyer_id": "1",
  "agent_id": "1",
  "type": "vente",
  "price_agreed": 340000,
  "commission_rate": 5,
  "contract_date": "2024-12-01",
  "completion_date": "2024-12-30",
  "deposit_paid": 34000,
  "notes": "Vente négociée"
}
```

---

## 📢 Gestion des Publicités

### GET /advertisements
Liste des publicités

**Response (200):**
```json
{
  "success": true,
  "data": {
    "advertisements": [
      {
        "id": "1",
        "title": "Promotion Villas de Luxe",
        "description": "Découvrez nos villas exclusives...",
        "image_url": "https://cdn.benso.ci/ads/villa-promo.jpg",
        "link_url": "https://benso.ci/villas-luxe",
        "position": "hero",
        "page_location": "home",
        "target_locations": ["Abidjan", "Bouaké"],
        "is_active": true,
        "start_date": "2024-12-01",
        "end_date": "2024-12-31",
        "daily_budget": 50,
        "total_budget": 1500,
        "impressions_count": 12450,
        "clicks_count": 234,
        "conversion_count": 12,
        "advertiser_name": "BENSO Premium",
        "created_at": "2024-11-15T10:00:00Z"
      }
    ]
  }
}
```

### POST /advertisements
Création d'une publicité

**Request Body:**
```json
{
  "title": "Nouvelle Campagne Appartements",
  "description": "Appartements modernes au centre-ville",
  "image_url": "https://cdn.benso.ci/ads/appartements.jpg",
  "link_url": "https://benso.ci/appartements",
  "position": "sidebar",
  "page_location": "search",
  "target_locations": ["Abidjan"],
  "daily_budget": 30,
  "total_budget": 900,
  "start_date": "2024-12-01",
  "end_date": "2024-12-31",
  "advertiser_name": "Immobilier Plus"
}
```

---

## 📊 Analytics et Statistiques

### GET /dashboard/stats
Statistiques du dashboard

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_properties": 1247,
    "available_properties": 1089,
    "sold_properties": 89,
    "rented_properties": 69,
    "total_users": 3456,
    "total_agents": 28,
    "pending_reservations": 156,
    "new_contacts": 43,
    "total_transactions": 158,
    "pending_transactions": 12,
    "completed_transactions": 146,
    "avg_sale_price": 345000,
    "avg_rent_price": 1200,
    "monthly_revenue": 189000,
    "commission_earned": 17100,
    "conversion_rate": 12.5,
    "avg_days_to_sell": 45,
    "avg_days_to_rent": 15,
    "top_performing_agents": [
      {
        "id": "1",
        "nom": "Koffi André",
        "total_sales": 145,
        "revenue": 362500
      }
    ],
    "popular_locations": [
      {
        "city": "Abidjan",
        "count": 1247
      }
    ],
    "monthly_stats": [
      {
        "month": "2024-11",
        "sales": 25,
        "rentals": 38,
        "revenue": 189000,
        "new_properties": 61,
        "new_users": 134
      }
    ]
  }
}
```

### GET /analytics/properties
Analytics des propriétés

**Query Parameters:**
```
?period=30d
&group_by=city
&property_type=villa
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "property_views": [
      {
        "date": "2024-12-01",
        "views": 1245
      }
    ],
    "popular_properties": [
      {
        "property_id": "1",
        "title": "Villa moderne 4 chambres",
        "views": 245,
        "favorites": 18,
        "contacts": 12
      }
    ],
    "performance_by_city": [
      {
        "city": "Abidjan",
        "properties_count": 1089,
        "avg_views": 156,
        "avg_price": 285000
      }
    ]
  }
}
```

---

## ⚙️ Paramètres Système

### GET /settings
Récupération des paramètres

**Response (200):**
```json
{
  "success": true,
  "data": {
    "settings": [
      {
        "id": "1",
        "key_name": "site_name",
        "value": "BENSO",
        "value_type": "string",
        "category": "general",
        "description": "Nom du site",
        "is_public": true,
        "is_editable": true
      },
      {
        "id": "2",
        "key_name": "currency_rate_eur_fcfa",
        "value": "655.957",
        "value_type": "number",
        "category": "currency",
        "description": "Taux de change EUR vers FCFA",
        "is_public": true,
        "is_editable": true
      }
    ]
  }
}
```

### PUT /settings/{key}
Mise à jour d'un paramètre

**Request Body:**
```json
{
  "value": "656.000"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "key_name": "currency_rate_eur_fcfa",
    "value": "656.000",
    "updated_at": "2024-12-01T16:30:00Z"
  },
  "message": "Paramètre mis à jour avec succès"
}
```

---

## 📤 Export de Données

### GET /export/properties
Export des propriétés

**Query Parameters:**
```
?format=csv
&type=villa
&city=Abidjan
&date_from=2024-01-01
&date_to=2024-12-31
```

**Response (200):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="properties_export_2024-12-01.csv"

ID,Reference,Title,Type,Price,City,Status,Created_At
1,BENSO-001,"Villa moderne 4 chambres",villa,350000,Abidjan,a_vendre,2024-11-15
...
```

### GET /export/users
Export des utilisateurs

**Query Parameters:**
```
?format=excel
&is_active=true
&localite=Abidjan
```

---

## 🔍 Recherche Globale

### GET /search
Recherche globale dans toutes les entités

**Query Parameters:**
```
?q=villa+cocody
&entities=properties,users,agents
&limit=50
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "results": {
      "properties": [
        {
          "id": "1",
          "title": "Villa moderne 4 chambres - Cocody",
          "type": "property",
          "relevance": 0.95
        }
      ],
      "users": [],
      "agents": [
        {
          "id": "1",
          "nom": "Koffi André",
          "specialite": "Vente résidentielle",
          "type": "agent",
          "relevance": 0.75
        }
      ]
    },
    "total_results": 1,
    "query": "villa cocody"
  }
}
```

---

## 📊 Codes de Statut HTTP

### Codes de Succès
- **200 OK** : Requête réussie
- **201 Created** : Ressource créée avec succès
- **204 No Content** : Requête réussie sans contenu de réponse

### Codes d'Erreur Client
- **400 Bad Request** : Requête malformée
- **401 Unauthorized** : Authentification requise
- **403 Forbidden** : Accès refusé
- **404 Not Found** : Ressource non trouvée
- **409 Conflict** : Conflit (ex: email déjà utilisé)
- **422 Unprocessable Entity** : Erreurs de validation

### Codes d'Erreur Serveur
- **500 Internal Server Error** : Erreur serveur interne
- **502 Bad Gateway** : Erreur de passerelle
- **503 Service Unavailable** : Service temporairement indisponible

---

## 🚨 Gestion des Erreurs

### Format Standard des Erreurs

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Les données fournies ne sont pas valides",
    "details": {
      "email": ["L'email est requis"],
      "price": ["Le prix doit être supérieur à 0"]
    },
    "timestamp": "2024-12-01T16:30:00Z",
    "request_id": "req_123456789"
  }
}
```

### Codes d'Erreur Spécifiques

#### Authentification
- **INVALID_CREDENTIALS** : Identifiants incorrects
- **TOKEN_EXPIRED** : Token expiré
- **TOKEN_INVALID** : Token invalide
- **INSUFFICIENT_PERMISSIONS** : Permissions insuffisantes

#### Validation
- **VALIDATION_ERROR** : Erreurs de validation des données
- **REQUIRED_FIELD** : Champ requis manquant
- **INVALID_FORMAT** : Format de données invalide
- **DUPLICATE_ENTRY** : Entrée dupliquée

#### Ressources
- **RESOURCE_NOT_FOUND** : Ressource non trouvée
- **RESOURCE_CONFLICT** : Conflit de ressource
- **RESOURCE_LOCKED** : Ressource verrouillée

#### Système
- **INTERNAL_ERROR** : Erreur interne du serveur
- **SERVICE_UNAVAILABLE** : Service indisponible
- **RATE_LIMIT_EXCEEDED** : Limite de taux dépassée

---

## 🔒 Sécurité

### Authentification JWT
- **Algorithme** : HS256
- **Durée de vie** : 24 heures
- **Refresh token** : 30 jours
- **Header requis** : `Authorization: Bearer {token}`

### Permissions par Rôle

#### Super Admin
- Accès complet à toutes les fonctionnalités
- Gestion des autres administrateurs
- Configuration système

#### Admin
- Gestion des propriétés, utilisateurs, agents
- Accès aux analytics et rapports
- Gestion des transactions

#### Moderator
- Lecture des propriétés et utilisateurs
- Gestion des contacts et réservations
- Accès limité aux analytics

### Rate Limiting
- **Authentification** : 5 tentatives par minute
- **API générale** : 100 requêtes par minute
- **Upload** : 10 fichiers par minute
- **Export** : 5 exports par heure

### Validation des Données
- Validation côté serveur obligatoire
- Sanitisation des entrées utilisateur
- Protection contre les injections SQL
- Validation des types de fichiers uploadés

---

## 📝 Exemples d'Utilisation

### Workflow Complet : Création d'une Propriété

```javascript
// 1. Authentification
const loginResponse = await fetch('/api/admin/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@benso.ci',
    password: 'admin123'
  })
});

const { data: { token } } = await loginResponse.json();

// 2. Création de la propriété
const propertyResponse = await fetch('/api/admin/properties', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    agent_id: '1',
    title: 'Villa moderne 4 chambres - Cocody Angré',
    description: 'Magnifique villa contemporaine...',
    type: 'villa',
    transaction_type: 'vente',
    price: 350000,
    surface: 250,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    address: '123 Boulevard de la République',
    city: 'Abidjan',
    district: 'Cocody',
    postal_code: '01234'
  })
});

const { data: property } = await propertyResponse.json();

// 3. Upload des images
const formData = new FormData();
formData.append('files[0]', imageFile1);
formData.append('files[1]', imageFile2);

const imagesResponse = await fetch(`/api/admin/properties/${property.id}/images`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

// 4. Mise en avant de la propriété
await fetch(`/api/admin/properties/${property.id}/toggle-feature`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Workflow : Gestion d'une Réservation

```javascript
// 1. Récupération des réservations en attente
const reservationsResponse = await fetch('/api/admin/reservations?status=en_attente', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const { data: { reservations } } = await reservationsResponse.json();

// 2. Assignation à un agent
await fetch(`/api/admin/reservations/${reservations[0].id}/assign`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    assigned_agent_id: '1'
  })
});

// 3. Mise à jour du statut
await fetch(`/api/admin/reservations/${reservations[0].id}/status`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    status: 'confirme'
  })
});
```

---

## 🔧 Outils de Développement

### Postman Collection
Une collection Postman complète est disponible avec tous les endpoints documentés et des exemples de requêtes.

### SDK JavaScript
```javascript
// Installation
npm install @benso/admin-sdk

// Utilisation
import { BensoAdminSDK } from '@benso/admin-sdk';

const client = new BensoAdminSDK({
  baseURL: 'https://api.benso.ci/admin',
  token: 'your-jwt-token'
});

// Utilisation
const properties = await client.properties.getAll({
  type: 'villa',
  city: 'Abidjan'
});
```

### Webhooks
Configuration de webhooks pour les événements importants :

```json
{
  "webhook_url": "https://your-app.com/webhooks/benso",
  "events": [
    "property.created",
    "property.sold",
    "user.registered",
    "reservation.created"
  ],
  "secret": "webhook_secret_key"
}
```

---

## 📞 Support API

### Contacts Techniques
- **API Support** : api-support@benso.ci
- **Documentation** : docs@benso.ci
- **Urgences** : +225 07 00 00 00

### Environnements
- **Production** : https://api.benso.ci/admin
- **Staging** : https://staging-api.benso.ci/admin
- **Documentation** : https://docs.api.benso.ci

### Limites et Quotas
- **Requêtes par minute** : 1000 (production), 100 (développement)
- **Taille max upload** : 10MB par fichier
- **Timeout** : 30 secondes
- **Retention logs** : 30 jours

---

*Documentation API mise à jour le : 1er Décembre 2024*
*Version API : v1.0.0*
*Équipe : BENSO API Team*