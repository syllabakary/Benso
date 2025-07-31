import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, X } from 'lucide-react';
import { Property, Visit } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface VisitSchedulerProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (visit: Omit<Visit, 'id'>) => void;
}

export default function VisitScheduler({ property, isOpen, onClose, onSchedule }: VisitSchedulerProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: '',
    phone: user?.phone || '',
    email: user?.email || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const availableSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));

    const visit: Omit<Visit, 'id'> = {
      propertyId: property.id,
      tenantId: user?.id || 'guest',
      landlordId: property.landlordId,
      scheduledDate: new Date(`${formData.date}T${formData.time}`),
      status: 'pending',
      notes: formData.message
    };

    onSchedule(visit);
    setIsSubmitting(false);
    setStep(3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      date: '',
      time: '',
      message: '',
      phone: user?.phone || '',
      email: user?.email || ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 3 ? 'Demande envoyée !' : 'Programmer une visite'}
            </h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          {step < 3 && (
            <div className="flex items-center justify-between mb-8">
              {[1, 2].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 2 && (
                    <div className={`w-32 h-1 mx-2 ${
                      step > stepNum ? 'bg-orange-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Property Info */}
          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={property.images[0]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={property.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{property.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.address.street}, {property.address.city}</span>
                </div>
                <div className="text-orange-600 font-semibold mt-1">
                  {property.price.toLocaleString()} €/mois
                </div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Choisissez une date et heure</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure préférée
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                        className={`p-2 text-sm rounded-lg border transition-all ${
                          formData.time === time
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Précisez vos disponibilités ou questions..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Vos coordonnées</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="+33 6 12 34 56 78"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Récapitulatif */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Récapitulatif de votre demande</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {formData.date && new Date(formData.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{formData.time}</span>
                  </div>
                  {formData.message && (
                    <div className="flex items-start space-x-2">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{formData.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Demande envoyée avec succès !
              </h3>
              <p className="text-gray-600 mb-6">
                Le propriétaire a reçu votre demande de visite et vous contactera rapidement 
                pour confirmer le rendez-vous.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Que se passe-t-il maintenant ?</h4>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Le propriétaire recevra une notification immédiate</li>
                  <li>• Vous recevrez une confirmation par email</li>
                  <li>• Le propriétaire vous contactera sous 24h</li>
                  <li>• Vous pourrez suivre le statut dans votre espace personnel</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            {step > 1 && step < 3 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Précédent
              </button>
            )}
            <div className="flex-1"></div>
            
            {step === 1 && (
              <button
                onClick={() => setStep(2)}
                disabled={!formData.date || !formData.time}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
              >
                Continuer
              </button>
            )}
            
            {step === 2 && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.phone || !formData.email}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
              </button>
            )}
            
            {step === 3 && (
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}