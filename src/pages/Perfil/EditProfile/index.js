import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
//Hooks
import { useSelector } from 'react-redux';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
import Alert from '../../../components/Alert';
//Styles
import { ItemFormArea, SubmitButton } from '../../Register/styles';
import { TitleArea, Title, FormArea } from './styles';
import { Errors, Error } from '../../Register/styles';

const EditProfile = ({ route }) => {

    const { userData, loading, errors, errorMessage } = useSelector((state) => state.me);

    const { color, handleSubmit } = route.params;

    //Formulário
    const [ full_name, setFullName] = useState('');
    const [ doc_number, setDocNumber ] = useState('');

    useEffect(() => {
        if(userData){
            setFullName(userData.full_name);
            setDocNumber(userData.doc_number);
        }

    }, [userData]);

    //Alerta de mensagens
    const [ showAlertError, setShowAlertError ] = useState(false);

    //Apresentar o alerta caso houver mensagem de erro
    useEffect(() => {
        errorMessage ? setShowAlertError(true): setShowAlertError(false);
    }, [errorMessage, setShowAlertError]);    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 10, alignItems: 'flex-start' }}>
            { showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/> }
            <TitleArea style={{ alignSelf: 'stretch' }}>
                <Title>Altere abaixo suas informações:</Title>
            </TitleArea>
            <FormArea style={{ alignSelf: 'stretch' }}>
                <ItemFormArea>
                    <InputForm label='Nome completo' setValue={setFullName} value={full_name} secureTextEntry={false}/>
                    <Errors>
                        { errors.full_name && errors.full_name.map((error, i) => <Error key={i}>{ error }</Error>) }
                    </Errors>
                </ItemFormArea>
                <ItemFormArea>
                    <InputForm label='CPF' setValue={setDocNumber} value={doc_number} secureTextEntry={false}/>
                    <Errors>
                        { errors.doc_number && errors.doc_number.map((error, i) => <Error key={i}>{ error }</Error>) }
                    </Errors>
                </ItemFormArea>
                <SubmitButton>
                    <ButtonLg
                        title="Editar"
                        action={() => handleSubmit({full_name, doc_number})}
                        loading={loading}
                        disabled={loading}
                    ></ButtonLg>
                </SubmitButton>                                                      
            </FormArea>
        </ScrollView>
    )
}

export default EditProfile;