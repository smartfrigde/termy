import { ThemedView } from "@/components/ThemedView";
import { Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { generateKeyPair } from "web-ssh-keygen";
const KeychainScreen = () => {
    function createKey() {
        console.log(
            generateKeyPair({
                alg: "RSASSA-PKCS1-v1_5",
                size: 2048,
                hash: "SHA-256",
                name: "MyKey",
            }),
        );
    }
    return (
        <ThemedView
            style={[
                styles.container,
                {
                    flexDirection: "row",
                },
            ]}
        >
            <Stack.Screen options={{ title: "Keychain" }} />
            <TouchableOpacity onPress={createKey} style={styles.floatingButton}>
                <Octicons name="key" size={24} color="white" />
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButton: {
        zIndex: 1,
        backgroundColor: "#442a00",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 30,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default KeychainScreen;
