'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { agregarInscripcion } from '@/app/redux/reducers/inscripcionesSlice';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { Curso } from '@/app/interfaces/curso';
import { v4 as uuidv4 } from 'uuid';

const dias = (curso: Curso) => {
    let dias = '';
    curso.dias.forEach(dia => {
        dias += dia + ' ';
    });
    return dias;
};

const ListaCursos = () => {
    const cursos = useSelector((state: RootState) => state.cursos.cursos);
    const estudiante = useSelector((state: RootState) => state.estudiantes.estudiante);
    const dispatch = useDispatch();

    const inscribirse = (cursoId: string) => {
        const curso = cursos.find(curso => curso.id === cursoId);
        if (curso) {
            dispatch(agregarInscripcion({
                id: uuidv4(),
                cursoId: curso.id,
                estudianteId: estudiante!.id,
                paralelo: curso.paralelo,
            }));
        }
    };

    if (cursos.length === 0) {
      return <p>No hay cursos disponibles</p>;
    }
  
    return (
        <>
            <List>
                {cursos.map(curso => (
                    <ListItem key={curso.id}>
                    <ListItemText primary={curso.nombre + ' Paralelo: ' + curso.paralelo} secondary={dias(curso) + curso.horarioInicio + " - " + curso.horarioFin} />
                    <Button onClick={() => inscribirse(curso.id)} >Inscribirse</Button>
                </ListItem>
                ))}
            </List>
        </>
    );
  };

export default ListaCursos;