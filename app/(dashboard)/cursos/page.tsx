'use client';

import * as React from 'react';
import ListaCursos from './listaCursos';
import { Button, Card, CardActions, CardContent, Modal, TextField } from '@mui/material';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import saveCurso from '@/app/services/saveService';
import { useDispatch } from 'react-redux';


export default function CursosPage() {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
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
    saveCurso(nombre, codigo, descripcion, dias, horarioInicio, horarioFin, parseInt(paralelo), dispatch);
    handleClose();
  };

  const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const actionStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    p: 2,
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
            <Button onClick={handleClose}>Cerrar</Button>
            <Button onClick={handleSave} variant='contained'>Guardar</Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}