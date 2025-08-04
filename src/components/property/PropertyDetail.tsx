import React, { useState } from 'react';
import { 
  Calendar,
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Maximize, 
  Bed, 
  Bath, 
  Car, 
  Wifi,
  Thermometer,
  TreePine,
  Building,
  Phone,
  MessageCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Eye,
  Flag
} from 'lucide-react';
import { Property, Review } from '../../types';
import VisitScheduler from '../visits/VisitScheduler';
import { useVisit } from '../../contexts/VisitContext';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onContact: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

export default function PropertyDetail({ 
  property, 
  onBack, 
  onContact, 
  onFavorite, 
  isFavorite 
}: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);
  const { addVisit } = useVisit();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const mockReviews: Review[] = [
    {
      id: '1',
      propertyId: property.id,
      tenantId: '1',
      landlordId: property.landlordId,
      rating: 5,
      comment: 'Excellent appartement, très bien situé et propriétaire très réactif !',
      aspects: { cleanliness: 5, location: 5, value: 4, communication: 5 },
      createdAt: new Date('2024-01-15'),
      verified: true
    },
    {
      id: '2',
      propertyId: property.id,
      tenantId: '2',
      landlordId: property.landlordId,
      rating: 4,
      comment: 'Bel appartement, quelques petits détails à améliorer mais dans l\'ensemble très satisfait.',
      aspects: { cleanliness: 4, location: 5, value: 4, communication: 4 },
      createdAt: new Date('2024-02-10'),
      verified: true
    }
  ];

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  const handleScheduleVisit = (visit: any) => {
    addVisit(visit);
    setShowVisitScheduler(false);
  };

  const amenities = [
    { key: 'furnished', label: 'Meublé', icon: Building, available: property.furnished },
    { key: 'parking', label: 'Parking', icon: Car, available: property.parking },
    { key: 'balcony', label: 'Balcon', icon: TreePine, available: property.balcony },
    { key: 'garden', label: 'Jardin', icon: TreePine, available: property.garden },
    { key: 'elevator', label: 'Ascenseur', icon: Building, available: property.elevator },
    { key: 'wifi', label: 'WiFi', icon: Wifi, available: true },
    { key: 'heating', label: 'Chauffage', icon: Thermometer, available: property.heating !== 'none' },
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </button>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button 
              onClick={onFavorite}
              className={`p-2 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={property.images[currentImageIndex]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* View All Photos Button */}
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Voir toutes les photos
                </button>

                {/* Video Play Button */}
                {property.videos && property.videos.length > 0 && (
                  <button className="absolute top-4 left-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors">
                    <Play className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-orange-500' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            {/* ... reste du code inchangé ... */}

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {property.landlord?.firstName.charAt(0)}{property.landlord?.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {property.landlord?.firstName} {property.landlord?.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">Propriétaire</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={onContact}
                      className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-500 hover:to-orange-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Contacter</span>
                    </button>
                    
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>Appeler</span>
                    </button>
                    
                    <button
                      onClick={() => setShowVisitScheduler(true)}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Programmer visite</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <VisitScheduler
        property={property}
        isOpen={showVisitScheduler}
        onClose={() => setShowVisitScheduler(false)}
        onSchedule={handleScheduleVisit}
      />
    </div>
  );
}
