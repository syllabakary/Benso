import React, { useState } from 'react';
import { Euro, Home, Maximize, Bed, Car, Waves, TreePine, Building } from 'lucide-react';

interface FilterBarProps {
  transactionType?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ transactionType }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    maxSurface: '',
    rooms: '',
    bedrooms: '',
    equipments: [] as string[]
  });

  const propertyTypes = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'studio', label: 'Studio' },
    { value: 'terrain', label: 'Terrain' },
    { value: 'loft', label: 'Loft' },
    { value: 'bureau', label: 'Bureau' },
    { value: 'commerce', label: 'Commerce' }
  ];

  const equipmentOptions = [
    { value: 'balcon', label: 'Balcon', icon: Building },
    { value: 'terrasse', label: 'Terrasse', icon: Building },
    { value: 'jardin', label: 'Jardin', icon: TreePine },
    { value: 'piscine', label: 'Piscine', icon: Waves },
    { value: 'garage', label: 'Garage', icon: Car },
    { value: 'parking', label: 'Parking', icon: Car },
    { value: 'ascenseur', label: 'Ascenseur', icon: Building },
    { value: 'cave', label: 'Cave', icon: Building },
    { value: 'climatisation', label: 'Climatisation', icon: Building }
  ];

  const toggleEquipment = (equipment: string) => {
    setFilters(prev => ({
      ...prev,
      equipments: prev.equipments.includes(equipment)
        ? prev.equipments.filter(e => e !== equipment)
        : [...prev.equipments, equipment]
    }));
  };

  const getPricePlaceholder = (type: 'min' | 'max') => {
    if (transactionType === 'acheter') {
      return type === 'min' ? '100000' : '500000';
    }
    return type === 'min' ? '500' : '2000';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Type de bien */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de bien
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
            >
              <option value="">Tous les types</option>
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix {transactionType === 'acheter' ? '' : '(€/mois)'}
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                placeholder={getPricePlaceholder('min')}
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <div className="relative flex-1">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                placeholder={getPricePlaceholder('max')}
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Surface */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surface (m²)
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Maximize className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                placeholder="20"
                value={filters.minSurface}
                onChange={(e) => setFilters({ ...filters, minSurface: e.target.value })}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <div className="relative flex-1">
              <Maximize className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="number"
                placeholder="200"
                value={filters.maxSurface}
                onChange={(e) => setFilters({ ...filters, maxSurface: e.target.value })}
                className="w-full pl-8 pr-2 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Pièces */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pièces
          </label>
          <div className="relative">
            <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={filters.rooms}
              onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
            >
              <option value="">Indifférent</option>
              <option value="1">1 pièce</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces</option>
              <option value="5">5+ pièces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Équipements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Équipements
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {equipmentOptions.map((equipment) => {
            const Icon = equipment.icon;
            const isSelected = filters.equipments.includes(equipment.value);
            
            return (
              <button
                key={equipment.value}
                onClick={() => toggleEquipment(equipment.value)}
                className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{equipment.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => setFilters({
            propertyType: '',
            minPrice: '',
            maxPrice: '',
            minSurface: '',
            maxSurface: '',
            rooms: '',
            bedrooms: '',
            equipments: []
          })}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Effacer les filtres
        </button>
        
        <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-200">
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
};

export default FilterBar;