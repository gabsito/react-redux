'use client'; 
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cursosReducer from "./reducers/cursosSlice";
import estudiantesReducer from "./reducers/estudiantesSlice";
import inscripcionesReducer from "./reducers/inscripcionesSlice";

const persistedState = localStorage.getItem("reduxState")
                      ? JSON.parse(localStorage.getItem("reduxState")!)
                      : {};


const rootReducer = combineReducers({
  cursos: cursosReducer,
  estudiantes: estudiantesReducer,
  inscripciones: inscripcionesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
