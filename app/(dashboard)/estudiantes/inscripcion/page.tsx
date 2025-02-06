'use client';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import ListaCursos from './listaCursos';

export default function InscripcionPage() {
    // read the current student from the store
    const estudiante = useSelector((state: RootState) => state.estudiantes.estudiante);
    if (estudiante  === null) {
        return <h1>Estudiante no encontrado</h1>;
    } 
    return (
        <div>
        <h1>Bienvenido {estudiante.nombre}</h1>
        <p>Estos son los cursos disponibles:</p>
        <ListaCursos />
        </div>
    );
}