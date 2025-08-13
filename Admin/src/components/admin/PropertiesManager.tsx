import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Heart, 
  Star, 
  MapPin, 
  Home, 
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  AlertTriangle
} from 'lucide-react';
import { Property } from '../../types/admin';
import PropertyForm from './PropertyForm';

const PropertiesManager: React.FC = () => {
  const { 
    properties, 
    deleteProperty, 
    togglePropertyFeature, 
    togglePropertySponsored,
    updatePropertyStatus 
  } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const itemsPerPage = 10;

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectProperty = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleSelectAll = () => {
    setSelectedProperties(
      selectedProperties.length === paginatedProperties.length 
        ? []
        : paginatedProperties.map(p => p.id)
    );
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    setShowDeleteConfirm(propertyId);
  };

  const confirmDelete = async () => {
    if (showDeleteConfirm) {
      await deleteProperty(showDeleteConfirm);
      setShowDeleteConfirm(null);
    }
  };

  const handleStatusChange = async (propertyId: string, newStatus: string) => {
    await updatePropertyStatus(propertyId, newStatus);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'a_vendre':
      case 'a_louer':
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} />, text: status.replace('_', ' ') };
      case 'reserve':
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} />, text: 'Réservé' };
      case 'vendu':
      case 'loue':
        return { color: 'bg-blue-100 text-blue-800', icon: <CheckCircle size={16} />, text: status === 'vendu' ? 'Vendu' : 'Loué' };
      case 'retire':
        return { color: 'bg-gray-100 text-gray-800', icon: <Pause size={16} />, text: 'Retiré' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <AlertTriangle size={16} />, text: status };
    }
  };

  const StatusDropdown: React.FC<{ property: Property }> = ({ property }) => {
    const [isOpen, setIsOpen] = useState(false);
    const statusConfig = getStatusConfig(property.status);

    const statusOptions = [
      { value: 'a_vendre', label: 'À vendre', available: property.transaction_type === 'vente' },
      { value: 'a_louer', label: 'À louer', available: property.transaction_type === 'location' },
      { value: 'reserve', label: 'Réservé', available: true },
      { value: 'vendu', label: 'Vendu', available: property.transaction_type === 'vente' },
      { value: 'loue', label: 'Loué', available: property.transaction_type === 'location' },
      { value: 'retire', label: 'Retiré', available: true }
    ].filter(option => option.available);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${statusConfig.color} hover:opacity-80 transition-opacity`}
        >
          {statusConfig.icon}
          <span className="ml-1">{statusConfig.text}</span>
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
            {statusOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  handleStatusChange(property.id, option.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <div className="bg-white rounded-lg border hover:shadow-md transition-all duration-200">
      <div className="p-4">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={selectedProperties.includes(property.id)}
            onChange={() => handleSelectProperty(property.id)}
            className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          
          {/* Image */}
          <div className="relative">
            <img 
              src={property.images[0]?.image_url || '/placeholder.jpg'} 
              alt={property.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            {property.is_featured && (
              <Star size={16} className="absolute -top-2 -right-2 text-yellow-500 fill-current" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 truncate">{property.title}</h3>
                <p className="text-xs text-gray-500 mt-1">Réf: {property.reference}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin size={12} className="mr-1" />
                  {property.city}, {property.district}
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => togglePropertyFeature(property.id)}
                  className={`p-1 rounded ${property.is_featured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                  title={property.is_featured ? 'Retirer de la mise en avant' : 'Mettre en avant'}
                >
                  <Star size={16} />
                </button>
                <button 
                  onClick={() => handleEditProperty(property)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  title="Modifier"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteProperty(property.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                  title="Supprimer"
                >
                  <Trash2 size={16} />
                </button>
                <div className="relative">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{property.price.toLocaleString()}€</p>
                <p className="text-xs text-gray-500">{property.transaction_type}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{property.surface}m²</p>
                <p className="text-xs text-gray-500">{property.rooms} pièces</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 flex items-center justify-center">
                  <Eye size={12} className="mr-1" />{property.views_count}
                </p>
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <Heart size={12} className="mr-1" />{property.favorites_count}
                </p>
              </div>
            </div>
            
            {/* Status et badges */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <StatusDropdown property={property} />
                {property.is_sponsored && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Sponsorisé
                  </span>
                )}
                {property.is_exclusive && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    Exclusif
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => togglePropertySponsored(property.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    property.is_sponsored 
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={property.is_sponsored ? 'Retirer sponsoring' : 'Sponsoriser'}
                >
                  {property.is_sponsored ? 'Dé-sponsoriser' : 'Sponsoriser'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BulkActions: React.FC = () => (
    <div className="mt-4 p-3 bg-orange-50 rounded-lg flex items-center justify-between">
      <p className="text-sm text-orange-800">
        {selectedProperties.length} propriété(s) sélectionnée(s)
      </p>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
          Mettre en avant
        </button>
        <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
          Sponsoriser
        </button>
        <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
          Désactiver
        </button>
        <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
          Supprimer
        </button>
      </div>
    </div>
  );

  const DeleteConfirmModal: React.FC = () => {
    if (!showDeleteConfirm) return null;
    
    const property = properties.find(p => p.id === showDeleteConfirm);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir supprimer la propriété "{property?.title}" ? 
            Cette action est irréversible.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Propriétés</h1>
          <p className="text-gray-600">{properties.length} propriétés au total</p>
        </div>
        <button 
          onClick={() => {
            setEditingProperty(null);
            setShowPropertyForm(true);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvelle Propriété</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {properties.filter(p => ['a_vendre', 'a_louer'].includes(p.status)).length}
          </div>
          <div className="text-sm text-gray-500">Disponibles</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">
            {properties.filter(p => p.status === 'reserve').length}
          </div>
          <div className="text-sm text-gray-500">Réservées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {properties.filter(p => ['vendu', 'loue'].includes(p.status)).length}
          </div>
          <div className="text-sm text-gray-500">Vendues/Louées</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">
            {properties.filter(p => p.is_featured).length}
          </div>
          <div className="text-sm text-gray-500">Mises en avant</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">
            {properties.filter(p => p.is_sponsored).length}
          </div>
          <div className="text-sm text-gray-500">Sponsorisées</div>
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
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les types</option>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="loft">Loft</option>
          </select>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="a_vendre">À vendre</option>
            <option value="a_louer">À louer</option>
            <option value="reserve">Réservé</option>
            <option value="vendu">Vendu</option>
            <option value="loue">Loué</option>
          </select>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter size={16} />
              <span>Filtres</span>
            </button>
          </div>
        </div>
        
        {/* Selected Actions */}
        {selectedProperties.length > 0 && (
          <BulkActions />
        )}
      </div>

      {/* Properties List */}
      <div className="space-y-4">
        {/* Select All */}
        <div className="bg-gray-50 p-3 rounded-lg flex items-center">
          <input
            type="checkbox"
            checked={selectedProperties.length === paginatedProperties.length && paginatedProperties.length > 0}
            onChange={handleSelectAll}
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="ml-3 text-sm text-gray-700">Tout sélectionner</span>
        </div>

        {/* Properties */}
        {paginatedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredProperties.length)} sur {filteredProperties.length} résultats
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

      {/* Property Form Modal */}
      <PropertyForm
        isOpen={showPropertyForm}
        onClose={() => {
          setShowPropertyForm(false);
          setEditingProperty(null);
        }}
        property={editingProperty}
        mode={editingProperty ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal />
    </div>
  );
};

export default PropertiesManager;