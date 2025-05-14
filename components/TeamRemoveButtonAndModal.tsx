import { removeTeam } from "@/core/slices/teamSlice";
import type { AppDispatch } from "@/core/store";
import { deleteTeam } from "@/core/teamManager";
import { Octicons } from "@expo/vector-icons";
import type React from "react";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ThemedView } from "./ThemedView";

interface TeamRemoveButtonAndModalProps {
    teamId: number;
}

const TeamRemoveButtonAndModal: React.FC<TeamRemoveButtonAndModalProps> = ({ teamId }) => {
    const [isShowConfirmWindow, setConfirmWindow] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDeletePress = () => {
        setConfirmWindow(true);
    };

    const handleConfirmDelete = async () => {
        const reponse = await deleteTeam(teamId);

        if (reponse !== null) {
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
                <Octicons name="trash" size={16} color="red" />
                <Text style={styles.deleteText}>Delete team</Text>
            </TouchableOpacity>

            <Modal visible={isShowConfirmWindow} transparent animationType="fade" onRequestClose={handleCancel}>
                <View style={styles.modalOverlay}>
                    <ThemedView style={styles.modalContent}>
                        <Text>Are you sure you want to delete this team?</Text>
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

const styles = StyleSheet.create({
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderWidth: 2,
        borderColor: "red",
        borderStyle: "solid",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        transitionDuration: "0.25s",
        justifyContent: "center",
    },
    deleteText: {
        marginLeft: 4,
        color: "red",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        width: "80%",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
    },
    confirmButton: {
        marginRight: 8,
    },
    confirmText: {
        color: "red",
    },
    cancelButton: {},
    cancelText: {
        color: "blue",
    },
});

export default TeamRemoveButtonAndModal;
