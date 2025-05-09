import { ThemedText } from '@/components/ThemedText';
import { TeamType } from '@/types/Team';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedView } from './ThemedView';
import {
    hasMoreMembers,
    membersInTeam,
    teamCurrentPage,
    addTeamMember,
    PageData,
    Members, removeTeamMember, setTeamMember
} from '@/core/slices/teamsMembersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch} from '@/core/store';
import {getMembers, deleteMember, updateMemberRole} from '@/core/teamManager';
import { MembersResponse, TeamPageData } from '@/types/TeamMember';
import {selectUser} from "@/core/slices/authSlice";
import {Role, hasGrandestRole, getRolesAtOrBelow} from '@/types/enums/TeamRoleEnum.d';
import {JoinCodeDisplay} from "@/components/TeamJoinCodeDisplay";
import {Octicons} from "@expo/vector-icons";

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
        if (hasMore){
            getData();
        }
    };
    const closeMembers = () => {
        setIsMembersShow(!isMembersShow)
    };
    const deleteUser = async (userId: number) => {
        const response = await deleteMember(item.id, userId);
        if (!response === null) {
            dispatch(
                removeTeamMember(userId)
            );
        }
    };
    const getData = async () => {
        if (isFetching) return;
        setIsFetching(true);

        try {
            const data = await getMembers(item.id, currentTeamsPageLocal + 1);
            if (data?.members && Array.isArray(data.members)) {
                data.members.forEach((member: MembersResponse) => {
                    const pageData: TeamPageData = {
                        team_id: data.team_id,
                        current_page: data.current_page,
                        total_pages: data.total_pages,
                        total_members: data.total_members
                    };
                    
                    dispatch(
                        addTeamMember({
                            members: member,
                            pageData: pageData,
                        }
                        )
                    );
                });
            }
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setIsFetching(false);
        }
    };
    const [showRoleForMemberId, setShowRoleForMemberId] = useState<number | null>(null);

    const roles = getRolesAtOrBelow(item.permission_in_team);

    async function updateRole(newRole: number, userId: number) {
        const response = await updateMemberRole(item.id, userId, newRole);

        if (response && response.member) {
            setTeamMember(response.member);
        }

    }

    // @ts-ignore
    return (
        <>
            <Pressable
                style={[
                    styles.teamContainer,
                    visibleTeamId === item.id && styles.activeTeam,
                ]}
                onPress={handlePress}
            >
                <ThemedText style={styles.teamText} type="defaultSemiBold">
                    {item.name}
                </ThemedText>
            </Pressable>

            <Modal visible={visibleTeamId === item.id} animationType="slide">
                <ThemedView style={styles.content}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.topButton} onPress={onExitPress}>
                            <Text style={styles.buttonText}>exit</Text>
                        </TouchableOpacity>

                        <ThemedText>{`Team ${item.name}`}</ThemedText>
                        {(item.permission_in_team === Role.ADMINISTRATOR || item.permission_in_team === Role.OWNER) && (
                            <TouchableOpacity
                                style={[styles.topButton]}
                                onPress={onMembersPress}
                            >
                                <Text style={styles.buttonText}>members</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={{ margin: 20 }}>
                    {(item.permission_in_team === Role.ADMINISTRATOR || item.permission_in_team === Role.OWNER) && (
                            <JoinCodeDisplay joinCode={item.join_code}/>
                        )}
                    </View>

                    <View style={[styles.membersContent, { display: isMembersShow ? 'flex' : 'none' }]}>
                        <Pressable onPress={closeMembers}>
                            <Octicons name="x" size={14} color="white" />
                        </Pressable>

                        {membersInTeamLocal && membersInTeamLocal.length > 0 && (
                            membersInTeamLocal.map((member: MembersResponse) => {
                                const showRoleUI = showRoleForMemberId === member.id;

                                return (
                                    <View
                                        key={`team_${item.id}_member_${member.id}`}
                                        style={[styles.memberCard]}
                                    >
                                        <View style={styles.member}>
                                            <ThemedText>{member.name + " " + member.surname}</ThemedText>

                                            {hasGrandestRole(item.permission_in_team, member.permission_level_id) && (
                                                <View style={styles.membersButtonContainer}>
                                                    <Pressable onPress={() => deleteUser(member.id)}>
                                                        <Octicons name="trash" size={16} color="white" />
                                                    </Pressable>

                                                    <Pressable onPress={() =>
                                                        setShowRoleForMemberId(prev => prev === member.id ? null : member.id)
                                                    }>
                                                        <Octicons name="gear" size={16} color="white" />
                                                    </Pressable>
                                                </View>
                                            )}
                                        </View>

                                        {showRoleUI && (
                                            <View style={styles.roleChangeContainer}>
                                                {roles.map((role) => (
                                                    <TouchableOpacity key={role}>
                                                        <Pressable onPress={() =>
                                                            setRoleToChange(Role[role as keyof typeof Role])
                                                        }>
                                                            <ThemedText>{role}</ThemedText>
                                                        </Pressable>
                                                    </TouchableOpacity>
                                                ))}
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
                                );
                            })
                        )}
                    </View>

                </ThemedView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
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
    activeTeam: {
        backgroundColor: 'rgba(51, 51, 51, 0.3)',
    },
    teamText: {
        fontSize: 18,
        color: '#ddd',
    },
    topButton: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: "rgba(0,122,255,1.00)",
    },
    topNav: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    content: {
        flex: 1,
    },
    membersContent: {
        "position": "fixed",
        "backgroundColor": "#111213",
        "top": 0,
        "right": 0,
        "paddingTop": 30,
        "paddingRight": 20,
        "paddingBottom": 30,
        "paddingLeft": 20,
        "height": "100%",
        "minWidth": "60%"
    },

    memberDeleteButton: {
        "backgroundColor": "#c31515",
        "color": "white",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "borderTopLeftRadius": 20,
        "borderTopRightRadius": 20,
        "borderBottomRightRadius": 20,
        "borderBottomLeftRadius": 20
    },

    memberEditButton: {
        backgroundColor: "rgba(0, 122, 255, 1.00);",
        "color": "white",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "borderTopLeftRadius": 20,
        "borderTopRightRadius": 20,
        "borderBottomRightRadius": 20,
        "borderBottomLeftRadius": 20
    },

    member: {
        "display": "flex",
        "flexDirection": "row",
        "justifyContent": "space-between"
    },

    membersButtonContainer: {
        "flexDirection": "row",
        "gap": 8
    },

    memberCard: {
        backgroundColor: '#222',
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
    },
    roleChangeContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    roleButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});

export default TeamItem;