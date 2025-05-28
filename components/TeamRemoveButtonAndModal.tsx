import { removeTeam } from "@/core/slices/teamSlice";
import type { AppDispatch } from "@/core/store";
import { deleteTeam } from "@/core/teamManager";
import { Octicons } from "@expo/vector-icons";
import type React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import { ThemedView } from "./ThemedView";

interface TeamRemoveButtonAndModalProps {
    teamId: number;
}

const TeamRemoveButtonAndModal: React.FC<TeamRemoveButtonAndModalProps> = ({ teamId }) => {
    const [isShowConfirmWindow, setConfirmWindow] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const colorScheme = useColorScheme();
    const isLightTheme = colorScheme === "light";

    const styles = isLightTheme ? lightStyles : darkStyles;

    const handleDeletePress = () => {
        setConfirmWindow(true);
    };

    const handleConfirmDelete = async () => {
        const response = await deleteTeam(teamId);

        if (response !== null) {
            dispatch(removeTeam(teamId));
        }

        setConfirmWindow(false);
    };

    const handleCancel = () => {
        setConfirmWindow(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                <Octicons name="trash" size={16} color={isLightTheme ? "#d32f2f" : "red"} />
                <Text style={styles.deleteText}>Delete team</Text>
            </TouchableOpacity>

            <Modal visible={isShowConfirmWindow} transparent animationType="fade" onRequestClose={handleCancel}>
                <View style={styles.modalOverlay}>
                    <ThemedView style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete this team?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleConfirmDelete} style={styles.confirmButton}>
                                <Text style={styles.confirmText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                                <Text style={styles.cancelText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </ThemedView>
                </View>
            </Modal>
        </View>
    );
};

const commonButtonPadding = {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
};

const lightStyles = StyleSheet.create({
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#d32f2f",
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    deleteText: {
        marginLeft: 4,
        color: "#d32f2f",
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 8,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalText: {
        color: "#333",
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
    },
    confirmButton: {
        ...commonButtonPadding,
        marginRight: 8,
        backgroundColor: "#d32f2f",
    },
    confirmText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    cancelButton: {
        ...commonButtonPadding,
        backgroundColor: "#e0e0e0",
    },
    cancelText: {
        color: "#333",
        fontWeight: "600",
        fontSize: 14,
    },
});

const darkStyles = StyleSheet.create({
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: "#2a2a2a",
    },
    deleteText: {
        marginLeft: 4,
        color: "red",
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#1e1e1e",
        padding: 16,
        borderRadius: 8,
        width: "80%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 5,
    },
    modalText: {
        color: "#eaeaea",
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
    },
    confirmButton: {
        ...commonButtonPadding,
        marginRight: 8,
        backgroundColor: "#ff4444",
    },
    confirmText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    cancelButton: {
        ...commonButtonPadding,
        backgroundColor: "#555",
    },
    cancelText: {
        color: "#ccc",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default TeamRemoveButtonAndModal;
