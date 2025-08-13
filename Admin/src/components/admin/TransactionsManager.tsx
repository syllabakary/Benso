import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Eye, 
  FileText, 
  DollarSign, 
  Calendar, 
  User, 
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Transaction, TransactionFormData } from '../../types/admin';

const TransactionsManager: React.FC = () => {
  const { 
    transactions, 
    filteredTransactions, 
    transactionFilters,
    setTransactionFilters,
    agents, 
    properties,
    users,
    createTransaction,
    updateTransaction,
    updateTransactionStatus,
    isLoading 
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState<TransactionFormData>({
    property_id: '',
    buyer_id: '',
    seller_id: '',
    agent_id: '',
    type: 'vente',
    price_agreed: 0,
    commission_rate: 5,
    contract_date: undefined,
    completion_date: undefined,
    deposit_paid: 0,
    monthly_rent: 0,
    lease_duration: 12,
    notes: ''
  });

  const itemsPerPage = 10;

  // Filter transactions based on search and filters
  const searchFilteredTransactions = filteredTransactions.filter(transaction => {
    const property = properties.find(p => p.id === transaction.property_id);
    const agent = agents.find(a => a.id === transaction.agent_id);
    const buyer = users.find(u => u.id === transaction.buyer_id);
    
    const searchString = `${property?.title || ''} ${property?.reference || ''} ${agent?.nom || ''} ${buyer?.nom || ''}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(searchFilteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = searchFilteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'en_cours':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock size={16} />,
          text: 'En cours'
        };
      case 'signe':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <FileText size={16} />,
          text: 'Signé'
        };
      case 'finalise':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle size={16} />,
          text: 'Finalisé'
        };
      case 'annule':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <XCircle size={16} />,
          text: 'Annulé'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertTriangle size={16} />,
          text: status
        };
    }
  };

  const formatCurrency = (amount: number, currency: 'EUR' | 'FCFA' = 'EUR') => {
    if (currency === 'FCFA') {
      return `${(amount * 655.957).toLocaleString()} FCFA`;
    }
    return `${amount.toLocaleString()}€`;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Non défini';
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const handleUpdateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransaction) return;
    
    try {
      await updateTransaction(selectedTransaction.id, formData);
      setShowEditModal(false);
      setSelectedTransaction(null);
      resetForm();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      property_id: '',
      buyer_id: '',
      seller_id: '',
      agent_id: '',
      type: 'vente',
      price_agreed: 0,
      commission_rate: 5,
      contract_date: undefined,
      completion_date: undefined,
      deposit_paid: 0,
      monthly_rent: 0,
      lease_duration: 12,
      notes: ''
    });
  };

  const openEditModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      property_id: transaction.property_id,
      buyer_id: transaction.buyer_id || '',
      seller_id: transaction.seller_id || '',
      agent_id: transaction.agent_id,
      type: transaction.type,
      price_agreed: transaction.price_agreed,
      commission_rate: transaction.commission_rate,
      contract_date: transaction.contract_date,
      completion_date: transaction.completion_date,
      deposit_paid: transaction.deposit_paid || 0,
      monthly_rent: transaction.monthly_rent || 0,
      lease_duration: transaction.lease_duration || 12,
      notes: transaction.notes || ''
    });
    setShowEditModal(true);
  };

  const TransactionModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    onSubmit: (e: React.FormEvent) => void;
    title: string;
  }> = ({ isOpen, onClose, onSubmit, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Property */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Propriété *
                </label>
                <select
                  value={formData.property_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, property_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Sélectionner une propriété</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.reference} - {property.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Agent */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agent *
                </label>
                <select
                  value={formData.agent_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, agent_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="">Sélectionner un agent</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>
                      {agent.nom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de transaction *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'vente' | 'location' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                >
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                </select>
              </div>

              {/* Buyer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'vente' ? 'Acheteur' : 'Locataire'}
                </label>
                <select
                  value={formData.buyer_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, buyer_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Sélectionner un utilisateur</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.nom} - {user.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'vente' ? 'Prix de vente (€)' : 'Loyer mensuel (€)'} *
                </label>
                <input
                  type="number"
                  value={formData.price_agreed}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_agreed: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Commission Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taux de commission (%) *
                </label>
                <input
                  type="number"
                  value={formData.commission_rate}
                  onChange={(e) => setFormData(prev => ({ ...prev, commission_rate: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Contract Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de contrat
                </label>
                <input
                  type="date"
                  value={formData.contract_date ? formData.contract_date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contract_date: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* Completion Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de finalisation
                </label>
                <input
                  type="date"
                  value={formData.completion_date ? formData.completion_date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    completion_date: e.target.value ? new Date(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {formData.type === 'vente' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Acompte versé (€)
                  </label>
                  <input
                    type="number"
                    value={formData.deposit_paid}
                    onChange={(e) => setFormData(prev => ({ ...prev, deposit_paid: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {formData.type === 'location' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée du bail (mois)
                  </label>
                  <input
                    type="number"
                    value={formData.lease_duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, lease_duration: parseInt(e.target.value) || 12 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    min="1"
                  />
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Notes additionnelles..."
              />
            </div>

            {/* Commission Preview */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Aperçu de la commission</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-orange-700">Montant: </span>
                  <span className="font-medium">{formatCurrency(formData.price_agreed)}</span>
                </div>
                <div>
                  <span className="text-orange-700">Commission: </span>
                  <span className="font-medium">
                    {formatCurrency(formData.price_agreed * (formData.commission_rate / 100))}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Transactions</h1>
          <p className="text-gray-600">{transactions.length} transactions au total</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvelle Transaction</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Cours</p>
              <p className="text-2xl font-bold text-yellow-600">
                {transactions.filter(t => t.status === 'en_cours').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Finalisées</p>
              <p className="text-2xl font-bold text-green-600">
                {transactions.filter(t => t.status === 'finalise').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commission Totale</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(transactions.reduce((sum, t) => sum + t.commission_amount, 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Type Filter */}
          <select
            value={transactionFilters.type || ''}
            onChange={(e) => setTransactionFilters({ ...transactionFilters, type: e.target.value || undefined })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Tous les types</option>
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={transactionFilters.status || ''}
            onChange={(e) => setTransactionFilters({ ...transactionFilters, status: e.target.value || undefined })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Tous les statuts</option>
            <option value="en_cours">En cours</option>
            <option value="signe">Signé</option>
            <option value="finalise">Finalisé</option>
            <option value="annule">Annulé</option>
          </select>

          {/* Agent Filter */}
          <select
            value={transactionFilters.agent_id || ''}
            onChange={(e) => setTransactionFilters({ ...transactionFilters, agent_id: e.target.value || undefined })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Tous les agents</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>{agent.nom}</option>
            ))}
          </select>
          
          {/* Export */}
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propriété
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => {
                const property = properties.find(p => p.id === transaction.property_id);
                const agent = agents.find(a => a.id === transaction.agent_id);
                const buyer = users.find(u => u.id === transaction.buyer_id);
                const statusConfig = getStatusConfig(transaction.status);

                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.type === 'vente' ? 'Vente' : 'Location'} #{transaction.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(transaction.created_at)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {property?.reference}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {property?.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {buyer?.nom || 'Non assigné'}
                      </div>
                      {buyer && (
                        <div className="text-sm text-gray-500">
                          {buyer.email}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {agent?.nom}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(transaction.price_agreed)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatCurrency(transaction.price_agreed, 'FCFA')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(transaction.commission_amount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.commission_rate}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="ml-1">{statusConfig.text}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openEditModal(transaction)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <FileText size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, searchFilteredTransactions.length)} sur {searchFilteredTransactions.length} transactions
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

      {/* Modals */}
      <TransactionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTransaction}
        title="Créer une nouvelle transaction"
      />

      <TransactionModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTransaction(null);
          resetForm();
        }}
        onSubmit={handleUpdateTransaction}
        title="Modifier la transaction"
      />
    </div>
  );
};

export default TransactionsManager;