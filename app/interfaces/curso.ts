interface dia {
    dia: 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo';
}

export interface curso {
    nombre: string;
    codigo: string;
    descripcion: string;
    dias: [dia]
    horario: string;
}