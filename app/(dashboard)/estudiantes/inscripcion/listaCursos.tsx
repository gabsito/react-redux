'use client';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Alert, Button, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import { Curso } from '@/app/interfaces/curso';
import { validarInscripcion } from '@/app/services/validator';
import { saveInscripcion } from '@/app/services/saveService';
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
    const inscripciones = useSelector((state: RootState) => state.inscripciones.inscripciones);
    const estudiantes = useSelector((state: RootState) => state.estudiantes.estudiantes);
    const estudiante = useSelector((state: RootState) => state.estudiantes.estudiante);
    const dispatch = useDispatch();

    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState<'error' | 'warning' | 'info' | 'success'>('error');
    const [alertMessage, setAlertMessage] = React.useState('');
    const closeAlert = () => setOpenAlert(false);

    const inscribirse = (cursoId: string) => {
        const curso = cursos.find(curso => curso.id === cursoId);
        if (curso) {
            let inscripcion = {
                id: uuidv4(),
                cursoId: curso.id,
                estudianteId: estudiante!.id,
                paralelo: curso.paralelo,
            };
            let result = validarInscripcion(inscripcion, inscripciones, cursos, estudiantes);
            if (result.severity === 'error') {
                setAlertSeverity('error');
                setAlertMessage(result.message);
                setOpenAlert(true);
                return;
            }
            setAlertSeverity('success');
            setAlertMessage(result.message);
            setOpenAlert(true);
            saveInscripcion(inscripcion, dispatch);

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
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlert}>
                <Alert
                    onClose={closeAlert}
                    severity={alertSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
  };

export default ListaCursos;