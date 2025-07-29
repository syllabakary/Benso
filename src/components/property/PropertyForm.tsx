import React, { useState } from 'react';
import { X, Upload, MapPin, Euro, Home, Bed, Bath, Car, TreePine } from 'lucide-react';
import { Property } from '../../types';
import { useProperty } from '../../contexts/PropertyContext';
import { useAuth } from '../../contexts/AuthContext';

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
}

export default function PropertyForm({ isOpen, onClose, property }: PropertyFormProps) {
  const { addProperty, updateProperty } = useProperty();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    type: property?.type || 'apartment',
    price: property?.price || 0,
    area: property?.area || 0,
    rooms: property?.rooms || 1,
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    floor: property?.floor || 0,
    furnished: property?.furnished || false,
    parking: property?.parking || false,
    balcony: property?.balcony || false,
    garden: property?.garden || false,
    elevator: property?.elevator || false,
    street: property?.address.street || '',
    city: property?.address.city || '',
    postalCode: property?.address.postalCode || '',
    energyClass: property?.energyClass || 'C',
    availableFrom: property?.availableFrom ? property.availableFrom.toISOString().split('T')[0] : '',
    deposit: property?.costs.deposit || 0,
    charges: property?.costs.charges || 0
  });

  const [images, setImages] = useState<string[]>(property?.images.map(img => img.url) || []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        description: formData.description,
        type: formData.type as Property['type'],
        price: formData.price,
        currency: 'EUR',
        area: formData.area,
        rooms: formData.rooms,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        floor: formData.floor,
        totalFloors: 5,
        furnished: formData.furnished,
        parking: formData.parking,
        balcony: formData.balcony,
        garden: formData.garden,
        elevator: formData.elevator,
        terrace: false,
        pool: false,
        garage: false,
        cellar: false,
        airConditioning: false,
        heating: 'central',
        energyClass: formData.energyClass as Property['energyClass'],
        address: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: 'France',
          coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        images: images.map((url, index) => ({
          id: index.toString(),
          url,
          order: index + 1
        })),
        landlordId: user.id,
        available: true,
        availableFrom: new Date(formData.availableFrom),
        views: 0,
        featured: false,
        verified: false,
        status: 'active',
        visits: [],
        analytics: {
          totalViews: 0,
          uniqueViews: 0,
          favorites: 0,
          contacts: 0,
          visits: 0,
          viewsHistory: []
        },
        amenities: [],
        nearbyPlaces: [],
        rules: {
          pets: false,
          smoking: false,
          parties: false,
          children: true,
          maximumOccupants: formData.bedrooms * 2
        },
        costs: {
          rent: formData.price,
          charges: formData.charges,
          deposit: formData.deposit
        }
      };

      if (property) {
        updateProperty(property.id, propertyData);
      } else {
        const newProperty: Property = {
          ...propertyData,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        addProperty(newProperty);
      }

      onClose();
    } catch (error) {
      console.error('Error saving property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const addImage = () => {
    const url = prompt('URL de l\'image:');
    if (url) {
      setImages(prev => [...prev, url]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {property ? 'Modifier l\'annonce' : 'Nouvelle annonce'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="apartment">Appartement</option>
                <option value="house">Maison</option>
                <option value="studio">Studio</option>
                <option value="room">Chambre</option>
                <option value="office">Bureau</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€/mois)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surface (m²)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                min="1"
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
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salles de bain</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                min="1"
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
                min="0"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rue</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
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
                  required
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Équipements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'furnished', label: 'Meublé', icon: Home },
                { key: 'parking', label: 'Parking', icon: Car },
                { key: 'balcony', label: 'Balcon', icon: TreePine },
                { key: 'garden', label: 'Jardin', icon: TreePine },
                { key: 'elevator', label: 'Ascenseur', icon: Home }
              ].map(({ key, label, icon: Icon }) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData[key as keyof typeof formData] as boolean}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <Icon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors"
              >
                <Upload className="h-6 w-6 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Costs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Charges (€)</label>
              <input
                type="number"
                name="charges"
                value={formData.charges}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dépôt de garantie (€)</label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disponible à partir du</label>
              <input
                type="date"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : (property ? 'Modifier' : 'Publier')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}