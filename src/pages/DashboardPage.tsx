import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useReservation } from '../contexts/ReservationContext';
import { useFavorites } from '../contexts/FavoriteContext';
import { useProperty } from '../contexts/PropertyContext';
import { User, Heart, Bell, Settings, Home, TrendingUp, Calendar, Eye, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserReservations, cancelReservation } = useReservation();
  const { favorites } = useFavorites();
  const { properties } = useProperty();

  const userReservations = getUserReservations();
  const favoriteProperties = properties.filter(property => favorites.includes(property.id));

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirme':
        return 'bg-green-100 text-green-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      case 'traite':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'En attente';
      case 'confirme':
        return 'Confirmé';
      case 'annule':
        return 'Annulé';
      case 'traite':
        return 'Traité';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-4 rounded-full">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bonjour {user.nom} !</h1>
              <p className="text-gray-600">
                Tableau de bord personnel
              </p>
            </div>
          </div>
        </div>

        {/* Informations utilisateur */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Réservations</p>
                    <p className="text-2xl font-bold text-gray-900">{userReservations.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Favoris</p>
                    <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Vues totales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {favoriteProperties.reduce((total, property) => total + property.viewsCount, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mes réservations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Mes réservations</h2>
              {userReservations.length > 0 ? (
                <div className="space-y-4">
                  {userReservations.map((reservation) => (
                    <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {reservation.typeTransaction === 'louer' ? 'Location' : 'Achat'} - {reservation.typeBien}
                          </h3>
                          <p className="text-gray-600 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {reservation.localisation}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        {reservation.budgetMin && reservation.budgetMax && (
                          <div>Budget: {reservation.budgetMin}€ - {reservation.budgetMax}€</div>
                        )}
                        {reservation.pieces && (
                          <div>Pièces: {reservation.pieces}</div>
                        )}
                        {reservation.dateVisite && (
                          <div>Date souhaitée: {new Date(reservation.dateVisite).toLocaleDateString('fr-FR')}</div>
                        )}
                        {reservation.heureVisite && (
                          <div>Heure: {reservation.heureVisite}</div>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Créée le {reservation.createdAt.toLocaleDateString('fr-FR')}
                        </span>
                        {reservation.status === 'en_attente' && (
                          <button
                            onClick={() => cancelReservation(reservation.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Aucune réservation pour le moment</p>
                  <Link
                    to="/reserver"
                    className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition-colors"
                  >
                    Faire une réservation
                  </Link>
                </div>
              )}
            </div>

            {/* Mes favoris */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Mes biens favoris</h2>
              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteProperties.map((property) => (
                    <Link
                      key={property.id}
                      to={`/bien/${property.id}`}
                      className="flex space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm flex items-center mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </p>
                        <p className="text-orange-600 font-bold">
                          {property.price.toLocaleString()}€
                          {property.transactionType === 'location' ? '/mois' : ''}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Aucun bien en favori</p>
                  <Link
                    to="/resultats"
                    className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition-colors"
                  >
                    Découvrir nos biens
                  </Link>
                </div>
              )}
            </div>

            {/* Informations personnelles */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Mes informations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <p className="text-gray-900">{user.nom}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Âge</label>
                  <p className="text-gray-900">{user.age} ans</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localité</label>
                  <p className="text-gray-900">{user.localite}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité</label>
                  <p className="text-gray-900">{user.nationalite}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  to="/reserver"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-sm">Nouvelle réservation</div>
                  </div>
                </Link>
                <Link
                  to="/resultats"
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Home className="h-5 w-5 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-sm">Rechercher un bien</div>
                  </div>
                </Link>
                <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full">
                  <Settings className="h-5 w-5 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-sm">Paramètres</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activité récente</h3>
              {userReservations.length > 0 ? (
                <div className="space-y-3">
                  {userReservations.slice(0, 3).map((reservation) => (
                    <div key={reservation.id} className="text-sm">
                      <p className="text-gray-900 font-medium">
                        Réservation {reservation.typeTransaction}
                      </p>
                      <p className="text-gray-600">
                        {reservation.createdAt.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">Aucune activité récente</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Notre équipe est là pour vous accompagner
              </p>
              <Link
                to="/contact"
                className="block text-center bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-700 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;