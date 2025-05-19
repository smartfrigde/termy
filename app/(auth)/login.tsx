import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { login } from "@/core/loginManager";
import { setApiToken, setIsLoggedIn, setRefreshToken, setUser } from "@/core/slices/authSlice";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    function handleLogin() {
        login(email, password)
            .then((data) => {
                if (data.user) {
                    dispatch(setApiToken(data.api_token));
                    dispatch(setRefreshToken(data.refresh_token));
                    dispatch(setUser(data.user));
                    dispatch(setIsLoggedIn(true));
                    console.log("Login successful");
                    router.navigate("/(main)");
                } else {
                    console.log("Login failed");
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert("Login failed. Please check your credentials.");
            });
    }
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: "Login" }} />
            <ThemedText type="defaultSemiBold">E-mail</ThemedText>
            <ThemedTextInput
                style={styles.ThemedTextInput}
                placeholder="johndoe@example.com"
                placeholderTextColor="gray"
                onChangeText={(text) => setEmail(text)}
                onSubmitEditing={handleLogin}
                value={email}
            />
            <ThemedText type="defaultSemiBold">Password</ThemedText>
            <ThemedTextInput
                style={styles.ThemedTextInput}
                secureTextEntry={true}
                placeholder="********"
                placeholderTextColor="gray"
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={handleLogin}
                value={password}
            />
            <ThemedButton
                title="Login"
                onPress={() => {
                    handleLogin();
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
    ThemedTextInput: {
        color: "white",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        width: "100%",
        marginBottom: 20,
        paddingLeft: 10,
    },
});

export default LoginScreen;
