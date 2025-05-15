import { websocket } from "@/constants/api";
import type { ServerType } from "@/types/Server";
import { useEffect, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ThemedButton from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import SpecialKeys from "./SpecialKeys";
import XTerm from "./XTerm";

interface TerminalModalProps {
    server: ServerType;
    visible: boolean;
    setVisible: (e: boolean) => void;
}

export default function TerminalModal({ server, visible, setVisible }: TerminalModalProps) {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");
    let socket: WebSocket;

    useEffect(() => {
        if (!visible) return;
        console.log(websocket);
        socket = new WebSocket(`ws://${websocket}/ws`);

        socket.onopen = () => {
            console.log("WebSocket connection established");
            connectSSH();
        };

        socket.onmessage = (event) => {
            console.log("Message from server:", event.data);
            setOutput((prevOutput) => `${prevOutput}${event.data}`);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
    }, [visible]);
    const connectSSH = async () => {
        try {
            socket.send(
                JSON.stringify({
                    hostname: server.hostname,
                    port: server.port,
                    login: server.login,
                    password: server.password,
                    type: "connect",
                }),
            );
            console.log("Connected to server", server);
        } catch (error) {
            console.error("Failed to connect to SSH:", error);
            setOutput("Failed to connect to SSH. Please check your credentials.");
        }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
        if (!visible) return;
        if (e.key === "Enter") {
            socket.send(
                JSON.stringify({
                    content: "\r",
                    type: "command",
                }),
            );
        } else {
            socket.send(
                JSON.stringify({
                    content: e.key,
                    type: "command",
                }),
            );
        }
    };
    document.addEventListener("keyup", (e) => handleKeyUp(e));
    const disconnectSSH = () => {
        socket?.close();
        console.log("Disconnected from WebSocket");
    };

    return (
        <Modal animationType="slide" transparent={false} visible={visible}>
            <ThemedView style={{ flex: 1, padding: 20 }}>
                <ThemedView
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <ThemedText type="title">Terminal</ThemedText>
                    <ThemedButton
                        title="Close"
                        onPress={() => {
                            disconnectSSH();
                            setVisible(false);
                        }}
                    />
                </ThemedView>
                <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                    <XTerm output={output} />
                </ScrollView>
                <SpecialKeys />
            </ThemedView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    textInput: {
        color: "white",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "80%",
    },
});
