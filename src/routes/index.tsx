import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/initial-page'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path='/initial-page' element={<Dashboard/>} />
      <Route path='*' element={<Navigate to='initial-page' />} />
    </Routes>
  );
};
