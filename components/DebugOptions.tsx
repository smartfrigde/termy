import { ThemedText } from '@/components/ThemedText';
import { getCurrentUser } from '@/core/loginManager';
import { router } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';
import GradientButton from './GradientButton';
import { ThemedView } from './ThemedView';

export async function DebugOptions() {
    function logout() {
        Alert.alert("You have been logged out")
        router.navigate("/(auth)")
        logout();
    }
    const user = await getCurrentUser();
    return (
        <ThemedView style={styles.debugContainer}>
            <ThemedText type="subtitle">Ultra scary debug menu!</ThemedText>
            <ThemedText style={styles.text}>{JSON.stringify(user)}</ThemedText>
            <GradientButton style={styles.button} onPress={logout} title="Logout" />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    debugContainer: {
        padding: 30,
        height: '100%',
        alignItems: 'center',
    },
    button: {
        margin: 100,
        height: 50,
    },
    text: {
        padding: 50,
    }
});
