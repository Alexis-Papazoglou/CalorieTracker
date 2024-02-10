import React from 'react';
import Navigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="dark" />
    </>
  );
}