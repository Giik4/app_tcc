import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/Api';

// Thunk para buscar o usuário
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      const response = await api.get('/users', {
        headers: {Authorization: `Bearer ${token}`},
      });

      const user = response.data;
      return {
        username: user.username,
        email: user.email,
        name: user.name,
        id: user.id,
        createdAt: user.created_at,
      };
    } catch (error) {
      console.log(
        'Erro ao buscar usuário:',
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao carregar usuário',
      );
    }
  },
);

const initialState = {
  username: null,
  email: null,
  name: null,
  id: null,
  createdAt: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const {username, email, name, id, createdAt} = action.payload;
        state.username = username;
        state.email = email;
        state.name = name;
        state.id = id;
        state.createdAt = createdAt;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearUser} = userSlice.actions;
export default userSlice.reducer;
