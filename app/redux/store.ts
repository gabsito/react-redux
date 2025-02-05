import { configureStore } from "@reduxjs/toolkit";
import cursosReducer from "./reducers/cursosSlice";
import estudiantesReducer from "./reducers/estudiantesSlice";
import inscripcionesReducer from "./reducers/inscripcionesSlice";

export const store = configureStore({
  reducer: {
    cursos: cursosReducer,
    estudiantes: estudiantesReducer,
    inscripciones: inscripcionesReducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
