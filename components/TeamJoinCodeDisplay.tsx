import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import type React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

interface JoinCodeProps {
    joinCode: string;
}

export const JoinCodeDisplay: React.FC<JoinCodeProps> = ({ joinCode }) => {
    const [isCopied, setIsCopied] = useState(false);
    const colorScheme = useColorScheme();
    const isLightTheme = colorScheme === "light";

    const styles = isLightTheme ? lightStyles : darkStyles;

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(joinCode);
        setIsCopied(true);
        Alert.alert("Skopiowano!", "Kod został skopiowany do schowka!");
        setTimeout(() => setIsCopied(false), 2000); // Resetuj stan po 2 sekundach
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Twój kod:</Text>
            <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{joinCode}</Text>
                <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                    <Ionicons
                        name={isCopied ? "checkmark-circle-outline" : "copy-outline"}
                        size={24}
                        color={isCopied ? "#4CAF50" : isLightTheme ? "#000" : "#fff"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        color: "#555",
        fontSize: 16,
        marginBottom: 10,
    },
    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eee",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    codeText: {
        color: "#222",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1.2,
    },
    copyButton: {
        marginLeft: 10,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

const darkStyles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1a1a",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    label: {
        color: "#aaa",
        fontSize: 16,
        marginBottom: 10,
    },
    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    codeText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1.2,
    },
    copyButton: {
        marginLeft: 10,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});