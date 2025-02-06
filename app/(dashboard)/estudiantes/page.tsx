'use client';
import * as React from 'react';
import ListaEstudiantes from './listaEstudiantes';
import { Alert, Button, Card, CardActions, CardContent, Modal, Snackbar, TextField } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { saveEstudiante } from '@/app/services/saveService';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { validarEstudiante } from '@/app/services/validator';
import { RootState } from '@/app/redux/store';
import { Estudiante } from '@/app/interfaces/estudiante';
import { cardStyle, actionStyle, contentStyle } from '@/app/styles/globals';

export default function EstudiantesPage() {

  const dispatch = useDispatch();
  const [alertSeverity, setAlertSeverity] = React.useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [nombre, setNombre] = React.useState('');
  const [matricula, setMatricula] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    cleanForm();
  };
  const closeAlert = () => setOpenAlert(false);
  const estudiantes = useSelector((state: RootState) => state.estudiantes.estudiantes);

  const cleanForm = () => {
    setNombre('');
    setMatricula('');
  };

  const handleSave = () => {
    let estudiante: Estudiante = {
      id: uuidv4(),
      nombre: nombre,
      matricula: matricula
    };

    let result = validarEstudiante(estudiante, estudiantes);
    if (result.severity ==='error') {
      setAlertSeverity('error');
      setAlertMessage(result.message);
      setOpenAlert(true);
      return;
    }

    setAlertSeverity('success');
    setAlertMessage(result.message);
    setOpenAlert(true);
    saveEstudiante(estudiante, dispatch);
    setOpen(false);
    cleanForm();
  };
  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Crear Estudiante</Button>
      <ListaEstudiantes/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card sx={cardStyle}>
          <CardContent sx={contentStyle}>
            <h2>Crear Estudiante</h2>
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              label="Matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </CardContent>
          <CardActions sx={actionStyle}>
            <Button onClick={handleClose} >Cancelar</Button>
            <Button onClick={handleSave} variant='contained'>Guardar</Button>
          </CardActions>
        </Card>
      </Modal>
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
    </div>
  );
}