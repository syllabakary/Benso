import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Star,  Award, Target, Eye, Heart, Play, TrendingUp, Shield, User } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({ clients: 0, properties: 0, years: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Animation des compteurs
  useEffect(() => {
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
  }, []);

  const teamMembers = [
    {
      name: 'Sarah Kouassi',
      role: 'Directrice Générale',
      image: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg',
      description: '15 ans d\'expérience en immobilier de luxe'
    },
    {
      name: 'Marc Diallo',
      role: 'Chef des Ventes',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      description: 'Expert en négociation immobilière'
    },
    {
      name: 'Lisa Traoré',
      role: 'Responsable Marketing',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
      description: 'Spécialiste en marketing digital'
    }
  ];

  const achievements = [
    { icon: Award, title: 'Agence N°1', desc: 'À Abidjan depuis 2019' },
    { icon: Shield, title: 'Certifiée', desc: 'Agréments officiels' },
    { icon: Star, title: '4.9/5', desc: 'Satisfaction client' },
    { icon: TrendingUp, title: '95%', desc: 'Taux de réussite' }
  ];

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
          <div className="inline-block mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <span className="text-white font-semibold">À PROPOS DE BENSO</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Votre Partenaire
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Immobilier
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Depuis 8 ans, nous transformons vos rêves immobiliers en réalité avec passion, 
            expertise et un service d'exception à Abidjan.
          </p>
          
          <button className="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Découvrir notre histoire
            </span>
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-black text-orange-600 mb-2">
                {counters.clients.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-semibold">Clients Satisfaits</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black text-amber-600 mb-2">
                {counters.properties.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-semibold">Biens Vendus</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-black text-orange-600 mb-2">
                {counters.years}
              </div>
              <div className="text-gray-600 font-semibold">Années d'Expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Notre Vision</h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Redéfinir l'expérience immobilière en Côte d'Ivoire
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Target className="h-12 w-12 text-yellow-300 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Notre Mission</h3>
              <p className="text-white/80 leading-relaxed">
                Accompagner chaque client dans ses projets immobiliers avec expertise, 
                transparence et un service personnalisé d'exception.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Eye className="h-12 w-12 text-yellow-300 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Notre Vision</h3>
              <p className="text-white/80 leading-relaxed">
                Devenir la référence immobilière en Afrique de l'Ouest en alliant 
                innovation technologique et expertise locale.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Heart className="h-12 w-12 text-yellow-300 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Nos Valeurs</h3>
              <p className="text-white/80 leading-relaxed">
                Intégrité, excellence, proximité et innovation guident chacune 
                de nos actions pour votre satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Nos Réalisations</h2>
            <p className="text-gray-600 text-lg">Ce qui nous rend fiers</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 hover:shadow-lg transition-all duration-300 hover:scale-105"
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
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des experts passionnés à votre service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <div className="text-orange-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Prêt à Concrétiser Votre Projet ?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite avec nos experts
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
    </div>
  );
};

export default AboutPage;