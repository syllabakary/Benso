import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

const RecentProperties: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    },
    {
      id: '5',
      title: 'Loft industriel rénové',
      price: 2200,
      surface: 95,
      rooms: 2,
      location: 'Paris 10ème',
      images: ['https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg'],
      features: ['Loft', 'Climatisation', 'Terrasse'],
      status: 'à louer',
      transactionType: 'location'
    },
    {
      id: '6',
      title: 'Penthouse vue panoramique',
      price: 1200000,
      surface: 150,
      rooms: 4,
      location: 'Cannes',
      images: ['https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg'],
      features: ['Vue mer', 'Terrasse', 'Parking privé'],
      status: 'à vendre',
      transactionType: 'vente'
    }
  ];

  // Nombre de cartes visibles selon la taille d'écran
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 4;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());
  const maxIndex = Math.max(0, recentProperties.length - visibleCards);

  // Gérer le redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

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
          <div className="hidden sm:flex space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-orange-50"
              disabled={maxIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600 hover:text-orange-600 transition-colors" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-orange-50"
              disabled={maxIndex === 0}
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600 hover:text-orange-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Container du slider */}
        <div className="relative overflow-hidden mb-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              width: `${(recentProperties.length / visibleCards) * 100}%`
            }}
          >
            {recentProperties.map((property) => (
              <div 
                key={property.id} 
                className="px-2 sm:px-3 h-full"
                style={{ 
                  width: `${100 / recentProperties.length}%`,
                  minWidth: `${100 / recentProperties.length}%`,
                  maxWidth: `${100 / recentProperties.length}%`
                }}
              >
                <div className="h-full">
                  <PropertyCard key={property.id} property={property} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs de pagination */}
        {maxIndex > 0 && (
          <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation mobile */}
        <div className="flex sm:hidden justify-center space-x-4 mb-8">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-orange-50"
            disabled={maxIndex === 1}
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 hover:text-orange-600 transition-colors" />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:bg-orange-50"
            disabled={maxIndex === 1}
          >
            <ChevronRight className="h-5 w-5 text-gray-600 hover:text-orange-600 transition-colors" />
          </button>
        </div>

        {/* Bouton voir plus */}
        <div className="text-center">
          <Link
            to="/resultats"
            className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 text-sm sm:text-base transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Voir toutes les annonces
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentProperties;