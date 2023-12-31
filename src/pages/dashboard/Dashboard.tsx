
import { DetailTool } from '../../shared/components';
import { ChildrenProps } from '../../shared/helpers';
import { BaseLayoutPage } from '../../shared/layouts';

export const Dashboard : React.FC<ChildrenProps> = ({children}) => {
  return(
    <BaseLayoutPage
      children={children}
      title='Página Inicial'
      toolBar={(
        //<ToolList showSearchInput/>
        <DetailTool showSaveAndCloseButton/>
      )} />
  );
};
