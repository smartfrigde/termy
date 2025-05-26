import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { ModalTextInput } from "./ui/ModalTextInput";

export type ThemedTextProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "modal";
};

export function ThemedTextInput({ style, type = "default", lightColor, darkColor, ...rest }: ThemedTextProps) {
    const bgColor = useThemeColor({ light: lightColor, dark: darkColor }, "backgroundInput");
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    if (type === "modal") {
        return (
            <ModalTextInput style={[styles.input, { backgroundColor: bgColor, color: textColor }, style]} {...rest} />
        );
    }
    if (type === "default") {
        return <TextInput style={[styles.input, { backgroundColor: bgColor, color: textColor }, style]} {...rest} />;
    }
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
});
