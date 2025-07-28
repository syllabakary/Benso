import React, { useState } from 'react';
import { Filter, MapPin, Home, Euro, Maximize, Bed, Bath, Car, TreePine, Building } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onToggle?: () => void;
  isOpen?: boolean;
}

export default function SearchFilters({ filters, onFiltersChange, onToggle, isOpen }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const propertyTypes = [
    { value: 'apartment', label: 'Appartement', icon: Building },
    { value: 'house', label: 'Maison', icon: Home },
    { value: 'studio', label: 'Studio', icon: Home },
    { value: 'room', label: 'Chambre', icon: Bed },
    { value: 'office', label: 'Bureau', icon: Building },
  ];

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = localFilters.type || [];
    const newTypes = currentTypes.includes(type as any)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type as any];
    handleFilterChange('type', newTypes);
  };

  const handleRoomToggle = (rooms: number, field: 'rooms' | 'bedrooms') => {
    const currentRooms = localFilters[field] || [];
    const newRooms = currentRooms.includes(rooms)
      ? currentRooms.filter(r => r !== rooms)
      : [...currentRooms, rooms];
    handleFilterChange(field, newRooms);
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between py-4">
          <button
            onClick={onToggle}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filtres</span>
          </button>
          <div className="text-sm text-gray-500">
            {/* Results count would go here */}
          </div>
        </div>

        {/* Expanded Filters */}
        {isOpen && (
          <div className="pb-6 space-y-6">
            {/* Property Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Type de bien</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {propertyTypes.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleTypeToggle(value)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                      localFilters.type?.includes(value as any)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Prix (€/mois)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={localFilters.priceMin || ''}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Max</label>
                    <input
                      type="number"
                      placeholder="∞"
                      value={localFilters.priceMax || ''}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Surface */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Surface (m²)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={localFilters.areaMin || ''}
                      onChange={(e) => handleFilterChange('areaMin', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Max</label>
                    <input
                      type="number"
                      placeholder="∞"
                      value={localFilters.areaMax || ''}
                      onChange={(e) => handleFilterChange('areaMax', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Nombre de pièces</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => handleRoomToggle(num, 'rooms')}
                      className={`px-3 py-2 rounded-lg border transition-all ${
                        localFilters.rooms?.includes(num)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {num}{num === 5 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Chambres</h3>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => handleRoomToggle(num, 'bedrooms')}
                      className={`px-3 py-2 rounded-lg border transition-all ${
                        localFilters.bedrooms?.includes(num)
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {num}{num === 5 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Équipements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { key: 'furnished', label: 'Meublé', icon: Home },
                  { key: 'parking', label: 'Parking', icon: Car },
                  { key: 'balcony', label: 'Balcon', icon: TreePine },
                  { key: 'garden', label: 'Jardin', icon: TreePine },
                  { key: 'elevator', label: 'Ascenseur', icon: Building },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleFilterChange(key as keyof SearchFiltersType, !localFilters[key as keyof SearchFiltersType])}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                      localFilters[key as keyof SearchFiltersType]
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}