import { ThemedText } from '@/components/ThemedText';
import { Alert, Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from './ThemedView';

interface ServerModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function ServerModal({
    modalVisible,
    setModalVisible,
}: ServerModalProps) {
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <ThemedText style={styles.modalText} type="subtitle">Add a server</ThemedText>
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server name</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server name"
                            placeholderTextColor="gray"
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server address</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server address"
                            placeholderTextColor="gray"
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server port</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server port"
                            placeholderTextColor="gray"
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server password</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server password"
                            placeholderTextColor="gray"
                        />
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server username</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server username"
                            placeholderTextColor="gray"
                        />
                        
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
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
        width: '60%',
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
