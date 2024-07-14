import React, { useEffect } from 'react'
import { StyleSheet, View} from 'react-native';
//Hooks
import { useDispatch } from 'react-redux';
//Redux
import { list } from '../../slices/companysSlice';
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
  PhotoContainer,
  Main,
  CompanyTitleContainer,
  CompanyTitle,
  SearchContainer,
  Search,
  SearchIconArea
} from './styles';
import { AntDesign } from '@expo/vector-icons'; 

const Company = () => {

  //Redux
  const dispatch = useDispatch();

  //Listar todas companias
  useEffect(()=>{
    dispatch(list());
  }, []);

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

      <Main>

        <CompanyTitleContainer>
          <CompanyTitle>
            Busque aqui por sua empresa!
          </CompanyTitle>
        </CompanyTitleContainer>

        <SearchContainer>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Search></Search>
            <SearchIconArea>
              <AntDesign name='search1' size={32} color='#008C81'></AntDesign>
            </SearchIconArea>
          </View>
        </SearchContainer>

      </Main>

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