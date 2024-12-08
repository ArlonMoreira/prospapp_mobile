import React, { useEffect, useState } from 'react';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Redux
import { useSelector } from 'react-redux';
//Styles
import { StatusBar } from 'expo-status-bar';
import {
    Container,
    Header,
    PerfilArea,
    Logo,
    NameArea,
    LoadArea,
    PerfilLabel,
    PhotoContainer,
    Photo,
    Body,
    ScrollArea,
    TitleArea,
    Title,
    ModuleContainer,
    ImageContent,
    TextArea,
    TitleModule    
} from './styles';

const URL = process.env.EXPO_PUBLIC_API_URL;

const Home = () => {

    //Navegação
    const navigation = useNavigation();

    const { userData } = useSelector((state) => state.me);
    const [ logo, setLogo ] = useState(null);
    const [ primaryColor, setPrimaryColor ] = useState('#fff');
    const [ photoPerfil, setPhotoPerfil ] = useState(null);
    const [ namePerfil, setNamePerfil ] = useState('');

    useEffect(()=>{
        if(userData){
            if(userData.companys_joined.length){
                setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);
                setPrimaryColor(userData.companys_joined[0].primary_color);
            }

            if(userData.profileImage){
                setPhotoPerfil(`${URL}${userData.profileImage}`);
            }

            if(userData.full_name){
                const full_name = userData.full_name.split(' ');
                full_name.length > 0 ? setNamePerfil(`${full_name.shift()}`) : setNamePerfil('');
            }

        }

    }, [userData]);

    useEffect(()=>{
        console.log(logo)
    }, [logo])

    return (
        <Container style={{backgroundColor: primaryColor}}>
            <StatusBar 
            translucent
            backgroundColor="transparent"
            />        
            <Header>
                {
                    logo && (
                        <Logo source={{uri: logo}}/>
                    )
                }
                <PerfilArea>
                    <PerfilLabel>
                        <NameArea style={{color: primaryColor}}>{namePerfil}</NameArea>
                        <LoadArea>Colaborador</LoadArea>
                    </PerfilLabel>
                    <PhotoContainer>
                        {
                            photoPerfil && <Photo source={{uri: photoPerfil}}/>
                        }
                    </PhotoContainer>
                </PerfilArea>
            </Header>
            <Body>
                <TitleArea>
                    <Title>Escolha o módulo que deseja acessar</Title>
                </TitleArea>
                <ScrollArea>
                    <ModuleContainer onPress={() => navigation.navigate('ElectronicPoint')}>
                        <ImageContent source={require('../../public/ponto_eletronico.png')}/>
                        <TextArea>
                            <TitleModule style={{color: primaryColor}}>Ponto Eletrônico</TitleModule>
                        </TextArea>
                    </ModuleContainer>
                    <ModuleContainer onPress={() => navigation.navigate('ElectronicCall')}>
                        <ImageContent source={require('../../public/call.jpeg')}/>
                        <TextArea>
                            <TitleModule style={{color: primaryColor}}>Chamada Eletrônica</TitleModule>
                        </TextArea>
                    </ModuleContainer>                    
                </ScrollArea>
            </Body>
        </Container>
    )

};

export default Home;