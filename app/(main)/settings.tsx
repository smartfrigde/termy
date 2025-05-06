import { Alert, SafeAreaView, StyleSheet } from 'react-native';

import GradientButton from '@/components/GradientButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function SettingsScreen() {
  function logout() {
    Alert.alert("You have been logged out")
    router.navigate("/(auth)")
    logout();
  }
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <ThemedView style={styles.debugContainer}>
        <ThemedText type="subtitle">Ultra scary debug menu!</ThemedText>
        <GradientButton style={styles.button} onPress={logout} title="Logout"/>
      </ThemedView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  debugContainer: {
    padding: 20,
    height: '100%',
    alignItems: 'center',
  },
  button: {
    margin: 100,
    height: 50,
  },
});
