import React, { useEffect } from 'react';
//Components
import BoxAction from '../../../components/BoxAction';
//Styles
import {
  ToolsArea
} from '../../ElectronicCall/styles';

const Menager = ({primaryColor, locals}) => {

  useEffect(() => {
    console.log('locals', locals)
  }, [locals])
  
  return (
    <>
      <ToolsArea>
        <BoxAction
          color={primaryColor}
          iconName={'add-circle'}
          title={'Adicionar Local'}
        />
        <BoxAction
          color={primaryColor}
          iconName={'alarm-sharp'}
          title={'Registar ponto'}
        />
        <BoxAction
          color={primaryColor}
          iconName={'pencil-sharp'}
          title={'Editar Local'}
        />
        <BoxAction
          color={primaryColor}
          iconName={'close-circle'}
          title={'Remover Local'}
        />                   
      </ToolsArea>
    </>
  )

}

export default Menager;