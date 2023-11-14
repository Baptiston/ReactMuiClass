
import { Box, useTheme, Paper, Button, Icon, Divider, Skeleton, Typography, useMediaQuery, Theme } from '@mui/material';
import { ISplitButtonProps, SplitButton } from '../split-button/SplitButton';

interface IDetailToolProps{
  buttonNewText?: string
  showNewButton?: boolean
  showBackButton?: boolean
  showDeleteButton?: boolean
  showSaveButton?: boolean
  showSaveAndCloseButton?: boolean
  showDropdownButton?:boolean

  showSaveButtonLoading?: boolean
  showBackButtonLoading?: boolean
  showDeleteButtonLoading?: boolean
  showNewButtonLoading?: boolean
  showSaveAndCloseLoading?: boolean
  showDropdownButtonLoading?:boolean

  onClickInNew?: () => void
  onClickInBack?: () => void
  onClickInDelete?: () => void
  onClickInSave?: () => void
  onClickInSaveAndClose?: () => void
}

export const DetailTool: React.FC<IDetailToolProps> = ({
  buttonNewText = 'Novo',

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,

  showSaveButtonLoading = false,
  showBackButtonLoading = false,
  showDeleteButtonLoading = false,
  showNewButtonLoading = false,
  showSaveAndCloseLoading = false,

  onClickInNew,
  onClickInBack,
  onClickInDelete,
  onClickInSave,
  onClickInSaveAndClose

}) => {

  const smDown = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme:Theme) => theme.breakpoints.down('md'));
  const xsDown = useMediaQuery((theme:Theme) => (theme.breakpoints.down(350)));
  const theme = useTheme();

  const splitButtonList : ISplitButtonProps[] = [
    {label: 'Salvar', onClick: onClickInSave}, 
    {label: 'Salvar e Voltar', onClick: onClickInSaveAndClose},
    {label: 'Apagar', onClick: onClickInDelete},
    {label: buttonNewText, onClick: onClickInNew},
    {label: 'Voltar', onClick: onClickInBack}];

  return (
    <Box
      height={theme.spacing(5)} 
      component={Paper}
      gap={1}
      marginX={1}
      padding={1}
      paddingX={1}
      display='flex'
    >

      {(showSaveButton && !showSaveButtonLoading && !xsDown) && (<Button
        color='primary'
        disableElevation
        variant='contained'
        startIcon={<Icon>save</Icon>}
        onClick={onClickInSave}
      >
        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          Salvar
        </Typography>
      </Button>)}

      {showSaveButtonLoading && !xsDown && (
        <Skeleton width={110} height={60}/>)
      }

      {(showSaveAndCloseButton && !showSaveAndCloseLoading && !smDown && !mdDown && !xsDown) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        startIcon={<Icon>save</Icon>}
        onClick={onClickInSaveAndClose}
      >
        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          Salvar e Voltar
        </Typography>
      </Button>)}

      {(showSaveAndCloseLoading && !smDown && !mdDown && !xsDown) && (
        <Skeleton width={180} height={60}/>)
      }

      {(showDeleteButton && !showDeleteButtonLoading && !xsDown) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        startIcon={<Icon>delete</Icon>}
        onClick={onClickInDelete}
      >
        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          Apagar
        </Typography>
      </Button>)}
      
      {showDeleteButtonLoading && !xsDown && (
        <Skeleton width={110} height={60}/>)
      }

      {(showNewButton && !showNewButtonLoading && !xsDown && !smDown) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        startIcon={<Icon>add</Icon>}
        onClick={onClickInNew}
      >
        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          {buttonNewText}
        </Typography>
      </Button>)}

      {(showNewButtonLoading && !smDown && !xsDown) && (
        <Skeleton width={110} height={60}/>)
      }

      {
        showBackButton && !xsDown && (
          showDeleteButton || showNewButton || showSaveButton || showSaveAndCloseButton) 
            && (<Divider variant='middle' orientation='vertical'/>)}

      {(showBackButton && !xsDown && !showBackButtonLoading) && (<Button
        color='primary'
        disableElevation
        variant='outlined'
        startIcon={<Icon>arrow_back</Icon>}
        onClick={onClickInBack}
      >
        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          Voltar
        </Typography>
      </Button>)}

      {showBackButtonLoading && !xsDown && (
        <Skeleton width={110} height={60}/>)
      }

      { xsDown &&
        (<SplitButton buttons={splitButtonList} />)
      }
    </Box>
  );
} ;