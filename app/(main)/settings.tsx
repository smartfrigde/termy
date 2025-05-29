import { NiceDropdown } from "@/components/NiceDropdown";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { update as updateUser } from "@/core/loginManager";
import { selectUser, setUser } from "@/core/slices/authSlice";
import { selectSettings, setSetting } from "@/core/slices/settingSlice";
import type { AppDispatch } from "@/core/store";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
const themes = [
    { id: 0, label: "System", value: "system" },
    { id: 1, label: "Light", value: "light" },
    { id: 2, label: "Dark", value: "dark" },
];
export default function SettingsScreen() {
    const user = useSelector(selectUser);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
    const dispatch = useDispatch<AppDispatch>();
    const settings = useSelector(selectSettings);
    const id = useState(user.id);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [selectedTheme, setSelectedTheme] = useState(themes.findIndex((theme) => theme.value === settings.theme));

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSaveChanges = async () => {
        if (newPassword && newPassword !== confirmPassword) {
            Alert.alert("Błąd", "Hasła nie są takie same.");
            return;
        }

        const passwordToUpdate = newPassword ? newPassword : null;

        const response = await updateUser(user.id, name, surname, email, passwordToUpdate);
        if (response?.user) {
            dispatch(setUser(response.user));
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView>
                <ThemedText style={styles.title} type="title">
                    Account settings
                </ThemedText>
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Personal data</ThemedText>
                    <ThemedTextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={"#AAAAAA"}
                    />
                    <ThemedTextInput
                        placeholder="Surname"
                        placeholderTextColor={"#AAAAAA"}
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <ThemedTextInput
                        placeholder="Email"
                        placeholderTextColor={"#AAAAAA"}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Security</ThemedText>
                    <ThemedTextInput
                        placeholder="New password"
                        placeholderTextColor={"#AAAAAA"}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                    <ThemedTextInput
                        placeholder="Confirm new password"
                        placeholderTextColor={"#AAAAAA"}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Security</ThemedText>
                    <ThemedTextInput
                        placeholder="New password"
                        placeholderTextColor={"#AAAAAA"}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                    <ThemedTextInput
                        placeholder="Confirm new password"
                        placeholderTextColor={"#AAAAAA"}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <ThemedText style={styles.title} type="title">
                    App settings
                </ThemedText>
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>Theme</ThemedText>
                    <NiceDropdown
                        setValue={(value) => {
                            // @ts-expect-error fix types
                            setSelectedTheme(themes.findIndex((theme) => theme.value === value));
                            dispatch(setSetting({ key: "theme", value: value }));
                        }}
                        value={selectedTheme}
                        data={themes}
                    />
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        marginTop: 20,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
