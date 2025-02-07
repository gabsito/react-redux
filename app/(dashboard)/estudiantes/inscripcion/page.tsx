'use client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { Curso } from '@/app/interfaces/curso';
import ListaCursos from './listaCursos';
import { quitarInscripcion } from '@/app/services/saveService';
import { Inscripcion } from '@/app/interfaces/inscripcion';

const dias = (curso: Curso) => {
    let dias = '';
    curso.dias.forEach(dia => {
        dias += dia + ' ';
    });
    return dias;
};

const filtrarInscripcion = (inscripciones: Inscripcion[], cursoId: string) => {
    let inscripcionesf = inscripciones.filter(insc => insc.cursoId === cursoId);
    if (inscripcionesf.length > 0) {
        return inscripcionesf[0].id;
    }
    return '';
}

export default function InscripcionPage() {
    // read the current student from the store
    const estudiante = useSelector((state: RootState) => state.estudiantes.estudiante);
    const cursos = useSelector((state: RootState) => state.cursos.cursos);
    const inscripcionesEstudiante = useSelector((state: RootState) => state.inscripciones.inscripciones.filter(insc => insc.estudianteId === estudiante!.id));
    const cursosEstudiante = cursos.filter(curso => inscripcionesEstudiante.find(insc => insc.cursoId === curso.id));
    const dispatch = useDispatch();

    if (estudiante  === null) {
        return <p>Estudiante no encontrado</p>;
    } 
    if (inscripcionesEstudiante.length < 1) {
        const inscripciones = () => {
            return (
                <p>No tienes inscripciones</p>
            );
        };
    }
    const inscripciones = () => {
        return (
            <List>
                {cursosEstudiante.map(curso => (
                    <ListItem key={curso.id}>
                        <ListItemText primary={curso.nombre + ' paralelo: ' + curso.paralelo} secondary={dias(curso) + curso.horarioInicio + " - " + curso.horarioFin} />
                        <Button onClick={() => quitarInscripcion(filtrarInscripcion(inscripcionesEstudiante, curso.id), dispatch)} color='error'>Eliminar</Button>
                    </ListItem>
                ))}
            </List>
        );
    };


    return (
        <div>
        <h1>Bienvenido {estudiante.nombre}</h1>
        <h2>Inscripciones</h2>
        {inscripciones()}
        <p>Estos son los cursos disponibles:</p>
        <ListaCursos />
        </div>
    );
}