import type React from "react";
import {
    type GestureResponderEvent,
    type StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    type ViewStyle,
} from "react-native";

interface ThemedButtonProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, style }) => {
    const styling = (Array.isArray(style) ? style : [style]) ?? null;
    return (
        <TouchableOpacity style={[...styling, styles.button]} onPress={onPress}>
            <Text style={[styles.text]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        backgroundColor: "#0A0A0A",
        borderWidth: 0.2,
        color: "#000",
        borderColor: "#FFF",
        elevation: 5, // For Android shadow
        shadowColor: "#000", // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    text: {
        fontSize: 16,
        fontWeight: "semibold",
        color: "#fff",
    },
});

export default ThemedButton;
