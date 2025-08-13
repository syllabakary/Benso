import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Home, 
  Calendar, 
  MessageCircle,
  DollarSign,
  Activity,
  Eye,
  Heart,
  Star
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { dashboardStats, properties, reservations, contacts, transactions, agents, isLoading } = useAdmin();

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
    suffix?: string;
  }> = ({ title, value, change, icon, color, suffix = '' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm ml-1">{Math.abs(change)}% ce mois</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const RecentActivity: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
      <div className="space-y-4">
        {[
          {
            type: 'reservation',
            message: 'Nouvelle réservation pour Villa Cocody',
            time: 'Il y a 5 min',
            color: 'text-green-600'
          },
          {
            type: 'transaction',
            message: 'Transaction finalisée - Appartement Plateau',
            time: 'Il y a 8 min',
            color: 'text-purple-600'
          },
          {
            type: 'contact',
            message: 'Nouveau message de Marie Traoré',
            time: 'Il y a 12 min',
            color: 'text-blue-600'
          },
          {
            type: 'property',
            message: 'Propriété ajoutée par Agent André',
            time: 'Il y a 25 min',
            color: 'text-orange-600'
          },
          {
            type: 'user',
            message: '3 nouveaux utilisateurs inscrits',
            time: 'Il y a 1h',
            color: 'text-purple-600'
          }
        ].map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TopProperties: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Propriétés Populaires</h3>
      <div className="space-y-4">
        {properties.slice(0, 5).map((property) => (
          <div key={property.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <img 
              src={property.images[0]?.image_url} 
              alt={property.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
              <p className="text-sm text-gray-500">{property.city}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{property.price.toLocaleString()}€</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span className="flex items-center"><Eye size={12} className="mr-1" />{property.views_count}</span>
                <span className="flex items-center"><Heart size={12} className="mr-1" />{property.favorites_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre plateforme BENSO</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Propriétés Totales"
          value={dashboardStats.total_properties}
          change={8.5}
          icon={<Home size={24} className="text-white" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Utilisateurs Actifs"
          value={dashboardStats.total_users}
          change={12.3}
          icon={<Users size={24} className="text-white" />}
          color="bg-green-500"
        />
        <StatCard
          title="Réservations"
          value={dashboardStats.pending_reservations}
          change={-3.2}
          icon={<Calendar size={24} className="text-white" />}
          color="bg-orange-500"
        />
        <StatCard
          title="Revenus Mensuel"
          value={`${dashboardStats.monthly_revenue.toLocaleString()}€`}
          change={15.7}
          icon={<DollarSign size={24} className="text-white" />}
          color="bg-purple-500"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Prix Moyen Vente"
          value={`${dashboardStats.avg_sale_price.toLocaleString()}€`}
          icon={<TrendingUp size={24} className="text-white" />}
          color="bg-indigo-500"
        />
        <StatCard
          title="Prix Moyen Location"
          value={`${dashboardStats.avg_rent_price.toLocaleString()}€`}
          icon={<Activity size={24} className="text-white" />}
          color="bg-teal-500"
        />
        <StatCard
          title="Taux de Conversion"
          value={dashboardStats.conversion_rate}
          change={4.1}
          icon={<Star size={24} className="text-white" />}
          color="bg-pink-500"
          suffix="%"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Transactions Totales"
          value={dashboardStats.total_transactions}
          change={8.2}
          icon={<DollarSign size={24} className="text-white" />}
          color="bg-emerald-500"
        />
        <StatCard
          title="Commission Gagnée"
          value={`${dashboardStats.commission_earned.toLocaleString()}€`}
          change={12.1}
          icon={<TrendingUp size={24} className="text-white" />}
          color="bg-cyan-500"
        />
        <StatCard
          title="Temps Moyen Vente"
          value={dashboardStats.avg_days_to_sell}
          change={-5.3}
          icon={<Calendar size={24} className="text-white" />}
          color="bg-violet-500"
          suffix=" jours"
        />
        <StatCard
          title="Agents Actifs"
          value={agents.filter(a => a.is_active).length}
          change={2.1}
          icon={<Users size={24} className="text-white" />}
          color="bg-rose-500"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity />
        <TopProperties />
      </div>

      {/* Performance Chart */}
      <div className="mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance des Ventes</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Graphique des performances (à intégrer avec Chart.js)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;