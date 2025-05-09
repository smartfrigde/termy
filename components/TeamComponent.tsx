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
        borderRadius: 12,
        backgroundColor: '#2a2a2a',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#444',
    },
    activeTeam: {
        borderColor: '#007aff',
        backgroundColor: '#1e1e1e',
    },
    teamText: {
        fontSize: 18,
        color: '#eaeaea',
        fontWeight: '600',
    },
    topNav: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    topButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#007aff',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    membersContent: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '70%',
        backgroundColor: '#151515',
        padding: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#333',
    },
    memberCard: {
        backgroundColor: '#222',
        padding: 12,
        marginVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    member: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    membersButtonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    roleChangeContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2e2e2e',
        borderRadius: 8,
    },
    roleButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    roleButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#007aff',
    },
    roleButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    roleOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    marginBottom: 5,
    alignItems: 'center',
},
selectedRoleOption: {
    backgroundColor: '#007aff',
},
selectedRoleText: {
    color: '#fff',
    fontWeight: 'bold',
},
});

export default TeamItem;