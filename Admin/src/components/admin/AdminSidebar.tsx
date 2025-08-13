import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  UserCheck, 
  Calendar,
  MessageCircle,
  CreditCard,
  Settings,
  BarChart3,
  Star,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  active?: boolean;
}

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse
}) => {
  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      active: activeSection === 'dashboard'
    },
    {
      id: 'properties',
      label: 'Propriétés',
      icon: <Home size={20} />,
      badge: 1247,
      active: activeSection === 'properties'
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: <Users size={20} />,
      badge: 3456,
      active: activeSection === 'users'
    },
    {
      id: 'agents',
      label: 'Agents',
      icon: <UserCheck size={20} />,
      badge: 28,
      active: activeSection === 'agents'
    },
    {
      id: 'reservations',
      label: 'Réservations',
      icon: <Calendar size={20} />,
      badge: 156,
      active: activeSection === 'reservations'
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: <MessageCircle size={20} />,
      badge: 43,
      active: activeSection === 'contacts'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: <CreditCard size={20} />,
      badge: 12,
      active: activeSection === 'transactions'
    },
    {
      id: 'advertisements',
      label: 'Publicités',
      icon: <Star size={20} />,
      active: activeSection === 'advertisements'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
      active: activeSection === 'analytics'
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: <Settings size={20} />,
      active: activeSection === 'settings'
    }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} h-screen fixed left-0 top-0 z-50`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">BENSO</h1>
              <p className="text-xs text-gray-500">Administration</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span className={`${item.active ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                        item.active 
                          ? 'bg-orange-100 text-orange-600' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <button className={`w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={20} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;