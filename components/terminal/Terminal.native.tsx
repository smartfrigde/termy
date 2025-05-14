import type { ServerType } from "@/types/Server";
import SSHClient from "@dylankenneally/react-native-ssh-sftp";
import { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ThemedButton from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface TerminalModalProps {
    server: ServerType;
    visible: boolean;
    setVisible: (e: boolean) => void;
}

export default function TerminalModal({ server, visible, setVisible }: TerminalModalProps) {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState("");
    const clientRef = useRef<SSHClient | null>(null);

    const connectSSH = async () => {
        try {
            const conn = await SSHClient.connectWithPassword(
                server.hostname,
                server.port,
                server.login,
                server.password,
            );
            clientRef.current = conn;
            console.log("Connected to server", server);

            conn.on("ready", () => {
                console.log("SSH Client ready");
                // @ts-expect-error
                conn.startShell("vanilla");
                conn.execute("\n");
            });

            conn.on("error", (err) => {
                console.error("SSH Client error:", err);
                setOutput((prev) => `${prev}\nError: ${err.message}`);
            });

            conn.on("Shell", (event) => {
                console.log("Shell event", event);
                if (event) setOutput((prev) => prev + event);
            });
        } catch (error) {
            console.error("Failed to connect to SSH:", error);
            setOutput("Failed to connect to SSH. Please check your credentials.");
        }
    };

    const disconnectSSH = () => {
        if (clientRef.current) {
            clientRef.current.disconnect();
            clientRef.current = null;
            console.log("Disconnected from SSH");
        }
    };

    useEffect(() => {
        if (visible) {
            connectSSH();
        } else {
            disconnectSSH();
        }
    }, [visible]);

    const sendCommand = () => {
        if (clientRef.current) {
            console.log("Command sent:", command);
            clientRef.current.writeToShell(`${command}\n`);
            setCommand("");
        } else {
            console.error("SSH Client is not connected");
            setOutput((prev) => `${prev}\nError: SSH Client is not connected.`);
        }
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
                    <ThemedText>{output}</ThemedText>
                </ScrollView>
                <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="cmd"
                        placeholderTextColor="gray"
                        value={command}
                        onChangeText={setCommand}
                    />
                    <ThemedButton title="Send" onPress={sendCommand} />
                </ThemedView>
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
