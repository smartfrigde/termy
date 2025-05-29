import isMobile from "@/constants/isMobile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { authSlice } from "./slices/authSlice";
import { settingSlice } from "./slices/settingSlice";
import { sshSlice } from "./slices/sshSlice";
import { teamSlice } from "./slices/teamSlice";
import { teamMembersSlice } from "./slices/teamsMembersSlice";
import createSecureStorage from "./storage/securestore";
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    ssh: sshSlice.reducer,
    setting: settingSlice.reducer,
    team: teamSlice.reducer,
    team_members: teamMembersSlice.reducer,
});
const secureStorage = createSecureStorage();
const persistConfig = {
    key: "root",
    storage: isMobile() ? secureStorage : AsyncStorage,
    blacklist: ["ssh", "team_members", "team", "setting"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
