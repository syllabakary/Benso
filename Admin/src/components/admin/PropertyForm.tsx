import '../../index.css';
import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { 
  X, 
  Upload, 
  MapPin, 
  Home, 
  DollarSign, 
  Calendar,
  Save,
  Eye,
  Plus,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Property, PropertyFormData, Agent } from '../../types/admin';

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  mode: 'create' | 'edit';
}

const PropertyForm: React.FC<PropertyFormProps> = ({ isOpen, onClose, property, mode }) => {
  const { agents, createProperty, updateProperty, isLoading } = useAdmin();
  
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    type: 'appartement',
    transaction_type: 'vente',
    price: 0,
    surface: 0,
    rooms: 1,
    bedrooms: 1,
    bathrooms: 1,
    address: '',
    city: '',
    district: '',
    postal_code: '',
    agent_id: '',
    features: [],
    images: []
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Réinitialiser le formulaire quand la modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && property) {
        setFormData({
          title: property.title,
          description: property.description,
          type: property.type,
          transaction_type: property.transaction_type,
          price: property.price,
          surface: property.surface,
          rooms: property.rooms,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          address: property.address,
          city: property.city,
          district: property.district || '',
          postal_code: property.postal_code,
          agent_id: property.agent_id,
          features: property.features?.map(f => f.feature_name) || [],
          images: []
        });
        setSelectedFeatures(property.features?.map(f => f.feature_name) || []);
        setImagePreviews(property.images?.map(img => img.image_url || '') || []);
      } else {
        // Reset pour création
        setFormData({
          title: '',
          description: '',
          type: 'appartement',
          transaction_type: 'vente',
          price: 0,
          surface: 0,
          rooms: 1,
          bedrooms: 1,
          bathrooms: 1,
          address: '',
          city: '',
          district: '',
          postal_code: '',
          agent_id: '',
          features: [],
          images: []
        });
        setSelectedFeatures([]);
        setImageFiles([]);
        setImagePreviews([]);
      }
      setCurrentStep(1);
      setErrors({});
    }
  }, [isOpen, mode, property]);

  const propertyTypes = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'loft', label: 'Loft' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'terrain', label: 'Terrain' },
    { value: 'bureau', label: 'Bureau' },
    { value: 'commerce', label: 'Commerce' }
  ];

  const availableFeatures = [
    'Piscine', 'Jardin', 'Terrasse', 'Balcon', 'Garage', 'Parking',
    'Ascenseur', 'Cave', 'Climatisation', 'Chauffage central',
    'Cheminée', 'Cuisine équipée', 'Dressing', 'Buanderie',
    'Sécurité 24h/24', 'Gardien', 'Interphone', 'Digicode',
    'Fibre optique', 'Proche transports', 'Proche écoles', 'Proche commerces'
  ];

  const cities = [
    'Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro',
    'Korhogo', 'Man', 'Divo', 'Gagnoa', 'Abengourou'
  ];

  const handleInputChange = (field: keyof PropertyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 10) {
      alert('Maximum 10 images autorisées');
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    // Créer les aperçus
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Titre requis';
      if (!formData.description.trim()) newErrors.description = 'Description requise';
      if (!formData.agent_id) newErrors.agent_id = 'Agent requis';
    }

    if (step === 2) {
      if (formData.price <= 0) newErrors.price = 'Prix requis';
      if (formData.surface <= 0) newErrors.surface = 'Surface requise';
      if (formData.rooms < 1) newErrors.rooms = 'Au moins 1 pièce';
      if (formData.bedrooms < 0) newErrors.bedrooms = 'Nombre de chambres invalide';
      if (formData.bathrooms < 1) newErrors.bathrooms = 'Au moins 1 salle de bain';
    }

    if (step === 3) {
      if (!formData.address.trim()) newErrors.address = 'Adresse requise';
      if (!formData.city.trim()) newErrors.city = 'Ville requise';
      if (!formData.postal_code.trim()) newErrors.postal_code = 'Code postal requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    try {
      const finalFormData = {
        ...formData,
        features: selectedFeatures,
        images: imageFiles
      };

      if (mode === 'create') {
        await createProperty(finalFormData);
      } else if (property) {
        await updateProperty(property.id, finalFormData);
      }

      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  if (!isOpen) return null;

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
        <h3 className="text-lg font-semibold text-gray-900">Informations Générales</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre de l'annonce *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: Magnifique villa 4 chambres avec piscine"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de bien *
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de transaction *
          </label>
          <select
            value={formData.transaction_type}
            onChange={(e) => handleInputChange('transaction_type', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent responsable *
          </label>
          <select
            value={formData.agent_id}
            onChange={(e) => handleInputChange('agent_id', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.agent_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner un agent</option>
            {agents.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.nom} - {agent.specialite}
              </option>
            ))}
          </select>
          {errors.agent_id && <p className="text-red-500 text-sm mt-1">{errors.agent_id}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Décrivez les caractéristiques et avantages du bien..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
        <h3 className="text-lg font-semibold text-gray-900">Caractéristiques & Prix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prix ({formData.transaction_type === 'vente' ? 'vente' : 'loyer mensuel'}) *
          </label>
          <div className="relative">
            <DollarSign size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          <p className="text-sm text-gray-500 mt-1">
            ≈ {(formData.price * 655.957).toLocaleString()} FCFA
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surface (m²) *
          </label>
          <input
            type="number"
            value={formData.surface}
            onChange={(e) => handleInputChange('surface', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.surface ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0"
            min="0"
            step="0.1"
          />
          {errors.surface && <p className="text-red-500 text-sm mt-1">{errors.surface}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de pièces *
          </label>
          <input
            type="number"
            value={formData.rooms}
            onChange={(e) => handleInputChange('rooms', parseInt(e.target.value) || 1)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.rooms ? 'border-red-500' : 'border-gray-300'
            }`}
            min="1"
          />
          {errors.rooms && <p className="text-red-500 text-sm mt-1">{errors.rooms}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chambres
          </label>
          <input
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.bedrooms ? 'border-red-500' : 'border-gray-300'
            }`}
            min="0"
          />
          {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salles de bain *
          </label>
          <input
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value) || 1)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.bathrooms ? 'border-red-500' : 'border-gray-300'
            }`}
            min="1"
          />
          {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
        <h3 className="text-lg font-semibold text-gray-900">Localisation</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse complète *
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ex: 123 Boulevard de la République"
            />
          </div>
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Sélectionner une ville</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quartier/District
          </label>
          <input
            type="text"
            value={formData.district}
            onChange={(e) => handleInputChange('district', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Ex: Cocody, Plateau, Marcory..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code postal *
          </label>
          <input
            type="text"
            value={formData.postal_code}
            onChange={(e) => handleInputChange('postal_code', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
              errors.postal_code ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 01234"
          />
          {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
        <h3 className="text-lg font-semibold text-gray-900">Équipements & Images</h3>
      </div>

      {/* Équipements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Équipements et caractéristiques
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableFeatures.map(feature => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature)}
                onChange={() => toggleFeature(feature)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Images (Maximum 10)
        </label>
        
        <label htmlFor="image-upload" className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer block">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Cliquez pour ajouter des images</p>
          <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB chacune</p>
        </label>

        {/* Aperçu des images */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Aperçu ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Ajouter un bien' : 'Modifier le bien'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Indicateur d'étapes */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep === step 
                      ? 'bg-orange-600 text-white' 
                      : currentStep > step 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contenu de l'étape */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Précédent
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Enregistrement...' : 'Enregistrer'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;