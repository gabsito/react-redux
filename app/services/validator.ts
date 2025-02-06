import { Curso } from "../interfaces/curso";
import { Estudiante } from "../interfaces/estudiante";
import { Dayjs } from 'dayjs';


const validarCurso = (curso: Curso, cursos: Curso[]) => {
    if (curso.nombre === '' || curso.codigo === '' || curso.descripcion === '' || curso.dias.length === 0 || curso.horarioInicio === '' || curso.horarioFin === '' || curso.paralelo === 0) {
        return {
            message: 'Todos los campos son obligatorios',
            severity: 'error'
        };
    }
    if (curso.horarioInicio >= curso.horarioFin) {
        return {
            message: 'La hora de inicio debe ser menor a la hora de fin',
            severity: 'error'
        };
    }
    if (isNaN(curso.paralelo)) {
        return {
            message: 'El paralelo debe ser un numero',
            severity: 'error'
        };
    }
    if (cursos.find(c => c.codigo === curso.codigo && c.paralelo === curso.paralelo)) {
        return {
            message: 'Ya existe un curso con el mismo codigo y paralelo',
            severity: 'error'
        };
    }
    return {
        message: 'Curso valido',
        severity: 'success'
    };
}

const validarEstudiante = (estudiante: Estudiante, estudiantes: Estudiante[]) => {
    if (estudiante.nombre === '' || estudiante.matricula === '') {
        return {
            message: 'Todos los campos son obligatorios',
            severity: 'error'
        };
    }
    if (estudiantes.find(e => e.matricula === estudiante.matricula)) {
        return {
            message: 'Ya existe un estudiante con la misma matricula',
            severity: 'error'
        };
    }
    return {
        message: 'Estudiante valido',
        severity: 'success'
    };
}

export { validarCurso, validarEstudiante };