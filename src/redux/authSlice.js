import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  token: null,
  tokenType: null,
  expirationTime: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValues,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.tokenType = action.payload.tokenType;
      state.expirationTime = Date.now() + 29 * 60 * 1000; // Optional: Set expiration time if needed
    },

    clearAuth: state => {
      Object.assign(state, initialValues);
    },
  },
});

export const {setAuth, clearAuth} = authSlice.actions;

export default authSlice.reducer;
