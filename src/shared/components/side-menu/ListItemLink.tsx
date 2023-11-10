import {  Icon,  ListItemButton,  ListItemIcon,  ListItemText} from '@mui/material';

interface IListItemLinkProps{
  primary: string
  icon: string
}

export const ListItemLink: React.FC<IListItemLinkProps> = ({primary,icon}) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};
