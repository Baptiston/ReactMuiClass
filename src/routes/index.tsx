import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, PersonList } from '../pages';
import { PersonDetail } from '../pages/person/PersonDetail';

export const AppRoutes = () => {

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Inicial',
        icon: 'home',
        path: '/pagina-inicial'
      },
      {
        label: 'Pessoas',
        icon: 'person',
        path: '/pessoas'
      }
    ]);
  },[]);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard/>} />
      <Route path='/pessoas' element={<PersonList/>} />
      <Route path='/pessoas/detalhe/:id' element={<PersonDetail/>} />
      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};
