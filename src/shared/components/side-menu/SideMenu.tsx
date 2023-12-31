import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { ChildrenProps } from '../../helpers';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { ListItemLink } from './ListItemLink';

export const SideMenu: React.FC<ChildrenProps> = ({children}) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">  
            <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} />
          </Box>
        </Box>

        <Divider />

        <Box flex={1}>
          <List component="nav">
            {drawerOptions.map(drawerOptions =>(
              <ListItemLink 
                key={drawerOptions.path}
                icon={drawerOptions.icon}
                label={drawerOptions.label} 
                to={drawerOptions.path}
                onClick={smDown ? toggleDrawerOpen : undefined}/>
            ))}
          </List>
        </Box>
        <Box>
          <List component="nav">
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary='Alternar Tema' />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
