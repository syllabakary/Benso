import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Euro, Home, Star, Shield, TrendingUp, Users, ShoppingCart, Key, Calendar } from 'lucide-react';
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300 bg-opacity-20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300 bg-opacity-15 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Votre bien immobilier
              <span className="block text-yellow-300">vous attend</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
              Achetez, louez ou réservez votre bien idéal avec BENSO
            </p>
          </div>

          {/* Boutons rapides */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-600">
            <Link
              to="/acheter"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Acheter
            </Link>
            <Link
              to="/louer"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <Key className="mr-2 h-5 w-5" />
              Louer
            </Link>
            <Link
              to="/reserver"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Réserver
            </Link>
          </div>

          {/* Formulaire de recherche */}
          <div className="max-w-4xl mx-auto animate-fade-in-up animation-delay-900">
            <SearchForm searchData={searchData} setSearchData={setSearchData} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in-up animation-delay-1200">
            <div className="text-center">
              <AnimatedCounter end={10000} suffix="+" />
              <div className="text-orange-100 mt-2">Biens disponibles</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={2000} suffix="+" />
              <div className="text-orange-100 mt-2">Ventes réalisées</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={5000} suffix="+" />
              <div className="text-orange-100 mt-2">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <AnimatedCounter end={98} suffix="%" />
              <div className="text-orange-100 mt-2">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Annonces sponsorisées */}
      <SponsoredAds />

      {/* Annonces récentes */}
      <RecentProperties />

      {/* Pourquoi choisir BENSO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir BENSO ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos avantages et services pour vous accompagner dans votre projet immobilier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl w-fit mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transactions sécurisées</h3>
              <p className="text-gray-600 mb-6">
                Toutes nos transactions sont sécurisées et accompagnées par des professionnels certifiés.
              </p>
              <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                En savoir plus →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl w-fit mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Meilleurs prix du marché</h3>
              <p className="text-gray-600 mb-6">
                Nous négocions pour vous les meilleurs prix et conditions pour votre achat ou location.
              </p>
              <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                En savoir plus →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl w-fit mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accompagnement personnalisé</h3>
              <p className="text-gray-600 mb-6">
                Un agent dédié vous accompagne de A à Z dans votre projet immobilier.
              </p>
              <Link to="/contact" className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à concrétiser votre projet immobilier ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients qui ont trouvé leur bonheur avec BENSO
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
            >
              Nous contacter
            </Link>
            <Link
              to="/louer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-200"
            >
              Voir nos biens
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;