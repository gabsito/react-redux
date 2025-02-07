import { Curso } from "../interfaces/curso";
import { Estudiante } from "../interfaces/estudiante";
import { Inscripcion } from "../interfaces/inscripcion";

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

const validarInscripcion = (inscripcion: Inscripcion, inscripciones: Inscripcion[], cursos: Curso[], estudiantes: Estudiante[]) => {
    if (inscripcion.id === '' || inscripcion.id === '') {
        return {
            message: 'Todos los campos son obligatorios',
            severity: 'error'
        };
    }
    if (estudiantes.find(e => e.id === inscripcion.estudianteId) === undefined) {
        return {
            message: 'Estudiante no encontrado',
            severity: 'error'
        };
    }
    if (inscripciones.find(i => i.estudianteId === inscripcion.estudianteId && i.cursoId === inscripcion.cursoId)) {
        return {
            message: 'El estudiante ya esta inscrito en el curso',
            severity: 'error'
        };
    }
    let curso = cursos.find(c => c.id === inscripcion.cursoId);
    if (curso === undefined) {
        return {
            message: 'Curso no encontrado',
            severity: 'error'
        };
    }
    let inscripcionesEstudiante = inscripciones.filter(i => i.estudianteId === inscripcion.estudianteId);
    let horarioInicioCurso = parseInt(curso.horarioInicio.replace(':', ''));
    let horarioFinCurso = parseInt(curso.horarioFin.replace(':', ''));
    for (let i of inscripcionesEstudiante) {
        let c = cursos.find(c => c.id === i.cursoId);
        let horarioInicio = parseInt(c!.horarioInicio.replace(':', ''));
        let horarioFin = parseInt(c!.horarioFin.replace(':', ''));
        if (curso.codigo === c!.codigo) {
            return {
                message: 'El estudiante esta inscrito en otro paralelo del mismo curso',
                severity: 'error'
            };
        }
        if (horarioInicioCurso >= horarioInicio && horarioInicioCurso <= horarioFin) {
            return {
                message: 'El estudiante esta inscrito en otro curso en el mismo horario',
                severity: 'error'
            };
        }
        if (horarioFinCurso >= horarioInicio && horarioFinCurso <= horarioFin) {
            return {
                message: 'El estudiante esta inscrito en otro curso en el mismo horario',
                severity: 'error'
            };
        }
    }
    return {
        message: 'El estudiante ha sido inscrito con exito',
        severity: 'success'
    };
}

export { validarCurso, validarEstudiante, validarInscripcion };