import { ThemedText } from "@/components/ThemedText";

import { selectedTeams } from "@/core/slices/teamSlice";
import { createServer } from "@/core/sshManager";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { NiceDropdown } from "../NiceDropdown";
import { ThemedTextInput } from "../ThemedTextInput";
interface ServerViewProps {
    setModalVisible: (e: boolean) => void;
    refresh: () => void;
}

export function CreateServerView({ setModalVisible, refresh }: ServerViewProps) {
    const [serverName, setServerName] = useState("");
    const [serverAddress, setServerAdress] = useState("");
    const [serverPort, setServerPort] = useState(22);
    const [serverPassword, setServerPassword] = useState("");
    const [serverUsername, setServerUsername] = useState("");
    const teams = useSelector(selectedTeams);
    const teamsData = teams.map((team) => {
        return {
            label: team.name,
            value: team.id,
        };
    });
    teamsData.push({
        label: "Default",
        value: 0,
    });
    const [selectedTeam, setSelectedTeam] = useState(0);
    const save = () => {
        const server = {
            name: serverName,
            hostname: serverAddress,
            port: serverPort,
            password: serverPassword,
            login: serverUsername,
            team_id: selectedTeam,
        };
        createServer(server)
            .then((response) => {
                if (response.status === 201) {
                    console.log("Server created", server);
                    refresh();
                }
            })
            .catch((err) => {
                console.log("Error creating server");
                console.error(err);
            });

        setModalVisible(false);
    };
    return (
        <>
            <ThemedText style={styles.modalText} type="subtitle">
                Add a server
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
                onChangeText={(text: string) => {
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
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Team
            </ThemedText>
            <NiceDropdown setValue={setSelectedTeam} value={selectedTeam} data={teamsData} />

            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => save()}>
                <ThemedText style={styles.textStyle}>Create</ThemedText>
            </Pressable>
        </>
    );
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    buttonClose: {
        marginTop: 20,
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 8,
        textAlign: "left",
    },
});
