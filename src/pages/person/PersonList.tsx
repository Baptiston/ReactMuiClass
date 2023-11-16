import { useSearchParams } from 'react-router-dom';
import { ToolList } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { IListPerson, PersonService } from '../../shared/services/api/person/PersonService';
import { useDebounce } from '../../shared/hooks';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export const PersonList: React.FC = () => {

  const [ searchParms, SetSearchParams ] = useSearchParams();

  const search = useMemo(() => {
    return searchParms.get('busca') || '';
  }, [searchParms]);

  const { debounce } = useDebounce(1500);

  const [rows, setRows] = useState<IListPerson[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    
    debounce(() =>{
      PersonService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);

          if(result instanceof Error){
            alert(result.message);
          }else{
            console.log(result);
            setRows(result.data);
            setTotalCount(result.totalCount);
          }
        });
    });
  },[search]);

  return (
    <BaseLayoutPage  
      title="Listagem de Pessoas" 
      toolBar={
        <ToolList
          newButtonText={'Novo'}
          showSearchInput
          searchText={searchParms.get('busca') ?? ''}
          atSearchTextChange={texto => SetSearchParams({busca:texto}, {replace: true})}
        />
      }>
    
      <TableContainer component={Paper} variant='outlined' sx={{m:1, width: 'auto'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome Completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </BaseLayoutPage>


  );
};