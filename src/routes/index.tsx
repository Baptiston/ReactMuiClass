import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, PersonList } from '../pages';

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
      {/*<Route path='/cidades/detalhe/:id' element={<CityList/>} />*/}
      <Route path='*' element={<Navigate to='pagina-inicial' />} />
    </Routes>
  );
};
