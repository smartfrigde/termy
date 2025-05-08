import { ThemedText } from '@/components/ThemedText';
import { TeamType } from '@/types/Team';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { ThemedView } from './ThemedView';

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
    const handlePress = () => {
        setVisibility.setModalVisible(item.id);
    };

    const onExitPress = () => {
        setVisibility.setModalVisible(-1);
    }

    const onMembersPress = () =>{

    }

    return (
        <>
            <Pressable
                style={[
                    styles.teamContainer,
                    visibleTeamId === item.id && styles.activeTeam,
                ]}
                onPress={handlePress}>
                <ThemedText style={styles.teamText} type="defaultSemiBold">
                    {item.name}
                </ThemedText>
            </Pressable>
            <Modal visible={visibleTeamId === item.id} >
                <ThemedView style={styles.content}>
                    <View style={styles.topNav}>
                        <TouchableOpacity style={styles.topButton} onPress={onExitPress}>
                            <Text style={styles.buttonText}>exit</Text>
                        </TouchableOpacity>

                        <ThemedText>{`Team ${item.name}`}</ThemedText>

                        <TouchableOpacity style={styles.topButton} onPress={onMembersPress}>
                            <Text style={styles.buttonText}>members</Text>
                        </TouchableOpacity>
                    </View>
                    <View>

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
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10,
        "borderWidth": 0,
        "borderColor": "black",
        "borderStyle": "solid",
        "backgroundColor": "#94c9ff"
    },

    topNav: {
        "paddingTop": 10,
        "paddingRight": 20,
        "paddingBottom": 10,
        "paddingLeft": 20,
        "gap": 8,
        "display": "flex",
        "justifyContent": "space-between",
        "flexDirection": "row",
        "backgroundColor": "rgba(0, 0, 0, 0.2)"
    },

    buttonText: {
        fontSize: 16,
        color: '#000',
    },

    content: {
        flex: 1
    }
});

export default TeamItem;
