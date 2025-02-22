import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
//Redux
import { logout } from '../../../slices/authSlice';
import { resetErrorMessage } from '../../../slices/resetPasswordSlice';
//Hooks
import { useSelector, useDispatch } from 'react-redux';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
import Alert from '../../../components/Alert';
//Styles
import { ItemFormArea, SubmitButton } from '../../Register/styles';
import { TitleArea, Title, FormArea } from '../EditProfile/styles';
import { Errors, Error } from '../../Register/styles';

const ChangePassword = ({ route }) => {

  const dispatch = useDispatch();

  //Assim que entrar na edição apagar as mensagens de erro.
  useEffect(() => {
    dispatch(resetErrorMessage());
  }, []);
  
  const { success, loading, errors, errorMessage } = useSelector((state) => state.resetPassword);

  const { color, handleChangePassword } = route.params;

  //Formulário
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('');

  //Alerta de mensagens
  const [ showAlertError, setShowAlertError ] = useState(false);

  //Apresentar o alerta caso houver mensagem de erro
  useEffect(() => {
    errorMessage ? setShowAlertError(true): setShowAlertError(false);
  }, [errorMessage, setShowAlertError])

  //Deslogar quando alterado a senha.
  useEffect(() => {
    if(success) dispatch(logout());
  }, [success]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 10, alignItems: 'flex-start' }}>
      { showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/> }
      <TitleArea style={{ alignSelf: 'stretch' }}>
        <Title>Altere abaixo sua senha:</Title>
      </TitleArea>
      <FormArea style={{ alignSelf: 'stretch' }}>
        <ItemFormArea>
          <InputForm label='Senha' setValue={setPassword} value={password} secureTextEntry={true}/>
          <Errors>
            {
              errors.password && errors.password.map((error, i) => <Error key={i}>{error}</Error>)
            }
          </Errors>
        </ItemFormArea>
        <ItemFormArea>
          <InputForm label='Confirmar senha' setValue={setConfirmPassword} value={confirm_password} secureTextEntry={true}/>
          <Errors>
            {
              errors.confirm_password && errors.confirm_password.map((error, i) => <Error key={i}>{error}</Error>)
            }
          </Errors>
        </ItemFormArea>
        <SubmitButton>
          <ButtonLg
            title="Alterar"
            action={() => handleChangePassword({password, confirm_password})}
            loading={loading}
            disabled={loading}
          ></ButtonLg>
        </SubmitButton>             
      </FormArea>
    </ScrollView>
  )
}

export default ChangePassword;