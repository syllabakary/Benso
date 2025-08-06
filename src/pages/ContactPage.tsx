import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici on enverrait les données à l'API
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans votre projet immobilier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                {/* Téléphone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <a 
                      href="tel:+33123456789" 
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      01 23 45 67 89
                    </a>
                    <p className="text-sm text-gray-600">Lundi - Vendredi : 9h - 19h</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a 
                      href="mailto:contact@benso.fr" 
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      contact@benso.fr
                    </a>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white p-3 rounded-xl">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/33123456789" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      +33 1 23 45 67 89
                    </a>
                    <p className="text-sm text-gray-600">Disponible 7j/7</p>
                  </div>
                </div>

                {/* Adresse */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-700">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-3 rounded-xl">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                    <div className="text-gray-700 text-sm space-y-1">
                      <p>Lundi - Vendredi : 9h00 - 19h00</p>
                      <p>Samedi : 9h00 - 17h00</p>
                      <p>Dimanche : Sur rendez-vous</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre localisation</h2>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Carte Google Maps</p>
                  <p className="text-sm text-gray-500">Intégration à venir</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="01 23 45 67 89"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    required
                    value={formData.sujet}
                    onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="achat">Achat d'un bien</option>
                    <option value="location">Location d'un bien</option>
                    <option value="reservation">Réservation</option>
                    <option value="estimation">Estimation</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>

              <div className="flex items-center">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  J'accepte d'être contacté(e) par BENSO concernant ma demande *
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 px-8 rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Envoyer le message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Section FAQ rapide */}
        <div className="mt-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Questions fréquentes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Combien de temps pour une réponse ?</h3>
              <p className="text-gray-700 text-sm">
                Nous nous engageons à vous répondre sous 24h maximum par email, 
                et immédiatement par WhatsApp pendant nos heures d'ouverture.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Puis-je visiter sans rendez-vous ?</h3>
              <p className="text-gray-700 text-sm">
                Pour vous garantir un accueil optimal, nous recommandons de prendre 
                rendez-vous. Cependant, nous restons flexibles selon vos disponibilités.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Vos services sont-ils gratuits ?</h3>
              <p className="text-gray-700 text-sm">
                Nos conseils et l'accompagnement pour la recherche de biens sont 
                entièrement gratuits pour les locataires et acheteurs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Couvrez-vous toute la France ?</h3>
              <p className="text-gray-700 text-sm">
                Nous sommes spécialisés sur Paris et sa région, mais nous pouvons 
                vous orienter vers des partenaires de confiance dans toute la France.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;