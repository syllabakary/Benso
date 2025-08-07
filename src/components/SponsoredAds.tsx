import React, { useState, useEffect } from 'react';
import { Star, MapPin, Maximize, ChevronLeft, ChevronRight } from 'lucide-react';

const SponsoredAds: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sponsoredProperties = [
    {
      id: 'sp1',
      title: 'Villa Luxe Piscine',
      price: '2 500€',
      location: 'Cocody',
      surface: '250m²',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    },
    {
      id: 'sp2',
      title: 'Penthouse Centre-Ville',
      price: '1 800€',
      location: 'Plateau',
      surface: '120m²',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg'
    },
    {
      id: 'sp3',
      title: 'Duplex Moderne',
      price: '2 200€',
      location: 'Marcory',
      surface: '180m²',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsoredProperties.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sponsoredProperties.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sponsoredProperties.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sponsoredProperties.length) % sponsoredProperties.length);
  };

  return (
    <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-100">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md mb-3">
            <Star className="h-4 w-4 text-orange-500 mr-2" />
            <span className="text-sm font-bold text-gray-800">ANNONCES SPONSORISÉES</span>
            <Star className="h-4 w-4 text-orange-500 ml-2" />
          </div>
          <p className="text-gray-600 text-sm">Sélection premium</p>
        </div>

        {/* Carousel compact */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {sponsoredProperties.map((property) => (
                <div key={property.id} className="flex-none w-full">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-2 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex">
                      {/* Image */}
                      <div className="relative w-2/5">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                            SPONSORISÉ
                          </span>
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="w-3/5 p-4">
                        <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                          {property.title}
                        </h3>
                        
                        <div className="text-2xl font-black text-orange-600 mb-2">
                          {property.price}
                          <span className="text-xs text-gray-500 font-normal">/mois</span>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-xs mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <Maximize className="h-3 w-3 mr-1" />
                          {property.surface}
                        </div>

                        <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg text-xs font-semibold hover:shadow-md transition-all duration-200">
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 text-orange-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all duration-200"
          >
            <ChevronRight className="h-4 w-4 text-orange-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {sponsoredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-orange-500 w-6' : 'bg-orange-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsoredAds;