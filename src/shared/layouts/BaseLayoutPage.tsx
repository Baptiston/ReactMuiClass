import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useDrawerContext } from '../contexts';

interface IBaseLayoutPagesProps {
  title: string;
  toolBar?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseLayoutPage: React.FC<IBaseLayoutPagesProps> = ({title, children, toolBar}) => {
  
  const theme = useTheme();

  const smDown = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme:Theme) => theme.breakpoints.down('md'));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height={'100%'} display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems='center' height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
        {smDown && (<IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>)}

        <Typography variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'} overflow='hidden' whiteSpace='nowrap' textOverflow='ellipsis'>
          {title}
        </Typography>
      </Box>

      {toolBar && (
        <Box>
          {toolBar}
        </Box>
      )}
      
      <Box flex={1} overflow='auto'>
        {!!children}
      </Box>
    </Box>
  );
};
