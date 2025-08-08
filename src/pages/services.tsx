import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Key, 
  ShoppingCart, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Users, 
  Phone, 
  CheckCircle, 
  Award, 
  MapPin, 
  Euro, 
  FileText, 
  Search, 
  Handshake, 
  Calculator, 
  Clock, 
  Star,
  Building,
  CreditCard,
  UserCheck,
  Briefcase,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const ServicesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const mainServices = [
    {
      id: 'vente',
      title: 'Vente Immobilière',
      description: 'Vendez votre bien au meilleur prix avec notre expertise et notre réseau national',
      icon: ShoppingCart,
      color: 'from-amber-500 to-orange-600',
      features: [
        'Estimation gratuite et précise',
        'Marketing digital premium',
        'Négociation expertisée',
        'Accompagnement juridique complet'
      ],
      benefits: 'Jusqu\'à 15% de plus-value grâce à notre stratégie de vente optimisée'
    },
    {
      id: 'location',
      title: 'Location & Gestion',
      description: 'Louez rapidement et gérez sereinement votre patrimoine immobilier',
      icon: Key,
      color: 'from-blue-500 to-indigo-600',
      features: [
        'Sélection rigoureuse des locataires',
        'Gestion locative complète',
        'Garantie loyers impayés',
        'Maintenance et entretien'
      ],
      benefits: 'Taux d\'occupation de 98% et rendement optimal garanti'
    },
    {
      id: 'achat',
      title: 'Acquisition Immobilière',
      description: 'Trouvez et achetez le bien de vos rêves avec notre accompagnement VIP',
      icon: Home,
      color: 'from-amber-500 to-orange-600',
      features: [
        'Recherche personnalisée exclusive',
        'Visites privées organisées',
        'Négociation du prix d\'achat',
        'Financement et crédit immobilier'
      ],
      benefits: 'Économisez jusqu\'à 12% sur votre achat grâce à notre pouvoir de négociation'
    },
    {
      id: 'reservation',
      title: 'Réservation VEFA',
      description: 'Investissez dans le neuf avec nos programmes exclusifs et sécurisés',
      icon: Calendar,
      color: 'from-amber-500 to-orange-600',
      features: [
        'Programmes neufs sélectionnés',
        'Garanties constructeur étendues',
        'Défiscalisation optimisée',
        'Suivi de chantier personnalisé'
      ],
      benefits: 'Réduction fiscale jusqu\'à 21% et plus-value garantie à la livraison'
    }
  ];

  const additionalServices = [
    {
      title: 'Investissement Locatif',
      description: 'Conseils experts pour optimiser votre rendement immobilier',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Estimation Immobilière',
      description: 'Évaluation précise de votre bien par nos experts certifiés',
      icon: Calculator,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Financement Immobilier',
      description: 'Solutions de crédit sur mesure avec nos partenaires bancaires',
      icon: CreditCard,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Conseil Juridique',
      description: 'Accompagnement juridique complet pour sécuriser vos transactions',
      icon: FileText,
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Gestion de Patrimoine',
      description: 'Stratégies d\'optimisation et de développement patrimonial',
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Service Après-Vente',
      description: 'Support continu et assistance même après votre transaction',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Consultation Gratuite',
      description: 'Rencontrez nos experts pour définir vos besoins et objectifs',
      icon: Users
    },
    {
      step: 2,
      title: 'Analyse Personnalisée',
      description: 'Étude approfondie de votre projet avec recommandations expertes',
      icon: Search
    },
    {
      step: 3,
      title: 'Plan d\'Action',
      description: 'Stratégie sur mesure avec timeline et étapes détaillées',
      icon: FileText
    },
    {
      step: 4,
      title: 'Accompagnement',
      description: 'Suivi personnalisé jusqu\'à la finalisation de votre projet',
      icon: Handshake
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Premium */}
      <section className="relative bg-gradient-to-br from-gray-900 via-amber-900 to-orange-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-amber-900/30 to-orange-900/40 z-10"></div>
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
            alt="Services BENSO"
            className="w-full h-full object-cover scale-105 transition-transform duration-[20s] ease-in-out hover:scale-110"
          />
        </div>
        
        {/* Particules animées */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-white/10 to-amber-200/20 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-amber-300/20 to-orange-200/30 rounded-full animate-bounce blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-amber-300/15 to-orange-200/25 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-20">
          <div className="text-center mb-16">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
                <Award className="w-5 h-5 mr-2 text-amber-300" />
                <span className="text-sm font-medium">Excellence & Expertise</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                Nos Services
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-200 to-yellow-200 animate-gradient">
                  Premium
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                Des solutions immobilières complètes et sur mesure pour 
                <span className="font-semibold text-amber-200"> tous vos projets de vie</span>
              </p>
            </div>
          </div>

          {/* Stats Hero */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">50+</div>
                <div className="text-amber-100 text-sm font-medium">Services personnalisés</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">24h</div>
                <div className="text-amber-100 text-sm font-medium">Délai de réponse</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">15+</div>
                <div className="text-amber-100 text-sm font-medium">Années d'expertise</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-amber-300 mb-2">100%</div>
                <div className="text-amber-100 text-sm font-medium">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Principaux */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2 rounded-full mb-6 border border-amber-200">
              <Star className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Services Phares</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Expertises Principales</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des services complets et personnalisés pour vous accompagner dans tous vos projets immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainServices.map((service, index) => (
              <div 
                key={service.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                <div className="relative p-10">
                  {/* Background gradient animé */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-3xl transition-all duration-500 ${activeService === service.id ? 'scale-150 opacity-20' : ''}`}></div>
                  
                  <div className={`bg-gradient-to-br ${service.color} text-white p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-10 w-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features list */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Benefit highlight */}
                  <div className={`bg-gradient-to-r ${service.color} bg-opacity-10 p-4 rounded-xl mb-6`}>
                    <div className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-sm font-semibold text-gray-800">{service.benefits}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/contact?service=${service.id}`}
                    className="group/link inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-all duration-200"
                  >
                    En savoir plus 
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Complémentaires */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2 rounded-full mb-6 border border-amber-200">
              <Shield className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Services Complémentaires</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Un Écosystème <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Complet</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des services additionnels pour optimiser et sécuriser tous vos investissements immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className={`bg-gradient-to-br ${service.color} text-white p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                <Link 
                  to="/contact"
                  className="group/link inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-all duration-200"
                >
                  Découvrir 
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Processus de Travail */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2 rounded-full mb-6 border border-amber-200">
              <Clock className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Notre Méthode</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comment Nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Travaillons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Un processus éprouvé en 4 étapes pour garantir le succès de votre projet immobilier
            </p>
          </div>

          <div className="relative">
            {/* Ligne de connexion */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 z-10">
                  {/* Numéro d'étape */}
                  <div className="absolute -top-4 left-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-3 rounded-xl w-fit mb-6 mt-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Garanties et Engagement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-2 rounded-full mb-6 border border-amber-200">
              <Shield className="w-5 h-5 mr-2 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Nos Garanties</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Engagements</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
              <Shield className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Satisfaction Garantie</h3>
              <p className="text-gray-600 leading-relaxed">Si vous n'êtes pas 100% satisfait, nous nous engageons à tout reprendre jusqu'à votre entière satisfaction.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
              <Clock className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Délais Respectés</h3>
              <p className="text-gray-600 leading-relaxed">Tous nos engagements de délais sont contractuels et garantis par notre équipe de professionnels.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100">
              <Users className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accompagnement 24h/7j</h3>
              <p className="text-gray-600 leading-relaxed">Un expert dédié disponible à tout moment pour répondre à vos questions et vous accompagner.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-amber-900 via-orange-900 to-amber-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-amber-400/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
            <Phone className="w-5 h-5 mr-2 text-amber-300" />
            <span className="text-sm font-medium">Consultation gratuite</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Discutons de votre 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-200">
              projet immobilier
            </span>
          </h2>
          
          <p className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nos experts sont à votre disposition pour une consultation personnalisée et gratuite
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-white to-gray-50 text-gray-900 font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-3 h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Consultation Gratuite</span>
            </Link>
            <Link
              to="/estimation"
              className="group inline-flex items-center px-10 py-5 border-2 border-white/30 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              <Calculator className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Estimation Gratuite</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;