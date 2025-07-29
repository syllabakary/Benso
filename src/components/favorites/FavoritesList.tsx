import React from 'react';
import { Heart, X, Share2, MessageCircle } from 'lucide-react';
import { useProperty } from '../../contexts/PropertyContext';
import PropertyCard from '../property/PropertyCard';

interface FavoritesListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoritesList({ isOpen, onClose }: FavoritesListProps) {
  const { properties, favorites, toggleFavorite } = useProperty();

  if (!isOpen) return null;

  const favoriteProperties = properties.filter(property => favorites.includes(property.id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h2 className="text-2xl font-bold text-gray-900">Mes favoris</h2>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
              {favoriteProperties.length}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun favori</h3>
              <p className="text-gray-600 mb-6">
                Ajoutez des biens à vos favoris pour les retrouver facilement
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-500 hover:to-orange-700"
              >
                Découvrir les biens
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Vous avez {favoriteProperties.length} bien{favoriteProperties.length > 1 ? 's' : ''} en favoris
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map(property => (
                  <div key={property.id} className="relative">
                    <PropertyCard
                      property={property}
                      onFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                        <MessageCircle className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Actions groupées
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Partager la sélection
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Créer une alerte similaire
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
                          favoriteProperties.forEach(property => toggleFavorite(property.id));
                        }
                      }}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Tout supprimer
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}