import type React from "react";
import { type GestureResponderEvent, Pressable, type StyleProp, StyleSheet, Text, type ViewStyle } from "react-native";

interface ThemedButtonProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    tabIndex?: 0 | -1 | undefined;
    onPress?: (event: GestureResponderEvent) => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, style, tabIndex }) => {
    const styling = (Array.isArray(style) ? style : [style]) ?? null;
    return (
        <Pressable tabIndex={tabIndex} style={[...styling, styles.button]} onPress={onPress}>
            <Text tabIndex={tabIndex} style={[styles.text]}>
                {title}
            </Text>
        </Pressable>
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
