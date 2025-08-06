import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize, Bed, Heart } from 'lucide-react';
import { useCurrency } from './CurrencyToggle';

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
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { formatPrice } = useCurrency();

  const formatDisplayPrice = (price: number, type: string) => {
    const formattedPrice = formatPrice(price);
    return type === 'vente' ? formattedPrice : `${formattedPrice}/mois`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'à vendre':
        return 'bg-green-500';
      case 'à louer':
        return 'bg-blue-500';
      case 'réservé':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={property.images?.[0] || '/placeholder-image.jpg'}
          alt={property.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
        <button className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>
        <div className={`absolute top-4 left-4 ${getStatusColor(property.status)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          {property.status}
        </div>
        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formatDisplayPrice(property.price, property.transactionType)}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.surface}m²</span>
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.rooms} pièces</span>
          </div>
        </div>

        {/* Caractéristiques */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Bouton */}
        <Link
          to={`/bien/${property.id}`}
          className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
        >
          Voir le détail
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;