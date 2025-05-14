import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setApiToken, setRefreshToken, setUser } from "./slices/authSlice";

export async function store(key: string, value: any) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // saving error
    }
}
export async function read(key: string) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
    }
}

export async function loadLocalData() {
    const dispatch = useDispatch();
    dispatch(setUser(await read("user")));
    dispatch(setApiToken(await read("apiToken")));
    dispatch(setRefreshToken(await read("refreshToken")));
}
