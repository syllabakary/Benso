import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Phone, 
  Mail,
  MessageCircle,
  TrendingUp,
  Award,
  Languages,
  Search,
  Filter,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Agent, AgentFormData } from '../../types/admin';

const AgentsManager: React.FC = () => {
  const { 
    agents, 
    createAgent, 
    updateAgent, 
    deleteAgent, 
    updateAgentStatus,
    isLoading 
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState<AgentFormData>({
    nom: '',
    email: '',
    telephone: '',
    whatsapp: '',
    specialite: '',
    description: '',
    experience_years: 0,
    languages: []
  });

  const itemsPerPage = 12;

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialite?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || agent.specialite === filterSpecialty;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && agent.is_active) ||
                         (filterStatus === 'inactive' && !agent.is_active);
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAgents = filteredAgents.slice(startIndex, startIndex + itemsPerPage);

  const specialties = [...new Set(agents.map(a => a.specialite).filter(Boolean))];

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAgent(formData);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  const handleUpdateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return;
    
    try {
      await updateAgent(selectedAgent.id, formData);
      setShowEditModal(false);
      setSelectedAgent(null);
      resetForm();
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      whatsapp: '',
      specialite: '',
      description: '',
      experience_years: 0,
      languages: []
    });
  };

  const openEditModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      nom: agent.nom,
      email: agent.email,
      telephone: agent.telephone,
      whatsapp: agent.whatsapp,
      specialite: agent.specialite || '',
      description: agent.description || '',
      experience_years: agent.experience_years,
      languages: agent.languages
    });
    setShowEditModal(true);
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const AgentModal: React.FC<{ 
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
              {/* Nom */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Business *
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              {/* Spécialité */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité
                </label>
                <select
                  value={formData.specialite}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialite: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Sélectionner une spécialité</option>
                  <option value="Vente résidentielle">Vente résidentielle</option>
                  <option value="Location et gestion">Location et gestion</option>
                  <option value="Immobilier commercial">Immobilier commercial</option>
                  <option value="Immobilier de luxe">Immobilier de luxe</option>
                  <option value="Investissement immobilier">Investissement immobilier</option>
                  <option value="Terrain et construction">Terrain et construction</option>
                </select>
              </div>

              {/* Expérience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  min="0"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Présentation de l'agent..."
              />
            </div>

            {/* Langues */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Langues parlées
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Français', 'Anglais', 'Baoulé', 'Dioula', 'Bété', 'Agni', 'Espagnol', 'Allemand', 'Italien'].map(lang => (
                  <label key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.languages.includes(lang)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, languages: [...prev.languages, lang] }));
                        } else {
                          setFormData(prev => ({ ...prev, languages: prev.languages.filter(l => l !== lang) }));
                        }
                      }}
                      className="mr-2 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm">{lang}</span>
                  </label>
                ))}
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Agents</h1>
          <p className="text-gray-600">{agents.length} agents au total</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvel Agent</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Agents Actifs</p>
              <p className="text-2xl font-bold text-green-600">
                {agents.filter(a => a.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ventes Totales</p>
              <p className="text-2xl font-bold text-blue-600">
                {agents.reduce((sum, a) => sum + a.total_sales, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expérience Moyenne</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(agents.reduce((sum, a) => sum + a.experience_years, 0) / agents.length)} ans
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award size={24} className="text-purple-600" />
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
          
          {/* Specialty Filter */}
          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Toutes les spécialités</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
          
          {/* Export */}
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-lg border hover:shadow-lg transition-all duration-200">
            <div className="p-6">
              {/* Agent Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {agent.nom.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.nom}</h3>
                    <p className="text-sm text-gray-500">{agent.specialite}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openEditModal(agent)}
                    className="p-1 text-gray-400 hover:text-orange-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {getRatingStars(agent.rating)}
                </div>
                <span className="text-sm font-medium text-gray-700">{agent.rating.toFixed(1)}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.total_sales}</p>
                  <p className="text-xs text-gray-500">Ventes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{agent.experience_years}</p>
                  <p className="text-xs text-gray-500">Ans d'exp.</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-2" />
                  <span className="truncate">{agent.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2" />
                  <span>{agent.telephone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MessageCircle size={14} className="mr-2" />
                  <span>{agent.whatsapp}</span>
                </div>
              </div>

              {/* Languages */}
              {agent.languages.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Languages size={14} className="mr-2" />
                    <span>Langues:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {agent.languages.slice(0, 3).map(lang => (
                      <span key={lang} className="px-2 py-1 bg-gray-100 text-xs rounded">
                        {lang}
                      </span>
                    ))}
                    {agent.languages.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                        +{agent.languages.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  agent.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {agent.is_active ? 'Actif' : 'Inactif'}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateAgentStatus(agent.id, !agent.is_active)}
                    className={`px-3 py-1 text-xs rounded ${
                      agent.is_active 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {agent.is_active ? 'Désactiver' : 'Activer'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredAgents.length)} sur {filteredAgents.length} agents
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
      <AgentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAgent}
        title="Créer un nouvel agent"
      />

      <AgentModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAgent(null);
          resetForm();
        }}
        onSubmit={handleUpdateAgent}
        title="Modifier l'agent"
      />
    </div>
  );
};

export default AgentsManager;