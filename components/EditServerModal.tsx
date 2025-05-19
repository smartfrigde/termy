import isMobile from "@/constants/isMobile";
import type { ServerType } from "@/types/Server";
import { Modal, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { EditServerView } from "./modalViews/EditServerView";

interface EditServerModalProps {
    item: ServerType;
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function EditServerModal({ item, modalVisible, setModalVisible }: EditServerModalProps) {
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <EditServerView item={item} setModalVisible={setModalVisible} />
                    </ThemedView>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 10,
        borderRadius: 20,
        padding: 20,
        width: isMobile() ? "90%" : "60%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
