import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/Api';

// Thunk para buscar todas as plantações
export const fetchPlantations = createAsyncThunk(
  'plantations/fetchAll',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token; // Acessa o token do Redux
      console.log('Token:', token); // Verifica se o token está sendo acessado corretamente
      const response = await api.get('/plantations/list', {
        headers: {Authorization: `Bearer ${token}`},
      });

      return response.data.plantations.map(plantation => ({
        id: plantation.id,
        name: plantation.name,
        crop: plantation.crop,
        latitude: plantation.latitude,
        longitude: plantation.longitude,
        seed: plantation.seed,
        description: plantation.description,
        datePlanted: plantation.date_planted,
        createdAt: plantation.created_at,
        updatedAt: plantation.updated_at,
      }));
    } catch (error) {
      console.log(
        'Erro ao buscar plantações:',
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao carregar plantações',
      );
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const plantationsSlice = createSlice({
  name: 'plantations',
  initialState,
  reducers: {
    // Reducer opcional para limpar os dados
    clearPlantations: state => {
      state.list = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlantations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlantations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlantations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearPlantations} = plantationsSlice.actions;
export default plantationsSlice.reducer;
