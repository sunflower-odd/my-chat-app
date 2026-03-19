// src/App.tsx
import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import AuthForm from './components/auth/AuthForm';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (credentials: string, scope: string) => {
    console.log('Вошли с:', credentials, scope);
    setLoggedIn(true);
  };

  return loggedIn ? (
    <AppLayout />
  ) : (
    <AuthForm onLogin={handleLogin} />
  );
};

export default App;