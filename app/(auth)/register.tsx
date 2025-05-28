import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { i18n } from "@/core/i18n";
import { register } from "@/core/loginManager";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const RegisterScreen = () => {
    const [fName, setFName] = React.useState("");
    const [lName, setLName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleRegister() {
        register(fName, lName, email, password)
            .then((res) => {
                if (res) {
                    console.log("Registration successful");
                    console.log(res);
                    router.navigate("/(auth)/login");
                }
            })
            .catch((error) => {
                console.error("Register error: ", error);
                alert("Registration failed.");
            });
    }
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: "Register" }} />
            <ThemedText type="defaultSemiBold">{i18n.t("auth.first_name")}</ThemedText>
            <ThemedTextInput
                placeholder="John"
                onSubmitEditing={handleRegister}
                placeholderTextColor="gray"
                autoComplete="name"
                onChangeText={(text) => setFName(text)}
                value={fName}
            />
            <ThemedText type="defaultSemiBold">{i18n.t("auth.last_name")}</ThemedText>
            <ThemedTextInput
                placeholder="Doe"
                placeholderTextColor="gray"
                onSubmitEditing={handleRegister}
                onChangeText={(text) => setLName(text)}
                value={lName}
            />
            <ThemedText type="defaultSemiBold">{i18n.t("auth.email")}</ThemedText>
            <ThemedTextInput
                placeholder="johndoe@example.com"
                autoComplete="email"
                placeholderTextColor="gray"
                onSubmitEditing={handleRegister}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <ThemedText type="defaultSemiBold">{i18n.t("auth.password")}</ThemedText>
            <ThemedTextInput
                secureTextEntry={true}
                onSubmitEditing={handleRegister}
                placeholder="********"
                autoComplete="password"
                placeholderTextColor="gray"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <ThemedButton
                title={i18n.t("auth.register")}
                onPress={() => {
                    handleRegister();
                }}
                style={{
                    backgroundColor: "#007BFF",
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 20,
                }}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default RegisterScreen;
