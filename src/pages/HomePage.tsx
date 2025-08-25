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
      <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden min-h-screen flex items-center">
        {/* Vidéo Background Professionnelle */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/50 to-orange-900/40 z-10"></div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            poster="./asset/images-benso/2.png"
          >
            <source
              src="https://youtu.be/xGvIPHH7zpc"
              type="video/mp4"
            />
            {/* Fallback image si la vidéo ne se charge pas */}
            <img
              src="./asset/images-benso/2.png"
              alt="Immobilier moderne professionnel"
              className="w-full h-full object-cover"
            />
          </video>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-20">
          <div className="text-center mb-16">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
                <div className="w-5 h-5 mr-3 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm font-medium">Excellence immobilière en Côte d'Ivoire</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                Votre bien immobilier
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 animate-gradient">
                  vous attend
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                Achetez, louez ou réservez votre bien idéal avec BENSO - 
                <span className="font-semibold text-orange-200"> La référence immobilière de confiance</span>
              </p>
            </div>
          </div>

          {/* Boutons rapides premium avec icônes professionnelles */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link
              to="/acheter"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="mr-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
              </div>
              <span className="text-lg">Acheter</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/louer"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <div className="mr-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-amber-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-2 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="text-lg">Louer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/reserver"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-orange-600 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
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

   

          {/* Badge de confiance avec icône professionnelle */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-green-400/30">
              <div className="w-5 h-5 mr-3 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              {/* <span className="text-sm font-medium text-green-100">Certifié et agréé par l'État de Côte d'Ivoire</span> */}
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
          </div>
        </div>
      </section>

      {/* Annonces récentes avec amélioration */}
      <section className="py-16 bg-white">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-[#0E0701FF] from-blue-100 to-indigo-100 px-6 py-2 rounded-full mb-6 border border-blue-200">

              <Clock className="w-5 h-5 mr-2 text-[#FD9400FF]" />

              <span className="text-sm font-semibold text-[#FFFFFFFF]">Dernières Opportunités</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Biens <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD9400FF] to-[#FD9400FF]">Récemment Ajoutés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ne ratez aucune opportunité ! Découvrez les derniers biens ajoutés à notre catalogue
            </p>
            <RecentProperties />
          </div>
        </div>
      </section>

      {/* Pourquoi choisir BENSO - Version Ultra Premium */}
      <section className="py-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
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
              <h3 className="text-1xl font-bold text-gray-900 mb-6">Transactions 100% Sécurisées</h3>
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
              <h3 className="text-1xl font-bold text-gray-900 mb-6">Meilleurs Prix Garantis</h3>
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
              <h3 className="text-1xl font-bold text-gray-900 mb-6">Accompagnement VIP Personnalisé</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Un agent immobilier dédié et expérimenté vous accompagne personnellement de A à Z, 24h/7j, dans votre projet immobilier.
              </p>
              <Link to="/contact" className="group/link inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-all duration-200">
                Contacter un expert 
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          {/* Section Agence - Style Guy Hoquet */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contenu textuel */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight">
                  BENSO, RÉSEAU D'AGENCES
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                    IMMOBILIÈRES
                  </span>
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Vous avez un projet immobilier ? Vous souhaitez vendre, acheter, louer, 
                  investir ou faire gérer un bien ? Pour que cette transaction se déroule dans 
                  les meilleures conditions, il vous faut choisir l'agence immobilière qui saura 
                  vous accompagner, vous conseiller et répondre à votre besoin. Le réseau BENSO, 
                  leader en Côte d'Ivoire, fort de son concept d'immobilier garanti propose des 
                  solutions qui vous permettront de réaliser votre projet en toute sérénité.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-8 py-4 bg-[#6d3900] from-orange-500 to-amber-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Nous contacter
                </Link>
                <Link
                  to="/agences"
                  className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  <MapPin className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Nos agences
                </Link>
              </div>
            </div>

            {/* Image avec overlay moderne */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="./asset/images-benso/3.png"
                  alt="Couple heureux dans leur nouveau logement"
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent"></div>
                
                {/* Badge flottant */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-orange-600 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Leader en Côte d'Ivoire
                  </span>
                </div>

                {/* Élément décoratif */}
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'AGENCE DE TOUS VOS PROJETS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image en premier sur cette section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="./asset/images-benso/4.png"

                  alt="Équipe d'experts BENSO en réunion"
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay avec motif */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-orange-900/30"></div>
                
                {/* Badge professionnel */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-800 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-orange-600" />
                   
                  </span>
                </div>

                {/* Élément décoratif */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-full opacity-15 blur-2xl"></div>
              </div>
            </div>

            {/* Contenu textuel */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-tight">
                  L'AGENCE DE TOUS VOS
                  <span className="block text-transparent bg-clip-text bg-[#6d3900]  
 from-blue-600 to-orange-600">
                    PROJETS
                  </span>
                </h2>
                
                <div className="w-20 h-1 bg-[#6d3900] rounded-full"></div>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  Rendez-vous dans notre agence BENSO pour discuter et échanger sur votre projet. 
                  Notre équipe d'experts se tient à votre disposition pour répondre à tous vos 
                  besoins immobiliers. Que vous souhaitiez vendre, acheter, louer, investir ou 
                  faire gérer, nous sommes formés pour vous accompagner.
                  <span className="block mt-4 font-semibold text-orange-600">
                    Retrouvez-nous en agence !
                  </span>
                </p>
              </div>

              {/* Stats de performance */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24h/7j</div>
                  <div className="text-sm text-gray-600">Support client</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <div className="text-3xl font-bold text-[#994F00FF] mb-2">100%</div>
                  <div className="text-sm text-gray-600">Accompagnement</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center px-8 py-4 bg-[#6d3900] from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Prendre rendez-vous
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Nos services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Ultra Premium */}
     

        
        
        </div>
      </section>

      {/* CTA Section Ultra Premium */}
      <section className="py-14 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
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