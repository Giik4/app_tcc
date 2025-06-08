import {createSlice} from '@reduxjs/toolkit';
import api from '../services/Api';
import {Alert} from 'react-native';

let refreshTimer;

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
      agendarRefresh(action.payload);
    },

    clearAuth: state => {
      clearTimeout(refreshTimer);
      Object.assign(state, initialValues);
    },
  },
});

export const {setAuth, clearAuth} = authSlice.actions;
export default authSlice.reducer;

export const agendarRefresh = refreshToken => {
  if (refreshTimer) clearTimeout(refreshTimer);

  const tempo = 29 * 60 * 1000;
  console.log('Timer iniciado');
  refreshTimer = setTimeout(async () => {
    try {
      const res = await api.post('/auth/refresh', null, {
        headers: {
          Authorization: `${refreshToken.tokenType} ${refreshToken.token}`,
        },
      });

      window.store.dispatch(
        setAuth({
          token: res.data.access_token,
          tokenType: 'Bearer',
          refreshToken: refreshToken,
        }),
      );

      console.log('TOKEN ATUALIZADO');
    } catch (error) {
      console.error('Erro ao renovar token', error);
      window.store.dispatch(clearAuth());
      Alert.alert('Sessão expirada', 'Faça login novamente.');
    }
  }, tempo);
};
