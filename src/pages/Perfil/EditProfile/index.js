import React from 'react'
import { ScrollView } from 'react-native';
//Hooks
import { useState } from 'react';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
//Styles
import { 
    FormArea,
    ItemFormArea,
    SubmitButton
} from '../../Register/styles';

const EditProfile = ({ route }) => {

    const { color, handleSubmit, loading } = route.params;

    //Formulário
    const [ full_name, setFullName] = useState('');
    const [ doc_number, setDocNumber ] = useState('');
    const [ email, setEmail] = useState('');    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color }}>
            <FormArea>
                <ItemFormArea>
                    <InputForm label='Nome completo' setValue={setFullName} value={full_name} secureTextEntry={false}/>
                </ItemFormArea>
                <ItemFormArea>
                    <InputForm label='CPF' setValue={setDocNumber} value={doc_number} secureTextEntry={false}/>
                </ItemFormArea>
                <ItemFormArea>
                    <InputForm label='E-mail' setValue={setEmail} value={email} secureTextEntry={false}/>
                </ItemFormArea>
                <SubmitButton>
                    <ButtonLg title="Editar" action={handleSubmit} loading={loading} disabled={loading}></ButtonLg>
                </SubmitButton>                                                      
            </FormArea>
        </ScrollView>
    )
}

export default EditProfile;