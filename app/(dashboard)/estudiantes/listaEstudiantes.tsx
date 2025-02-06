'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { eliminarEstudiante, seleccionarEstudiante } from '@/app/redux/reducers/estudiantesSlice';

const ListaEstudiantes = () => {
    const estudiantes = useSelector((state: RootState) => state.estudiantes.estudiantes);
    const dispatch = useDispatch();

    const handleInscribir = (id: string) => {
        dispatch(seleccionarEstudiante(id));
        // go to the inscripcion page
        window.location.href = '/estudiantes/inscripcion';
    };

    if (estudiantes.length === 0) {
      return <p>No hay estudiantes registrados</p>;
    }
  
    return (
      <List>
        {estudiantes.map(estudiante => (
          <ListItem key={estudiante.id}>
            <ListItemText primary={estudiante.nombre} secondary={estudiante.matricula} />
            <Button onClick={() => handleInscribir(estudiante.id)}>Inscribir</Button>
            <Button onClick={() => dispatch(eliminarEstudiante(estudiante.id))} color="error">Eliminar</Button>
          </ListItem>
        ))}
      </List>
    );
  };

export default ListaEstudiantes;