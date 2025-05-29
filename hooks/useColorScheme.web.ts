import { store } from "@/core/store";
import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
    const settings = store.getState().setting.settings;
    if (settings.theme !== "system") {
        return settings.theme;
    }
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    const colorScheme = useRNColorScheme();

    if (hasHydrated) {
        return colorScheme;
    }

    return "light";
}
