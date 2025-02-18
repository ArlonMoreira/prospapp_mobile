import React, { useState } from 'react'
import { ScrollView } from 'react-native';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
//Styles
import { 
  ItemFormArea,
  SubmitButton
} from '../../Register/styles';

import { 
  TitleArea,
  Title,
  FormArea
} from '../EditProfile/styles';

const ChangePassword = ({ route }) => {
  
  const { color, handleChangePassword } = route.params;

  //Formulário
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 10, alignItems: 'flex-start' }}>
      <TitleArea style={{ alignSelf: 'stretch' }}>
        <Title>Altere abaixo sua senha:</Title>
      </TitleArea>
      <FormArea style={{ alignSelf: 'stretch' }}>
        <ItemFormArea>
          <InputForm label='Senha' setValue={setPassword} value={password} secureTextEntry={true}/>
        </ItemFormArea>
        <ItemFormArea>
          <InputForm label='Confirmar senha' setValue={setConfirmPassword} value={confirm_password} secureTextEntry={true}/>
        </ItemFormArea>
        <SubmitButton>
          <ButtonLg
            title="Alterar"
            action={() => handleChangePassword({password, confirm_password})}
          ></ButtonLg>
        </SubmitButton>             
      </FormArea>
    </ScrollView>
  )
}

export default ChangePassword;