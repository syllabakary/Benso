import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white mt-20 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-2 rounded-lg">
                <Home className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">BENSO</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour l'immobilier. 
              Achetez, louez ou réservez le bien idéal avec notre plateforme moderne.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/acheter" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Acheter
                </Link>
              </li>
              <li>
                <Link to="/louer" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Louer
                </Link>
              </li>
              <li>
                <Link to="/reserver" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Réserver
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <a href="tel:+33123456789" className="text-gray-300 hover:text-orange-500 transition-colors">
                  01 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <a href="mailto:contact@benso.fr" className="text-gray-300 hover:text-orange-500 transition-colors">
                  contact@benso.fr
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-4 w-4 text-orange-500 flex items-center justify-center">
                  <span className="text-xs font-bold">W</span>
                </div>
                <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-500 transition-colors">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-orange-500 mt-1" />
                <span className="text-gray-300">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Cookies
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 BENSO. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;