import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/admin/LoginForm';
import { AdminProvider } from '../contexts/AdminContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import Dashboard from '../components/admin/Dashboard';
import PropertiesManager from '../components/admin/PropertiesManager';
import UsersManager from '../components/admin/UsersManager';
import ReservationsManager from '../components/admin/ReservationsManager';
import ContactsManager from '../components/admin/ContactsManager';
import TransactionsManager from '../components/admin/TransactionsManager';
import AgentsManager from '../components/admin/AgentsManager';
import AnalyticsManager from '../components/admin/AnalyticsManager';
import AdvertisementsManager from '../components/admin/AdvertisementsManager';
import SettingsManager from '../components/admin/SettingsManager';

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <PropertiesManager />;
      case 'users':
        return <UsersManager />;
      case 'agents':
        return <AgentsManager />;
      case 'reservations':
        return <ReservationsManager />;
      case 'contacts':
        return <ContactsManager />;
      case 'transactions':
        return <TransactionsManager />;
      case 'advertisements':
        return <AdvertisementsManager />;
      case 'analytics':
        return <AnalyticsManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          {/* Header */}
          <AdminHeader
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
          />

          {/* Page Content */}
          <main className="min-h-screen">
            {renderContent()}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
};

export default AdminPage;