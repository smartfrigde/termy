import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SpecialKeys() {
    const keys = ['Esc', 'Ctrl', 'Alt', 'Shift', 'Tab', 'Enter', 'Backspace', 'Delete', 'Home', 'End', 'Page Up', 'Page Down'];

    return (
        <View style={styles.container}>
            {keys.map((key) => (
                <TouchableOpacity key={key} style={styles.button}>
                    <Text style={styles.buttonText}>{key}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 5,
        backgroundColor: '#d3d3d3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
