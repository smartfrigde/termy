import { ThemedText } from '@/components/ThemedText';
import { getCurrentUser } from '@/core/loginManager';
import { StyleSheet } from 'react-native';
import { HelloWave } from './HelloWave';
import { ThemedView } from './ThemedView';

export async function Hero() {
    const user = await getCurrentUser();
  return (
    <>
    <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome {user?.name ?? 'user'}</ThemedText>
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
        paddingTop: 20,
        gap: 8,
      },
});
