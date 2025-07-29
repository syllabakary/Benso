import React, { useState, useEffect } from 'react';
import { Bell, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Alert, SearchFilters } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface AlertManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertManager({ isOpen, onClose }: AlertManagerProps) {
  const [alerts, setAlerts] = useLocalStorage<Alert[]>('benso_alerts', []);
  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    priceMin: '',
    priceMax: '',
    city: '',
    type: [] as string[],
    frequency: 'daily' as 'instant' | 'daily' | 'weekly'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: SearchFilters = {
      priceMin: formData.priceMin ? Number(formData.priceMin) : undefined,
      priceMax: formData.priceMax ? Number(formData.priceMax) : undefined,
      city: formData.city || undefined,
      type: formData.type.length > 0 ? formData.type as any : undefined
    };

    const newAlert: Alert = {
      id: editingAlert?.id || Date.now().toString(),
      userId: 'current-user-id',
      name: formData.name,
      filters,
      active: true,
      frequency: formData.frequency,
      matchCount: 0,
      createdAt: editingAlert?.createdAt || new Date()
    };

    if (editingAlert) {
      setAlerts(prev => prev.map(alert => alert.id === editingAlert.id ? newAlert : alert));
    } else {
      setAlerts(prev => [...prev, newAlert]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      priceMin: '',
      priceMax: '',
      city: '',
      type: [],
      frequency: 'daily'
    });
    setShowForm(false);
    setEditingAlert(null);
  };

  const handleEdit = (alert: Alert) => {
    setEditingAlert(alert);
    setFormData({
      name: alert.name,
      priceMin: alert.filters.priceMin?.toString() || '',
      priceMax: alert.filters.priceMax?.toString() || '',
      city: alert.filters.city || '',
      type: alert.filters.type || [],
      frequency: alert.frequency
    });
    setShowForm(true);
  };

  const handleDelete = (alertId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette alerte ?')) {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    }
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Mes alertes</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>

        <div className="p-6">
          {!showForm ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Recevez des notifications quand de nouveaux biens correspondent à vos critères
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-500 hover:to-orange-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle alerte</span>
                </button>
              </div>

              <div className="space-y-4">
                {alerts.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte</h3>
                    <p className="text-gray-600">Créez votre première alerte pour être notifié des nouveaux biens</p>
                  </div>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{alert.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              alert.active 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {alert.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          <div className="text-sm text-gray-600 space-y-1">
                            {alert.filters.city && (
                              <p>📍 Ville: {alert.filters.city}</p>
                            )}
                            {(alert.filters.priceMin || alert.filters.priceMax) && (
                              <p>💰 Prix: {alert.filters.priceMin || 0}€ - {alert.filters.priceMax || '∞'}€</p>
                            )}
                            {alert.filters.type && alert.filters.type.length > 0 && (
                              <p>🏠 Types: {alert.filters.type.join(', ')}</p>
                            )}
                            <p>🔔 Fréquence: {
                              alert.frequency === 'instant' ? 'Instantané' :
                              alert.frequency === 'daily' ? 'Quotidien' : 'Hebdomadaire'
                            }</p>
                            <p>📊 {alert.matchCount} biens correspondent</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAlert(alert.id)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              alert.active
                                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {alert.active ? 'Désactiver' : 'Activer'}
                          </button>
                          <button
                            onClick={() => handleEdit(alert)}
                            className="p-2 text-gray-400 hover:text-orange-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(alert.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingAlert ? 'Modifier l\'alerte' : 'Nouvelle alerte'}
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'alerte
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Ex: Appartement 2 pièces Paris"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix minimum (€)
                  </label>
                  <input
                    type="number"
                    value={formData.priceMin}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceMin: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix maximum (€)
                  </label>
                  <input
                    type="number"
                    value={formData.priceMax}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceMax: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="Paris, Lyon, Marseille..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence des notifications
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="instant">Instantané</option>
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700"
                >
                  {editingAlert ? 'Modifier' : 'Créer'} l'alerte
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}