import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Estudiante } from "@/app/interfaces/estudiante";

interface EstudiantesState {
  estudiantes: Estudiante[];
  estudiante: Estudiante | null;
}

const initialState: EstudiantesState = {
  estudiantes: [],
  estudiante: null,
};

export const estudiantesSlice = createSlice({
  name: "estudiantes",
  initialState,
  reducers: {
    agregarEstudiante: (state, action: PayloadAction<Estudiante>) => {
      state.estudiantes.push(action.payload);
    },
    eliminarEstudiante: (state, action: PayloadAction<string>) => {
      state.estudiantes = state.estudiantes.filter(est => est.id !== action.payload);
    },
    seleccionarEstudiante: (state, action: PayloadAction<string>) => {
      let estudiante = state.estudiantes.find(est => est.id === action.payload);
      if (estudiante) {
        state.estudiante = estudiante;
      }
    },
    limpiarEstudiante: (state) => {
      state.estudiante = null;
    },
  },
});

export const { agregarEstudiante, eliminarEstudiante, seleccionarEstudiante, limpiarEstudiante } = estudiantesSlice.actions;
export default estudiantesSlice.reducer;
