import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { authSlice } from './slices/authSlice';
import { sshSlice } from './slices/sshSlice';
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    ssh: sshSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);