import ThemedButton from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const AuthScreen = () => {
    function login() {
        router.navigate("/(auth)/login");
    }
    function register() {
        router.navigate("/(auth)/register");
    }

    return (
        <ThemedView
            style={[
                styles.container,
                {
                    flexDirection: "row",
                },
            ]}
        >
            <Stack.Screen options={{ title: "Welcome to Termy" }} />
            <ThemedView style={styles.authContainer}>
                {/* <Image style={styles.logo} source={require("../../assets/images/logo.png")} /> */}
                <ThemedButton onPress={login} style={styles.button} title="Login" />
                <ThemedButton onPress={register} style={styles.button} title="Register" />
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    authContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        position: "absolute",
        top: 0,
        width: 300,
        height: 300,
        elevation: 5, // For Android shadow
        shadowColor: "#063B60", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button: {
        marginTop: 25,
        width: "80%",
        height: 50,
    },
});

export default AuthScreen;
