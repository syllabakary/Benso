import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  MapPin,
  Target,
  TrendingUp,
  Image as ImageIcon,
  Link,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';

interface Advertisement {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  link_url?: string;
  position: 'hero' | 'sidebar' | 'footer' | 'sponsored' | 'banner' | 'popup';
  page_location?: string;
  target_audience?: any;
  target_locations?: string[];
  is_active: boolean;
  start_date?: Date;
  end_date?: Date;
  daily_budget?: number;
  total_budget?: number;
  impressions_count: number;
  clicks_count: number;
  conversion_count: number;
  advertiser_name?: string;
  advertiser_contact?: string;
  created_at: Date;
  updated_at: Date;
}

const AdvertisementsManager: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Promotion Villas de Luxe',
      description: 'Découvrez nos villas exclusives avec piscine',
      image_url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400',
      link_url: 'https://benso.ci/villas-luxe',
      position: 'hero',
      page_location: 'home',
      target_locations: ['Abidjan', 'Bouaké'],
      is_active: true,
      start_date: new Date('2024-12-01'),
      end_date: new Date('2024-12-31'),
      daily_budget: 50,
      total_budget: 1500,
      impressions_count: 12450,
      clicks_count: 234,
      conversion_count: 12,
      advertiser_name: 'BENSO Premium',
      advertiser_contact: 'marketing@benso.ci',
      created_at: new Date('2024-11-15'),
      updated_at: new Date('2024-12-01')
    },
    {
      id: '2',
      title: 'Appartements Centre-Ville',
      description: 'Nouveaux appartements modernes au cœur d\'Abidjan',
      image_url: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=400',
      link_url: 'https://benso.ci/appartements-centre',
      position: 'sidebar',
      page_location: 'search',
      target_locations: ['Abidjan'],
      is_active: true,
      start_date: new Date('2024-11-20'),
      end_date: new Date('2024-12-20'),
      daily_budget: 30,
      total_budget: 900,
      impressions_count: 8750,
      clicks_count: 156,
      conversion_count: 8,
      advertiser_name: 'Immobilier Plus',
      advertiser_contact: 'contact@immobilierplus.ci',
      created_at: new Date('2024-11-18'),
      updated_at: new Date('2024-11-30')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);

  const positions = [
    { value: 'hero', label: 'Hero Banner' },
    { value: 'sidebar', label: 'Barre latérale' },
    { value: 'footer', label: 'Pied de page' },
    { value: 'sponsored', label: 'Contenu sponsorisé' },
    { value: 'banner', label: 'Bannière' },
    { value: 'popup', label: 'Pop-up' }
  ];

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'hero': return 'bg-purple-100 text-purple-800';
      case 'sidebar': return 'bg-blue-100 text-blue-800';
      case 'footer': return 'bg-gray-100 text-gray-800';
      case 'sponsored': return 'bg-orange-100 text-orange-800';
      case 'banner': return 'bg-green-100 text-green-800';
      case 'popup': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateCTR = (clicks: number, impressions: number) => {
    return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : '0.00';
  };

  const calculateConversionRate = (conversions: number, clicks: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';
  };

  const toggleAdStatus = (adId: string) => {
    setAdvertisements(prev => 
      prev.map(ad => 
        ad.id === adId ? { ...ad, is_active: !ad.is_active, updated_at: new Date() } : ad
      )
    );
  };

  const deleteAd = (adId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette publicité ?')) {
      setAdvertisements(prev => prev.filter(ad => ad.id !== adId));
    }
  };

  const filteredAds = advertisements.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.advertiser_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === 'all' || ad.position === filterPosition;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && ad.is_active) ||
                         (filterStatus === 'inactive' && !ad.is_active);
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Publicités</h1>
          <p className="text-gray-600">{advertisements.length} publicités au total</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nouvelle Publicité</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Publicités Actives</p>
              <p className="text-2xl font-bold text-green-600">
                {advertisements.filter(ad => ad.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impressions Totales</p>
              <p className="text-2xl font-bold text-blue-600">
                {advertisements.reduce((sum, ad) => sum + ad.impressions_count, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clics Totaux</p>
              <p className="text-2xl font-bold text-orange-600">
                {advertisements.reduce((sum, ad) => sum + ad.clicks_count, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target size={24} className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Conversion</p>
              <p className="text-2xl font-bold text-purple-600">
                {calculateConversionRate(
                  advertisements.reduce((sum, ad) => sum + ad.conversion_count, 0),
                  advertisements.reduce((sum, ad) => sum + ad.clicks_count, 0)
                )}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par titre, annonceur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Toutes les positions</option>
            {positions.map(pos => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
          </select>
          
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Advertisements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <div key={ad.id} className="bg-white rounded-lg border hover:shadow-lg transition-all duration-200">
            {/* Image */}
            <div className="relative">
              <img 
                src={ad.image_url} 
                alt={ad.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPositionColor(ad.position)}`}>
                  {positions.find(p => p.value === ad.position)?.label}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  ad.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {ad.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* Title and Description */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.title}</h3>
              {ad.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
              )}

              {/* Advertiser Info */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900">{ad.advertiser_name}</p>
                <p className="text-xs text-gray-500">{ad.advertiser_contact}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">{ad.impressions_count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Impressions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-600">{ad.clicks_count}</p>
                  <p className="text-xs text-gray-500">Clics</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{calculateCTR(ad.clicks_count, ad.impressions_count)}%</p>
                  <p className="text-xs text-gray-500">CTR</p>
                </div>
              </div>

              {/* Budget Info */}
              {ad.daily_budget && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget quotidien:</span>
                    <span className="font-medium">{ad.daily_budget}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget total:</span>
                    <span className="font-medium">{ad.total_budget}€</span>
                  </div>
                </div>
              )}

              {/* Dates */}
              {ad.start_date && ad.end_date && (
                <div className="mb-4 flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2" />
                  <span>
                    {ad.start_date.toLocaleDateString()} - {ad.end_date.toLocaleDateString()}
                  </span>
                </div>
              )}

              {/* Target Locations */}
              {ad.target_locations && ad.target_locations.length > 0 && (
                <div className="mb-4 flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  <span>{ad.target_locations.join(', ')}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingAd(ad)}
                    className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => toggleAdStatus(ad.id)}
                    className={`p-2 transition-colors ${
                      ad.is_active 
                        ? 'text-gray-400 hover:text-red-600' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                    title={ad.is_active ? 'Désactiver' : 'Activer'}
                  >
                    {ad.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => deleteAd(ad.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                {ad.link_url && (
                  <a
                    href={ad.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700"
                  >
                    <Link size={14} />
                    <span>Voir</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAds.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune publicité trouvée</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterPosition !== 'all' || filterStatus !== 'all'
              ? 'Aucune publicité ne correspond à vos critères de recherche.'
              : 'Commencez par créer votre première publicité.'}
          </p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Créer une publicité
          </button>
        </div>
      )}
    </div>
  );
};

export default AdvertisementsManager;