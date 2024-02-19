// LoadingScreen.tsx
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}