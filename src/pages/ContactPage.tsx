import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, Star, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = () => {
    if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    alert('Message envoyé ! Nous vous recontacterons rapidement.');
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      sujet: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* Hero Section avec image */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-orange-600/30" />
        
        {/* Contenu hero */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
              Parlons de votre projet
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Notre équipe passionnée vous accompagne vers la réussite de votre projet immobilier
            </p>
            
            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">Temps de réponse</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Années d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Informations de contact */}
          <div className="space-y-8">
            {/* Coordonnées principales */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-3 rounded-2xl mr-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Contactez-nous</h2>
              </div>
              
              <div className="space-y-6">
                {/* Téléphone */}
                <div className="group p-4 rounded-2xl hover:bg-orange-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Téléphone</h3>
                      <a 
                        href="tel:+33123456789" 
                        className="text-orange-600 hover:text-orange-700 font-bold text-lg"
                      >
                        01 23 45 67 89
                      </a>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Lundi - Vendredi : 9h - 19h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group p-4 rounded-2xl hover:bg-orange-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:contact@benso.fr" 
                        className="text-orange-600 hover:text-orange-700 font-bold text-lg"
                      >
                        contact@benso.fr
                      </a>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Réponse sous 24h garantie
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="group p-4 rounded-2xl hover:bg-green-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/33123456789" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 font-bold text-lg"
                      >
                        +33 1 23 45 67 89
                      </a>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        Disponible 7j/7
                      </p>
                    </div>
                  </div>
                </div>

                {/* Adresse */}
                <div className="group p-4 rounded-2xl hover:bg-orange-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Notre bureau</h3>
                      <p className="text-gray-700 font-medium">
                        123 Avenue des Champs-Élysées<br />
                        75008 Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires détaillés */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center mb-6">
                <Clock className="h-8 w-8 mr-4" />
                <h2 className="text-2xl font-bold">Nos horaires</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="font-bold">9h00 - 19h00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="font-medium">Samedi</span>
                  <span className="font-bold">9h00 - 17h00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Dimanche</span>
                  <span className="font-bold">Sur rendez-vous</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-orange-100 hover:shadow-2xl transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Écrivez-nous</h2>
              <p className="text-gray-600">Partagez votre projet, nous vous recontactons rapidement</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300"
                    placeholder="01 23 45 67 89"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Type de projet *
                  </label>
                  <select
                    required
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300 appearance-none bg-white"
                  >
                    <option value="">Choisir votre projet</option>
                    <option value="achat">💰 Achat d'un bien</option>
                    <option value="location">🏠 Location d'un bien</option>
                    <option value="reservation">📅 Réservation</option>
                    <option value="estimation">📊 Estimation gratuite</option>
                    <option value="autre">💬 Autre demande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Votre message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:border-orange-300 resize-none"
                  placeholder="Décrivez votre projet immobilier en détail..."
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="h-5 w-5 text-orange-600 focus:ring-orange-500 border-2 border-gray-300 rounded mt-1"
                />
                <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed">
                  J'accepte d'être contacté(e) par <strong>BENSO</strong> concernant ma demande et de recevoir des informations sur leurs services *
                </label>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-5 px-8 rounded-2xl hover:from-orange-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl"
              >
                <Send className="h-6 w-6" />
                <span className="text-lg">Envoyer mon message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section témoignages rapides */}
        <div className="mt-20 bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-3xl border-2 border-orange-100 p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pourquoi nous choisir ?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Réponse rapide</h3>
              <p className="text-gray-600 text-sm">Réponse garantie sous 24h maximum</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Service premium</h3>
              <p className="text-gray-600 text-sm">Accompagnement personnalisé et gratuit</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Expertise locale</h3>
              <p className="text-gray-600 text-sm">Spécialistes de Paris et région</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Multi-canal</h3>
              <p className="text-gray-600 text-sm">Téléphone, email, WhatsApp disponibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;