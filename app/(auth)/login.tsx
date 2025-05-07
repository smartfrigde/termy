import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { login } from '@/core/loginManager';
import { router, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'Login' }} />
            <ThemedText type="defaultSemiBold">E-mail</ThemedText>
            <TextInput
                style={styles.textInput}
                placeholder="johndoe@example.com"
                placeholderTextColor="gray"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <ThemedText type="defaultSemiBold">Password</ThemedText>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="********"
                placeholderTextColor="gray"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <ThemedButton
                title="Login"
                onPress={() => {
                    login(
                        email,
                        password,
                    ).then((res) => {
                        if (res.user) {
                            console.log('Login successful');
                            router.navigate("/(main)")
                        } else {
                            console.log('Login failed');
                        }
                    })
                }}
                style={{
                    backgroundColor: '#007BFF',
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 20,
                }}
                ></ThemedButton>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        color: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingLeft: 10,
    },
});

export default LoginScreen;