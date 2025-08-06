import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

const RecentProperties: React.FC = () => {
  // Données fictives pour la démo
  const recentProperties = [
    {
      id: '1',
      title: 'Appartement moderne 3 pièces',
      price: 1200,
      surface: 65,
      rooms: 3,
      location: 'Paris 11ème',
      images: ['https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'],
      features: ['Balcon', 'Parking', 'Ascenseur'],
      status: 'à louer',
      transactionType: 'location'
    },
    {
      id: '2', 
      title: 'Maison avec jardin',
      price: 450000,
      surface: 120,
      rooms: 5,
      location: 'Marseille',
      images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
      features: ['Jardin', 'Garage', 'Cave'],
      status: 'à vendre',
      transactionType: 'vente'
    },
    {
      id: '3',
      title: 'Studio lumineux centre-ville',
      price: 750,
      surface: 25,
      rooms: 1,
      location: 'Lyon 2ème',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
      features: ['Meublé', 'Proche métro'],
      status: 'à louer',
      transactionType: 'location'
    },
    {
      id: '4',
      title: 'Villa avec piscine',
      price: 850000,
      surface: 200,
      rooms: 7,
      location: 'Nice',
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'],
      features: ['Piscine', 'Terrasse', 'Vue mer'],
      status: 'à vendre',
      transactionType: 'vente'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Annonces récentes
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos dernières opportunités immobilières
            </p>
          </div>
          
          {/* Navigation slider */}
          <div className="hidden md:flex space-x-2">
            <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Grille des annonces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {recentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Bouton voir plus */}
        <div className="text-center">
          <Link
            to="/resultats"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;