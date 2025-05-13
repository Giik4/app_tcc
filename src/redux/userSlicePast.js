import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  username: null,
  email: null,
  name: null,
  id: null,
  createdAt: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValues,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.createdAt = action.payload.createdAt;
    },

    clearUser: state => {
      Object.assign(state, initialValues);
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
