import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface ThemedButtonProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
    theme?: 'light' | 'dark';
}

const GradientButton: React.FC<ThemedButtonProps> = ({ title, onPress, theme = 'dark', style }) => {
    const isDark = theme === 'light';
    const styling = (Array.isArray(style) ? style : [style]) ?? null;
    return (
        <LinearGradient style={[...styling, styles.button]} colors={['#d5ccca', '#b1a5a3']}
            >
            <TouchableOpacity
                style={styles.touchable}
                onPress={onPress}
            >
                <Text style={[styles.text, isDark ? styles.darkText : styles.lightText]}>{title}</Text>

            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    touchable: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    text: {
        fontSize: 16,
        fontWeight: 'semibold',
    },
    lightText: {
        color: '#000',
    },
    darkText: {
        color: '#fff',
    },
});

export default GradientButton;