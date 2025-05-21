import { GenerateKeyModal } from "@/components/GenerateKeyModal";
import { ThemedView } from "@/components/ThemedView";
import { Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const KeychainScreen = () => {
    const [generateModalVisible, setGenerateModalVisible] = useState(false);
    function createKey() {
        setGenerateModalVisible(true);
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
            <GenerateKeyModal modalVisible={generateModalVisible} setModalVisible={setGenerateModalVisible} />
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
