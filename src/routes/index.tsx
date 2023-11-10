import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route path='/initial-page' element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen} >Toggle Drawer</Button>} />
      <Route path='*' element={<Navigate to='initial-page' />} />
    </Routes>
  );
};
