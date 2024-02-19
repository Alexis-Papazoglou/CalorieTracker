// App.tsx
import React from 'react';
import Navigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from './Context/ContextProvider';
import { useAuth } from './hooks/useAuth';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import LoadingScreen from './src/components/LoadingScreen';

export default function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {auth.initializing ? (
        <LoadingScreen />
      ) : auth.user ? (
        <Navigation />
      ) : (
        <SignInScreen />
      )}
      <StatusBar style="dark" />
    </AuthContext.Provider>
  );
}