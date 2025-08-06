import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Building2, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CurrencyToggle from './CurrencyToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-2 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-700 bg-clip-text text-transparent">
              BENSO
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/acheter" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Acheter
            </Link>
            <Link to="/louer" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Louer
            </Link>
            <Link to="/reserver" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Réserver
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencyToggle />
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/tableau-de-bord" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user.nom}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-medium"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Accueil
              </Link>
              <Link to="/acheter" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Acheter
              </Link>
              <Link to="/louer" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Louer
              </Link>
              <Link to="/reserver" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Réserver
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                Contact
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    to="/tableau-de-bord" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors mb-2"
                  >
                    <User className="h-5 w-5" />
                    <span>{user.nom}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200 font-medium text-center"
                >
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;