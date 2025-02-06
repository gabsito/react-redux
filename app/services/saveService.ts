import { Curso } from "../interfaces/curso";
import { Dayjs } from 'dayjs';
import { useDispatch } from "react-redux";
import { agregarCurso } from "../redux/reducers/cursosSlice";

const saveCurso = (
    curso: Curso,
    dispatch: ReturnType<typeof useDispatch>
) => {
    dispatch(agregarCurso(curso));
};

export default saveCurso;