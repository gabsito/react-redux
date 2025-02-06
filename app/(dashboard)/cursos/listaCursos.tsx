'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { eliminarCurso } from '@/app/redux/reducers/cursosSlice';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { Curso } from '@/app/interfaces/curso';

const dias = (curso: Curso) => {
    let dias = '';
    curso.dias.forEach(dia => {
        dias += dia + ' ';
    });
    return dias;
};

const ListaCursos = () => {
    const cursos = useSelector((state: RootState) => state.cursos.cursos);
    const dispatch = useDispatch();

    if (cursos.length === 0) {
      return <p>No hay cursos registrados</p>;
    }
  
    return (
      <List>
        {cursos.map(curso => (
          <ListItem key={curso.id}>
            <ListItemText primary={curso.nombre + ' Paralelo: ' + curso.paralelo} secondary={dias(curso) + curso.horarioInicio + " - " + curso.horarioFin} />
            <Button onClick={() => dispatch(eliminarCurso(curso.id))} color="error">Eliminar</Button>
          </ListItem>
        ))}
      </List>
    );
  };

export default ListaCursos;