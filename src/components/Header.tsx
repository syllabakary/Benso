import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, Search, Building2, User, Menu, X, LogOut, Settings, Bell, 
  ChevronDown, UserCircle, CreditCard, Heart 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CurrencyToggle from './CurrencyToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { to: "/", label: "Accueil" },
    { to: "/apropo", label: "À propos" },
    { to: "/acheter", label: "Acheter" },
    { to: "/louer", label: "Louer" },
    { to: "/services", label: "Services" },
    { to: "/reserver", label: "Réserver" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              className="h-14 w-26" 
              src="./asset/images-benso/Logo Benso rectangle.jpg" 
              alt="logo benso" 
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-4 py-2 text-gray-700 hover:text-orange-600 transition-all duration-200 font-medium rounded-lg group"
              >
                {item.label}
                {/* Trait sous le lien */}
                <span className="absolute bottom-0 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-200 rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencyToggle />

            <button className="relative p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
                    {user.nom?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user.nom}</div>
                    <div className="text-xs text-gray-500">Compte Premium</div>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Menu utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {user.nom?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.nom}</div>
                          <div className="text-sm text-gray-500">{user.email || 'utilisateur@benso.com'}</div>
                          <div className="text-xs text-orange-600 font-medium">✨ Premium</div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/tableau-de-bord"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                      >
                        <UserCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Mon Profil</div>
                          <div className="text-xs text-gray-500">Gérer vos informations</div>
                        </div>
                      </Link>

                      <Link
                        to="/tableau-de-bord?tab=userfavoris"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                      >
                        <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Mes Favoris</div>
                          <div className="text-xs text-gray-500">12 propriétés sauvegardées</div>
                        </div>
                      </Link>

                      <Link
                        to="/tableau-de-bord?tab=userReservation"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                      >
                        <CreditCard className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Mes Réservations</div>
                          <div className="text-xs text-gray-500">Historique et actives</div>
                        </div>
                      </Link>

                      <Link
                        to="/tableau-de-bord?tab=userParametres"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                      >
                        <Settings className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="font-medium">Paramètres</div>
                          <div className="text-xs text-gray-500">Préférences et sécurité</div>
                        </div>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full group"
                    >
                      <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <div className="font-medium">Déconnexion</div>
                        <div className="text-xs text-red-500">Se déconnecter du compte</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2.5 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.nom?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user.nom}</div>
                      <div className="text-sm text-orange-600">Premium</div>
                    </div>
                  </div>

                  <Link 
                    to="/tableau-de-bord" 
                    className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 py-3 px-4 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span>Mon Profil</span>
                  </Link>

                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full py-3 px-4 rounded-lg"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 font-medium text-center shadow-md mt-4"
                  onClick={() => setIsMenuOpen(false)}
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
