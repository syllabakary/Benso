import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import PropertyPage from './pages/PropertyPage';
import ContactPage from './pages/ContactPage';
import ReservationPage from './pages/ReservationPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';
import { ReservationProvider } from './contexts/ReservationContext';
import { FavoriteProvider } from './contexts/FavoriteContext';
import { CurrencyProvider } from './components/CurrencyToggle';
import AboutPage from './pages/Apropo';
import AgencesPage from './pages/Agence';
import ServicesPage from "./pages/services";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <AuthProvider>
          <PropertyProvider>
            <ReservationProvider>
              <FavoriteProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<ResultsPage />} />
                        <Route path="/property/:id" element={<PropertyPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/reservation/:id?" element={<ReservationPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/agencies" element={<AgencesPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </Router>
              </FavoriteProvider>
            </ReservationProvider>
          </PropertyProvider>
        </AuthProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;
