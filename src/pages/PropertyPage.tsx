import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MapPin,
  Maximize,
  Bed,
  Bath,
  Car,
  Calendar,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Building,
  TreePine,
  Waves,
  Zap,
  Shield,
  Mail,
  User,
  Home,
  Check,
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

const formatPrice = (price: number, type: string) => {
  const priceEUR = `${price.toLocaleString()} €`;
  const priceFCFA = `${(price * 655.957).toLocaleString()} FCFA`;
  return type === 'vente' ? `${priceEUR} / ${priceFCFA}` : `${priceEUR} / ${priceFCFA} / mois`;
};

const getFeatureIcon = (feature: string) => {
  switch (feature.toLowerCase()) {
    case 'balcon':
    case 'terrasse':
      return Building;
    case 'jardin':
      return TreePine;
    case 'piscine':
      return Waves;
    case 'parking':
    case 'garage':
      return Car;
    case 'climatisation':
      return Zap;
    default:
      return Shield;
  }
};

const PropertyPage: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyId: id,
    propertyTitle: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const property = {
    id: '1',
    title: 'Appartement moderne 3 pièces avec balcon',
    price: 1200,
    priceType: 'location',
    surface: 65,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    floor: 4,
    yearBuilt: 2018,
    condition: 'Excellent état',
    location: 'Abidjan - Cocody',
    fullAddress: 'Rue des Jardins, Cocody, Abidjan',
    availability: '2025-09-01',
    charges: 150,
    reference: 'BENSO-2025-001',
    energyClass: 'B',
    status: 'à louer',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
    ],
    features: ['Balcon', 'Parking', 'Ascenseur', 'Climatisation'],
    description: `Magnifique appartement lumineux et parfaitement agencé, situé dans un immeuble moderne de Cocody.`,
    agent: {
      name: 'Sophie Martin',
      phone: '+2250707070707',
      whatsapp: '2250707070707',
      email: 'contact@benso.ci',
    },
  };

  const similarProperties = [
    {
      id: '2',
      title: 'Studio lumineux au Plateau',
      price: 750,
      surface: 25,
      rooms: 1,
      location: 'Abidjan Plateau',
      images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
      features: ['Meublé', 'Proche commerces'],
      status: 'à louer',
      transactionType: 'location',
    },
    {
      id: '3',
      title: 'Appartement 2 pièces Riviera',
      price: 1100,
      surface: 45,
      rooms: 2,
      location: 'Abidjan Riviera',
      images: ['https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'],
      features: ['Rénové', 'Balcon'],
      status: 'à louer',
      transactionType: 'location',
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      propertyTitle: property.title
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici vous enverriez les données à votre API Laravel
    setFormSubmitted(true);
    setTimeout(() => setShowContactForm(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Galerie photos */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
        >
          <ChevronRight />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {property.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-3 h-3 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full">
          {property.status}
        </div>
      </div>

      {/* Infos principales */}
      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-8 mt-8">
        {/* Colonne infos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-gray-600 flex items-center mt-2">
              <MapPin className="mr-2" /> {property.location}
            </p>
            <p className="text-2xl text-orange-600 font-bold mt-4">
              {formatPrice(property.price, property.priceType)}
            </p>
          </div>

          {/* Caractéristiques */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Home className="text-orange-500" /> {property.surface} m²
              </div>
              <div className="flex items-center gap-2">
                <Bed className="text-orange-500" /> {property.bedrooms} chambres
              </div>
              <div className="flex items-center gap-2">
                <Bath className="text-orange-500" /> {property.bathrooms} salle(s) de bain
              </div>
              {property.features.map((f, i) => {
                const Icon = getFeatureIcon(f);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="text-orange-500" /> {f}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        {/* Sidebar contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
            <h3 className="text-lg font-bold mb-4">Contacter l'agent</h3>
            
            {/* Options de contact rapide */}
            <div className="space-y-3 mb-6">
              <a
                href={`https://wa.me/${property.agent.whatsapp}`}
                className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              >
                <Phone className="w-5 h-5" /> Appeler
              </a>
              <a
                href={`mailto:${property.agent.email}`}
                className="flex items-center justify-center gap-2 bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition"
              >
                <Mail className="w-5 h-5" /> Email
              </a>
            </div>

            {/* Bouton demande de contact */}
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition font-medium"
            >
              Demande d'information
            </button>
          </div>

          {/* Détails rapides */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Détails du bien</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Référence</span>
                <span className="font-medium">{property.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Disponibilité</span>
                <span className="font-medium">{property.availability}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Étage</span>
                <span className="font-medium">{property.floor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Charges</span>
                <span className="font-medium">{property.charges} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de contact modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Demande envoyée!</h3>
                <p className="text-gray-500">
                  Nous vous contacterons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2">Demande d'information</h3>
                <p className="text-gray-600 mb-6">Pour le bien: {property.title}</p>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                        defaultValue={`Je suis intéressé(e) par le bien ${property.reference} - ${property.title}`}
                      />
                    </div>
                    
                    <input type="hidden" name="propertyId" value={property.id} />
                    <input type="hidden" name="propertyTitle" value={property.title} />
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Envoyer la demande
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Biens similaires */}
      <div className="max-w-7xl mx-auto mt-12 p-6">
        <h2 className="text-2xl font-bold mb-6">Biens similaires</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Section CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Notre équipe peut vous aider à trouver le bien parfait selon vos critères.
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            <span className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              Demander une recherche personnalisée
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default PropertyPage;