import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Calendar, 
  User, 
  Home, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

const ReservationsManager: React.FC = () => {
  const { reservations, updateReservationStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Filter reservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.localisation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || reservation.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'en_attente':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock size={16} />,
          text: 'En attente'
        };
      case 'confirme':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle size={16} />,
          text: 'Confirmé'
        };
      case 'annule':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <XCircle size={16} />,
          text: 'Annulé'
        };
      case 'traite':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <CheckCircle size={16} />,
          text: 'Traité'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle size={16} />,
          text: status
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Urgent' };
      case 'high':
        return { color: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Élevée' };
      case 'normal':
        return { color: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Normale' };
      case 'low':
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Faible' };
      default:
        return { color: 'bg-gray-100 text-gray-800 border-gray-200', text: priority };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatBudget = (min?: number, max?: number) => {
    if (!min && !max) return 'Non spécifié';
    if (!min) return `Jusqu'à ${max?.toLocaleString()}€`;
    if (!max) return `À partir de ${min?.toLocaleString()}€`;
    return `${min?.toLocaleString()}€ - ${max?.toLocaleString()}€`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h1>
          <p className="text-gray-600">{reservations.length} réservations au total</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>{reservations.filter(r => r.status === 'en_attente').length} en attente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>{reservations.filter(r => r.status === 'confirme').length} confirmées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>{reservations.filter(r => r.priority === 'urgent').length} urgentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="confirme">Confirmé</option>
            <option value="annule">Annulé</option>
            <option value="traite">Traité</option>
          </select>
          
          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="urgent">Urgent</option>
            <option value="high">Élevée</option>
            <option value="normal">Normale</option>
            <option value="low">Faible</option>
          </select>
          
          {/* Export */}
          <div className="flex justify-end">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter size={16} />
              <span>Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {paginatedReservations.map((reservation) => {
          const statusConfig = getStatusConfig(reservation.status);
          const priorityConfig = getPriorityConfig(reservation.priority);
          
          return (
            <div key={reservation.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{reservation.nom}</h3>
                    <p className="text-sm text-gray-500">Réservation #{reservation.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${priorityConfig.color}`}>
                    {priorityConfig.text}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${statusConfig.color}`}>
                    {statusConfig.icon}
                    <span className="ml-1">{statusConfig.text}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail size={14} className="mr-2" />
                      {reservation.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={14} className="mr-2" />
                      {reservation.telephone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      {formatDate(reservation.created_at)}
                    </div>
                  </div>
                </div>

                {/* Search Criteria */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Critères</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Home size={14} className="mr-2" />
                      {reservation.type_transaction} • {reservation.type_bien || 'Non spécifié'}
                    </div>
                    {reservation.localisation && (
                      <div className="flex items-center text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {reservation.localisation}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={14} className="mr-2" />
                      {formatBudget(reservation.budget_min, reservation.budget_max)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    {reservation.status === 'en_attente' && (
                      <>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'confirme')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => updateReservationStatus(reservation.id, 'annule')}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                    {reservation.status === 'confirme' && (
                      <button
                        onClick={() => updateReservationStatus(reservation.id, 'traite')}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Marquer traité
                      </button>
                    )}
                    <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
                      Contacter
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredReservations.length)} sur {filteredReservations.length} réservations
          </p>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationsManager;