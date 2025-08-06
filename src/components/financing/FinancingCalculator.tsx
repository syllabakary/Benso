import React, { useState, useEffect } from 'react';
import { Calculator, Euro, TrendingUp, FileText, Phone } from 'lucide-react';

interface FinancingCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  propertyPrice?: number;
}

export default function FinancingCalculator({ isOpen, onClose, propertyPrice = 0 }: FinancingCalculatorProps) {
  const [formData, setFormData] = useState({
    propertyPrice: propertyPrice || 300000,
    downPayment: propertyPrice ? Math.round(propertyPrice * 0.2) : 60000,
    loanTerm: 20,
    interestRate: 3.5,
    insurance: true,
    notaryFees: true
  });

  const [simulation, setSimulation] = useState<any>(null);

  // Move calculateSimulation above its usage
  function calculateSimulation() {
    const loanAmount = formData.propertyPrice - formData.downPayment;
    const monthlyRate = formData.interestRate / 100 / 12;
    const numberOfPayments = formData.loanTerm * 12;

    const monthlyPayment = loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
    const totalCost = formData.propertyPrice + totalInterest;

    const insuranceCost = formData.insurance ? monthlyPayment * 0.036 : 0;
    const notaryFees = formData.notaryFees ? formData.propertyPrice * 0.08 : 0;

    setSimulation({
      loanAmount,
      monthlyPayment: monthlyPayment + insuranceCost,
      totalInterest,
      totalCost: totalCost + notaryFees,
      insuranceCost,
      notaryFees,
      totalMonthlyPayment: monthlyPayment + insuranceCost
    });
  }

  useEffect(() => {
    calculateSimulation();
  }, [formData]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Calculator className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Simulateur de Financement</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Paramètres du prêt</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix du bien (€)
                </label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={formData.propertyPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  step="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apport personnel (€)
                </label>
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  step="1000"
                />
                <div className="mt-1 text-sm text-gray-500">
                  {((formData.downPayment / formData.propertyPrice) * 100).toFixed(1)}% du prix
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée (années)
                  </label>
                  <input
                    type="number"
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    min="5"
                    max="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux d'intérêt (%)
                  </label>
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    step="0.1"
                    min="0.1"
                    max="10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Assurance emprunteur (0.36%)</span>
                </label>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="notaryFees"
                    checked={formData.notaryFees}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">Frais de notaire (8%)</span>
                </label>
              </div>
            </div>

            {/* Résultats */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Résultats de la simulation</h3>
              {simulation && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Montant du prêt :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.loanAmount.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Mensualité :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.monthlyPayment.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Coût total du crédit :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.totalCost.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Coût de l'assurance :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.insuranceCost.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Frais de notaire :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.notaryFees.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Mensualité totale :</span>
                    <span className="text-lg font-semibold text-gray-900">{simulation.totalMonthlyPayment.toLocaleString()} €</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}