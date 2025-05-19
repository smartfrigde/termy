import { ThemedText } from "@/components/ThemedText";
import { removeServer } from "@/core/slices/sshSlice";
import { deleteServer } from "@/core/sshManager";
import type { ServerType } from "@/types/Server";
import { Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, { type SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { EditServerModal } from "./EditServerModal";
import { ThemedView } from "./ThemedView";
import TerminalModal from "./terminal/Terminal";
function RightAction(
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    item: ServerType,
    setEditModalVisible: (e: boolean) => void,
) {
    const dispatch = useDispatch();

    const handleDelete = () => {
        deleteServer(item.id!).then((response) => {
            if (response.status === 200) {
                console.log("Server deleted", item);
                dispatch(removeServer(item.id!));
            }
        });
    };
    const handleEdit = () => {
        setEditModalVisible(true);
    };
    const styleAnimation = useAnimatedStyle(() => {
        // console.log('showRightProgress:', prog.value);
        // console.log('appliedTranslation:', drag.value);

        return {
            transform: [{ translateX: drag.value + 200 }],
        };
    });
    return (
        <>
            <Reanimated.View style={styleAnimation}>
                <Pressable style={styles.removeAction} onPress={handleDelete}>
                    <Octicons name="trash" size={24} color="white" />
                </Pressable>
            </Reanimated.View>
            <Reanimated.View style={styleAnimation}>
                <Pressable style={styles.editAction} onPress={handleEdit}>
                    <Octicons name="pencil" size={24} color="white" />
                </Pressable>
            </Reanimated.View>
        </>
    );
}
export const ServerItem = ({ item }: { item: ServerType }) => {
    const [terminalModalVisible, setTerminalModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const connect = () => {
        setTerminalModalVisible(true);
        console.log("Connecting to server", item);
    };

    return (
        <>
            <ReanimatedSwipeable
                containerStyle={styles.serverItem}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={(progress, dragX) => RightAction(progress, dragX, item, setEditModalVisible)}
            >
                <ThemedView style={styles.flexContainer}>
                    <TouchableOpacity style={styles.connectButton} onPress={connect}>
                        <Octicons name="link" size={24} color="white" />
                    </TouchableOpacity>
                    <ThemedText type="title">{item.name}</ThemedText>
                </ThemedView>
            </ReanimatedSwipeable>
            <TerminalModal server={item} visible={terminalModalVisible} setVisible={setTerminalModalVisible} />
            <EditServerModal item={item} setModalVisible={setEditModalVisible} modalVisible={editModalVisible} />
        </>
    );
};

const styles = StyleSheet.create({
    serverItem: {
        flex: 1, // Allow items to stretch and fill available space
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        display: "flex",
        backgroundColor: "#121212",
        borderRadius: 20,
        width: "100%",
        height: "100%",
        margin: 5, // Add margin between items
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    serverListContainer: {
        flex: 1,
        padding: 10, // Adjust padding for the container
    },
    flexContainer: {
        backgroundColor: "#121212",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    removeAction: {
        width: 100,
        height: "100%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    editAction: {
        width: 100,
        height: "100%",
        backgroundColor: "#f28f0c",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    floatingButton: {
        zIndex: 1,
        backgroundColor: "#007AFF",
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

    connectButton: {
        backgroundColor: "#2e272d",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        left: 0,
    },
});
