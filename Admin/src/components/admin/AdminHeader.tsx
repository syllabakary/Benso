import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, sidebarCollapsed }) => {
  return (
    <header className={`bg-white shadow-sm border-b transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-96">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher des propriétés, utilisateurs, agents..."
              className="bg-transparent flex-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">Admin BENSO</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;