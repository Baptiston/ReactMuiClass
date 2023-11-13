import { ChildrenProps } from '../../shared/helpers';
import { BaseLayoutPage } from '../../shared/layouts';

export const Dashboard : React.FC<ChildrenProps> = ({children}) => {
  return(
    <BaseLayoutPage
      children={children}
      title='Página Inicial'
      toolBar={<>Barra de Ferramentas</>} />
  );
};
