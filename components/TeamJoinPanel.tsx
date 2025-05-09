import { ThemedText } from '@/components/ThemedText';
import isMobile from '@/constants/isMobile';
import {addTeam as addTeamToSlice} from '@/core/slices/teamSlice';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useDispatch } from 'react-redux';
import { TeamType } from '@/types/Team';
import { addMember } from '@/core/teamManager';




interface ServerModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
    teams: TeamType[];
    totalUserTeamsCountLocal: number;
    currentTeamsPageLocal: number;
}

export function TeamJoinPanel({
                                 modalVisible,
                                 setModalVisible,
                                 teams,
                                 totalUserTeamsCountLocal,
                                 currentTeamsPageLocal
                             }: ServerModalProps) {
    const [joinCode, setJoinCode] = useState('');
    const dispatch = useDispatch();


    const joinToTeam = async () => {
        const response = await addMember(joinCode);
        if (response !== null) {
            if (response.team){
                if (teams.findIndex(team => team.id === response.team.id) === -1){
                    dispatch(
                        addTeamToSlice({
                            team: response.team,
                            totalPages: totalUserTeamsCountLocal,
                            currentPage: currentTeamsPageLocal,
                        })
                    );
                }
            }
        }
        setModalVisible(!modalVisible);
    }



    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <ThemedView style={styles.modalView}>
                        <ThemedText style={styles.modalText} type="subtitle">Join to team</ThemedText>
                        <ThemedText style={styles.modalText} type="defaultSemiBold">Join to team</ThemedText>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Join code"
                            placeholderTextColor="gray"
                            value={joinCode}
                            onChangeText={setJoinCode}
                        />
                        <View style={styles.buttonPanel}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => joinToTeam()}>
                                <ThemedText style={styles.textStyle}>Join</ThemedText>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, styles.bg_gray]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <ThemedText style={styles.textStyle}>Exit</ThemedText>
                            </Pressable>
                        </View>
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
    buttonPanel: {
        "gap": 8,
        "display": "flex",
        "flexDirection": "row"
    },
    bg_gray: {
        backgroundColor: 'gray'
    }
});

