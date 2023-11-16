import { useNavigate, useParams } from 'react-router-dom';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTool } from '../../shared/components';

export const PersonDetail: React.FC = () => {
  const { id = 'nova'} = useParams<'id'>();
  const navigate = useNavigate();

  return (
    <BaseLayoutPage 
      title='Detalhe de Pessoa'
      toolBar={
        <DetailTool
          buttonNewText='Nova'
          showSaveAndCloseButton
          showDeleteButton = {id !== 'nova'}
          showNewButton = {id !== 'nova'}
          
          onClickInSave={() => {}}
          onClickInSaveAndClose={() => {}}
          onClickInDelete={() => {}}

          onClickInNew={() => navigate('/pessoas/detalhe/nova')}
          onClickInBack={() => navigate('/pessoas')}
        />
      }
    >

    </BaseLayoutPage>
  );
};