import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Heart, Bell, Settings, Home, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
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

            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Actions rapides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-6 w-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Mes favoris</div>
                    <div className="text-sm text-gray-600">Gérer mes biens favoris</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="h-6 w-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Alertes</div>
                    <div className="text-sm text-gray-600">Configurer mes alertes</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Home className="h-6 w-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Mes réservations</div>
                    <div className="text-sm text-gray-600">Suivre mes demandes</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-6 w-6 text-orange-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Paramètres</div>
                    <div className="text-sm text-gray-600">Modifier mon profil</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Activité récente</h3>
              <p className="text-gray-600 text-sm">Aucune activité récente</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Notre équipe est là pour vous accompagner
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-amber-700 transition-colors">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;