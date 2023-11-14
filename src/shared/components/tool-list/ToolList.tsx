import {useTheme, Icon, Box, Button, TextField, Paper } from '@mui/material';
import { Environment } from '../../environment';

interface IToolListProps{
  searchText?: string
  showSearchInput?: boolean
  atSearchTextChange?: (newText: string) => void
  newButtonText?: string
  showNewButton?: boolean
  onClickNewButton?: () => void
}

export const ToolList : React.FC<IToolListProps> = ({
  atSearchTextChange,
  searchText = '',
  showSearchInput = false,
  newButtonText = 'Novo',
  showNewButton = true,
  onClickNewButton
}) => {

  const theme = useTheme();

  return (
    <Box 
      height={theme.spacing(5)} 
      component={Paper}
      gap={1}
      marginX={1}
      padding={1}
      paddingX={1}
      display='flex'
      alignItems='center'>

      {showSearchInput && (<TextField 
        size='small' 
        value={searchText}
        onChange={(e) => atSearchTextChange?.(e.target.value)}
        placeholder={Environment.SEARCH_INPUT}/>
      )}

      <Box flex={1} display='flex' justifyContent='end'>
        {showNewButton && (<Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickNewButton}
          endIcon={<Icon>add</Icon>}
        >{newButtonText}</Button>)}
      </Box>
    </Box>
  );
};