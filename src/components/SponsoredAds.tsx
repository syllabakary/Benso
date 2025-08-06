import React from 'react';
import { Star, MapPin, Maximize } from 'lucide-react';

const SponsoredAds: React.FC = () => {
  const sponsoredProperties = [
    {
      id: 'sp1',
      title: 'Villa de Luxe avec Piscine',
      price: 2500,
      location: 'Cocody, Abidjan',
      surface: 250,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      sponsor: 'Agence Premium'
    },
    {
      id: 'sp2',
      title: 'Appartement Standing Centre-Ville',
      price: 1800,
      location: 'Plateau, Abidjan',
      surface: 120,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      sponsor: 'Immobilier Elite'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-8">
          <Star className="h-6 w-6 text-orange-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Annonces Sponsorisées</h2>
          <Star className="h-6 w-6 text-orange-500 ml-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsoredProperties.map((property) => (
            <div
              key={property.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Badge Sponsorisé */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ SPONSORISÉ
                </span>
              </div>
              
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-bold">{property.price}€/mois</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Maximize className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.surface}m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Par {property.sponsor}</span>
                  <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-200">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsoredAds;