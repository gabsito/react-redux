'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { eliminarCurso, agregarCurso } from '@/app/redux/reducers/cursosSlice';
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
    const dispatch = useDispatch();

    const agregarParalelo = (cursoId: string) => {
        let curso = cursos.find(c => c.id === cursoId);
        if (!curso) return;
        let cursoNuevo = { ...curso };
        cursoNuevo.paralelo++;
        cursoNuevo.id = uuidv4();
        dispatch(agregarCurso(cursoNuevo));
    };

    if (cursos.length === 0) {
      return <p>No hay cursos registrados</p>;
    }
  
    return (
      <List>
        {cursos.map(curso => (
          <ListItem key={curso.id}>
            <ListItemText primary={curso.nombre + ' Paralelo: ' + curso.paralelo} secondary={dias(curso) + curso.horarioInicio + " - " + curso.horarioFin} />
            <Button onClick={() => agregarParalelo(curso.id)} >Agregar Paralelo</Button>
            <Button onClick={() => dispatch(eliminarCurso(curso.id))} color="error">Eliminar</Button>
          </ListItem>
        ))}
      </List>
    );
  };

export default ListaCursos;