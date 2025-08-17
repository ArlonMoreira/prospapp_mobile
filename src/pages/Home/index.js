import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
//Components
import WidgetPrimary from '../../components/WidgetPrimary';
import Footer from '../../components/Footer';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Redux
import { useSelector } from 'react-redux';
import { View } from 'react-native';
//Styles
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
    Container,
    Header,
    PerfilArea,
    Logo,
    NameArea,
    RoleArea,
    RoleText,
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
    const [ rolePerfil, setRolePerfil ] = useState('');

    useEffect(()=>{
        if(userData){
            if(userData.companys_joined.length){
                setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);
                setPrimaryColor(userData.companys_joined[0].primary_color);
                setRolePerfil(userData.companys_joined[0].role);
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

    return (
        <LinearGradient colors={['#008C81', '#0C6661']} style={styles.background}>
            <Header>
                {
                    logo && (
                        <Logo source={{uri: logo}}/>
                    )
                }
                <PerfilArea onPress={() => navigation.navigate('Perfil')}>
                    <PerfilLabel>
                        <NameArea style={{color: primaryColor}}>{namePerfil}</NameArea>
                        <RoleArea>
                            <RoleText>{rolePerfil}</RoleText>
                        </RoleArea>
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
                    <WidgetPrimary
                        icon='finger-print-outline'
                        iconSize={40}                        
                        title='Ponto Eletrônico'
                        text='Acesse para realizar o registro do ponto. Escolha o local de ponto, na qual é possível registrar em uma ou mais locais.'
                        action={() => navigation.navigate('ElectronicPoint')}
                    >
                    </WidgetPrimary>
                    <WidgetPrimary
                        icon='hand-right-outline'
                        iconSize={40}
                        title='Chamada Eletrônica'
                        text='Acesse para realizar a chamada. Escolha a turma e cadastre os alunos, registrando a presença de cada um dos alunos.'
                        action={() => navigation.navigate('ElectronicCall')}
                    >
                    </WidgetPrimary>                  
                </ScrollArea>
            </Body>
            <Footer></Footer>
            <View style={{ marginBottom: 20 }}></View>
        </LinearGradient>
    )

};

const styles = StyleSheet.create({
  background:{
    flex: 1
  }
});

export default Home;