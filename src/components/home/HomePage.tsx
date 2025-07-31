import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  Home,
  Building,
  Briefcase,
  Key,
  Calculator,
  Heart,
  Eye,
  CheckCircle,
  Play
} from 'lucide-react';
import { useProperty } from '../../contexts/PropertyContext';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { properties, setSearchQuery: setGlobalSearchQuery, setFilters } = useProperty();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery);
    if (selectedType) {
      setFilters({ type: [selectedType as any] });
    }
  };

  const propertyTypes = [
    { 
      id: 'apartment', 
      label: 'Appartements', 
      icon: Building, 
      count: properties.filter(p => p.type === 'apartment').length,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    { 
      id: 'house', 
      label: 'Maisons', 
      icon: Home, 
      count: properties.filter(p => p.type === 'house').length,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    { 
      id: 'office', 
      label: 'Bureaux', 
      icon: Briefcase, 
      count: properties.filter(p => p.type === 'office').length,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    { 
      id: 'studio', 
      label: 'Studios', 
      icon: Key, 
      count: properties.filter(p => p.type === 'studio').length,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const stats = [
    { label: 'Biens disponibles', value: properties.length.toLocaleString(), icon: Home },
    { label: 'Villes couvertes', value: '50+', icon: MapPin },
    { label: 'Clients satisfaits', value: '10K+', icon: Users },
    { label: 'Note moyenne', value: '4.8/5', icon: Star }
  ];

  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Trouvez votre
              <span className="block bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                bien idéal
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Maisons, appartements, bureaux, résidences meublées... 
              Découvrez des milliers de biens avec BENSO
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ville, quartier, adresse..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-4 py-4 text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-orange-500 bg-gray-50"
                  >
                    <option value="">Tous les types</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="office">Bureau</option>
                    <option value="studio">Studio</option>
                  </select>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    Rechercher
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez le type de bien qui vous correspond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setFilters({ type: [type.id as any] });
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-lg ${type.color}`}
                >
                  <Icon className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{type.label}</h3>
                  <p className="text-sm opacity-75">{type.count} biens disponibles</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Biens à la une
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez notre sélection de biens exceptionnels
              </p>
            </div>
            <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold">
              <span>Voir tout</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-64">
                  <img
                    src={property.images[0]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    À la une
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{property.views}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-orange-600">
                      {property.price.toLocaleString()} €
                    </span>
                    <span className="text-sm text-gray-500 capitalize">
                      {property.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.address.city}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{property.area} m²</span>
                    <span>{property.rooms} pièces</span>
                    <span>{property.bedrooms} ch.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos services premium
            </h2>
            <p className="text-xl text-gray-600">
              Une expérience complète pour tous vos besoins immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'Estimation gratuite',
                description: 'Obtenez une estimation précise de votre bien en quelques clics',
                color: 'bg-blue-500'
              },
              {
                icon: Shield,
                title: 'Garanties incluses',
                description: 'Garantie revente et loyers impayés pour votre sécurité',
                color: 'bg-green-500'
              },
              {
                icon: Users,
                title: 'Accompagnement expert',
                description: 'Nos conseillers vous accompagnent à chaque étape',
                color: 'bg-purple-500'
              },
              {
                icon: MapPin,
                title: 'Géolocalisation avancée',
                description: 'Trouvez les biens près de chez vous avec notre carte interactive',
                color: 'bg-red-500'
              },
              {
                icon: Heart,
                title: 'Favoris et alertes',
                description: 'Sauvegardez vos coups de cœur et recevez des alertes personnalisées',
                color: 'bg-pink-500'
              },
              {
                icon: CheckCircle,
                title: 'Visites virtuelles',
                description: 'Visitez les biens depuis chez vous avec nos tours 360°',
                color: 'bg-indigo-500'
              }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${service.color} text-white rounded-xl mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à trouver votre prochain bien ?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Rejoignez des milliers d'utilisateurs qui font confiance à BENSO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all">
                  Créer un compte
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all">
                  Découvrir les biens
                </button>
              </>
            ) : (
              <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all">
                Commencer ma recherche
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}