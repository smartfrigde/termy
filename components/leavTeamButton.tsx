import type React from "react";
import { TouchableOpacity, Text, StyleSheet, useColorScheme, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LeaveTeamButtonProps {
    onLeaveTeam: () => void;
    disabled?: boolean;
}

export const LeaveTeamButton: React.FC<LeaveTeamButtonProps> = ({ onLeaveTeam, disabled }) => {
    const colorScheme = useColorScheme();
    const isLightTheme = colorScheme === "light";
    const styles = isLightTheme ? lightStyles : darkStyles;

    return (
        <TouchableOpacity
            onPress={onLeaveTeam}
            disabled={disabled}
            style={[styles.button, disabled && styles.disabledButton]}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <Ionicons name="exit-outline" size={20} color={isLightTheme ? "#fff" : "#fff"} />
                <Text style={styles.buttonText}>Opuszczam team</Text>
            </View>
        </TouchableOpacity>
    );
};

const lightStyles = StyleSheet.create({
    button: {
        backgroundColor: "#d9534f", 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: "#b23b3b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },
    disabledButton: {
        backgroundColor: "#f5b7b1",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 8,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
});

const darkStyles = StyleSheet.create({
    button: {
        backgroundColor: "#c0392b",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        shadowColor: "#7b241c",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
    },
    disabledButton: {
        backgroundColor: "#922b21",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
        marginLeft: 8,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
});