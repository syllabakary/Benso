import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, MapPin, Home, Euro, Send, CheckCircle } from 'lucide-react';
import { useReservation } from '../contexts/ReservationContext';
import { useAuth } from '../contexts/AuthContext';

const ReservationPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const { createReservation, isLoading } = useReservation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: user?.nom || '',
    email: user?.email || '',
    telephone: '',
    
    // Critères de recherche
    typeTransaction: 'louer' as 'louer' | 'acheter',
    typeBien: '',
    localisation: '',
    budgetMin: '',
    budgetMax: '',
    surface: '',
    pieces: '',
    
    // Préférences
    dateVisite: '',
    heureVisite: '',
    commentaires: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createReservation({
        nom: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        typeTransaction: formData.typeTransaction,
        typeBien: formData.typeBien,
        localisation: formData.localisation,
        budgetMin: formData.budgetMin ? parseInt(formData.budgetMin) : undefined,
        budgetMax: formData.budgetMax ? parseInt(formData.budgetMax) : undefined,
        surfaceMin: formData.surface ? parseInt(formData.surface) : undefined,
        pieces: formData.pieces,
        dateVisite: formData.dateVisite,
        heureVisite: formData.heureVisite as 'matin' | 'apres-midi' | 'soir',
        commentaires: formData.commentaires
      });
      
      setIsSubmitted(true);
    } catch (error) {
      alert('Erreur lors de la création de la réservation. Veuillez réessayer.');
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservation confirmée !</h2>
          <p className="text-gray-600 mb-6">
            Votre demande de réservation a été envoyée avec succès. 
            Notre équipe vous contactera dans les plus brefs délais.
          </p>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Vous recevrez un email de confirmation à : <br />
              <span className="font-medium">{formData.email}</span>
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Réserver votre bien idéal
          </h1>
          <p className="text-xl text-gray-600">
            Remplissez ce formulaire et nous vous contacterons rapidement
          </p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          {/* Étape 1: Informations personnelles */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Vos informations</h2>
                <p className="text-gray-600">Pour que nous puissions vous contacter</p>
              </div>

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
                    placeholder="Jean Dupont"
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
                    placeholder="jean@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="01 23 45 67 89"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 2: Critères de recherche */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Home className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Votre recherche</h2>
                <p className="text-gray-600">Décrivez le bien que vous recherchez</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de transaction *
                  </label>
                  <select
                    required
                    value={formData.typeTransaction}
                    onChange={(e) => setFormData({ ...formData, typeTransaction: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                  >
                    <option value="louer">Louer</option>
                    <option value="acheter">Acheter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de bien *
                  </label>
                  <select
                    required
                    value={formData.typeBien}
                    onChange={(e) => setFormData({ ...formData, typeBien: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Choisir un type</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="studio">Studio</option>
                    <option value="terrain">Terrain</option>
                    <option value="loft">Loft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation souhaitée *
                </label>
                <input
                  type="text"
                  required
                  value={formData.localisation}
                  onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Paris, Lyon, Marseille..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget minimum (€)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder={formData.typeTransaction === 'acheter' ? '100000' : '500'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget maximum (€)
                  </label>
                  <input
                    type="number"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder={formData.typeTransaction === 'acheter' ? '500000' : '2000'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Surface minimum (m²)
                  </label>
                  <input
                    type="number"
                    value={formData.surface}
                    onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de pièces
                  </label>
                  <select
                    value={formData.pieces}
                    onChange={(e) => setFormData({ ...formData, pieces: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Indifférent</option>
                    <option value="1">1 pièce</option>
                    <option value="2">2 pièces</option>
                    <option value="3">3 pièces</option>
                    <option value="4">4 pièces</option>
                    <option value="5">5+ pièces</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}

          {/* Étape 3: Préférences et validation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Finalisation</h2>
                <p className="text-gray-600">Derniers détails pour votre réservation</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de visite souhaitée
                  </label>
                  <input
                    type="date"
                    value={formData.dateVisite}
                    onChange={(e) => setFormData({ ...formData, dateVisite: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure préférée
                  </label>
                  <select
                    value={formData.heureVisite}
                    onChange={(e) => setFormData({ ...formData, heureVisite: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors appearance-none bg-white"
                  >
                    <option value="">Indifférent</option>
                    <option value="matin">Matin (9h-12h)</option>
                    <option value="apres-midi">Après-midi (14h-17h)</option>
                    <option value="soir">Fin de journée (17h-19h)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commentaires ou demandes spéciales
                </label>
                <textarea
                  rows={4}
                  value={formData.commentaires}
                  onChange={(e) => setFormData({ ...formData, commentaires: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                  placeholder="Précisez vos attentes, contraintes ou questions..."
                />
              </div>

              {/* Récapitulatif */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif de votre demande</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Contact :</span>
                    <span className="ml-2 font-medium">{formData.nom}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email :</span>
                    <span className="ml-2 font-medium">{formData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Transaction :</span>
                    <span className="ml-2 font-medium capitalize">{formData.typeTransaction}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Type de bien :</span>
                    <span className="ml-2 font-medium capitalize">{formData.typeBien || 'Non spécifié'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Localisation :</span>
                    <span className="ml-2 font-medium">{formData.localisation}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Budget :</span>
                    <span className="ml-2 font-medium">
                      {formData.budgetMin && formData.budgetMax 
                        ? `${formData.budgetMin}€ - ${formData.budgetMax}€`
                        : 'Non spécifié'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  J'accepte d'être contacté(e) par BENSO concernant ma demande de réservation *
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Précédent
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{isLoading ? 'Envoi en cours...' : 'Confirmer la réservation'}</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;