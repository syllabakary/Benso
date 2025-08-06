import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Map, List, SlidersHorizontal, X, Search, MapPin } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';

interface ResultsPageProps {
  transactionType?: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  rooms: number;
  location: string;
  images: string[];
  features: string[];
  status: string;
  transactionType: string;
  lat?: number;
  lng?: number;
  type: 'appartement' | 'maison' | 'studio' | 'villa' | 'loft' | 'duplex';
  etage?: number;
  balcon: boolean;
  parking: boolean;
  ascenseur: boolean;
  piscine: boolean;
  jardin: boolean;
  meuble: boolean;
  anneeConstruction?: number;
}

interface SmartFilterState {
  budget: {
    min: number;
    max: number;
    active: boolean;
  };
  surface: {
    min: number;
    max: number;
    active: boolean;
  };
  pieces: {
    selected: number[];
    active: boolean;
  };
  type: {
    selected: string[];
    active: boolean;
  };
  localisation: {
    query: string;
    suggestions: string[];
    active: boolean;
  };
  caracteristiques: {
    balcon: boolean;
    parking: boolean;
    ascenseur: boolean;
    piscine: boolean;
    jardin: boolean;
    meuble: boolean;
  };
  tri: 'prix-asc' | 'prix-desc' | 'surface-asc' | 'surface-desc' | 'recent';
}

const ResultsPage: React.FC<ResultsPageProps> = ({ transactionType }) => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  
  // État des filtres intelligents
  const [smartFilters, setSmartFilters] = useState<SmartFilterState>({
    budget: {
      min: 0,
      max: transactionType === 'acheter' ? 1000000 : 5000,
      active: false
    },
    surface: {
      min: 0,
      max: 300,
      active: false
    },
    pieces: {
      selected: [],
      active: false
    },
    type: {
      selected: [],
      active: false
    },
    localisation: {
      query: '',
      suggestions: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Bordeaux', 'Lille', 'Strasbourg'],
      active: false
    },
    caracteristiques: {
      balcon: false,
      parking: false,
      ascenseur: false,
      piscine: false,
      jardin: false,
      meuble: false
    },
    tri: 'prix-asc'
  });

  const itemsPerPage = 6;

  // Données enrichies pour la démo
  const allProperties: Property[] = [
    {
      id: '1',
      title: 'Appartement moderne 3 pièces',
      price: transactionType === 'acheter' ? 350000 : 1200,
      surface: 65,
      rooms: 3,
      location: 'Paris 11ème',
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
      features: ['Balcon', 'Parking', 'Ascenseur'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 48.8566,
      lng: 2.3522,
      type: 'appartement',
      etage: 3,
      balcon: true,
      parking: true,
      ascenseur: true,
      piscine: false,
      jardin: false,
      meuble: false,
      anneeConstruction: 2018
    },
    {
      id: '2',
      title: 'Maison avec jardin',
      price: transactionType === 'acheter' ? 450000 : 1800,
      surface: 120,
      rooms: 5,
      location: 'Marseille',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      features: ['Jardin', 'Garage', 'Cave'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 43.2965,
      lng: 5.3698,
      type: 'maison',
      balcon: false,
      parking: true,
      ascenseur: false,
      piscine: false,
      jardin: true,
      meuble: false,
      anneeConstruction: 2015
    },
    {
      id: '3',
      title: 'Studio lumineux centre-ville',
      price: transactionType === 'acheter' ? 180000 : 750,
      surface: 25,
      rooms: 1,
      location: 'Lyon 2ème',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
      features: ['Meublé', 'Proche métro'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 45.7640,
      lng: 4.8357,
      type: 'studio',
      etage: 2,
      balcon: false,
      parking: false,
      ascenseur: true,
      piscine: false,
      jardin: false,
      meuble: true,
      anneeConstruction: 2020
    },
    {
      id: '4',
      title: 'Villa avec piscine',
      price: transactionType === 'acheter' ? 850000 : 3500,
      surface: 200,
      rooms: 7,
      location: 'Nice',
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      features: ['Piscine', 'Terrasse', 'Vue mer'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 43.7102,
      lng: 7.2620,
      type: 'villa',
      balcon: false,
      parking: true,
      ascenseur: false,
      piscine: true,
      jardin: true,
      meuble: false,
      anneeConstruction: 2010
    },
    {
      id: '5',
      title: 'Loft industriel rénové',
      price: transactionType === 'acheter' ? 420000 : 2200,
      surface: 90,
      rooms: 2,
      location: 'Bordeaux',
      images: ['https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg'],
      features: ['Loft', 'Climatisation', 'Parking'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 44.8378,
      lng: -0.5792,
      type: 'loft',
      etage: 1,
      balcon: true,
      parking: true,
      ascenseur: true,
      piscine: false,
      jardin: false,
      meuble: false,
      anneeConstruction: 2019
    },
    {
      id: '6',
      title: 'Duplex avec terrasse',
      price: transactionType === 'acheter' ? 380000 : 1600,
      surface: 85,
      rooms: 4,
      location: 'Toulouse',
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
      features: ['Terrasse', 'Duplex', 'Cave'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 43.6047,
      lng: 1.4442,
      type: 'duplex',
      etage: 5,
      balcon: true,
      parking: false,
      ascenseur: true,
      piscine: false,
      jardin: false,
      meuble: false,
      anneeConstruction: 2017
    },
    {
      id: '7',
      title: 'Penthouse avec vue panoramique',
      price: transactionType === 'acheter' ? 1200000 : 4500,
      surface: 150,
      rooms: 6,
      location: 'Paris 16ème',
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
      features: ['Vue panoramique', 'Terrasse', 'Parking', 'Ascenseur'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 48.8736,
      lng: 2.2797,
      type: 'appartement',
      etage: 12,
      balcon: true,
      parking: true,
      ascenseur: true,
      piscine: false,
      jardin: false,
      meuble: false,
      anneeConstruction: 2021
    },
    {
      id: '8',
      title: 'Maison de charme avec piscine',
      price: transactionType === 'acheter' ? 650000 : 2800,
      surface: 180,
      rooms: 8,
      location: 'Aix-en-Provence',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      features: ['Piscine', 'Jardin', 'Garage', 'Cheminée'],
      status: transactionType === 'acheter' ? 'à vendre' : 'à louer',
      transactionType: transactionType === 'acheter' ? 'vente' : 'location',
      lat: 43.5297,
      lng: 5.4474,
      type: 'maison',
      balcon: false,
      parking: true,
      ascenseur: false,
      piscine: true,
      jardin: true,
      meuble: false,
      anneeConstruction: 2012
    }
  ];

  // Filtrage intelligent des propriétés
  const getFilteredProperties = () => {
    let filtered = allProperties.filter((property) => {
      // Filtre budget
      if (smartFilters.budget.active) {
        if (property.price < smartFilters.budget.min || property.price > smartFilters.budget.max) {
          return false;
        }
      }

      // Filtre surface
      if (smartFilters.surface.active) {
        if (property.surface < smartFilters.surface.min || property.surface > smartFilters.surface.max) {
          return false;
        }
      }

      // Filtre pièces
      if (smartFilters.pieces.active && smartFilters.pieces.selected.length > 0) {
        if (!smartFilters.pieces.selected.includes(property.rooms)) {
          return false;
        }
      }

      // Filtre type de bien
      if (smartFilters.type.active && smartFilters.type.selected.length > 0) {
        if (!smartFilters.type.selected.includes(property.type)) {
          return false;
        }
      }

      // Filtre localisation
      if (smartFilters.localisation.active && smartFilters.localisation.query) {
        if (!property.location.toLowerCase().includes(smartFilters.localisation.query.toLowerCase())) {
          return false;
        }
      }

      // Filtres caractéristiques
      const chars = smartFilters.caracteristiques;
      if (chars.balcon && !property.balcon) return false;
      if (chars.parking && !property.parking) return false;
      if (chars.ascenseur && !property.ascenseur) return false;
      if (chars.piscine && !property.piscine) return false;
      if (chars.jardin && !property.jardin) return false;
      if (chars.meuble && !property.meuble) return false;

      return true;
    });

    // Tri intelligent
    filtered.sort((a, b) => {
      switch (smartFilters.tri) {
        case 'prix-asc':
          return a.price - b.price;
        case 'prix-desc':
          return b.price - a.price;
        case 'surface-asc':
          return a.surface - b.surface;
        case 'surface-desc':
          return b.surface - a.surface;
        case 'recent':
          return (b.anneeConstruction || 0) - (a.anneeConstruction || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProperties = getFilteredProperties();
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  // Fonctions utilitaires pour les filtres
  const updateFilter = (section: keyof SmartFilterState, updates: any) => {
    setSmartFilters(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSmartFilters({
      budget: { min: 0, max: transactionType === 'acheter' ? 1000000 : 5000, active: false },
      surface: { min: 0, max: 300, active: false },
      pieces: { selected: [], active: false },
      type: { selected: [], active: false },
      localisation: { query: '', suggestions: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Bordeaux'], active: false },
      caracteristiques: { balcon: false, parking: false, ascenseur: false, piscine: false, jardin: false, meuble: false },
      tri: 'prix-asc'
    });
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (smartFilters.budget.active) count++;
    if (smartFilters.surface.active) count++;
    if (smartFilters.pieces.active) count++;
    if (smartFilters.type.active) count++;
    if (smartFilters.localisation.active) count++;
    
    const activeChars = Object.values(smartFilters.caracteristiques).filter(Boolean).length;
    if (activeChars > 0) count++;
    
    return count;
  };

  // Composant de filtres intelligents
  const SmartFilterPanel = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header avec compteur */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Filtres intelligents</h3>
          <div className="flex items-center space-x-3">
            {getActiveFiltersCount() > 0 && (
              <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {getActiveFiltersCount()} filtres actifs
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-white hover:text-orange-100 transition-colors"
              title="Réinitialiser tous les filtres"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Budget avec suggestions intelligentes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-900">
              Budget {transactionType === 'acheter' ? '(€)' : '(€/mois)'}
            </label>
            <button
              onClick={() => updateFilter('budget', { active: !smartFilters.budget.active })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                smartFilters.budget.active
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {smartFilters.budget.active ? 'Actif' : 'Inactif'}
            </button>
          </div>
          
          {/* Suggestions de budget */}
          <div className="flex flex-wrap gap-2 mb-4">
            {transactionType === 'acheter' 
              ? [200000, 350000, 500000, 750000].map(price => (
                  <button
                    key={price}
                    onClick={() => updateFilter('budget', { 
                      max: price, 
                      active: true,
                      min: Math.max(0, price - 150000)
                    })}
                    className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-sm rounded-full transition-colors"
                  >
                    Jusqu'à {price.toLocaleString()}€
                  </button>
                ))
              : [1000, 1500, 2500, 4000].map(price => (
                  <button
                    key={price}
                    onClick={() => updateFilter('budget', { 
                      max: price, 
                      active: true,
                      min: Math.max(0, price - 500)
                    })}
                    className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-sm rounded-full transition-colors"
                  >
                    Jusqu'à {price}€/mois
                  </button>
                ))
            }
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Prix min"
              value={smartFilters.budget.min || ''}
              onChange={(e) => updateFilter('budget', { 
                min: Number(e.target.value) || 0, 
                active: true 
              })}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Prix max"
              value={smartFilters.budget.max || ''}
              onChange={(e) => updateFilter('budget', { 
                max: Number(e.target.value) || (transactionType === 'acheter' ? 1000000 : 5000), 
                active: true 
              })}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Type de bien avec icônes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-900">Type de bien</label>
            <button
              onClick={() => updateFilter('type', { active: !smartFilters.type.active })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                smartFilters.type.active
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {smartFilters.type.active ? 'Actif' : 'Inactif'}
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'appartement', label: 'Appartement', emoji: '🏠' },
              { key: 'maison', label: 'Maison', emoji: '🏡' },
              { key: 'studio', label: 'Studio', emoji: '🏢' },
              { key: 'villa', label: 'Villa', emoji: '🏖️' },
              { key: 'loft', label: 'Loft', emoji: '🏭' },
              { key: 'duplex', label: 'Duplex', emoji: '🏘️' }
            ].map(type => (
              <button
                key={type.key}
                onClick={() => {
                  const newSelected = smartFilters.type.selected.includes(type.key)
                    ? smartFilters.type.selected.filter(t => t !== type.key)
                    : [...smartFilters.type.selected, type.key];
                  updateFilter('type', { 
                    selected: newSelected, 
                    active: newSelected.length > 0 
                  });
                }}
                className={`p-3 border-2 rounded-xl text-center transition-all ${
                  smartFilters.type.selected.includes(type.key)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="text-2xl mb-1">{type.emoji}</div>
                <div className="text-xs font-medium">{type.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Nombre de pièces avec style moderne */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-900">Nombre de pièces</label>
            <button
              onClick={() => updateFilter('pieces', { active: !smartFilters.pieces.active })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                smartFilters.pieces.active
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {smartFilters.pieces.active ? 'Actif' : 'Inactif'}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
              <button
                key={room}
                onClick={() => {
                  const newSelected = smartFilters.pieces.selected.includes(room)
                    ? smartFilters.pieces.selected.filter(r => r !== room)
                    : [...smartFilters.pieces.selected, room];
                  updateFilter('pieces', { 
                    selected: newSelected, 
                    active: newSelected.length > 0 
                  });
                }}
                className={`w-12 h-12 rounded-xl border-2 font-semibold transition-all ${
                  smartFilters.pieces.selected.includes(room)
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                {room}{room === 8 ? '+' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Caractéristiques avec icônes */}
        <div>
          <label className="text-sm font-semibold text-gray-900 mb-4 block">Caractéristiques</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'balcon', label: 'Balcon', emoji: '🌿' },
              { key: 'parking', label: 'Parking', emoji: '🚗' },
              { key: 'ascenseur', label: 'Ascenseur', emoji: '🏗️' },
              { key: 'piscine', label: 'Piscine', emoji: '🏊' },
              { key: 'jardin', label: 'Jardin', emoji: '🌱' },
              { key: 'meuble', label: 'Meublé', emoji: '🪑' }
            ].map(char => (
              <button
                key={char.key}
                onClick={() => updateFilter('caracteristiques', { 
                  [char.key]: !smartFilters.caracteristiques[char.key as keyof typeof smartFilters.caracteristiques]
                })}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                  smartFilters.caracteristiques[char.key as keyof typeof smartFilters.caracteristiques]
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <span className="text-xl">{char.emoji}</span>
                <span className="text-sm font-medium">{char.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tri intelligent */}
        <div>
          <label className="text-sm font-semibold text-gray-900 mb-4 block">Trier par</label>
          <select
            value={smartFilters.tri}
            onChange={(e) => setSmartFilters(prev => ({ 
              ...prev, 
              tri: e.target.value as typeof smartFilters.tri 
            }))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="surface-asc">Surface croissante</option>
            <option value="surface-desc">Surface décroissante</option>
            <option value="recent">Plus récents</option>
          </select>
        </div>

        {/* Recherche par localisation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-900">Localisation</label>
            <button
              onClick={() => updateFilter('localisation', { active: !smartFilters.localisation.active })}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                smartFilters.localisation.active
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {smartFilters.localisation.active ? 'Actif' : 'Inactif'}
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={smartFilters.localisation.query}
              onChange={(e) => updateFilter('localisation', { 
                query: e.target.value, 
                active: e.target.value.length > 0 
              })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          {/* Suggestions de villes */}
          <div className="flex flex-wrap gap-2 mt-3">
            {smartFilters.localisation.suggestions.map(city => (
              <button
                key={city}
                onClick={() => updateFilter('localisation', { 
                  query: city, 
                  active: true 
                })}
                className="px-3 py-1 bg-gray-100 hover:bg-orange-100 text-sm rounded-full transition-colors flex items-center space-x-1"
              >
                <MapPin className="h-3 w-3" />
                <span>{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Composant carte amélioré
  const MapView = () => (
    <div className="w-1/2">
      <div className="sticky top-8">
        <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            {paginatedProperties.map((property, index) => (
              <div
                key={property.id}
                className={`absolute bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-orange-600 transition-all transform hover:scale-110 shadow-lg ${
                  selectedProperty === property.id ? 'ring-4 ring-white scale-110' : ''
                }`}
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${20 + Math.floor(index / 3) * 25}%`
                }}
                onClick={() => setSelectedProperty(selectedProperty === property.id ? null : property.id)}
                title={`${property.title} - ${property.price.toLocaleString()}${transactionType === 'acheter' ? '€' : '€/mois'}`}
              >
                {property.price > 1000 ? Math.round(property.price / 1000) + 'k' : property.price}
              </div>
            ))}
          </div>
          
          {/* Info bulle pour propriété sélectionnée */}
          {selectedProperty && (
            <div className="absolute bottom-20 left-4 bg-white p-4 rounded-lg shadow-xl max-w-xs">
              {(() => {
                const prop = paginatedProperties.find(p => p.id === selectedProperty);
                return prop ? (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">{prop.title}</h4>
                    <p className="text-orange-600 font-bold text-lg">
                      {prop.price.toLocaleString()}{transactionType === 'acheter' ? '€' : '€/mois'}
                    </p>
                    <p className="text-gray-600 text-sm">{prop.surface}m² • {prop.rooms} pièces</p>
                    <p className="text-gray-500 text-xs mt-1">{prop.location}</p>
                  </div>
                ) : null;
              })()}
            </div>
          )}
          
          {/* Légende avec statistiques */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
            <div className="text-center">
              <Map className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Carte interactive</p>
              <p className="text-xs text-gray-500">{paginatedProperties.length} biens affichés</p>
              {filteredProperties.length > 0 && (
                <p className="text-xs text-orange-600 mt-1">
                  Prix moyen: {Math.round(filteredProperties.reduce((acc, p) => acc + p.price, 0) / filteredProperties.length).toLocaleString()}
                  {transactionType === 'acheter' ? '€' : '€/mois'}
                </p>
              )}
            </div>
          </div>

          {/* Contrôles de zoom */}
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            <button className="bg-white w-8 h-8 rounded flex items-center justify-center shadow hover:bg-gray-50">+</button>
            <button className="bg-white w-8 h-8 rounded flex items-center justify-center shadow hover:bg-gray-50">-</button>
          </div>
        </div>
      </div>
    </div>
  );

  const getPageTitle = () => {
    if (transactionType === 'acheter') return 'Biens à vendre';
    if (transactionType === 'louer') return 'Biens à louer';
    return 'Résultats de recherche';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec statistiques */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <p>{filteredProperties.length} biens trouvés</p>
              {filteredProperties.length > 0 && (
                <>
                  <span>•</span>
                  <p>
                    Prix moyen: {Math.round(filteredProperties.reduce((acc, p) => acc + p.price, 0) / filteredProperties.length).toLocaleString()}
                    {transactionType === 'acheter' ? '€' : '€/mois'}
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Contrôles de vue avec compteur de filtres */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filtres</span>
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
            
            <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 ${viewMode === 'map' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Map className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Barre de filtres intelligents */}
        {showFilters && (
          <div className="mb-8">
            <SmartFilterPanel />
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex gap-8">
          {/* Liste des biens */}
          <div className={`${viewMode === 'map' ? 'w-1/2' : 'w-full'}`}>
            {paginatedProperties.length > 0 ? (
              <div className="space-y-6">
                {/* Résumé des filtres actifs */}
                {getActiveFiltersCount() > 0 && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {getActiveFiltersCount()} filtres appliqués
                        </span>
                      </div>
                      <button
                        onClick={resetAllFilters}
                        className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        Tout effacer
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun bien trouvé
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Essayez d'ajuster vos critères de recherche pour trouver plus de biens correspondant à vos besoins.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={resetAllFilters}
                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Réinitialiser tous les filtres
                    </button>
                    <button
                      onClick={() => updateFilter('budget', { 
                        max: smartFilters.budget.max * 1.5, 
                        active: true 
                      })}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Augmenter le budget
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Pagination intelligente */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    Précédent
                  </button>
                  
                  {/* Pages avec ellipses intelligentes */}
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let page;
                    if (totalPages <= 5) {
                      page = index + 1;
                    } else if (currentPage <= 3) {
                      page = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + index;
                    } else {
                      page = currentPage - 2 + index;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Carte interactive */}
          {viewMode === 'map' && <MapView />}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;