import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
//Hooks
import { useSelector } from 'react-redux';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
//Styles
import {
    ItemFormArea,
    SubmitButton,
} from '../../Register/styles';

import { 
    TitleArea,
    Title,
    FormArea
} from './styles';

const EditProfile = ({ route }) => {

    const { userData, loading } = useSelector((state) => state.me);

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

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 10, alignItems: 'flex-start' }}>
            <TitleArea style={{ alignSelf: 'stretch' }}>
                <Title>Altere abaixo suas informações:</Title>
            </TitleArea>
            <FormArea style={{ alignSelf: 'stretch' }}>
                <ItemFormArea>
                    <InputForm label='Nome completo' setValue={setFullName} value={full_name} secureTextEntry={false}/>
                </ItemFormArea>
                <ItemFormArea>
                    <InputForm label='CPF' setValue={setDocNumber} value={doc_number} secureTextEntry={false}/>
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