import React from 'react';
import { Heart, MapPin, Maximize, Bed, Bath, Car, Eye, Home } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (propertyId: string) => void;
  isFavorite?: boolean;
  onClick?: () => void;
}

export default function PropertyCard({ property, onFavorite, isFavorite, onClick }: PropertyCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(property.id);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isFavorite 
              ? 'bg-orange-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-orange-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            À la une
          </div>
        )}

        {/* Views */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          <Eye className="h-3 w-3" />
          <span>{property.views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold text-gray-900">
            {property.price.toLocaleString()} €
            <span className="text-sm font-normal text-gray-500">/mois</span>
          </div>
          <div className="text-sm text-gray-500 capitalize">
            {property.type}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">
            {property.address.street}, {property.address.city}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area} m²</span>
            </div>
            {property.rooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span>{property.rooms} pièces</span>
              </div>
            )}
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} ch.</span>
              </div>
            )}
          </div>
          
          {/* Amenities Icons */}
          <div className="flex items-center space-x-1">
            {property.parking && <Car className="h-4 w-4 text-green-600" />}
            {property.furnished && <Home className="h-4 w-4 text-blue-600" />}
          </div>
        </div>

        {/* Availability */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Disponible le {new Date(property.availableFrom).toLocaleDateString('fr-FR')}
            </span>
            <span className={`px-2 py-1 rounded-full ${
              property.available 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {property.available ? 'Disponible' : 'Loué'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}