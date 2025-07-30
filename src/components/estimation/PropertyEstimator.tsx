import React, { useState } from 'react';
import { Calculator, TrendingUp, MapPin, Home, Euro, BarChart3, CheckCircle } from 'lucide-react';

interface PropertyEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyEstimator({ isOpen, onClose }: PropertyEstimatorProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    type: 'apartment',
    area: '',
    rooms: '',
    bedrooms: '',
    floor: '',
    constructionYear: '',
    condition: 'good',
    parking: false,
    balcony: false,
    elevator: false
  });
  const [estimation, setEstimation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const calculateEstimation = async () => {
    setLoading(true);
    
    // Simulation d'une estimation basée sur les données
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const basePrice = parseInt(formData.area) * (
      formData.type === 'apartment' ? 3500 :
      formData.type === 'house' ? 4200 :
      formData.type === 'studio' ? 4800 : 3000
    );
    
    const locationMultiplier = 
      formData.city.toLowerCase().includes('paris') ? 1.8 :
      formData.city.toLowerCase().includes('lyon') ? 1.3 :
      formData.city.toLowerCase().includes('marseille') ? 1.1 : 1.0;
    
    const conditionMultiplier = 
      formData.condition === 'excellent' ? 1.15 :
      formData.condition === 'good' ? 1.0 :
      formData.condition === 'average' ? 0.9 : 0.8;
    
    const amenitiesBonus = 
      (formData.parking ? 15000 : 0) +
      (formData.balcony ? 8000 : 0) +
      (formData.elevator ? 5000 : 0);
    
    const estimatedPrice = Math.round(basePrice * locationMultiplier * conditionMultiplier + amenitiesBonus);
    const pricePerSqm = Math.round(estimatedPrice / parseInt(formData.area));
    
    setEstimation({
      estimatedPrice,
      pricePerSqm,
      minPrice: Math.round(estimatedPrice * 0.9),
      maxPrice: Math.round(estimatedPrice * 1.1),
      marketTrend: 'rising',
      confidenceLevel: 85,
      comparableProperties: 12
    });
    
    setLoading(false);
    setStep(3);
  };

  const nextStep = () => {
    if (step === 2) {
      calculateEstimation();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Calculator className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Estimation Gratuite</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-orange-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Localisation du bien</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="15 rue de la Paix"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Paris"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="75001"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type de bien</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="apartment">Appartement</option>
                    <option value="house">Maison</option>
                    <option value="studio">Studio</option>
                    <option value="office">Bureau</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Caractéristiques du bien</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="75"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pièces</label>
                  <input
                    type="number"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chambres</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Étage</label>
                  <input
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Année construction</label>
                  <input
                    type="number"
                    name="constructionYear"
                    value={formData.constructionYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="1990"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">État général</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Bon</option>
                    <option value="average">Moyen</option>
                    <option value="poor">À rénover</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Équipements</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: 'parking', label: 'Parking' },
                    { key: 'balcony', label: 'Balcon' },
                    { key: 'elevator', label: 'Ascenseur' }
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={key}
                        checked={formData[key as keyof typeof formData] as boolean}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calcul en cours...</h3>
                  <p className="text-gray-600">Analyse des données du marché immobilier</p>
                </div>
              ) : estimation && (
                <div>
                  <div className="text-center mb-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Estimation terminée</h3>
                    <p className="text-gray-600">Voici l'estimation de votre bien</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        {estimation.estimatedPrice.toLocaleString()} €
                      </div>
                      <div className="text-lg text-gray-700 mb-4">
                        {estimation.pricePerSqm.toLocaleString()} €/m²
                      </div>
                      <div className="text-sm text-gray-600">
                        Fourchette : {estimation.minPrice.toLocaleString()} € - {estimation.maxPrice.toLocaleString()} €
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Tendance</div>
                      <div className="text-sm text-green-600">En hausse</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Fiabilité</div>
                      <div className="text-sm text-blue-600">{estimation.confidenceLevel}%</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <Home className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900">Comparables</div>
                      <div className="text-sm text-purple-600">{estimation.comparableProperties} biens</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Conseils d'expert</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Cette estimation est basée sur les données du marché local</li>
                      <li>• Pour une évaluation précise, contactez un de nos agents</li>
                      <li>• Le marché dans votre secteur est actuellement favorable</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            {step > 1 && !loading && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Précédent
              </button>
            )}
            <div className="flex-1"></div>
            {step < 3 && (
              <button
                onClick={nextStep}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
              >
                {step === 2 ? 'Calculer l\'estimation' : 'Suivant'}
              </button>
            )}
            {step === 3 && estimation && (
              <button
                onClick={onClose}
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