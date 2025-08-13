import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}

export default App;