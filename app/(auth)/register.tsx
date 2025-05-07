import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { register } from '@/core/loginManager';
import { router, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const RegisterScreen = () => {
    const [fName, setFName] = React.useState('');
    const [lName, setLName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: 'Register' }} />
            <ThemedText type="defaultSemiBold">First name</ThemedText>
            <TextInput
                style={styles.textInput}
                placeholder="John"
                placeholderTextColor="gray"
                onChangeText={(text) => setFName(text)}
                value={fName}
            />
            <ThemedText type="defaultSemiBold">Last name</ThemedText>
            <TextInput
                style={styles.textInput}
                placeholder="Doe"
                placeholderTextColor="gray"
                onChangeText={(text) => setLName(text)}
                value={lName}
            />
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
                title="Register"
                onPress={() => {
                    register(
                        fName,
                        lName,
                        email,
                        password,
                    ).then((res) => {
                        if (res) {
                            console.log('Registration successful');
                            console.log(res);
                            router.navigate("/(auth)/login")
                        } else {
                            // Handle registration error
                        }
                    }
                    );
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

export default RegisterScreen;