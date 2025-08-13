import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  DollarSign, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  RefreshCw,
  Bell,
  Shield,
  Database,
  Image,
  Users,
  Eye
} from 'lucide-react';

const SettingsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    // Général
    site_name: 'BENSO',
    site_description: 'Plateforme immobilière premium en Côte d\'Ivoire',
    site_url: 'https://benso.ci',
    maintenance_mode: false,
    
    // Contact
    contact_email: 'contact@benso.ci',
    contact_phone: '+225 07 07 07 07',
    whatsapp_number: '+225 07 07 07 07',
    address: 'Abidjan, Cocody - Angré 7ème Tranche',
    
    // Devises
    currency_eur_fcfa: 655.957,
    currency_display_both: true,
    default_currency: 'EUR',
    
    // Limites
    max_images_per_property: 10,
    max_properties_per_agent: 100,
    max_favorites_per_user: 50,
    session_timeout: 120,
    
    // Notifications
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    admin_notifications: true,
    
    // SEO
    meta_title: 'BENSO - Immobilier Premium Côte d\'Ivoire',
    meta_description: 'Découvrez les plus belles propriétés en Côte d\'Ivoire avec BENSO',
    meta_keywords: 'immobilier, côte d\'ivoire, abidjan, vente, location',
    google_analytics_id: '',
    facebook_pixel_id: '',
    
    // Performance
    cache_duration: 3600,
    max_concurrent_users: 1000,
    api_rate_limit: 100,
    image_compression: 80,
    
    // Sécurité
    password_min_length: 8,
    login_attempts: 5,
    account_lockout_duration: 30,
    two_factor_auth: false
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 2000);
  };

  const tabs = [
    { id: 'general', label: 'Général', icon: <Globe size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
    { id: 'currency', label: 'Devises', icon: <DollarSign size={18} /> },
    { id: 'limits', label: 'Limites', icon: <Database size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Eye size={18} /> },
    { id: 'performance', label: 'Performance', icon: <RefreshCw size={18} /> },
    { id: 'security', label: 'Sécurité', icon: <Shield size={18} /> }
  ];

  const SettingField: React.FC<{
    label: string;
    description?: string;
    type?: 'text' | 'number' | 'email' | 'url' | 'textarea' | 'select' | 'toggle';
    value: any;
    onChange: (value: any) => void;
    options?: { value: string; label: string }[];
  }> = ({ label, description, type = 'text', value, onChange, options }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      )}
      
      {type === 'toggle' ? (
        <div className="flex items-center">
          <button
            onClick={() => onChange(!value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? 'bg-orange-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-3 text-sm text-gray-700">{value ? 'Activé' : 'Désactivé'}</span>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <SettingField
              label="Nom du site"
              value={settings.site_name}
              onChange={(value) => setSettings(prev => ({ ...prev, site_name: value }))}
            />
            <SettingField
              label="Description du site"
              description="Description courte utilisée pour les réseaux sociaux et le SEO"
              type="textarea"
              value={settings.site_description}
              onChange={(value) => setSettings(prev => ({ ...prev, site_description: value }))}
            />
            <SettingField
              label="URL du site"
              type="url"
              value={settings.site_url}
              onChange={(value) => setSettings(prev => ({ ...prev, site_url: value }))}
            />
            <SettingField
              label="Mode maintenance"
              description="Active le mode maintenance pour tous les utilisateurs sauf les administrateurs"
              type="toggle"
              value={settings.maintenance_mode}
              onChange={(value) => setSettings(prev => ({ ...prev, maintenance_mode: value }))}
            />
          </div>
        );

      case 'contact':
        return (
          <div>
            <SettingField
              label="Email de contact"
              type="email"
              value={settings.contact_email}
              onChange={(value) => setSettings(prev => ({ ...prev, contact_email: value }))}
            />
            <SettingField
              label="Téléphone"
              value={settings.contact_phone}
              onChange={(value) => setSettings(prev => ({ ...prev, contact_phone: value }))}
            />
            <SettingField
              label="WhatsApp Business"
              value={settings.whatsapp_number}
              onChange={(value) => setSettings(prev => ({ ...prev, whatsapp_number: value }))}
            />
            <SettingField
              label="Adresse physique"
              type="textarea"
              value={settings.address}
              onChange={(value) => setSettings(prev => ({ ...prev, address: value }))}
            />
          </div>
        );

      case 'currency':
        return (
          <div>
            <SettingField
              label="Taux EUR → FCFA"
              description="Taux de conversion automatique (mise à jour quotidienne recommandée)"
              type="number"
              value={settings.currency_eur_fcfa}
              onChange={(value) => setSettings(prev => ({ ...prev, currency_eur_fcfa: value }))}
            />
            <SettingField
              label="Afficher les deux devises"
              description="Affiche les prix en EUR et FCFA simultanément"
              type="toggle"
              value={settings.currency_display_both}
              onChange={(value) => setSettings(prev => ({ ...prev, currency_display_both: value }))}
            />
            <SettingField
              label="Devise par défaut"
              type="select"
              options={[
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'FCFA', label: 'Franc CFA (FCFA)' }
              ]}
              value={settings.default_currency}
              onChange={(value) => setSettings(prev => ({ ...prev, default_currency: value }))}
            />
          </div>
        );

      case 'limits':
        return (
          <div>
            <SettingField
              label="Images max par propriété"
              type="number"
              value={settings.max_images_per_property}
              onChange={(value) => setSettings(prev => ({ ...prev, max_images_per_property: value }))}
            />
            <SettingField
              label="Propriétés max par agent"
              type="number"
              value={settings.max_properties_per_agent}
              onChange={(value) => setSettings(prev => ({ ...prev, max_properties_per_agent: value }))}
            />
            <SettingField
              label="Favoris max par utilisateur"
              type="number"
              value={settings.max_favorites_per_user}
              onChange={(value) => setSettings(prev => ({ ...prev, max_favorites_per_user: value }))}
            />
            <SettingField
              label="Timeout session (minutes)"
              type="number"
              value={settings.session_timeout}
              onChange={(value) => setSettings(prev => ({ ...prev, session_timeout: value }))}
            />
          </div>
        );

      case 'notifications':
        return (
          <div>
            <SettingField
              label="Notifications email"
              type="toggle"
              value={settings.email_notifications}
              onChange={(value) => setSettings(prev => ({ ...prev, email_notifications: value }))}
            />
            <SettingField
              label="Notifications SMS"
              type="toggle"
              value={settings.sms_notifications}
              onChange={(value) => setSettings(prev => ({ ...prev, sms_notifications: value }))}
            />
            <SettingField
              label="Notifications push"
              type="toggle"
              value={settings.push_notifications}
              onChange={(value) => setSettings(prev => ({ ...prev, push_notifications: value }))}
            />
            <SettingField
              label="Notifications admin"
              description="Recevoir les notifications importantes par email"
              type="toggle"
              value={settings.admin_notifications}
              onChange={(value) => setSettings(prev => ({ ...prev, admin_notifications: value }))}
            />
          </div>
        );

      case 'seo':
        return (
          <div>
            <SettingField
              label="Titre meta"
              value={settings.meta_title}
              onChange={(value) => setSettings(prev => ({ ...prev, meta_title: value }))}
            />
            <SettingField
              label="Description meta"
              type="textarea"
              value={settings.meta_description}
              onChange={(value) => setSettings(prev => ({ ...prev, meta_description: value }))}
            />
            <SettingField
              label="Mots-clés meta"
              description="Séparer par des virgules"
              value={settings.meta_keywords}
              onChange={(value) => setSettings(prev => ({ ...prev, meta_keywords: value }))}
            />
            <SettingField
              label="Google Analytics ID"
              value={settings.google_analytics_id}
              onChange={(value) => setSettings(prev => ({ ...prev, google_analytics_id: value }))}
            />
            <SettingField
              label="Facebook Pixel ID"
              value={settings.facebook_pixel_id}
              onChange={(value) => setSettings(prev => ({ ...prev, facebook_pixel_id: value }))}
            />
          </div>
        );

      case 'performance':
        return (
          <div>
            <SettingField
              label="Durée cache (secondes)"
              type="number"
              value={settings.cache_duration}
              onChange={(value) => setSettings(prev => ({ ...prev, cache_duration: value }))}
            />
            <SettingField
              label="Utilisateurs max simultanés"
              type="number"
              value={settings.max_concurrent_users}
              onChange={(value) => setSettings(prev => ({ ...prev, max_concurrent_users: value }))}
            />
            <SettingField
              label="Limite API (req/min)"
              type="number"
              value={settings.api_rate_limit}
              onChange={(value) => setSettings(prev => ({ ...prev, api_rate_limit: value }))}
            />
            <SettingField
              label="Compression images (%)"
              description="Qualité de compression des images uploadées"
              type="number"
              value={settings.image_compression}
              onChange={(value) => setSettings(prev => ({ ...prev, image_compression: value }))}
            />
          </div>
        );

      case 'security':
        return (
          <div>
            <SettingField
              label="Longueur min mot de passe"
              type="number"
              value={settings.password_min_length}
              onChange={(value) => setSettings(prev => ({ ...prev, password_min_length: value }))}
            />
            <SettingField
              label="Tentatives connexion max"
              type="number"
              value={settings.login_attempts}
              onChange={(value) => setSettings(prev => ({ ...prev, login_attempts: value }))}
            />
            <SettingField
              label="Durée blocage compte (min)"
              type="number"
              value={settings.account_lockout_duration}
              onChange={(value) => setSettings(prev => ({ ...prev, account_lockout_duration: value }))}
            />
            <SettingField
              label="Authentification à 2 facteurs"
              description="Activer 2FA obligatoire pour les administrateurs"
              type="toggle"
              value={settings.two_factor_auth}
              onChange={(value) => setSettings(prev => ({ ...prev, two_factor_auth: value }))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres Système</h1>
          <p className="text-gray-600">Configuration générale de la plateforme</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
          <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations Système</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">Version BENSO</p>
            <p className="text-lg font-medium">v1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Base de données</p>
            <p className="text-lg font-medium">MySQL 8.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dernière sauvegarde</p>
            <p className="text-lg font-medium">Aujourd'hui à 02:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;