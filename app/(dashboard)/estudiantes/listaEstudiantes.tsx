'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { eliminarEstudiante } from '@/app/redux/reducers/estudiantesSlice';

const ListaEstudiantes = () => {
    const estudiantes = useSelector((state: RootState) => state.estudiantes.estudiantes);
    const dispatch = useDispatch();

    if (estudiantes.length === 0) {
      return <p>No hay estudiantes registrados</p>;
    }
  
    return (
      <List>
        {estudiantes.map(estudiante => (
          <ListItem key={estudiante.id}>
            <ListItemText primary={estudiante.nombre} secondary={estudiante.matricula} />
            <Button onClick={() => dispatch(eliminarEstudiante(estudiante.id))} color="error">Eliminar</Button>
          </ListItem>
        ))}
      </List>
    );
  };

export default ListaEstudiantes;