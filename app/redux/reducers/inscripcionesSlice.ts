import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inscripcion } from "@/app/interfaces/inscripcion";

interface InscripcionesState {
  inscripciones: Inscripcion[];
}

const initialState: InscripcionesState = {
  inscripciones: [],
};

export const inscripcionesSlice = createSlice({
  name: "inscripciones",
  initialState,
  reducers: {
    agregarInscripcion: (state, action: PayloadAction<Inscripcion>) => {
      state.inscripciones.push(action.payload);
    },
    eliminarInscripcion: (state, action: PayloadAction<string>) => {
      state.inscripciones = state.inscripciones.filter(insc => insc.id !== action.payload);
    },
  },
});

export const { agregarInscripcion, eliminarInscripcion } = inscripcionesSlice.actions;
export default inscripcionesSlice.reducer;
