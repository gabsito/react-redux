import { Curso } from "../interfaces/curso";
import { Estudiante } from "../interfaces/estudiante";
import { useDispatch } from "react-redux";
import { agregarCurso } from "../redux/reducers/cursosSlice";
import { agregarEstudiante } from "../redux/reducers/estudiantesSlice";

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

export { saveCurso, saveEstudiante };