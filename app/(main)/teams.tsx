import { TeamAddModal } from "@/components/TeamAddModal";
import TeamItem from "@/components/TeamComponent";
import { TeamJoinPanel } from "@/components/TeamJoinPanel";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
    addTeam as addTeamToSlice,
    currentTeamsPage,
    hasMoreTeams,
    selectedTeams,
    totalUserTeamsCount,
} from "@/core/slices/teamSlice";
import { getTeams } from "@/core/teamManager";
import type { TeamType } from "@/types/Team";
import { Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const TeamsScreen = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowTeamCreatingPanel, setShowTeamCreatingPanel] = useState(false);
    const [visibleTeamId, setVisibleTeamId] = useState(-1);
    const [isFetching, setIsFetching] = useState(false);
    const [isShowTeamJoinPanel, setShowTeamJoinPanel] = useState(false);

    const hasMoreTeamsLocal = useSelector(hasMoreTeams);
    const currentTeamsPageLocal = useSelector(currentTeamsPage);
    const totalUserTeamsCountLocal = useSelector(totalUserTeamsCount);

    const perPage = 11;
    const teams = useSelector(selectedTeams);
    const dispatch = useDispatch();

    useEffect(() => {
        if (teams.length < currentPage * perPage && hasMoreTeamsLocal) {
            getData();
        }
    }, [currentPage]);

    const createTeam = () => {
        setShowTeamCreatingPanel(true);
    };

    const handleVisibilityChange = (id: number) => {
        setVisibleTeamId(id);
    };

    const paginateTeams = (teams: TeamType[], page: number, pageSize = 11) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        return teams.slice(startIndex, endIndex);
    };

    const getData = async () => {
        if (isFetching) return;
        setIsFetching(true);

        const data = await getTeams(currentTeamsPageLocal + 1 || 1);
        if (data?.teams && Array.isArray(data?.teams)) {
            data.teams.forEach((team: TeamType) => {
                dispatch(
                    addTeamToSlice({
                        team,
                        totalPages: data.total_pages,
                        currentPage: data.current_page,
                    }),
                );
            });
        }

        setIsFetching(false);
    };

    const joinToTeam = () => {
        setShowTeamJoinPanel(true);
    };

    const pages = Array.from({ length: Math.ceil(totalUserTeamsCountLocal / perPage) }, (_, i) => i + 1);

    return (
        <>
            <ThemedView style={styles.container}>
                <Stack.Screen options={{ title: "Your Teams" }} />
                <FlatList
                    data={paginateTeams(teams, currentPage, perPage)}
                    renderItem={({ item }) => (
                        <TeamItem
                            item={item}
                            visibleTeamId={visibleTeamId}
                            setVisibility={{
                                setModalVisible: handleVisibilityChange,
                                modVisible: 0,
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
                <ThemedView style={styles.paginationContainer}>
                    {pages.map((page) => (
                        <TouchableOpacity
                            key={page}
                            style={[styles.pageButton, currentPage === page && styles.activePageButton]}
                            onPress={() => setCurrentPage(page)}
                        >
                            <ThemedText
                                style={[styles.pageButtonText, currentPage === page && styles.activePageButtonText]}
                            >
                                {page}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </ThemedView>
                <View style={styles.floatingButtonContainer}>
                    <TouchableOpacity onPress={createTeam} style={styles.floatingButton}>
                        <Octicons name="plus" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={joinToTeam} style={styles.floatingButton}>
                        <Octicons name="person-add" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <TeamAddModal modalVisible={isShowTeamCreatingPanel} setModalVisible={setShowTeamCreatingPanel} />
                <TeamJoinPanel
                    modalVisible={isShowTeamJoinPanel}
                    setModalVisible={setShowTeamJoinPanel}
                    teams={teams}
                    totalUserTeamsCountLocal={totalUserTeamsCountLocal}
                    currentTeamsPageLocal={currentTeamsPageLocal}
                />
            </ThemedView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    teamContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        backgroundColor: "rgba(51, 51, 51, 0.13)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 15,
    },
    teamText: {
        fontSize: 18,
        color: "#ddd",
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        flexWrap: "wrap",
    },
    pageButton: {
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: "#ddd",
    },
    activePageButton: {
        backgroundColor: "#333",
    },
    pageButtonText: {
        fontSize: 16,
        color: "#333",
    },
    activePageButtonText: {
        color: "#fff",
    },
    floatingButton: {
        zIndex: 1,
        backgroundColor: "#442a00",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    floatingButtonContainer: {
        position: "absolute",
        bottom: 40,
        right: 30,
        elevation: 5,
    },
});

export default TeamsScreen;
