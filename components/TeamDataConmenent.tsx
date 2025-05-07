import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { TeamType } from '@/types/Team';

interface TeamVisibilityProps {
    setModalVisible: (id: number) => void;
    modlVisible: number;
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

    return (
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
        backgroundColor: 'rgba(51, 51, 51, 0.3)', // Wyróżnienie aktywnego zespołu
    },
    teamText: {
        fontSize: 18,
        color: '#ddd',
    },
});

export default TeamItem;
