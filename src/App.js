
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { ClerkProvider } from './context/ClerkProvider';
import RootNavigator from './navigation/RootNavigator';
import { View, Text, Alert } from 'react-native';

// Add a dev script for running the app - this helps with Lovable builds
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  
  // Show navigation instructions for easier debugging
  setTimeout(() => {
    Alert.alert(
      "Development Mode",
      "IMPORTANT: Please add a 'build:dev' script to your package.json file with the following command: 'vite build --mode development'",
      [{ text: "OK", onPress: () => console.log("Alert closed") }]
    );
  }, 2000);
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ClerkProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </ClerkProvider>
    </I18nextProvider>
  );
}
