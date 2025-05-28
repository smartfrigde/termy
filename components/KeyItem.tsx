import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { deleteKey } from "@/core/keyManager";
import { removeKey } from "@/core/slices/sshSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { KeyType } from "@/types/Key";
import { Octicons } from "@expo/vector-icons";
import { ContextMenuContent } from "@radix-ui/react-context-menu";
import { Clipboard, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import {
    ContextMenuItem,
    ContextMenuItemIcon,
    ContextMenuItemTitle,
    ContextMenuRoot,
    ContextMenuTrigger,
} from "./ui/ContextMenu";
export const KeyItem = ({ item }: { item: KeyType }) => {
    const itemColor = useThemeColor({}, "itemColor");
    const dispatch = useDispatch();

    const connect = () => {
        console.log(item);
    };
    const handleDelete = () => {
        deleteKey(item.id!).then((response) => {
            if (response.status === 200) {
                console.log("Key deleted", item);
                dispatch(removeKey(item.id!));
            }
        });
    };
    const handleCopyPublicKey = () => {
        Clipboard.setString(item.public_key);
    };
    const handleCopyPrivateKey = () => {
        Clipboard.setString(item.private_key);
    };
    return (
        <>
            <ContextMenuRoot>
                <ContextMenuTrigger style={{ flex: 1, height: "100%", width: "100%" }}>
                    <ThemedView style={[styles.serverItem, { backgroundColor: itemColor }]}>
                        <TouchableOpacity style={styles.connectButton} onPress={connect}>
                            <Octicons name="key" size={24} color="white" />
                        </TouchableOpacity>
                        <ThemedText type="title">{item.name}</ThemedText>
                    </ThemedView>
                </ContextMenuTrigger>
                <ContextMenuContent
                    style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                        backgroundColor: itemColor,
                        borderRadius: 20,
                        padding: 10,
                        zIndex: 999999,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ContextMenuItem key="edit">
                        <ContextMenuItemTitle>Change name</ContextMenuItemTitle>
                        <ContextMenuItemIcon>
                            <Octicons name="pencil" size={16} color="white" />
                        </ContextMenuItemIcon>
                    </ContextMenuItem>
                    <ContextMenuItem key="publicKey" onSelect={handleCopyPublicKey}>
                        <ContextMenuItemTitle>Copy public key</ContextMenuItemTitle>
                        <ContextMenuItemIcon>
                            <Octicons name="key" size={16} color="white" />
                        </ContextMenuItemIcon>
                    </ContextMenuItem>
                    <ContextMenuItem key="privateKey" onSelect={handleCopyPrivateKey}>
                        <ContextMenuItemTitle>Copy private key</ContextMenuItemTitle>
                        <ContextMenuItemIcon>
                            <Octicons name="key" size={16} color="white" />
                        </ContextMenuItemIcon>
                    </ContextMenuItem>
                    <ContextMenuItem key="delete" onSelect={handleDelete}>
                        <ContextMenuItemTitle>Delete</ContextMenuItemTitle>
                        <ContextMenuItemIcon>
                            <Octicons name="trash" size={16} color="white" />
                        </ContextMenuItemIcon>
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenuRoot>
        </>
    );
};

const styles = StyleSheet.create({
    serverItem: {
        flex: 1, // Allow items to stretch and fill available space
        minWidth: "45%", // Ensure a minimum width for each item
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
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
    },

    editButton: {
        backgroundColor: "#272c2e",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        width: 60,
        height: 60,
        borderRadius: 10,
    },
});
