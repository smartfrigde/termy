import isMobile from "@/constants/isMobile";
import { Modal, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { GenerateKeyView } from "./modalViews/GenerateKeyView";

interface GenerateKeyModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
    refresh: () => void;
}

export function GenerateKeyModal({ modalVisible, setModalVisible, refresh }: GenerateKeyModalProps) {
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
                        <GenerateKeyView refresh={refresh} setModalVisible={setModalVisible} />
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
