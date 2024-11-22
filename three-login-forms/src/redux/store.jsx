import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Assuming you have an authSlice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth slice
  },
});

export default store;
