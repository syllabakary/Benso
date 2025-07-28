import React, { useState, useMemo } from 'react';
import { Property, SearchFilters as SearchFiltersType, Conversation } from './types';
import { mockProperties, mockConversations, mockDashboardStats } from './data/mockData';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import SearchFilters from './components/search/SearchFilters';
import PropertyGrid from './components/property/PropertyGrid';
import MapView from './components/map/MapView';
import LandlordDashboard from './components/dashboard/LandlordDashboard';
import MessageCenter from './components/messaging/MessageCenter';
import PropertyDetail from './components/property/PropertyDetail';
import { Map, Grid, LayoutGrid } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [properties] = useState<Property[]>(mockProperties);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'split'>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();
  const [favorites, setFavorites] = useState<string[]>(['1', '3']); // Mock favorites
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'search' | 'dashboard' | 'messages' | 'property'>('search');

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchText = `${property.title} ${property.description} ${property.address.city} ${property.address.street}`.toLowerCase();
        if (!searchText.includes(query)) return false;
      }

      // Property type
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(property.type)) return false;
      }

      // Price range
      if (filters.priceMin && property.price < filters.priceMin) return false;
      if (filters.priceMax && property.price > filters.priceMax) return false;

      // Area range
      if (filters.areaMin && property.area < filters.areaMin) return false;
      if (filters.areaMax && property.area > filters.areaMax) return false;

      // Rooms
      if (filters.rooms && filters.rooms.length > 0) {
        if (!filters.rooms.includes(property.rooms)) return false;
      }

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms.length > 0) {
        if (!filters.bedrooms.includes(property.bedrooms)) return false;
      }

      // City
      if (filters.city) {
        if (!property.address.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      }

      // Amenities
      if (filters.furnished !== undefined && property.furnished !== filters.furnished) return false;
      if (filters.parking !== undefined && property.parking !== filters.parking) return false;
      if (filters.balcony !== undefined && property.balcony !== filters.balcony) return false;
      if (filters.garden !== undefined && property.garden !== filters.garden) return false;
      if (filters.elevator !== undefined && property.elevator !== filters.elevator) return false;

      return true;
    });
  }, [properties, filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    // In a real app, this would navigate to property detail page
    console.log('Property clicked:', property);
  };

  const handleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleShowDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleShowMessages = () => {
    setCurrentView('messages');
  };

  const handleShowPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(undefined);
  };

  const handleContactProperty = () => {
    setCurrentView('messages');
  };

  // Show different views based on current state
  if (currentView === 'dashboard' && user?.role === 'landlord') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} />
        <LandlordDashboard 
          properties={properties.filter(p => p.landlordId === user.id)} 
          stats={mockDashboardStats}
        />
      </div>
    );
  }

  if (currentView === 'messages') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSearch={handleSearch} />
        <MessageCenter
          conversations={conversations}
          selectedConversation={selectedConversation}
          onConversationSelect={setSelectedConversation}
        />
      </div>
    );
  }

  if (currentView === 'property' && selectedProperty) {
    return (
      <PropertyDetail
        property={selectedProperty}
        onBack={handleBackToSearch}
        onContact={handleContactProperty}
        onFavorite={() => handleFavorite(selectedProperty.id)}
        isFavorite={favorites.includes(selectedProperty.id)}
      />
    );
  }

  // Default search view
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} />
      
      <SearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onToggle={() => setShowFilters(!showFilters)}
        isOpen={showFilters}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredProperties.length} bien{filteredProperties.length !== 1 ? 's' : ''} trouvé{filteredProperties.length !== 1 ? 's' : ''}
            </h2>
            {filters.query && (
              <span className="text-sm text-gray-500">
                pour "{filters.query}"
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'map' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Map className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'split' 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'grid' && (
          <PropertyGrid
            properties={filteredProperties}
            onPropertyClick={handleShowPropertyDetail}
            onFavorite={handleFavorite}
            favorites={favorites}
            loading={loading}
          />
        )}

        {viewMode === 'map' && (
          <div className="h-[600px]">
            <MapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              className="h-full"
            />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
            <div className="overflow-y-auto">
              <PropertyGrid
                properties={filteredProperties}
                onPropertyClick={handleShowPropertyDetail}
                onFavorite={handleFavorite}
                favorites={favorites}
                loading={loading}
              />
            </div>
            <div className="h-full">
              <MapView
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
                className="h-full"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;