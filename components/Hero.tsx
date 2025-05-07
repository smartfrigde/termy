import { ThemedText } from '@/components/ThemedText';
import { selectUser } from '@/core/slices/authSlice';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HelloWave } from './HelloWave';
import { ThemedView } from './ThemedView';

export function Hero() {
   const user = useSelector(selectUser);
   console.log(user);
  return (
    <>
    <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome {user.name ?? 'user'}</ThemedText>
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
