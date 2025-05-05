import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { HelloWave } from './HelloWave';
import { ThemedView } from './ThemedView';

export function Hero() {
  return (
    <>
    <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome user</ThemedText>
          <HelloWave />
      </ThemedView>
      
    </>
  );
}
// <ThemedText type="subtitle">Start by creating a server</ThemedText>
const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        gap: 8,
      },
});
