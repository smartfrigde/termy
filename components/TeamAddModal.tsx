import { ThemedText } from '@/components/ThemedText';
import isMobile from '@/constants/isMobile';
import addTeam from '@/core/teamManager';
import { addTeam as createTeam } from '@/core/slices/teamSlice';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { useDispatch } from 'react-redux';
import { TeamType } from '@/types/Team';



interface ServerModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function TeamAddModal({
    modalVisible,
    setModalVisible,
}: ServerModalProps) {
    const [teamName, setServerName] = useState('');
    const dispatch = useDispatch();


    const save = async () => {
        const data = await addTeam(teamName);
        if (data.team) {
            setModalVisible(!modalVisible);
            dispatch(createTeam(data.team));
        }
    };

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { save() }}>
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <ThemedText style={styles.modalText} type="subtitle">Add a server</ThemedText>
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Server name</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Server name"
                            placeholderTextColor="gray"
                            value={teamName}
                            onChangeText={setServerName}
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
function dispatch(arg0: { payload: TeamType; type: "team/addTeam"; }) {
    throw new Error('Function not implemented.');
}

