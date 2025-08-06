import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Map, List, SlidersHorizontal } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/FilterBar';

interface ResultsPageProps {
  transactionType?: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ transactionType }) => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Données fictives pour la démo
  const properties = [
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
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
      transactionType: transactionType === 'acheter' ? 'vente' : 'location'
    }
  ];

  const getPageTitle = () => {
    if (transactionType === 'acheter') return 'Biens à vendre';
    if (transactionType === 'louer') return 'Biens à louer';
    return 'Résultats de recherche';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
            <p className="text-gray-600">{properties.length} biens trouvés</p>
          </div>
          
          {/* Contrôles de vue */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filtres</span>
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

        {/* Barre de filtres */}
        {showFilters && (
          <div className="mb-8">
            <FilterBar transactionType={transactionType} />
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex gap-8">
          {/* Liste des biens */}
          <div className={`${viewMode === 'map' ? 'w-1/2' : 'w-full'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Précédent
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Suivant
                </button>
              </div>
            </div>
          </div>

          {/* Carte (si mode carte activé) */}
          {viewMode === 'map' && (
            <div className="w-1/2">
              <div className="sticky top-8">
                <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Carte interactive</p>
                    <p className="text-sm text-gray-500">Intégration Google Maps à venir</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;