import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Estudiante } from "@/app/interfaces/estudiante";

interface EstudiantesState {
  estudiantes: Estudiante[];
}

const initialState: EstudiantesState = {
  estudiantes: [],
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
  },
});

export const { agregarEstudiante, eliminarEstudiante } = estudiantesSlice.actions;
export default estudiantesSlice.reducer;
