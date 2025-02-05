'use client';

import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <PageContainer>
          {props.children}
        </PageContainer>
      </DashboardLayout>
    </Provider>
  );
}  
