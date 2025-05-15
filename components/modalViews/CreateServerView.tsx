import { ThemedText } from "@/components/ThemedText";

import isMobile from "@/constants/isMobile";
import { selectedTeams } from "@/core/slices/teamSlice";
import { createServer } from "@/core/sshManager";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { NiceDropdown } from "../NiceDropdown";
interface ServerViewProps {
    setModalVisible: (e: boolean) => void;
    refresh: () => void;
}

function CTextInput(props: React.ComponentProps<typeof TextInput>) {
    const InputComponent = isMobile() ? BottomSheetTextInput : TextInput;
    return <InputComponent {...props} />;
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
            <CTextInput
                style={styles.textInput}
                placeholder="Server name"
                placeholderTextColor="gray"
                value={serverName}
                onChangeText={setServerName}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server address
            </ThemedText>
            <CTextInput
                style={styles.textInput}
                placeholder="Server address"
                placeholderTextColor="gray"
                value={serverAddress}
                onChangeText={setServerAdress}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server port
            </ThemedText>
            <CTextInput
                style={styles.textInput}
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
            <CTextInput
                style={styles.textInput}
                placeholder="Server username"
                placeholderTextColor="gray"
                value={serverUsername}
                onChangeText={setServerUsername}
            />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Server password
            </ThemedText>
            <CTextInput
                style={styles.textInput}
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
    textInput: {
        color: "white",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "100%",
        marginBottom: 20,
        paddingLeft: 10,
    },
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
        marginBottom: 15,
        textAlign: "left",
    },
});
