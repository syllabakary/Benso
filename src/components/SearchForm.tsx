import React from 'react';
import { Search, MapPin, Euro, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchFormProps {
  searchData: {
    location: string;
    minPrice: string;
    maxPrice: string;
    propertyType: string;
    transactionType: string;
  };
  setSearchData: React.Dispatch<React.SetStateAction<{
    location: string;
    minPrice: string;
    maxPrice: string;
    propertyType: string;
    transactionType: string;
  }>>;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchData, setSearchData }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Rediriger vers la page de recherche avec les paramètres
    const params = new URLSearchParams();
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.minPrice) params.set('minPrice', searchData.minPrice);
    if (searchData.maxPrice) params.set('maxPrice', searchData.maxPrice);
    if (searchData.propertyType) params.set('type', searchData.propertyType);
    if (searchData.transactionType) params.set('transaction', searchData.transactionType);
    
    navigate(`/resultats?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Type de transaction */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Je souhaite
          </label>
          <div className="relative">
            <select
              value={searchData.transactionType}
              onChange={(e) => setSearchData({ ...searchData, transactionType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
            >
              <option value="louer">Louer</option>
              <option value="acheter">Acheter</option>
              <option value="reserver">Réserver</option>
            </select>
          </div>
        </div>

        {/* Localisation */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Où souhaitez-vous habiter ?
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Ville, quartier..."
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Type de bien */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de bien
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={searchData.propertyType}
              onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
            >
              <option value="">Tous les types</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="studio">Studio</option>
              <option value="terrain">Terrain</option>
              <option value="loft">Loft</option>
              <option value="bureau">Bureau</option>
              <option value="commerce">Commerce</option>
            </select>
          </div>
        </div>

        {/* Budget min */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix minimum
          </label>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              placeholder={searchData.transactionType === 'acheter' ? '100000' : '500'}
              value={searchData.minPrice}
              onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Budget max */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix maximum
          </label>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              placeholder={searchData.transactionType === 'acheter' ? '500000' : '2000'}
              value={searchData.maxPrice}
              onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Bouton de recherche */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Rechercher</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;