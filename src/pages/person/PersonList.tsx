import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToolList } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';
import React, { useEffect, useMemo, useState } from 'react';
import { IListPerson, PersonService } from '../../shared/services/api/person/PersonService';
import { useDebounce } from '../../shared/hooks';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { Environment } from '../../shared/environment';
import { ChildrenProps } from '../../shared/helpers';

export const PersonList: React.FC<ChildrenProps> = () => {

  const [ searchParams, SetSearchParams ] = useSearchParams();
  const { debounce } = useDebounce(1500);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListPerson[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const search = useMemo(() => {
    return searchParams.get('search') || '';
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() =>{
      PersonService.getAll(page, search)
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
  },[search, page]);

  const handleDelete = (id: number) => {
    if(confirm('Realmente deseja excluir o registro ?'))
      PersonService.deleteById(id).then(result => {
        if(result instanceof Error){
          alert(result.message);
          return;
        }
        setRows(oldRows =>[
          ...oldRows.filter(oldRow => oldRow.id !== id)
        ]);   
      });
  };

  return (
    <BaseLayoutPage  
      title="Listagem de Pessoas"
      toolBar={
        <ToolList
          newButtonText={'Nova'}
          onClickNewButton={() => navigate('/pessoas/detalhe/nova')}
          showSearchInput
          searchText={searchParams.get('busca') ?? ''}
          atSearchTextChange={text => SetSearchParams({search:text, page:'1'}, {replace: true})}
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
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>
                      delete
                    </Icon>
                  </IconButton>
                  <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                    <Icon>
                      edit
                    </Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST}</caption>
          )}
          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate'/>
                </TableCell>
              </TableRow>) 
            }
            {totalCount > Environment.ROW_LIMIT && totalCount > 0 &&(
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination page={page} count={Math.ceil(totalCount / Environment.ROW_LIMIT)}
                    onChange={(_, newPage) => SetSearchParams({search, page: newPage.toString()}, {replace: true})}/>
                </TableCell>
              </TableRow>) 
            }
          </TableFooter>
        </Table>
      </TableContainer> 
    </BaseLayoutPage>
  );
};