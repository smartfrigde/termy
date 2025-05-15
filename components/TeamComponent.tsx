import { JoinCodeDisplay } from "@/components/TeamJoinCodeDisplay";
import TeamRemoveButtonAndModal from "@/components/TeamRemoveButtonAndModal";
import { ThemedText } from "@/components/ThemedText";
import {
    Members,
    PageData,
    addTeamMember,
    hasMoreMembers,
    membersInTeam,
    removeTeamMember,
    setTeamMember,
    teamCurrentPage,
} from "@/core/slices/teamsMembersSlice";
import type { AppDispatch } from "@/core/store";
import { deleteMember, getMembers, updateMemberRole } from "@/core/teamManager";
import { getRolesAtOrBelow, hasGrandestRole } from "@/core/teamsRoleManager";
import type { TeamType } from "@/types/Team";
import type { MembersResponse, TeamPageData } from "@/types/TeamMember";
import { Role } from "@/types/enums/TeamRoleEnum";
import { Octicons } from "@expo/vector-icons";
import type React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedView } from "./ThemedView";

interface TeamVisibilityProps {
    setModalVisible: (id: number) => void;
    modVisible: number;
}

interface TeamItemProps {
    item: TeamType;
    visibleTeamId: number;
    setVisibility: TeamVisibilityProps;
}

const TeamItem: React.FC<TeamItemProps> = ({ item, visibleTeamId, setVisibility }) => {
    const teamPageData = useSelector(PageData);
    const teamMembers = useSelector(Members);
    const dispatch = useDispatch<AppDispatch>();
    const [isFetching, setIsFetching] = useState(false);
    const [isMembersShow, setIsMembersShow] = useState(false);
    const [roleToChange, setRoleToChange] = useState(1);
    const handlePress = () => {
        setVisibility.setModalVisible(item.id);
    };
    const hasMore = hasMoreMembers(teamPageData, item.id);
    const membersInTeamLocal = membersInTeam(teamMembers, item.id);
    const currentTeamsPageLocal = teamCurrentPage(teamPageData, item.id);
    const onExitPress = () => {
        setVisibility.setModalVisible(-1);
    };
    const onMembersPress = () => {
        setIsMembersShow(!isMembersShow);
        if (currentTeamsPageLocal === 0 && hasMore) {
            getData();
        }
    };
    const closeMembers = () => {
        if (currentTeamsPageLocal === 0 && hasMore) {
            getData();
        }

        setIsMembersShow(!isMembersShow);
    };
    const deleteUser = async (userId: number) => {
        const response = await deleteMember(item.id, userId);
        if (!response === null) {
            dispatch(removeTeamMember(userId));
        }
    };
    const getData = async () => {
        if (isFetching || isLoadingMore) return;
        setIsLoadingMore(true);

        try {
            const data = await getMembers(item.id, currentTeamsPageLocal + 1);
            if (data?.members) {
                const pageData: TeamPageData = {
                    team_id: data.team_id,
                    current_page: data.current_page,
                    total_pages: data.total_pages,
                    total_members: data.total_members,
                };

                data.members.forEach((member: MembersResponse) => {
                    dispatch(
                        addTeamMember({
                            members: member,
                            pageData: pageData,
                        }),
                    );
                });
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setIsLoadingMore(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (currentTeamsPageLocal === 0 && hasMore) {
            getData();
        }

        if (membersInTeamLocal.length < currentTeamsPageLocal * 30 && hasMore) {
            getData();
        }
    }, [currentTeamsPageLocal, membersInTeamLocal]);

    const [showRoleForMemberId, setShowRoleForMemberId] = useState<number | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const roles = getRolesAtOrBelow(item.permission_in_team);

    async function updateRole(newRole: number, userId: number) {
        const response = await updateMemberRole(item.id, userId, newRole);

        if (response?.member) {
            setTeamMember(response.member);
        }
    }

    return (
        <>
            <Pressable
                style={[styles.teamContainer, visibleTeamId === item.id && styles.activeTeam]}
                onPress={handlePress}
            >
                <ThemedText style={styles.teamText}>{item.name}</ThemedText>
            </Pressable>

            <Modal visible={visibleTeamId === item.id} animationType="slide">
                <ThemedView style={styles.content}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.topButton} onPress={onExitPress}>
                            <Text style={styles.buttonText}>Exit</Text>
                        </TouchableOpacity>

                        <ThemedText>{`Team: ${item.name}`}</ThemedText>

                        {(item.permission_in_team === Role.ADMINISTRATOR || item.permission_in_team === Role.OWNER) && (
                            <Pressable onPress={closeMembers}>
                                <Octicons name="people" size={14} color="white" />
                            </Pressable>
                        )}
                    </View>

                    <View style={{ margin: 20 }}>
                        {(item.permission_in_team === Role.ADMINISTRATOR || item.permission_in_team === Role.OWNER) && (
                            <JoinCodeDisplay joinCode={item.join_code} />
                        )}
                        {item.permission_in_team === Role.OWNER && <TeamRemoveButtonAndModal teamId={item.id} />}
                    </View>

                    <View style={[styles.membersContent, { display: isMembersShow ? "flex" : "none" }]}>
                        <Pressable onPress={closeMembers}>
                            <Octicons name="x" size={14} color="white" />
                        </Pressable>

                        <FlatList
                            data={membersInTeamLocal}
                            keyExtractor={(item) => `team_${item.team_id}_member_${item.id}`}
                            renderItem={({ item: member }) => (
                                <View style={[styles.memberCard]}>
                                    <View style={styles.member}>
                                        <ThemedText>{`${member.name} ${member.surname}`}</ThemedText>

                                        {hasGrandestRole(item.permission_in_team, member.permission_level_id) && (
                                            <View style={styles.membersButtonContainer}>
                                                <Pressable onPress={() => deleteUser(member.id)}>
                                                    <Octicons name="trash" size={16} color="white" />
                                                </Pressable>

                                                <Pressable
                                                    onPress={() =>
                                                        setShowRoleForMemberId((prev) =>
                                                            prev === member.id ? null : member.id,
                                                        )
                                                    }
                                                >
                                                    <Octicons name="gear" size={16} color="white" />
                                                </Pressable>
                                            </View>
                                        )}
                                    </View>

                                    {showRoleForMemberId === member.id && (
                                        <View>
                                            {roles.map((role) => {
                                                const isSelected = roleToChange === Role[role as keyof typeof Role];
                                                return (
                                                    <TouchableOpacity key={role}>
                                                        <Pressable
                                                            onPress={() =>
                                                                setRoleToChange(Role[role as keyof typeof Role])
                                                            }
                                                            style={[
                                                                styles.roleOption,
                                                                isSelected && styles.selectedRoleOption,
                                                            ]}
                                                        >
                                                            <ThemedText style={isSelected && styles.selectedRoleText}>
                                                                {role}
                                                            </ThemedText>
                                                        </Pressable>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                            <View style={styles.roleButtons}>
                                                <Pressable onPress={() => updateRole(roleToChange, member.id)}>
                                                    <Octicons name="check" size={14} color="white" />
                                                </Pressable>
                                                <Pressable onPress={() => setShowRoleForMemberId(null)}>
                                                    <Octicons name="x" size={14} color="white" />
                                                </Pressable>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )}
                            onEndReached={() => {
                                if (hasMore && !isLoadingMore) {
                                    getData();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={() =>
                                isLoadingMore ? (
                                    <View style={styles.loading}>
                                        <ActivityIndicator size="small" color="#007aff" />
                                    </View>
                                ) : null
                            }
                        />
                    </View>
                </ThemedView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    teamContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: "#2a2a2a",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#444",
    },
    activeTeam: {
        borderColor: "#007aff",
        backgroundColor: "#1e1e1e",
    },
    teamText: {
        fontSize: 18,
        color: "#eaeaea",
        fontWeight: "600",
    },
    topNav: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    topButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#007aff",
    },
    buttonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
    content: {
        flex: 1,
        backgroundColor: "#1e1e1e",
    },
    membersContent: {
        position: "absolute",
        right: 0,
        top: 0,
        height: "100%",
        width: "70%",
        backgroundColor: "#151515",
        padding: 20,
        borderLeftWidth: 1,
        borderLeftColor: "#333",
    },
    memberCard: {
        backgroundColor: "#222",
        padding: 12,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333",
    },
    member: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    membersButtonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    roleChangeContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#2e2e2e",
        borderRadius: 8,
    },
    roleButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    roleButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#007aff",
    },
    roleButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    roleOption: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#333",
        marginBottom: 6,
    },
    selectedRoleOption: {
        backgroundColor: "#007aff",
    },
    selectedRoleText: {
        color: "#fff",
    },
    loading: {
        padding: 10,
        alignItems: "center",
    },
});

export default TeamItem;
