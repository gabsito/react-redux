import { Curso } from "../interfaces/curso";
import { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { agregarCurso } from "../redux/reducers/cursosSlice";

const saveCurso = (
    nombre: string,
    codigo: string,
    descripcion: string,
    dias: string[],
    horarioInicio: Dayjs,
    horarioFin: Dayjs,
    paralelo: number,
    dispatch: ReturnType<typeof useDispatch>
) => {
    const curso: Curso = {
        id: uuidv4(),
        nombre,
        codigo,
        descripcion,
        dias,
        horarioInicio: horarioInicio.format('HH:mm'),
        horarioFin: horarioFin.format('HH:mm'),
        paralelo,
    };
    dispatch(agregarCurso(curso));
};

export default saveCurso;