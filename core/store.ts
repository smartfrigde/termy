import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { sshSlice } from './slices/sshSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ssh: sshSlice.reducer
  },
});