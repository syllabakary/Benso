import React, { useState, useEffect } from 'react';
import { MapPin, Maximize2, Minimize2, Plus, Minus, Navigation, Filter } from 'lucide-react';
import { Property } from '../../types';

interface InteractiveMapProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
  onPropertyClick?: (property: Property) => void;
  className?: string;
  showFilters?: boolean;
}

export default function InteractiveMap({ 
  properties, 
  selectedProperty, 
  onPropertySelect, 
  onPropertyClick,
  className,
  showFilters = false
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 48.8566, lng: 2.3522 });
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapFilters, setMapFilters] = useState({
    priceRange: [0, 5000],
    propertyTypes: [] as string[]
  });

  // Géolocalisation utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Géolocalisation non disponible:', error);
        }
      );
    }
  }, []);

  // Filtrer les propriétés selon les critères de la carte
  const filteredProperties = properties.filter(property => {
    const priceInRange = property.price >= mapFilters.priceRange[0] && 
                        property.price <= mapFilters.priceRange[1];
    const typeMatch = mapFilters.propertyTypes.length === 0 || 
                     mapFilters.propertyTypes.includes(property.type);
    return priceInRange && typeMatch;
  });

  // Calculer les clusters de propriétés
  const getPropertyClusters = () => {
    const clusters: { [key: string]: Property[] } = {};
    
    filteredProperties.forEach(property => {
      // Grouper les propriétés proches (simulation)
      const key = `${Math.round(property.address.coordinates.lat * 100)}-${Math.round(property.address.coordinates.lng * 100)}`;
      if (!clusters[key]) {
        clusters[key] = [];
      }
      clusters[key].push(property);
    });
    
    return clusters;
  };

  const clusters = getPropertyClusters();

  const handleZoomIn = () => setZoom(Math.min(zoom + 1, 18));
  const handleZoomOut = () => setZoom(Math.max(zoom - 1, 8));

  const centerOnUserLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setZoom(15);
    }
  };

  const getPriceColor = (price: number) => {
    if (price < 800) return 'bg-green-500';
    if (price < 1200) return 'bg-yellow-500';
    if (price < 2000) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        <div className="bg-white rounded-lg px-3 py-2 shadow-lg">
          <span className="text-sm font-medium text-gray-700">
            {filteredProperties.length} bien{filteredProperties.length !== 1 ? 's' : ''} affiché{filteredProperties.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex space-x-2">
          {showFilters && (
            <button className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <Filter className="h-4 w-4 text-gray-600" />
            </button>
          )}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-gray-600" />
            ) : (
              <Maximize2 className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Map Background */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 grid-rows-8 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ 
              left: '50%', 
              top: '50%'
            }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-30"></div>
          </div>
        )}

        {/* Property Clusters */}
        {Object.entries(clusters).map(([key, clusterProperties], index) => {
          const mainProperty = clusterProperties[0];
          const isCluster = clusterProperties.length > 1;
          
          // Position simulée basée sur l'index
          const x = 20 + (index % 8) * 10 + Math.random() * 8;
          const y = 15 + Math.floor(index / 8) * 12 + Math.random() * 10;
          
          return (
            <div
              key={key}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-15"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHoveredProperty(mainProperty)}
              onMouseLeave={() => setHoveredProperty(null)}
              onClick={() => {
                onPropertySelect?.(mainProperty);
                onPropertyClick?.(mainProperty);
              }}
            >
              {isCluster ? (
                // Cluster Marker
                <div className={`relative group ${
                  selectedProperty?.id === mainProperty.id ? 'z-30' : 'z-20 hover:z-30'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all ${
                    selectedProperty?.id === mainProperty.id
                      ? 'bg-orange-600 scale-125'
                      : 'bg-orange-500 hover:bg-orange-600 hover:scale-110'
                  }`}>
                    {clusterProperties.length}
                  </div>
                  
                  {/* Cluster Preview */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl p-3 w-64">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">
                        {clusterProperties.length} biens dans cette zone
                      </h4>
                      <div className="space-y-1">
                        {clusterProperties.slice(0, 3).map((property, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-gray-600">
                            <span className="truncate">{property.title.substring(0, 20)}...</span>
                            <span className="font-medium text-orange-600">
                              {property.price.toLocaleString()}€
                            </span>
                          </div>
                        ))}
                        {clusterProperties.length > 3 && (
                          <div className="text-xs text-gray-500 text-center pt-1">
                            +{clusterProperties.length - 3} autres...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Single Property Marker
                <div className={`relative group ${
                  selectedProperty?.id === mainProperty.id ? 'z-30' : 'z-20 hover:z-30'
                }`}>
                  <div className={`px-3 py-2 rounded-full text-sm font-semibold shadow-lg transition-all ${
                    selectedProperty?.id === mainProperty.id
                      ? 'bg-orange-600 text-white scale-110'
                      : `${getPriceColor(mainProperty.price)} text-white hover:scale-105`
                  }`}>
                    {Math.round(mainProperty.price / 1000)}k€
                  </div>
                  
                  {/* Property Pin */}
                  <div className={`absolute left-1/2 top-full transform -translate-x-1/2 ${
                    selectedProperty?.id === mainProperty.id
                      ? 'text-orange-600'
                      : 'text-white group-hover:text-orange-600'
                  }`}>
                    <MapPin className="h-4 w-4 fill-current" />
                  </div>

                  {/* Property Preview Card */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl p-4 w-72">
                      <img
                        src={mainProperty.images[0]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={mainProperty.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                        {mainProperty.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {mainProperty.address.street}, {mainProperty.address.city}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{mainProperty.area} m²</span>
                        <span>{mainProperty.rooms} pièces</span>
                        <span className="font-semibold text-orange-600">
                          {mainProperty.price.toLocaleString()}€/mois
                        </span>
                      </div>
                      
                      {/* Property Features */}
                      <div className="flex space-x-2 mt-2">
                        {mainProperty.parking && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Parking</span>
                        )}
                        {mainProperty.furnished && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Meublé</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-20">
          <button
            onClick={handleZoomIn}
            className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Minus className="h-5 w-5 text-gray-600" />
          </button>
          {userLocation && (
            <button
              onClick={centerOnUserLocation}
              className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Navigation className="h-5 w-5 text-blue-600" />
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg z-20">
          <div className="text-xs text-gray-600 mb-2 font-medium">Prix par mois</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Moins de 800€</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>800€ - 1200€</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>1200€ - 2000€</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Plus de 2000€</span>
            </div>
          </div>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-4 right-20 bg-white rounded-lg px-3 py-1 shadow-lg z-20">
          <span className="text-xs text-gray-600">Zoom: {zoom}</span>
        </div>
      </div>
    </div>
  );
}