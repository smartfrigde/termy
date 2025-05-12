import { ThemedText } from '@/components/ThemedText';
import isMobile from '@/constants/isMobile';
import { editServer } from '@/core/sshManager';
import { ServerType } from '@/types/Server';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface ServerModalProps {
    item: ServerType;
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function EditServerModal({
    item,
    modalVisible,
    setModalVisible
}: ServerModalProps) {
    const [serverName, setServerName] = useState(item.name);
    const [serverAddress, setServerAdress] = useState(item.hostname);
    const [serverPort, setServerPort] = useState(item.port);
    const [serverPassword, setServerPassword] = useState(item.password);
    const [serverUsername, setServerUsername] = useState(item.login);
    const edit = () => {
        const server = {
            name: serverName,
            hostname: serverAddress,
            port: serverPort,
            password: serverPassword,
            login: serverUsername,
            id: item.id,
        }
        editServer(server).then((response) => {
            console.log(JSON.stringify(response));
            if (response.status === 201) {
                console.log('Server edited', server);
            }
        }). catch((err) => {
            console.log('Error editing server');
            console.error(err);
        })
        
        setModalVisible(!modalVisible);
    }
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {edit()}}>
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <ThemedText style={styles.modalText} type="subtitle">Editing {item.name}</ThemedText>
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server name</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server name"
                            placeholderTextColor="gray"
                            value={serverName}
                            onChangeText={setServerName}
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server address</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server address"
                            placeholderTextColor="gray"
                            value={serverAddress}
                            onChangeText={setServerAdress}
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server port</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server port"
                            placeholderTextColor="gray"
                            value={serverPort.toString()}
                            onChangeText={(text) => {
                                const port = parseInt(text);
                                if (!isNaN(port)) {
                                    setServerPort(port);
                                }
                            }}
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server username</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server username"
                            placeholderTextColor="gray"
                            value={serverUsername}
                            onChangeText={setServerUsername}
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server password</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            value={serverPassword}
                            onChangeText={setServerPassword}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => edit()}>
                            <ThemedText style={styles.textStyle}>Save</ThemedText>
                        </Pressable>
                    </ThemedView>
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    textInput: {
        color: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingLeft: 10,
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        width: isMobile() ? '90%' : '60%',
        backgroundColor: '#121212',
        alignItems: 'center',
        shadowColor: '#000',
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
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "left"
    },
});
