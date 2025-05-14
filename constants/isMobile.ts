import { Platform } from "react-native";

const isMobile = (): boolean => {
    if (Platform.OS === "web") {
        return false;
    } else {
        return true;
    }
};

export default isMobile;
