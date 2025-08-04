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
  Play,
  Bell,
  User,
  Menu
} from 'lucide-react';
import { useProperty } from '../../contexts/PropertyContext';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [activeTab, setActiveTab] = useState('ACHETER');
  const { properties, setSearchQuery: setGlobalSearchQuery, setFilters } = useProperty();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery);
    if (selectedType) {
      setFilters({ type: [selectedType as any] });
    }
  };

  const tabs = ['ACHETER', 'LOUER', 'ESTIMER', 'VENDRE'];

  const newsArticles = [
    {
      id: 1,
      category: 'ASTUCES ET CONSEILS',
      title: 'Investir en nue-propriété : bonne ou mauvaise idée ?',
      date: '01 AOÛT 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      category: 'ASTUCES ET CONSEILS',
      title: 'Qui paie la taxe foncière en cas de vente ?',
      date: '25 JUILLET 2025',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 3,
      category: 'ASTUCES ET CONSEILS',
      title: "7 Conseils pour éviter l'humidité dans un logement",
      date: '22 JUILLET 2025',
      image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Exactement comme Guy Hoquet */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600")'
               }}>
        
        {/* Navigation latérale */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
          <div className="bg-blue-600 text-white p-2 writing-mode-vertical text-sm font-medium">
            <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Rechercher
            </div>
          </div>
          <div className="bg-gray-800 text-white p-2 writing-mode-vertical text-sm">
            <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Actualités
            </div>
          </div>
          <div className="bg-gray-700 text-white p-2 writing-mode-vertical text-sm">
            <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Services
            </div>
          </div>
          <div className="bg-gray-600 text-white p-2 writing-mode-vertical text-sm">
            <div className="transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
              Actualités
            </div>
          </div>
        </div>

        {/* Bouton ESTIMEZ VOTRE BIEN */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
          <div className="bg-blue-600 text-white p-4 writing-mode-vertical cursor-pointer hover:bg-blue-700 transition-colors">
            <div className="transform rotate-180 font-bold text-lg tracking-wider" style={{ writingMode: 'vertical-rl' }}>
              ESTIMEZ VOTRE BIEN
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              ET SI VOUS RELANCIEZ VOTRE
              <br />
              <span className="text-orange-400">RECHERCHE ?</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light opacity-90">
              Un bel été avec BENSO !
            </p>
          </div>

          {/* Onglets de recherche */}
          <div className="mb-8">
            <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Formulaire de recherche - Style Guy Hoquet */}
          <div className="w-full max-w-6xl">
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Localisation */}
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="pl-12 pr-4 py-4">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      LOCALISATION
                    </div>
                    <input
                      type="text"
                      placeholder="Localisation"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-gray-900 placeholder-gray-400 border-0 focus:ring-0 p-0 text-lg"
                    />
                  </div>
                </div>

                {/* Type de bien */}
                <div className="border-l border-gray-200 pl-4 pr-4 py-4">
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    TYPE DE BIEN
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full text-gray-900 border-0 focus:ring-0 p-0 text-lg bg-transparent"
                  >
                    <option value="">Maison, appartement...</option>
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="office">Bureau</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                {/* Budget Min */}
                <div className="border-l border-gray-200 pl-4 pr-4 py-4">
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    BUDGET MIN
                  </div>
                  <input
                    type="text"
                    placeholder="Votre budget"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                    className="w-full text-gray-900 placeholder-gray-400 border-0 focus:ring-0 p-0 text-lg"
                  />
                </div>

                {/* Budget Max */}
                <div className="border-l border-gray-200 pl-4 pr-2 py-4">
                  <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    BUDGET MAX
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Votre budget"
                      value={budgetMax}
                      onChange={(e) => setBudgetMax(e.target.value)}
                      className="flex-1 text-gray-900 placeholder-gray-400 border-0 focus:ring-0 p-0 text-lg"
                    />
                    <button
                      type="submit"
                      className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
                    >
                      <Search className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Flèche de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Actualités - Exactement comme Guy Hoquet */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center flex-1">
              L'ACTUALITÉ DE L'IMMOBILIER
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
              <span>Voir toutes les actualités</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative h-64">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    {article.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              NOS SERVICES IMMOBILIERS
            </h2>
            <p className="text-xl text-gray-600">
              Un accompagnement complet pour tous vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Home,
                title: 'Achat & Vente',
                description: 'Trouvez le bien idéal ou vendez au meilleur prix',
                color: 'bg-blue-500'
              },
              {
                icon: Key,
                title: 'Location',
                description: 'Gestion locative complète et sécurisée',
                color: 'bg-green-500'
              },
              {
                icon: Calculator,
                title: 'Estimation',
                description: 'Estimation gratuite et précise de votre bien',
                color: 'bg-orange-500'
              },
              {
                icon: Shield,
                title: 'Garanties',
                description: 'Protection complète avec nos garanties',
                color: 'bg-purple-500'
              }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center group cursor-pointer">
                  <div className={`inline-flex items-center justify-center w-20 h-20 ${service.color} text-white rounded-full mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
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

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Agences' },
              { number: '3000+', label: 'Collaborateurs' },
              { number: '30K', label: 'Lots gérés/an' },
              { number: '25', label: 'Années d\'expérience' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Nos experts vous accompagnent à chaque étape
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all">
              Trouver une agence
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Nous contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}