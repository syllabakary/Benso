import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  currency: 'FCFA' | 'EUR';
  setCurrency: (currency: 'FCFA' | 'EUR') => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<'FCFA' | 'EUR'>('EUR');
  
  // Taux de change approximatif : 1 EUR = 656 FCFA
  const exchangeRate = 656;

  const convertPrice = (price: number): number => {
    if (currency === 'FCFA') {
      return Math.round(price * exchangeRate);
    }
    return price;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    if (currency === 'FCFA') {
      return `${convertedPrice.toLocaleString()} FCFA`;
    }
    return `${convertedPrice.toLocaleString()}€`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setCurrency('EUR')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          currency === 'EUR'
            ? 'bg-orange-500 text-white'
            : 'text-gray-600 hover:text-orange-500'
        }`}
      >
        EUR
      </button>
      <button
        onClick={() => setCurrency('FCFA')}
        className={`px-3 py-1 text-sm font-medium transition-colors ${
          currency === 'FCFA'
            ? 'bg-orange-500 text-white'
            : 'text-gray-600 hover:text-orange-500'
        }`}
      >
        FCFA
      </button>
    </div>
  );
};

export default CurrencyToggle;