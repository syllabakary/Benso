import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Euro, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Wrench,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

interface RentalManagementProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalManagement({ isOpen, onClose }: RentalManagementProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tenants' | 'payments' | 'maintenance'>('overview');

  if (!isOpen) return null;

  const mockRentals = [
    {
      id: '1',
      property: 'Appartement 3 pièces - 15 rue de la Paix',
      tenant: 'Marie Martin',
      monthlyRent: 1200,
      deposit: 2400,
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      status: 'active',
      lastPayment: '2024-02-01',
      nextPayment: '2024-03-01'
    },
    {
      id: '2',
      property: 'Studio meublé - 8 avenue des Champs',
      tenant: 'Pierre Durand',
      monthlyRent: 750,
      deposit: 1500,
      startDate: '2024-02-15',
      endDate: '2025-02-15',
      status: 'active',
      lastPayment: '2024-02-15',
      nextPayment: '2024-03-15'
    }
  ];

  const mockPayments = [
    { id: '1', tenant: 'Marie Martin', amount: 1200, dueDate: '2024-03-01', status: 'pending' },
    { id: '2', tenant: 'Pierre Durand', amount: 750, dueDate: '2024-03-15', status: 'pending' },
    { id: '3', tenant: 'Marie Martin', amount: 1200, dueDate: '2024-02-01', status: 'paid' },
    { id: '4', tenant: 'Pierre Durand', amount: 750, dueDate: '2024-02-15', status: 'paid' }
  ];

  const mockMaintenance = [
    {
      id: '1',
      property: 'Appartement 3 pièces',
      title: 'Fuite dans la salle de bain',
      priority: 'high',
      status: 'open',
      createdDate: '2024-02-20',
      tenant: 'Marie Martin'
    },
    {
      id: '2',
      property: 'Studio meublé',
      title: 'Problème de chauffage',
      priority: 'medium',
      status: 'in_progress',
      createdDate: '2024-02-18',
      tenant: 'Pierre Durand'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Home },
    { id: 'tenants', label: 'Locataires', icon: Users },
    { id: 'payments', label: 'Paiements', icon: Euro },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Home className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Gestion Locative</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
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
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Biens loués</p>
                      <p className="text-3xl font-bold text-blue-900">{mockRentals.length}</p>
                    </div>
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Revenus mensuels</p>
                      <p className="text-3xl font-bold text-green-900">
                        {mockRentals.reduce((sum, rental) => sum + rental.monthlyRent, 0).toLocaleString()} €
                      </p>
                    </div>
                    <Euro className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Paiements en attente</p>
                      <p className="text-3xl font-bold text-orange-900">
                        {mockPayments.filter(p => p.status === 'pending').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-600">Demandes maintenance</p>
                      <p className="text-3xl font-bold text-red-900">
                        {mockMaintenance.filter(m => m.status === 'open').length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Loyer reçu - Marie Martin</p>
                      <p className="text-xs text-gray-600">1 200 € • il y a 2 jours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Nouvelle demande de maintenance</p>
                      <p className="text-xs text-gray-600">Fuite salle de bain • il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Fin de bail approche</p>
                      <p className="text-xs text-gray-600">Studio meublé • dans 11 mois</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Mes locataires</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Nouveau locataire
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockRentals.map((rental) => (
                  <div key={rental.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{rental.tenant}</h4>
                        <p className="text-sm text-gray-600">{rental.property}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rental.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {rental.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Loyer mensuel</span>
                        <span className="font-medium">{rental.monthlyRent.toLocaleString()} €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Dépôt de garantie</span>
                        <span className="font-medium">{rental.deposit.toLocaleString()} €</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Bail jusqu'au</span>
                        <span className="font-medium">{new Date(rental.endDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Dernier paiement</span>
                        <span className="font-medium">{new Date(rental.lastPayment).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Phone className="h-4 w-4" />
                        <span>Appeler</span>
                      </button>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Mail className="h-4 w-4" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                        <FileText className="h-4 w-4" />
                        <span>Contrat</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Suivi des paiements</h3>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Tous les statuts</option>
                    <option>En attente</option>
                    <option>Payé</option>
                    <option>En retard</option>
                  </select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Locataire</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Échéance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payment.tenant}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payment.amount.toLocaleString()} €</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{new Date(payment.dueDate).toLocaleDateString('fr-FR')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : payment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {payment.status === 'paid' ? 'Payé' : 
                             payment.status === 'pending' ? 'En attente' : 'En retard'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {payment.status === 'pending' && (
                            <button className="text-orange-600 hover:text-orange-700">
                              Relancer
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Demandes de maintenance</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Nouvelle demande
                </button>
              </div>

              <div className="space-y-4">
                {mockMaintenance.map((request) => (
                  <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{request.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.priority === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : request.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {request.priority === 'high' ? 'Urgent' : 
                             request.priority === 'medium' ? 'Moyen' : 'Faible'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'open' 
                              ? 'bg-blue-100 text-blue-700' 
                              : request.status === 'in_progress'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {request.status === 'open' ? 'Ouvert' : 
                             request.status === 'in_progress' ? 'En cours' : 'Terminé'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.property}</p>
                        <p className="text-sm text-gray-600">
                          Demandé par {request.tenant} • {new Date(request.createdDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Voir détails
                        </button>
                        <button className="text-orange-600 hover:text-orange-700 text-sm">
                          Assigner
                        </button>
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
  );
}