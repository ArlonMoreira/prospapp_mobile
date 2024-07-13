import React from 'react'
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
//Components
import Footer from '../../components/Footer';
//Styles
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Container,
  Header,
  Perfil,
  PerfilContainer,
  NamePerfil,
  WelcomeMensage,
  PhotoContainer
} from './styles';

const Company = () => {
  return (
    <Container>

      <LinearGradient
        colors={['#008C81', '#0C6661']}
        style={styles.background}
      >
        <Header>
          <Footer/>
        </Header>
        <Perfil>
          <PerfilContainer>
            <NamePerfil>
              Samantha
            </NamePerfil>
            <WelcomeMensage>
              Seja Bem Vindo(a)! 
            </WelcomeMensage>
          </PerfilContainer>
          <PerfilContainer>
            <PhotoContainer>
              
            </PhotoContainer>
          </PerfilContainer>          
        </Perfil>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'os' ? 'padding': 'height'} style={{flex: 1}} keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        </ScrollView>
      </KeyboardAvoidingView>   

    </Container>
  )
};

const styles = StyleSheet.create({
  background: {
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
});

export default Company;