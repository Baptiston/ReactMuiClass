import { Avatar, Box, Divider, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import { ChildrenProps } from '../../helpers';
import { useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListItemLink';

export const SideMenu: React.FC<ChildrenProps> = () => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">  
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} />
          </Box>
        </Box>

        <Divider/>

        <Box flex={1}>
          <List component="nav">
            <ListItemLink icon='Home' primary='Página Inicial'/>
          </List>
        </Box>
      </Drawer>

      <Box height='100vh' id='box-zuado' marginLeft={smDown ? 0 : theme.spacing(28)}>
        teste
      </Box>
    </>
  );
};
