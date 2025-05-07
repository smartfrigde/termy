import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { TeamType } from '@/types/Team';
import { Octicons } from '@expo/vector-icons';
import {TeamAddModal} from '@/components/TeamAddModal'
import { selectedTeams } from '@/core/slices/teamSlice';
import { useSelector } from 'react-redux';
import { Store } from '@reduxjs/toolkit';

const TeamItem = ({ item }: { item: TeamType }) => {
    return (
        <Pressable style={styles.teamContainer}>
            <ThemedText style={styles.teamText} type="defaultSemiBold">{item.name}</ThemedText>
        </Pressable>
    );
}

const TeamsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowTeamCreatingPanel, setShowTeamCreatingPanel] = useState(false);

    const teams = useSelector(selectedTeams);
    const createTeam = () => {
        setShowTeamCreatingPanel(true);
    }


    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ title: `Your Teams - Page ${currentPage}` }} />
            <FlatList
                data={teams}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TeamItem item={item} />}
            >
            </FlatList>
            <ThemedView style={styles.paginationContainer}>
                {[1, 2, 3, 4].map((page) => (
                    <TouchableOpacity
                        key={page}
                        style={[
                            styles.pageButton,
                            currentPage === page && styles.activePageButton,
                        ]}
                        onPress={() => setCurrentPage(page)}
                    >
                        <ThemedText
                            style={[
                                styles.pageButtonText,
                                currentPage === page && styles.activePageButtonText,
                            ]}
                        >
                            {page}
                        </ThemedText>
                    </TouchableOpacity>
                ))}
            </ThemedView>

            <TouchableOpacity onPress={createTeam} style={styles.floatingButton}>
                <Octicons name="plus" size={24} color="white" />
            </TouchableOpacity>

            <TeamAddModal modalVisible={isShowTeamCreatingPanel} setModalVisible={setShowTeamCreatingPanel}></TeamAddModal>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: 'rgba(51, 51, 51, 0.13)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
    },
    teamText: {
        fontSize: 18,
        color: '#ddd',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    pageButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#ddd',
    },
    activePageButton: {
        backgroundColor: '#333',
    },
    pageButtonText: {
        fontSize: 16,
        color: '#333',
    },
    activePageButtonText: {
        color: '#fff',
    },

    floatingButton: {
        zIndex: 1,
        backgroundColor: "#007AFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 30,
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default TeamsScreen;