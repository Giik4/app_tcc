import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../services/Api';

// Thunk para buscar todas os voos
export const fetchFlights = createAsyncThunk(
  'flight/fetchAll',
  async (plantationId, {getState, rejectWithValue}) => {
    try {
      const token = getState().auth.token;
      console.log('Token:', token);
      const response = await api.get(`/plantations/${plantationId}/flights`, {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log(
        `Resposta da API voo para ${plantationId}: ${response.data.flights}`,
      );

      return response.data.flights.map(flight => ({
        id: flight.id,
        aircraft: flight.aircraft,
        flightTime: flight.flight_time,
        distance: flight.distance,
        date: flight.date,
        plantationId: flight.plantation_id,
      }));
    } catch (error) {
      console.log(
        'Erro ao buscar voos:',
        error.response?.data || error.message,
      );
      return rejectWithValue(
        error.response?.data?.message || 'Erro ao carregar voos',
      );
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    // Reducer opcional para limpar os dados
    clearFlight: state => {
      state.list = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFlights.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearFlight} = flightSlice.actions;
export default flightSlice.reducer;
