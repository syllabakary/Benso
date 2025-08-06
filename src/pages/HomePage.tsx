import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Euro, Home, Star, Shield, TrendingUp, Users, ShoppingCart, Key, Calendar, Award, CheckCircle, Clock, Phone } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import RecentProperties from '../components/RecentProperties';
import SponsoredAds from '../components/SponsoredAds';
import AnimatedCounter from '../components/AnimatedCounter';

const HomePage: React.FC = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    transactionType: 'louer'
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section Ultra Premium */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white overflow-hidden">
        {/* Video Background avec overlay sophistiqué */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-orange-900/30 to-amber-900/40 z-10"></div>
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 transition-transform duration-[20s] ease-in-out hover:scale-110"
          />
        </div>
        
        {/* Particules animées sophistiquées */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-white/10 to-yellow-200/20 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-yellow-300/20 to-orange-200/30 rounded-full animate-bounce blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/15 to-amber-200/25 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-amber-200/10 to-orange-100/20 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-gradient-to-r from-yellow-200/15 to-orange-300/20 rounded-full animate-bounce delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-20">
          <div className="text-center mb-16">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
                <Award className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">N°1 de l'immobilier en Côte d'Ivoire</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                Votre bien immobilier
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-200 animate-gradient">
                  vous attend
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                Achetez, louez ou réservez votre bien idéal avec BENSO - 
                <span className="font-semibold text-yellow-200"> La référence immobilière de confiance</span>
              </p>
            </div>
          </div>

          {/* Boutons rapides premium */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link
              to="/acheter"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <ShoppingCart className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Acheter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/louer"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <Key className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Louer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/reserver"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <Calendar className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Réserver</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Formulaire de recherche premium */}
          <div className={`max-w-5xl mx-auto transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
              <SearchForm searchData={searchData} setSearchData={setSearchData} />
            </div>
          </div>

          {/* Stats premium */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <AnimatedCounter end={10000} suffix="+" className="text-4xl font-bold text-yellow-300" />
                <div className="text-orange-100 mt-2 font-medium">Biens disponibles</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <AnimatedCounter end={2000} suffix="+" className="text-4xl font-bold text-yellow-300" />
                <div className="text-orange-100 mt-2 font-medium">Ventes réalisées</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <AnimatedCounter end={5000} suffix="+" className="text-4xl font-bold text-yellow-300" />
                <div className="text-orange-100 mt-2 font-medium">Clients satisfaits</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <AnimatedCounter end={98} suffix="%" className="text-4xl font-bold text-yellow-300" />
                <div className="text-orange-100 mt-2 font-medium">Taux de satisfaction</div>
              </div>
            </div>
          </div>

          {/* Badge de confiance */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-green-400/30">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span className="text-sm font-medium text-green-100">Certifié et agréé par l'État de Côte d'Ivoire</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Sponsorisée Ultra Professionnelle */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-amber-100 px-6 py-2 rounded-full mb-6 border border-orange-200">
              <Star className="w-5 h-5 mr-2 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">Biens Premium Sélectionnés</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Coups de Cœur</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection exclusive de biens immobiliers d'exception, 
              soigneusement choisis par nos experts pour leur qualité et leur potentiel
            </p>
          </div>

          <div className="relative">
            {/* Badge "Sponsorisé" discret mais professionnel */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                <span className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  Sélection Premium
                </span>
              </div>
            </div>
            
            <SponsoredAds />
            
            {/* Call-to-action sous la section sponsorisée */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Envie de mettre votre bien en avant ?</h3>
                <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                  Rejoignez notre sélection premium et bénéficiez d'une visibilité maximale
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Annonces récentes avec amélioration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-2 rounded-full mb-6 border border-blue-200">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">Dernières Opportunités</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Biens <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Récemment Ajoutés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ne ratez aucune opportunité ! Découvrez les derniers biens ajoutés à notre catalogue
            </p>
          </div>
          <RecentProperties />
        </div>
      </section>

      {/* Pourquoi choisir BENSO - Version Ultra Premium */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-2 rounded-full mb-6 border border-green-200">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-sm font-semibold text-green-800">Nos Garanties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">BENSO</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Nos avantages exclusifs et services premium pour vous accompagner dans votre projet immobilier avec la plus grande expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-4 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Transactions 100% Sécurisées</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Toutes nos transactions sont sécurisées par des protocoles bancaires avancés et accompagnées par des notaires et professionnels certifiés de confiance.
              </p>
              <Link to="/contact" className="group/link inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-all duration-200">
                En savoir plus 
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-4 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Meilleurs Prix Garantis</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Notre équipe d'experts négocie pour vous les meilleures conditions du marché. Économisez jusqu'à 15% sur votre achat ou location.
              </p>
              <Link to="/contact" className="group/link inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-all duration-200">
                Découvrir nos tarifs 
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="group bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-4 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Accompagnement VIP Personnalisé</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Un agent immobilier dédié et expérimenté vous accompagne personnellement de A à Z, 24h/7j, dans votre projet immobilier.
              </p>
              <Link to="/contact" className="group/link inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-all duration-200">
                Contacter un expert 
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Statistiques de performance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 p-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-orange-100 text-sm">Années d'expérience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-orange-100 text-sm">Réponse garantie</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-orange-100 text-sm">Transactions sécurisées</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15%</div>
              <div className="text-orange-100 text-sm">Économies moyennes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Ultra Premium */}
      <section className="py-24 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
            <Calendar className="w-5 h-5 mr-2 text-yellow-300" />
            <span className="text-sm font-medium">Consultation gratuite disponible</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Prêt à concrétiser votre 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
              projet immobilier ?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-orange-100 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Rejoignez des milliers de clients satisfaits qui ont trouvé leur bonheur avec BENSO
            <span className="block font-semibold text-yellow-200 mt-2">
              🏆 Élu meilleur service immobilier 2024
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              to="/contact"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-gray-900 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Phone className="mr-3 h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Consultation Gratuite</span>
            </Link>
            <Link
              to="/louer"
              className="group inline-flex items-center px-10 py-5 border-2 border-white/30 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Home className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Explorer nos biens</span>
            </Link>
          </div>

          {/* Garanties */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-orange-100">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              Sans engagement
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              Réponse sous 2h
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
              Expert dédié
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// CSS personnalisé pour l'animation gradient
const styles = `
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
`;

export default HomePage;