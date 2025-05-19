import { websocket } from "@/constants/api";
import { translateCtrlCombo, translateKey } from "@/core/keyTranslate";
import type { ServerType } from "@/types/Server";
import { useEffect, useRef, useState } from "react";
import { Modal, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ThemedButton from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import XTerm from "./XTerm";

interface TerminalModalProps {
    server: ServerType;
    visible: boolean;
    setVisible: (e: boolean) => void;
}

export default function TerminalModal({ server, visible, setVisible }: TerminalModalProps) {
    const [output, setOutput] = useState("");
    const [lastOutput, setLastOutput] = useState("");
    const socketRef = useRef<WebSocket | null>(null);
    const colorScheme = useColorScheme() ?? "light";
    // Double-press detection refs
    const lastPressed = useRef<number | null>(null);
    const isDoublePress = useRef<boolean>(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!visible) return;

        const socket = new WebSocket(`ws://${websocket}/ws`);
        socketRef.current = socket;

        socket.onopen = () => {
            connectSSH();
        };

        socket.onmessage = (event) => {
            if (event.data === lastOutput) return;
            setLastOutput(event.data);
            setOutput((prevOutput) => `${prevOutput}${event.data}`);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // Keydown event handler with double-press logic
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!visible) return;
            e.preventDefault();

            const keyCode = e.keyCode;

            if (isDoublePress.current && lastPressed.current === keyCode) {
                isDoublePress.current = false;
                // Double press detected
                // Support for keyboard shortcuts (Ctrl, Meta, Alt)
                const modifiers = [];
                if (e.ctrlKey) modifiers.push("Ctrl");
                if (e.metaKey) modifiers.push("Meta");
                if (e.altKey) modifiers.push("Alt");
                if (modifiers.length > 0) {
                    socketRef.current?.send(
                        JSON.stringify({
                            content: translateCtrlCombo(e.key),
                            type: "command",
                        }),
                    );
                } else {
                    socketRef.current?.send(
                        JSON.stringify({
                            content: translateKey(e.key),
                            type: "command",
                        }),
                    );
                }
            } else {
                isDoublePress.current = true;
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                    isDoublePress.current = false;
                }, 500);

                // Single press
                socketRef.current?.send(
                    JSON.stringify({
                        content: translateKey(e.key),
                        type: "command",
                    }),
                );
            }
            lastPressed.current = keyCode;
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            socket.close();
            socketRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, server]);

    const connectSSH = async () => {
        try {
            socketRef.current?.send(
                JSON.stringify({
                    hostname: server.hostname,
                    port: server.port,
                    login: server.login,
                    password: server.password,
                    type: "connect",
                }),
            );
        } catch (error) {
            setOutput("Failed to connect to SSH. Please check your credentials.");
        }
    };

    const disconnectSSH = () => {
        socketRef.current?.close();
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
                    <ThemedText type="title">
                        {server.name} - {server.hostname}
                    </ThemedText>
                    <ThemedButton
                        tabIndex={-1}
                        title="Close"
                        onPress={(e) => {
                            // @ts-expect-error untyped
                            if (e.code === "Enter") {
                                return false;
                            }
                            disconnectSSH();
                            setVisible(false);
                        }}
                    />
                </ThemedView>
                <ScrollView style={{ flex: 1, marginBottom: 20, filter: colorScheme === "dark" ? "none" : "invert(1)" }}>
                    <XTerm
                        dom={{
                            scrollEnabled: true,
                            showsVerticalScrollIndicator: true,
                        }}
                        output={output}
                    />
                </ScrollView>
            </ThemedView>
        </Modal>
    );
}
