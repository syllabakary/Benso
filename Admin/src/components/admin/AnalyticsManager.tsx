import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Users, 
  Home, 
  DollarSign,
  Calendar,
  MapPin,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react';

const AnalyticsManager: React.FC = () => {
  const { dashboardStats, properties, users, transactions, agents } = useAdmin();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  // Données simulées pour les graphiques
  const generateChartData = (period: string) => {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 500) + 100,
        users: Math.floor(Math.random() * 50) + 10,
        transactions: Math.floor(Math.random() * 10) + 1,
        revenue: Math.floor(Math.random() * 50000) + 10000
      });
    }
    
    return data;
  };

  const chartData = generateChartData(selectedPeriod);

  const topLocations = [
    { city: 'Abidjan', properties: 1247, avgPrice: 285000, growth: 12.5 },
    { city: 'Bouaké', properties: 234, avgPrice: 145000, growth: 8.3 },
    { city: 'Daloa', properties: 156, avgPrice: 125000, growth: -2.1 },
    { city: 'Yamoussoukro', properties: 98, avgPrice: 165000, growth: 15.7 },
    { city: 'San-Pédro', properties: 87, avgPrice: 135000, growth: 6.9 }
  ];

  const topSearches = [
    { term: 'villa cocody', count: 1245, trend: 'up' },
    { term: 'appartement plateau', count: 987, trend: 'up' },
    { term: 'maison bouaké', count: 654, trend: 'down' },
    { term: 'terrain abidjan', count: 543, trend: 'up' },
    { term: 'studio location', count: 432, trend: 'stable' }
  ];

  const agentPerformance = agents.map(agent => ({
    ...agent,
    revenue: agent.total_sales * 2500, // Estimation
    conversionRate: Math.random() * 20 + 5 // 5-25%
  })).sort((a, b) => b.revenue - a.revenue);

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
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
          <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm ml-1">{Math.abs(change)}% vs période précédente</span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const SimpleChart: React.FC<{ data: any[]; metric: string; color: string }> = ({ data, metric, color }) => (
    <div className="h-64 flex items-end space-x-1 p-4">
      {data.map((item, index) => {
        const maxValue = Math.max(...data.map(d => d[metric]));
        const height = (item[metric] / maxValue) * 200;
        
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80`}
              style={{ height: `${height}px` }}
              title={`${item.date}: ${item[metric]}`}
            />
            <span className="text-xs text-gray-500 mt-1 transform -rotate-45 origin-left">
              {new Date(item.date).getDate()}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Rapports</h1>
          <p className="text-gray-600">Analyse des performances de la plateforme</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2">
            <Download size={20} />
            <span>Exporter</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Vues Totales"
          value={chartData.reduce((sum, item) => sum + item.views, 0)}
          change={15.3}
          icon={<Eye size={24} className="text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Nouveaux Utilisateurs"
          value={chartData.reduce((sum, item) => sum + item.users, 0)}
          change={8.7}
          icon={<Users size={24} className="text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Transactions"
          value={chartData.reduce((sum, item) => sum + item.transactions, 0)}
          change={-2.1}
          icon={<DollarSign size={24} className="text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Revenus"
          value={chartData.reduce((sum, item) => sum + item.revenue, 0)}
          change={12.4}
          icon={<TrendingUp size={24} className="text-white" />}
          color="bg-orange-500"
          suffix="€"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Traffic Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Évolution du Trafic</h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="views">Vues</option>
              <option value="users">Utilisateurs</option>
              <option value="transactions">Transactions</option>
            </select>
          </div>
          <SimpleChart 
            data={chartData} 
            metric={selectedMetric} 
            color="bg-blue-500" 
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus</h3>
          <SimpleChart 
            data={chartData} 
            metric="revenue" 
            color="bg-orange-500" 
          />
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Locations */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Villes Populaires</h3>
            <MapPin size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {topLocations.map((location, index) => (
              <div key={location.city} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{location.city}</p>
                    <p className="text-sm text-gray-500">{location.properties} propriétés</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {location.avgPrice.toLocaleString()}€
                  </p>
                  <div className={`flex items-center text-xs ${
                    location.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {location.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span className="ml-1">{Math.abs(location.growth)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Searches */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recherches Populaires</h3>
            <Search size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {topSearches.map((search, index) => (
              <div key={search.term} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{search.term}</p>
                    <p className="text-sm text-gray-500">{search.count} recherches</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {search.trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
                  {search.trend === 'down' && <TrendingDown size={16} className="text-red-500" />}
                  {search.trend === 'stable' && <Activity size={16} className="text-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Agents</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {agentPerformance.slice(0, 5).map((agent, index) => (
              <div key={agent.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {agent.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{agent.nom}</p>
                    <p className="text-sm text-gray-500">{agent.total_sales} ventes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {agent.revenue.toLocaleString()}€
                  </p>
                  <p className="text-xs text-gray-500">
                    {agent.conversionRate.toFixed(1)}% conv.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Type Distribution */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par Type de Bien</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['villa', 'appartement', 'maison', 'studio', 'loft'].map(type => {
            const count = properties.filter(p => p.type === type).length;
            const percentage = ((count / properties.length) * 100).toFixed(1);
            
            return (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Home size={24} className="text-orange-600" />
                </div>
                <p className="font-medium text-gray-900 capitalize">{type}</p>
                <p className="text-2xl font-bold text-orange-600">{count}</p>
                <p className="text-sm text-gray-500">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
        <div className="space-y-4">
          {[
            { type: 'property', message: 'Nouvelle propriété ajoutée: Villa Cocody', time: '5 min', color: 'text-green-600' },
            { type: 'user', message: '3 nouveaux utilisateurs inscrits', time: '12 min', color: 'text-blue-600' },
            { type: 'transaction', message: 'Transaction finalisée: Appartement Plateau', time: '25 min', color: 'text-purple-600' },
            { type: 'contact', message: 'Nouveau message de contact reçu', time: '1h', color: 'text-orange-600' },
            { type: 'reservation', message: 'Nouvelle réservation de visite', time: '2h', color: 'text-teal-600' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">Il y a {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsManager;