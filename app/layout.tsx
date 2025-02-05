'use client';
import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import theme from '../theme';
import { Person, PersonAdd, School } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Inicio',
    icon: <DashboardIcon />,
  },
  {
    segment: 'estudiantes',
    title: 'Estudiantes',
    icon: <Person />,
  },
  {
    segment: 'cursos',
    title: 'Cursos',
    icon: <School />,
  },
  {
    segment: 'inscripcion',
    title: 'Inscripcion',
    icon: <PersonAdd />,
  }
];

const BRANDING = {
  title: 'Ecodemico',
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            </LocalizationProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
