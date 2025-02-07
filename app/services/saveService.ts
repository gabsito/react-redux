import { useDispatch } from "react-redux";
import { Curso } from "../interfaces/curso";
import { Estudiante } from "../interfaces/estudiante";
import { Inscripcion } from "../interfaces/inscripcion";
import { agregarCurso } from "../redux/reducers/cursosSlice";
import { agregarEstudiante } from "../redux/reducers/estudiantesSlice";
import { agregarInscripcion, eliminarInscripcion } from "../redux/reducers/inscripcionesSlice";
import { store } from "../redux/store";

const saveCurso = (
    curso: Curso,
    dispatch: ReturnType<typeof useDispatch>
) => {
    dispatch(agregarCurso(curso));
};

const saveEstudiante = (
    estudiante: Estudiante,
    dispatch: ReturnType<typeof useDispatch>
) => {
    dispatch(agregarEstudiante(estudiante));
}

const saveInscripcion = (
    inscripcion: Inscripcion,
    dispatch: ReturnType<typeof useDispatch>
) => {
    dispatch(agregarInscripcion(inscripcion));
}

const quitarInscripcion = (
    inscripcionId: string,
    dispatch: ReturnType<typeof useDispatch>
) => {
    if (inscripcionId === '') return;
    dispatch(eliminarInscripcion(inscripcionId));
}

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export { saveCurso, saveEstudiante, saveInscripcion, quitarInscripcion };