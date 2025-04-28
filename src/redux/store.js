import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import authSlice from './authSlice.js';
import plantationSlice from './plantationSlice.js';
import flightSlice from './flightSlice.js';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    plantation: plantationSlice,
    flight: flightSlice,
  },
});
