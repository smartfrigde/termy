import { ThemedText } from "@/components/ThemedText";
import isMobile from "@/constants/isMobile";
import { editServer } from "@/core/sshManager";
import type { ServerType } from "@/types/Server";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedTextInput } from "../ThemedTextInput";
interface EditServerViewProps {
    item: ServerType;
    setModalVisible: (e: boolean) => void;
}
export function EditServerView({ item, setModalVisible }: EditServerViewProps) {
    const [serverName, setServerName] = useState(item.name);
    const [serverAddress, setServerAdress] = useState(item.hostname);
    const [serverPort, setServerPort] = useState(item.port);
    const [serverPassword, setServerPassword] = useState(item.password);
    const [serverUsername, setServerUsername] = useState(item.login);
    const edit = () => {
        const server = {
            name: serverName,
            hostname: serverAddress,
            port: serverPort,
            password: serverPassword,
            login: serverUsername,
            id: item.id,
        };
        editServer(server)
            .then((response) => {
                console.log(JSON.stringify(response));
                if (response.status === 201) {
                    console.log("Server edited", server);
                }
            })
            .catch((err) => {
                console.log("Error editing server");
                console.error(err);
            });

        setModalVisible(false);
    };
    return (
        <>
            <ThemedText style={styles.modalText} type="subtitle">
                Editing {item.name}
            </ThemedText>
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server name
            </ThemedText>
            <ThemedTextInput
                placeholder="Server name"
                placeholderTextColor="gray"
                value={serverName}
                onChangeText={setServerName}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server address
            </ThemedText>
            <ThemedTextInput
                placeholder="Server address"
                placeholderTextColor="gray"
                value={serverAddress}
                onChangeText={setServerAdress}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server port
            </ThemedText>
            <ThemedTextInput
                placeholder="Server port"
                placeholderTextColor="gray"
                value={serverPort.toString()}
                onChangeText={(text) => {
                    const port = Number.parseInt(text);
                    if (!Number.isNaN(port)) {
                        setServerPort(port);
                    }
                }}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server username
            </ThemedText>
            <ThemedTextInput
                placeholder="Server username"
                placeholderTextColor="gray"
                value={serverUsername}
                onChangeText={setServerUsername}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server password
            </ThemedText>
            <ThemedTextInput
                placeholder="Server password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                value={serverPassword}
                onChangeText={setServerPassword}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => edit()}>
                <ThemedText style={styles.textStyle}>Save</ThemedText>
            </Pressable>
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
        margin: 20,
        borderRadius: 20,
        padding: 35,
        width: isMobile() ? "90%" : "60%",
        backgroundColor: "#121212",
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "left",
    },
});
