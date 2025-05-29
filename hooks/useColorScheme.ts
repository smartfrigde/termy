import { store } from "@/core/store";
import { useColorScheme as original } from "react-native";

export function useColorScheme() {
    const settings = store.getState().setting.settings;
    if (settings.theme !== "system") {
        return settings.theme;
    } else return original();
}
