import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Award, Users, Shield, TrendingUp, Star, ChevronRight, Navigation, Building, Car, Wifi, Coffee, CheckCircle } from 'lucide-react';

const AgencesPage = () => {
  const [activeAgency, setActiveAgency] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const agencies = [
    {
      id: 1,
      name: "BENSO Plateau",
      address: "Boulevard de la République, Plateau, Abidjan",
      phone: "+225 27 20 25 30 40",
      email: "plateau@benso.ci",
      manager: "Kouamé Laurent",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      hours: {
        weekdays: "08h00 - 18h00",
        saturday: "08h00 - 16h00",
        sunday: "Fermé"
      },
      specialties: ["Bureaux", "Commerces", "Investissement"],
      services: ["Vente", "Location", "Gestion locative", "Conseil"],
      features: ["Parking gratuit", "WiFi", "Espace café", "Salle de réunion"],
      stats: {
        properties: 450,
        sales: 180,
        satisfaction: 98
      }
    },
    {
      id: 2,
      name: "BENSO Cocody",
      address: "Riviera Golf, Cocody, Abidjan",
      phone: "+225 27 22 48 15 60",
      email: "cocody@benso.ci",
      manager: "Adjoua Marie-Claire",
      image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
      hours: {
        weekdays: "08h00 - 18h00",
        saturday: "08h00 - 16h00",
        sunday: "Fermé"
      },
      specialties: ["Résidentiel haut de gamme", "Villas", "Appartements"],
      services: ["Vente", "Location", "Gestion locative", "Estimation"],
      features: ["Parking sécurisé", "WiFi", "Accueil VIP", "Terrasse"],
      stats: {
        properties: 320,
        sales: 145,
        satisfaction: 99
      }
    },
    {
      id: 3,
      name: "BENSO Marcory",
      address: "Zone 4, Marcory, Abidjan",
      phone: "+225 27 21 35 42 80",
      email: "marcory@benso.ci",
      manager: "Diabaté Moussa",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      hours: {
        weekdays: "08h00 - 18h00",
        saturday: "08h00 - 16h00",
        sunday: "Fermé"
      },
      specialties: ["Logements sociaux", "Primo-accédants", "Investissement locatif"],
      services: ["Vente", "Location", "Financement", "Accompagnement"],
      features: ["Accès PMR", "WiFi", "Parking", "Espace enfants"],
      stats: {
        properties: 280,
        sales: 120,
        satisfaction: 97
      }
    },
    {
      id: 4,
      name: "BENSO Treichville",
      address: "Avenue 7, Treichville, Abidjan",
      phone: "+225 27 21 24 18 70",
      email: "treichville@benso.ci",
      manager: "Koffi Aya Brigitte",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      hours: {
        weekdays: "08h00 - 18h00",
        saturday: "08h00 - 16h00",
        sunday: "Fermé"
      },
      specialties: ["Commerces", "Entrepôts", "Locaux d'activité"],
      services: ["Vente", "Location", "Conseil commercial", "Négociation"],
      features: ["Parking", "WiFi", "Salle d'attente", "Climatisation"],
      stats: {
        properties: 195,
        sales: 95,
        satisfaction: 96
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-orange-900/20 to-amber-900/30 z-10"></div>
          <img
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
            alt="Nos agences BENSO"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-white/10 to-yellow-200/20 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-yellow-300/20 to-orange-200/30 rounded-full animate-bounce blur-sm"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
              <Building className="w-5 h-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">Réseau d'agences premium</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">Agences</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Un réseau d'agences de proximité avec des experts immobiliers dédiés 
              <span className="block font-semibold text-yellow-200 mt-2">
                pour vous accompagner dans tous vos projets
              </span>
            </p>

            {/* Stats du réseau */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-2">4</div>
                <div className="text-orange-100 text-sm">Agences</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-2">1200+</div>
                <div className="text-orange-100 text-sm">Biens</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-2">540+</div>
                <div className="text-orange-100 text-sm">Ventes/an</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300 mb-2">98%</div>
                <div className="text-orange-100 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation des agences */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {agencies.map((agency, index) => (
              <button
                key={agency.id}
                onClick={() => setActiveAgency(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeAgency === index
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {agency.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Détail de l'agence sélectionnée */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image et badges */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={agencies[activeAgency].image}
                  alt={agencies[activeAgency].name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 via-transparent to-transparent"></div>
                
                {/* Badge agence */}
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-orange-600 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Agence certifiée
                  </span>
                </div>

                {/* Stats flottantes */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">{agencies[activeAgency].stats.properties}</div>
                    <div className="text-xs text-gray-600">Biens</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{agencies[activeAgency].stats.sales}</div>
                    <div className="text-xs text-gray-600">Ventes</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{agencies[activeAgency].stats.satisfaction}%</div>
                    <div className="text-xs text-gray-600">Satisf.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {agencies[activeAgency].name}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              </div>

              {/* Contact et localisation */}
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-3 text-orange-600" />
                  <span>{agencies[activeAgency].address}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="w-5 h-5 mr-3 text-orange-600" />
                  <span>{agencies[activeAgency].phone}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 mr-3 text-orange-600" />
                  <span>{agencies[activeAgency].email}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 mr-3 text-orange-600" />
                  <span>Responsable: {agencies[activeAgency].manager}</span>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-semibold">{agencies[activeAgency].hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-semibold">{agencies[activeAgency].hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-semibold text-red-600">{agencies[activeAgency].hours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <Calendar className="w-5 h-5 mr-2 inline" />
                  Prendre rendez-vous
                </button>
                <button className="flex-1 border-2 border-orange-500 text-orange-600 px-6 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105">
                  <Navigation className="w-5 h-5 mr-2 inline" />
                  Itinéraire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spécialités et services */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Spécialités */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-4 rounded-2xl w-fit mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nos Spécialités</h3>
              <div className="space-y-3">
                {agencies[activeAgency].specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-2xl w-fit mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nos Services</h3>
              <div className="space-y-3">
                {agencies[activeAgency].services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl w-fit mb-6">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Équipements</h3>
              <div className="space-y-3">
                {agencies[activeAgency].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toutes nos agences - Vue d'ensemble */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Toutes nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Agences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un maillage territorial complet pour vous servir partout à Abidjan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agencies.map((agency, index) => (
              <div 
                key={agency.id}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer ${
                  activeAgency === index ? 'ring-2 ring-orange-500' : ''
                }`}
                onClick={() => setActiveAgency(index)}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={agency.image}
                    alt={agency.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1">{agency.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-orange-600" />
                      <span className="truncate">{agency.address.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{agency.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-orange-600" />
                      <span>{agency.manager}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{agency.stats.properties}</div>
                      <div className="text-xs text-gray-500">Biens</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{agency.stats.sales}</div>
                      <div className="text-xs text-gray-500">Ventes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{agency.stats.satisfaction}%</div>
                      <div className="text-xs text-gray-500">Satisf.</div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    Voir l'agence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Une question ? Un projet ?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
              Contactez-nous !
            </span>
          </h2>
          
          <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
            Nos équipes sont à votre disposition dans toutes nos agences
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Phone className="mr-3 h-5 w-5" />
              Appeler maintenant
            </button>
            <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 backdrop-blur-md text-white font-bold rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105">
              <Calendar className="mr-3 h-5 w-5" />
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgencesPage;