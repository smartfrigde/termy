import { Alert, Platform } from "react-native";

export function showAlert(message: string,title?: string) {
    switch (Platform.OS) {
        case 'ios':
        case 'android':
            Alert.alert(title ?? "Termy", message)
            break;
        case 'web':
            alert(message);
    }
   
}