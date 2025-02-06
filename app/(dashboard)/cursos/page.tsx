'use client';

import * as React from 'react';
import ListaCursos from './listaCursos';
import { Alert, Button, Card, CardActions, CardContent, Modal, Snackbar, TextField } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { saveCurso } from '@/app/services/saveService';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { validarCurso } from '@/app/services/validator';
import { RootState } from '@/app/redux/store';
import { cardStyle, actionStyle, contentStyle } from '@/app/styles/globals';


export default function CursosPage() {

  const dispatch = useDispatch();
  const [alertSeverity, setAlertSeverity] = React.useState<'error' | 'warning' | 'info' | 'success'>('error');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [nombre, setNombre] = React.useState('');
  const [codigo, setCodigo] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [paralelo, setParalelo] = React.useState('');
  const [dias, setDias] = React.useState<string[]>([]);
  const [horarioInicio, setHorarioInicio] = React.useState<Dayjs>(dayjs());
  const [horarioFin, setHorarioFin] = React.useState<Dayjs>(dayjs());
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    cleanForm();
  };
  const closeAlert = () => setOpenAlert(false);
  const cursos = useSelector((state: RootState) => state.cursos.cursos);

  const cleanForm = () => {
    setNombre('');
    setCodigo('');
    setDescripcion('');
    setParalelo('');
    setDias([]);
    setHorarioInicio(dayjs());
    setHorarioFin(dayjs());
  };

  const handleSave = () => {
    let curso = {
      id: uuidv4(),
      nombre: nombre,
      codigo: codigo,
      descripcion: descripcion,
      dias: dias,
      horarioInicio: horarioInicio.format('HH:mm'),
      horarioFin: horarioFin.format('HH:mm'),
      paralelo: parseInt(paralelo)
    };

    let result = validarCurso(curso, cursos);
    if (result.severity === 'error') {
      setAlertSeverity('error');
      setAlertMessage(result.message);
      setOpenAlert(true);
      return;
    }

    saveCurso(curso, dispatch);
    handleClose();
    setAlertSeverity('success');
    setAlertMessage(result.message);
    setOpenAlert(true);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Crear Curso</Button>
      <ListaCursos />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Card sx={cardStyle}>
          <CardContent sx={contentStyle}>
            <h2>Crear Curso</h2>
              <TextField value={nombre} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNombre(event.target.value)} label='Nombre' fullWidth />
              <TextField value={codigo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCodigo(event.target.value)} label='Codigo' fullWidth />
              <TextField value={descripcion} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescripcion(event.target.value)} label='Descripcion' fullWidth />
              <TextField value={paralelo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setParalelo(event.target.value)} label='Paralelo' fullWidth />
              <Box>
                <p>Horario</p>
                <ToggleButtonGroup value={dias} onChange={(e, value) => setDias(value)} aria-label='dias' fullWidth>
                  <ToggleButton value='Lunes'>Lunes</ToggleButton>
                  <ToggleButton value='Martes'>Martes</ToggleButton>
                  <ToggleButton value='Miercoles'>Miercoles</ToggleButton>
                  <ToggleButton value='Jueves'>Jueves</ToggleButton>
                  <ToggleButton value='Viernes'>Viernes</ToggleButton>
                </ToggleButtonGroup>
                <Box sx={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                  <TimePicker label="Desde" value={horarioInicio} onChange={(newValue) => newValue && setHorarioInicio(newValue)}/>
                  <p>-</p>
                  <TimePicker label="Hasta" value={horarioFin} onChange={(newValue) => newValue && setHorarioFin(newValue)}/>
                </Box>
              </Box>

          </CardContent>
          <CardActions sx={actionStyle}>
            <Button onClick={handleClose}>Cancelar</Button>
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