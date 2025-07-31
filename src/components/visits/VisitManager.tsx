import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, X, AlertCircle } from 'lucide-react';
import { Visit, Property } from '../../types';

interface VisitManagerProps {
  visits: Visit[];
  properties: Property[];
  onUpdateVisit: (visitId: string, status: Visit['status']) => void;
}

export default function VisitManager({ visits, properties, onUpdateVisit }: VisitManagerProps) {
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getStatusColor = (status: Visit['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: Visit['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'completed': return 'Terminée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const pendingVisits = visits.filter(v => v.status === 'pending');
  const confirmedVisits = visits.filter(v => v.status === 'confirmed');
  const completedVisits = visits.filter(v => v.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-900">{pendingVisits.length}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Confirmées</p>
              <p className="text-2xl font-bold text-green-900">{confirmedVisits.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Terminées</p>
              <p className="text-2xl font-bold text-blue-900">{completedVisits.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Total</p>
              <p className="text-2xl font-bold text-orange-900">{visits.length}</p>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Visits List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Demandes de visite</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {visits.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande de visite</h3>
              <p className="text-gray-600">Les demandes de visite apparaîtront ici</p>
            </div>
          ) : (
            visits.map((visit) => {
              const property = getProperty(visit.propertyId);
              if (!property) return null;
              
              return (
                <div key={visit.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{property.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(visit.status)}`}>
                          {getStatusLabel(visit.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{property.address.street}, {property.address.city}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {visit.scheduledDate.toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            {visit.scheduledDate.toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>Locataire intéressé</span>
                        </div>
                      </div>
                      
                      {visit.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{visit.notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {visit.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onUpdateVisit(visit.id, 'confirmed')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => onUpdateVisit(visit.id, 'cancelled')}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                          >
                            Refuser
                          </button>
                        </>
                      )}
                      
                      {visit.status === 'confirmed' && (
                        <button
                          onClick={() => onUpdateVisit(visit.id, 'completed')}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Marquer terminée
                        </button>
                      )}
                      
                      <button
                        onClick={() => setSelectedVisit(visit)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Visit Detail Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Détails de la visite</h2>
              <button
                onClick={() => setSelectedVisit(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Property Info */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {getProperty(selectedVisit.propertyId)?.title}
                </h3>
                <p className="text-gray-600">
                  {getProperty(selectedVisit.propertyId)?.address.street}, {getProperty(selectedVisit.propertyId)?.address.city}
                </p>
              </div>
              
              {/* Visit Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {selectedVisit.scheduledDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      {selectedVisit.scheduledDate.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedVisit.status)}`}>
                  {getStatusLabel(selectedVisit.status)}
                </span>
              </div>
              
              {/* Notes */}
              {selectedVisit.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message du visiteur</label>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700">{selectedVisit.notes}</p>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              {selectedVisit.status === 'pending' && (
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      onUpdateVisit(selectedVisit.id, 'confirmed');
                      setSelectedVisit(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirmer la visite
                  </button>
                  <button
                    onClick={() => {
                      onUpdateVisit(selectedVisit.id, 'cancelled');
                      setSelectedVisit(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Refuser la visite
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}