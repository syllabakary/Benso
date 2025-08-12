import React, { useState, useMemo } from 'react';
import { Property, Conversation } from './types';
import { mockConversations, mockDashboardStats } from './data/mockData';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PropertyProvider, useProperty } from './contexts/PropertyContext';
import { MessageProvider, useMessage } from './contexts/MessageContext';
import { VisitProvider } from './contexts/VisitContext';
import Header from './components/layout/Header';
import SearchFilters from './components/search/SearchFilters';
import PropertyGrid from './components/property/PropertyGrid';
import MapView from './components/map/MapView';
import LandlordDashboard from './components/dashboard/LandlordDashboard';
import MessageCenter from './components/messaging/MessageCenter';
import PropertyDetail from './components/property/PropertyDetail';
import HomePage from './components/home/HomePage';
import InteractiveMap from './components/map/InteractiveMap';
import { Map, Grid, LayoutGrid } from 'lucide-react';
import ErrorBoundary from "./components/ErrorBoundary";

function AppContent() {
  const { user } = useAuth();
  const { filteredProperties, filters, setFilters, viewMode, setViewMode, selectedProperty, setSelectedProperty, favorites, toggleFavorite, incrementViews } = useProperty();
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'dashboard' | 'messages' | 'property'>('home');

  const handlePropertyClick = (property: Property) => {
    incrementViews(property.id);
    setSelectedProperty(property);
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
    incrementViews(property.id);
    setSelectedProperty(property);
    setCurrentView('property');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedProperty(null);
  };

  const handleContactProperty = () => {
    setCurrentView('messages');
  };

  const handleShowHome = () => {
    setCurrentView('home');
    setSelectedProperty(null);
  };

  // Show different views based on current state
  if (currentView === 'dashboard' && user?.role === 'landlord') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <LandlordDashboard 
          properties={filteredProperties.filter(p => p.landlordId === user.id)} 
          stats={mockDashboardStats}
        />
      </div>
    );
  }

  if (currentView === 'messages') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
        onFavorite={() => toggleFavorite(selectedProperty.id)}
        isFavorite={favorites.includes(selectedProperty.id)}
      />
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen">
        <Header onShowHome={handleShowHome} />
        <HomePage />
      </div>
    );
  }

  // Default search view
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onShowHome={handleShowHome} />
      
      <SearchFilters
        filters={filters}
        onFiltersChange={setFilters}
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
            onFavorite={toggleFavorite}
            favorites={favorites}
            loading={loading}
          />
        )}

        {viewMode === 'map' && (
          <div className="h-[600px]">
            <InteractiveMap
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
                onFavorite={toggleFavorite}
                favorites={favorites}
                loading={loading}
              />
            </div>
            <div className="h-full">
              <InteractiveMap
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
      <PropertyProvider>
        <VisitProvider>
          <MessageProvider>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </MessageProvider>
        </VisitProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;