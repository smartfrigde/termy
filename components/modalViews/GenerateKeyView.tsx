import { ThemedText } from "@/components/ThemedText";
import isMobile from "@/constants/isMobile";
import { selectUser } from "@/core/slices/authSlice";
import { addKey } from "@/core/slices/sshSlice";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { generateKeyPair } from "ssh-keygen-rn";
import { NiceDropdown } from "../NiceDropdown";
import { ThemedTextInput } from "../ThemedTextInput";
interface GenerateKeyViewProps {
    setModalVisible: (e: boolean) => void;
}
export function GenerateKeyView({ setModalVisible }: GenerateKeyViewProps) {
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedHash, setSelectedHash] = useState(0);
    const [name, setName] = useState("");
    const [passphrase, setPassphrase] = useState("");
    const auth = useSelector(selectUser);
    const dispatch = useDispatch();
    const possibleHashes = [
        { label: "SHA-1", value: "SHA-1" },
        { label: "SHA-256", value: "SHA-256" },
        { label: "SHA-384", value: "SHA-384" },
        { label: "SHA-512", value: "SHA-512" },
    ];
    const possibleSizes = [
        { label: "1024", value: 1024 },
        { label: "2048", value: 2048 },
        { label: "4096", value: 4096 },
    ];
    const generate = async () => {
        const keys = await generateKeyPair(selectedSize, passphrase);
        console.log("Key generated", keys);
        dispatch(addKey({ name: name, publicKey: keys.publicKey, privateKey: keys.privateKey, id: "hi" }));
        setModalVisible(false);
    };
    return (
        <>
            <ThemedText style={styles.modalText} type="subtitle">
                Generate a key
            </ThemedText>
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Name
            </ThemedText>
            <ThemedTextInput placeholder="Key name" placeholderTextColor="gray" value={name} onChangeText={setName} />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Hash
            </ThemedText>
            <NiceDropdown setValue={setSelectedHash} value={selectedHash} data={possibleHashes} />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Size
            </ThemedText>
            <NiceDropdown setValue={setSelectedSize} value={selectedSize} data={possibleSizes} />
            <ThemedText style={styles.modalText} type="defaultSemiBold">
                Passphrase
            </ThemedText>
            <ThemedTextInput
                placeholder="*******"
                placeholderTextColor="gray"
                secureTextEntry
                value={passphrase}
                onChangeText={setPassphrase}
            />
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => generate()}>
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
