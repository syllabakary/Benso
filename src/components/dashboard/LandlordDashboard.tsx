import React, { useState } from 'react';
import { 
  Plus, 
  Home, 
  Eye, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Euro,
  Users,
  Star,
  BarChart3,
  Settings,
  Edit,
  Trash2
} from 'lucide-react';
import { Property, DashboardStats } from '../../types';
import VisitManager from '../visits/VisitManager';
import { useVisit } from '../../contexts/VisitContext';

interface LandlordDashboardProps {
  properties: Property[];
  stats: DashboardStats;
}

export default function LandlordDashboard({ properties, stats }: LandlordDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'analytics' | 'messages'>('overview');
  const { getVisitsByLandlord, updateVisit, getPendingVisitsCount } = useVisit();

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'properties', label: 'Mes biens', icon: Home },
    { id: 'analytics', label: 'Statistiques', icon: TrendingUp },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  const landlordVisits = getVisitsByLandlord('1'); // ID du propriétaire connecté
  const pendingVisitsCount = getPendingVisitsCount('1');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Gérez vos biens et suivez vos performances</p>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all">
            <Plus className="h-5 w-5" />
            <span>Nouvelle annonce</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Biens actifs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeProperties}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vues totales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contacts</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalContacts}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Demandes de visite</p>
                <p className="text-3xl font-bold text-gray-900">{pendingVisitsCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-orange-600 font-medium">En attente</span>
              <span className="text-gray-500 ml-1">de confirmation</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Note moyenne</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+0.2</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('visits')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'visits'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Visites</span>
                {pendingVisitsCount > 0 && (
                  <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                    {pendingVisitsCount}
                  </span>
                )}
              </button>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                  <div className="space-y-3">
                    {[
                      { type: 'view', message: 'Votre annonce "Appartement 3 pièces" a été vue 15 fois', time: '2h' },
                      { type: 'contact', message: 'Nouveau message de Marie Martin', time: '4h' },
                      { type: 'visit', message: 'Visite programmée pour demain à 14h', time: '6h' },
                      { type: 'favorite', message: 'Votre bien a été ajouté aux favoris 3 fois', time: '1j' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">il y a {activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all text-left">
                      <Plus className="h-6 w-6 text-orange-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Nouvelle annonce</h4>
                      <p className="text-sm text-gray-600">Publier un nouveau bien</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all text-left">
                      <Calendar className="h-6 w-6 text-orange-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Programmer visite</h4>
                      <p className="text-sm text-gray-600">Organiser une visite</p>
                    </button>
                    <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all text-left">
                      <BarChart3 className="h-6 w-6 text-orange-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Voir statistiques</h4>
                      <p className="text-sm text-gray-600">Analyser les performances</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'visits' && (
              <VisitManager
                visits={landlordVisits}
                properties={properties}
                onUpdateVisit={updateVisit}
              />
            )}

            {activeTab === 'properties' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Mes biens ({properties.length})</h3>
                  <div className="flex items-center space-x-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>Tous les biens</option>
                      <option>Actifs</option>
                      <option>Inactifs</option>
                      <option>En attente</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                      <div className="flex items-start space-x-4">
                        <img
                          src={property.images[0]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=200'}
                          alt={property.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{property.title}</h4>
                              <p className="text-sm text-gray-600">{property.address.city}</p>
                              <p className="text-lg font-bold text-orange-600 mt-1">
                                {property.price.toLocaleString()} €/mois
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 mt-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{property.views} vues</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>5 messages</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>2 visites</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              property.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {property.status === 'active' ? 'Actif' : 'Inactif'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Statistiques détaillées</h3>
                
                {/* Charts would go here */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Vues par mois</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Graphique des vues (à implémenter)
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-4">Contacts par bien</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Graphique des contacts (à implémenter)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Messages récents</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Marie Martin', message: 'Bonjour, je suis intéressée par votre appartement...', time: '2h', unread: true },
                    { name: 'Pierre Durand', message: 'Serait-il possible de programmer une visite ?', time: '4h', unread: true },
                    { name: 'Sophie Leblanc', message: 'Merci pour la visite, je vais réfléchir...', time: '1j', unread: false },
                  ].map((msg, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${msg.unread ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{msg.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">il y a {msg.time}</span>
                          {msg.unread && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 ml-auto"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}