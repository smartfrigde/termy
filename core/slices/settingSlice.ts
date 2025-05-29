import isMobile from "@/constants/isMobile";
import type { Settings } from "@/types/Settings";
import { createSlice } from "@reduxjs/toolkit";
export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        settings: {
            theme: "system",
            fontSize: 16,
            defaultShell: isMobile() ? "native" : "universal",
            language: "system",
            recentConnections: [],
        } as Settings,
    },
    reducers: {
        setSettings: (state, action: { payload: Settings }) => {
            state.settings = action.payload;
        },
        setSetting: (state, action: { payload: { key: keyof Settings; value: Settings[keyof Settings] } }) => {
            const { key, value } = action.payload;
            if (key in state.settings) {
                // @ts-ignore
                state.settings[key] = value;
            } else {
                console.warn(`Setting key "${key}" does not exist in Settings type.`);
            }
        },
    },
});
export const selectSettings = (state: { setting: { settings: Settings } }) => state.setting.settings;
export const { setSettings, setSetting } = settingSlice.actions;
