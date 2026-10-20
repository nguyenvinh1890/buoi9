import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import theme from './src/styles/theme';
import LoginScreen from './src/screens/LoginScreen';
import ListScreen from './src/screens/ListScreen';

/**
 * Main Application Component - Lab 04
 * Manages screen navigation state between LoginScreen and ListScreen.
 */
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View style={styles.container}>
        {currentUser ? (
          <ListScreen user={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
