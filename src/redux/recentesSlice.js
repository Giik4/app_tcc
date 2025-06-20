import {createSlice} from '@reduxjs/toolkit';

const MAX_RECENTES = 3;

const recentesSlice = createSlice({
  name: 'recentes',
  initialState: {
    acessos: [],
  },
  reducers: {
    adicionarAcesso: (state, action) => {
      const existe = state.acessos.find(p => p.id === action.payload.id);
      if (existe) {
        state.acessos = state.acessos.filter(p => p.id !== action.payload.id);
      }
      state.acessos.unshift(action.payload);
      if (state.acessos.length > MAX_RECENTES) {
        state.acessos.pop();
      }
    },
    limparAcessos: state => {
      state.acessos = [];
    },
    filtrarAcessosInvalidos: (state, action) => {
      const idsValidos = action.payload;
      state.acessos = state.acessos.filter(p => idsValidos.includes(p.id));
    },
  },
});

export const {adicionarAcesso, limparAcessos, filtrarAcessosInvalidos} =
  recentesSlice.actions;
export default recentesSlice.reducer;
