// App.tsx
import React from 'react';
import Navigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from './Context/ContextProvider';
import { useAuth } from './hooks/useAuth';
import LoadingScreen from './src/components/LoadingScreen';

export default function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {auth.initializing ? (
        <LoadingScreen />
      ) : (
        <Navigation />
      )}
      <StatusBar style="dark" />
    </AuthContext.Provider>
  );
}