import React, { useState } from 'react';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { Property } from '../../types';

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
  className?: string;
}

export default function MapView({ properties, selectedProperty, onPropertySelect, className }: MapViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock map implementation - in a real app, you'd use Google Maps, Mapbox, etc.
  const mockMapCenter = { lat: 48.8566, lng: 2.3522 }; // Paris

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
          <span className="text-sm font-medium text-gray-700">
            {properties.length} biens affichés
          </span>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4 text-gray-600" />
          ) : (
            <Maximize2 className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mock Map Background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
        {/* Mock Map Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Property Markers */}
        {properties.map((property, index) => {
          // Mock positioning - in real app, use actual coordinates
          const x = 20 + (index % 6) * 12 + Math.random() * 8;
          const y = 15 + Math.floor(index / 6) * 15 + Math.random() * 10;
          
          return (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => onPropertySelect?.(property)}
            >
              {/* Price Marker */}
              <div className={`relative group ${
                selectedProperty?.id === property.id 
                  ? 'z-20' 
                  : 'z-10 hover:z-20'
              }`}>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold shadow-lg transition-all ${
                  selectedProperty?.id === property.id
                    ? 'bg-orange-500 text-white scale-110'
                    : 'bg-white text-gray-900 hover:bg-orange-500 hover:text-white hover:scale-105'
                }`}>
                  {(property.price / 1000).toFixed(0)}k€
                </div>
                
                {/* Marker Pin */}
                <div className={`absolute left-1/2 top-full transform -translate-x-1/2 ${
                  selectedProperty?.id === property.id
                    ? 'text-orange-500'
                    : 'text-white group-hover:text-orange-500'
                }`}>
                  <MapPin className="h-4 w-4 fill-current" />
                </div>

                {/* Property Preview Card */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white rounded-lg shadow-xl p-3 w-64">
                    <img
                      src={property.images[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {property.title}
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      {property.address.city}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{property.area} m²</span>
                      <span>{property.rooms} pièces</span>
                      <span className="font-semibold text-orange-600">
                        {property.price.toLocaleString()}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="text-lg font-bold text-gray-600">+</span>
          </button>
          <button className="bg-white p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <span className="text-lg font-bold text-gray-600">−</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm">
        <div className="text-xs text-gray-600 mb-2">Légende</div>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Sélectionné</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
            <span>Disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}