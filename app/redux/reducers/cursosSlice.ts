import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Curso } from "@/app/interfaces/curso";

interface CursosState {
  cursos: Curso[];
}

const initialState: CursosState = {
  cursos: [],
};

export const cursosSlice = createSlice({
  name: "cursos",
  initialState,
  reducers: {
    agregarCurso: (state, action: PayloadAction<Curso>) => {
      state.cursos.push(action.payload);
    },
    eliminarCurso: (state, action: PayloadAction<string>) => {
      state.cursos = state.cursos.filter(curso => curso.id !== action.payload);
    },
  },
});

export const { agregarCurso, eliminarCurso } = cursosSlice.actions;
export default cursosSlice.reducer;
