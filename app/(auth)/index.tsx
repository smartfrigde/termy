import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import { logout, selectIsLoggedIn, selectUser } from '@/core/slices/authSlice';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function AuthButtons() {
    //loadLocalData();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    function login() {
        router.navigate('/(auth)/login');
    }
    function register() {
        router.navigate('/(auth)/register');
    }
    if (isLoggedIn) {
        return (
            <ThemedView style={styles.authContainer}>
                <ThemedButton
                    onPress={() => {
                        router.navigate("/(main)")
                    }}
                    style={styles.button}
                    title={"Welcome back " + user?.name}
                />
                <TouchableOpacity
                    onPress={() => {
                        dispatch(logout());
                        router.navigate("/(auth)");
                    }}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </ThemedView>
        )
    }
    else {
    return (
        <ThemedView style={styles.authContainer}>
                {/* <Image style={styles.logo} source={require("../../assets/images/logo.png")} /> */}
                <ThemedButton
                    onPress={login}
                    style={styles.button}
                    title="Login"
                />
                <ThemedButton
                    onPress={register}
                    style={styles.button}
                    title="Register"
                />
            </ThemedView>
    );
    }
}

const AuthScreen = () => {
    return (
        <ThemedView
            style={[
                styles.container,
                {
                    flexDirection: 'row',
                },
            ]}>
            <Stack.Screen options={{ title: 'Welcome to Termy' }} />
            <ThemedView style={{ flex: 4 }}>
                <Image style={styles.img} source={require("../../assets/images/background.jpg")} />
            </ThemedView>
            <AuthButtons />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    authContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        position: 'absolute',
        top: 0,
        width: 300,
        height: 300,
        elevation: 5, // For Android shadow
        shadowColor: '#063B60', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button: {
        marginTop: 25,
        width: '80%',
    },
    logoutButton: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
    }
});

export default AuthScreen;