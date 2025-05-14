import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { authSlice } from "./slices/authSlice";
import { sshSlice } from "./slices/sshSlice";
import { teamSlice } from "./slices/teamSlice";
import { teamMembersSlice } from "./slices/teamsMembersSlice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    ssh: sshSlice.reducer,
    team: teamSlice.reducer,
    team_members: teamMembersSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["ssh", "team_members", "team"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
