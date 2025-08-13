import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Reply,
  Archive,
  Trash2
} from 'lucide-react';

const ContactsManager: React.FC = () => {
  const { contacts, updateContactStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.sujet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || contact.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'nouveau':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <AlertCircle size={16} />,
          text: 'Nouveau'
        };
      case 'en_cours':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Clock size={16} />,
          text: 'En cours'
        };
      case 'traite':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle size={16} />,
          text: 'Traité'
        };
      case 'ferme':
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <XCircle size={16} />,
          text: 'Fermé'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <AlertCircle size={16} />,
          text: status
        };
    }
  };

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'general':
        return { color: 'bg-gray-100 text-gray-800', text: 'Général' };
      case 'support':
        return { color: 'bg-blue-100 text-blue-800', text: 'Support' };
      case 'commercial':
        return { color: 'bg-green-100 text-green-800', text: 'Commercial' };
      case 'technique':
        return { color: 'bg-orange-100 text-orange-800', text: 'Technique' };
      case 'partenariat':
        return { color: 'bg-purple-100 text-purple-800', text: 'Partenariat' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: category };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'normal':
        return 'border-l-blue-500';
      case 'low':
        return 'border-l-gray-500';
      default:
        return 'border-l-gray-300';
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Contacts</h1>
          <p className="text-gray-600">{contacts.length} messages au total</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>{contacts.filter(c => c.status === 'nouveau').length} nouveaux</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span>{contacts.filter(c => c.status === 'en_cours').length} en cours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>{contacts.filter(c => c.priority === 'urgent').length} urgents</span>
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
              placeholder="Rechercher par nom, email, sujet..."
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
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="traite">Traité</option>
            <option value="ferme">Fermé</option>
          </select>
          
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Toutes les catégories</option>
            <option value="general">Général</option>
            <option value="support">Support</option>
            <option value="commercial">Commercial</option>
            <option value="technique">Technique</option>
            <option value="partenariat">Partenariat</option>
          </select>
          
          {/* Export */}
          <div className="flex justify-end">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter size={16} />
              <span>Actions groupées</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {paginatedContacts.map((contact) => {
          const statusConfig = getStatusConfig(contact.status);
          const categoryConfig = getCategoryConfig(contact.category);
          const priorityColor = getPriorityColor(contact.priority);
          
          return (
            <div key={contact.id} className={`bg-white rounded-lg border-l-4 ${priorityColor} shadow-sm hover:shadow-md transition-shadow`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{contact.sujet}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${categoryConfig.color}`}>
                        {categoryConfig.text}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{contact.nom}</span>
                      <div className="flex items-center">
                        <Mail size={14} className="mr-1" />
                        {contact.email}
                      </div>
                      {contact.telephone && (
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          {contact.telephone}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(contact.created_at)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.text}</span>
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <MessageSquare size={16} className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 text-sm leading-relaxed">{contact.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {contact.status === 'nouveau' && (
                      <>
                        <button
                          onClick={() => updateContactStatus(contact.id, 'en_cours')}
                          className="px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 flex items-center space-x-1"
                        >
                          <Clock size={14} />
                          <span>Prendre en charge</span>
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center space-x-1">
                          <Reply size={14} />
                          <span>Répondre</span>
                        </button>
                      </>
                    )}
                    {contact.status === 'en_cours' && (
                      <>
                        <button
                          onClick={() => updateContactStatus(contact.id, 'traite')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center space-x-1"
                        >
                          <CheckCircle size={14} />
                          <span>Marquer traité</span>
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center space-x-1">
                          <Reply size={14} />
                          <span>Répondre</span>
                        </button>
                      </>
                    )}
                    {contact.status === 'traite' && (
                      <button
                        onClick={() => updateContactStatus(contact.id, 'ferme')}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 flex items-center space-x-1"
                      >
                        <Archive size={14} />
                        <span>Archiver</span>
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Trash2 size={16} />
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
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredContacts.length)} sur {filteredContacts.length} contacts
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

export default ContactsManager;