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

function App() {
  return (
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
                      <Route path="/acheter" element={<ResultsPage transactionType="acheter" />} />
                      <Route path="/louer" element={<ResultsPage transactionType="louer" />} />
                      <Route path="/reserver" element={<ReservationPage />} />
                      <Route path="/resultats" element={<ResultsPage />} />
                      <Route path="/bien/:id" element={<PropertyPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/tableau-de-bord" element={<DashboardPage />} />
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
  );
}

export default App;