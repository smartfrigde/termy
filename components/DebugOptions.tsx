import { ThemedText } from "@/components/ThemedText";
import { logout, selectUser } from "@/core/slices/authSlice";
import { router } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GradientButton from "./GradientButton";
import { ThemedView } from "./ThemedView";

export async function DebugOptions() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    function backToAuth() {
        Alert.alert("You have been logged out");
        dispatch(logout());
        router.replace("/(auth)");
    }
    return (
        <ThemedView style={styles.debugContainer}>
            <ThemedText type="subtitle">Ultra scary debug menu!</ThemedText>
            <ThemedText style={styles.text}>{JSON.stringify(user)}</ThemedText>
            <GradientButton style={styles.button} onPress={backToAuth} title="Logout" />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    debugContainer: {
        padding: 30,
        height: "100%",
        alignItems: "center",
    },
    button: {
        margin: 100,
        height: 50,
    },
    text: {
        padding: 50,
    },
});
