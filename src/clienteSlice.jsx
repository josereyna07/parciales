import { createSlice, nanoid } from '@reduxjs/toolkit';


const clientSlice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    addClient: (state, action) => {
      state.push({
        id: nanoid(),
        name: action.payload,
        consultas: [],
        reclamos: [],
      });
    },
    addConsulta: (state, action) => {
      const client = state.find(c => c.id === action.payload.id);
      if (client) client.consultas.push(action.payload.consulta);
    },
    addReclamo: (state, action) => {
      const client = state.find(c => c.id === action.payload.id);
      if (client) client.reclamos.unshift(action.payload.reclamo);
    },
    resolverConsulta: (state, action) => {
      const client = state.find(c => c.id === action.payload);
      if (client) client.consultas.pop();
    },
    resolverReclamo: (state, action) => {
      const client = state.find(c => c.id === action.payload);
      if (client) client.reclamos.shift();
    },
  },
});

export const { addClient, addConsulta, addReclamo, resolverConsulta, resolverReclamo } = clientSlice.actions;
export default clientSlice.reducer;