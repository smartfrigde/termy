import { ThemedText } from '@/components/ThemedText';
import isMobile from '@/constants/isMobile';
import { addServer } from '@/core/slices/sshSlice';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThemedView } from './ThemedView';

interface ServerModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function ServerModal({
    modalVisible,
    setModalVisible
}: ServerModalProps) {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState('');
    const [serverAddress, setServerAdress] = useState('');
    const [serverPort, setServerPort] = useState(0);
    const [serverPassword, setServerPassword] = useState('');
    const [serverUsername, setServerUsername] = useState('');
    const serverId = 'PLACEHOLDER' + Math.random().toString(36).substring(2, 15);
    const save = () => {
        
        dispatch(addServer({
            id: serverId,
            name: serverName,
            hostname: serverAddress,
            port: serverPort,
            password: serverPassword,
            username: serverUsername,
        }));
        setModalVisible(!modalVisible);
    }
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {save()}}>
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <ThemedText style={styles.modalText} type="subtitle">Add a server</ThemedText>
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
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server password</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server password"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            value={serverPassword}
                            onChangeText={setServerPassword}
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server username</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server username"
                            placeholderTextColor="gray"
                            value={serverUsername}
                            onChangeText={setServerUsername}
                        />
                        
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => save()}>
                            <ThemedText style={styles.textStyle}>Create</ThemedText>
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
