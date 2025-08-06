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
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

// ✅ Fonction format prix avec EUR + FCFA
const formatPrice = (price: number, type: string) => {
  const priceEUR = `${price.toLocaleString()} €`;
  const priceFCFA = `${(price * 655.957).toLocaleString()} FCFA`;

  const formatted = `${priceEUR} / ${priceFCFA}`;
  return type === 'vente' ? formatted : `${formatted} / mois`;
};

// ✅ Icônes équipements
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
  const [showReservationForm, setShowReservationForm] = useState(false);

  // 🔹 Données fictives (à remplacer par API Laravel)
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
    description: `Magnifique appartement lumineux et parfaitement agencé, situé dans un immeuble moderne de Cocody.

Il se compose d'un grand séjour avec balcon, cuisine équipée, deux chambres spacieuses, salle de bain moderne et parking privé.

Idéalement situé près des commerces et transports.`,
    agent: {
      name: 'Sophie Martin',
      phone: '+2250707070707',
      whatsapp: '2250707070707',
      email: 'contact@benso.ci',
    },
  };

  // 🔹 Biens similaires
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

  // 🔹 Navigation images
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Galerie photos */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
        />
        {/* Boutons navigation */}
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
        {/* Indicateurs */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {property.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-3 h-3 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
        {/* Statut */}
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
            <p className="text-gray-700">{property.description}</p>
          </div>
        </div>

        {/* Sidebar contact */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4">Contacter l'agent</h3>
            <a
              href={`https://wa.me/${property.agent.whatsapp}`}
              className="block bg-green-500 text-white text-center p-3 rounded-lg mb-3 hover:bg-green-600"
            >
              <MessageCircle className="inline mr-2" /> WhatsApp
            </a>
            <a
              href={`tel:${property.agent.phone}`}
              className="block bg-blue-500 text-white text-center p-3 rounded-lg hover:bg-blue-600"
            >
              <Phone className="inline mr-2" /> Appeler
            </a>
          </div>
        </div>
      </div>

      {/* Biens similaires */}
      <div className="max-w-7xl mx-auto mt-12 p-6">
        <h2 className="text-2xl font-bold mb-6">Biens similaires</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {similarProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Section pub */}
      <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl shadow-lg max-w-7xl mx-auto my-12 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Annonce sponsorisée</h3>
        <p className="text-gray-700 mb-4">
          Profitez de nos offres spéciales pour trouver votre futur logement.
        </p>
        <a
          href="#"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Voir l'offre
        </a>
      </section>
    </div>
  );
};

export default PropertyPage;
