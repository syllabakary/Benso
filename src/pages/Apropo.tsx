import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, MessageCircle, Clock, Send, Star, 
  Award, Target, Eye, Heart, Play, TrendingUp, Shield, User, 
  ChevronRight, Home, Building, CheckCircle, ArrowRight 
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({ clients: 0, properties: 0, years: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation des compteurs
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const timer = setTimeout(() => {
            const animateCounter = (target: number, key: string) => {
              let current = 0;
              const increment = target / 50;
              const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                  setCounters(prev => ({ ...prev, [key]: target }));
                  clearInterval(counter);
                } else {
                  setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
                }
              }, 30);
            };
            
            animateCounter(1500, 'clients');
            animateCounter(850, 'properties');
            animateCounter(8, 'years');
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: 'Sarah Kouassi',
      role: 'Directrice Générale',
      image: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg',
      description: '15 ans d\'expérience en immobilier de luxe',
      social: ['linkedin', 'twitter', 'instagram']
    },
    {
      name: 'Marc Diallo',
      role: 'Chef des Ventes',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      description: 'Expert en négociation immobilière',
      social: ['linkedin', 'facebook']
    },
    {
      name: 'Lisa Traoré',
      role: 'Responsable Marketing',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
      description: 'Spécialiste en marketing digital',
      social: ['linkedin', 'twitter', 'pinterest']
    }
  ];

  const achievements = [
    { icon: Award, title: 'Agence N°1', desc: 'À Abidjan depuis 2019' },
    { icon: Shield, title: 'Certifiée', desc: 'Agréments officiels' },
    { icon: Star, title: '4.9/5', desc: 'Satisfaction client' },
    { icon: TrendingUp, title: '95%', desc: 'Taux de réussite' }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'Intégrité',
      description: 'Nous privilégions toujours la transparence et l\'honnêteté dans toutes nos transactions.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque service que nous fournissons à nos clients.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre passion pour l\'immobilier se reflète dans notre engagement envers nos clients.'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Nous construisons des relations durables basées sur la confiance mutuelle.'
    }
  ];

  const tabs = [
    { id: 'mission', label: 'Notre Mission', icon: Target },
    { id: 'vision', label: 'Notre Vision', icon: Eye },
    { id: 'history', label: 'Notre Histoire', icon: Clock }
  ];

  const tabContent = {
    mission: {
      title: "Notre Mission",
      content: "Chez Benso Immobilier, notre mission est de transformer votre vision de l'habitat idéal en réalité tangible. Nous nous engageons à offrir un service personnalisé et expert pour chaque client, en combinant connaissance approfondie du marché local et standards internationaux de qualité.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    vision: {
      title: "Notre Vision",
      content: "Nous aspirons à redéfinir l'expérience immobilière en Côte d'Ivoire en créant des espaces de vie qui inspirent et élèvent la qualité de vie de nos clients. Notre vision est de devenir le partenaire immobilier de référence pour ceux qui recherchent l'excellence, l'innovation et le service premium.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
    },
    history: {
      title: "Notre Histoire",
      content: "Fondée en 2016, Benso Immobilier est née de la passion de son fondateur pour l'architecture et le design. Ce qui a commencé comme une petite agence locale est rapidement devenu une référence dans le secteur immobilier abidjanais. Aujourd'hui, nous sommes fiers d'avoir contribué à concrétiser les rêves de centaines de familles et investisseurs.",
      image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
            alt="Benso Immobilier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-amber-900/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6 animate-fade-in">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <span className="text-white font-semibold">À PROPOS DE BENSO</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight animate-fade-in-up">
            Votre Partenaire
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Immobilier
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-100">
            Depuis 8 ans, nous transformons vos rêves immobiliers en réalité avec passion, 
            expertise et un service d'exception à Abidjan.
          </p>
          
          <button className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-200">
            <span className="flex items-center justify-center">
              <Play className="h-5 w-5 mr-2" />
              Découvrir notre histoire
            </span>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={sectionRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl font-black text-orange-600 mb-4">
                {isVisible ? counters.clients.toLocaleString() : '0'}
              </div>
              <div className="text-xl font-semibold text-gray-800">Clients Satisfaits</div>
              <div className="text-gray-600 mt-2">Depuis notre création</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl font-black text-orange-600 mb-4">
                {isVisible ? counters.properties : '0'}
              </div>
              <div className="text-xl font-semibold text-gray-800">Biens Vendus</div>
              <div className="text-gray-600 mt-2">Propriétés exclusives</div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="text-5xl font-black text-orange-600 mb-4">
                {isVisible ? counters.years : '0'}+
              </div>
              <div className="text-xl font-semibold text-gray-800">Ans d'Expérience</div>
              <div className="text-gray-600 mt-2">Expertise reconnue</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/History Tabs */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Notre Identité</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez les fondements de notre entreprise et ce qui nous motive au quotidien
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`rounded-2xl overflow-hidden shadow-xl ${activeTab === 'mission' ? 'animate-fade-in-left' : activeTab === 'vision' ? 'animate-fade-in-right' : 'animate-fade-in-up'}`}>
              <img
                src={tabContent[activeTab as keyof typeof tabContent].image}
                alt={tabContent[activeTab as keyof typeof tabContent].title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className={`${activeTab === 'mission' ? 'animate-fade-in-right' : activeTab === 'vision' ? 'animate-fade-in-left' : 'animate-fade-in-up'}`}>
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                {tabContent[activeTab as keyof typeof tabContent].title}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {tabContent[activeTab as keyof typeof tabContent].content}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center">
                  <span>En savoir plus</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                
                <button className="bg-white text-orange-600 border border-orange-200 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300">
                  Nos services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-2xl bg-gradient-to-b from-white to-orange-50 border border-orange-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Nos Réalisations</h2>
            <p className="text-gray-600 text-lg">Ce qui nous rend fiers</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-black text-orange-600 mb-2">{item.title}</div>
                <div className="text-gray-600 text-sm font-medium">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Rencontrez Notre Équipe</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des experts passionnés dédiés à la concrétisation de vos projets immobiliers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <div className="flex justify-center space-x-3">
                      {member.social.map((platform, i) => (
                        <div key={i} className="bg-white/20 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-orange-500 transition-colors duration-300">
                          <div className="h-5 w-5 text-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{member.name}</h3>
                  <div className="text-orange-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all duration-300 inline-flex items-center">
              <span>Voir toute l'équipe</span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Prêt à Concrétiser Votre Projet Immobilier ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation personnalisée avec nos experts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Nous Appeler
              </span>
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/30 transition-all duration-300">
              <span className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                Nous Écrire
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from { 
            opacity: 0;
            transform: translateX(30px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-left {
          opacity: 0;
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          opacity: 0;
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;