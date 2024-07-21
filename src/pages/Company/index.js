import React, { useEffect, useState} from 'react'
import { StyleSheet, View, FlatList} from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { list } from '../../slices/companysSlice';
//Components
import Footer from '../../components/Footer';
import CompanyCard from '../../components/CompanyCard';
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
  CompanysContainer,
  CompanysTitleContainer,
  CompanysTitle,
  Companys,
} from './styles';
import { FontAwesome } from '@expo/vector-icons'; 

const Company = () => {

  //Redux
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.companys);
  const [ companys, setCompanys ] = useState([]);

  //Listar todas companias
  useEffect(()=>{
    dispatch(list());
  }, [dispatch]);

  //Serão listadas todas as empresas não associadas e não pendentes.
  useEffect(()=>{
    setCompanys(data.filter((company) => !company.is_pending && !company.is_joined));
  }, [data]);

  const handleSubmit = ({company, setShowModal}) => {
    console.log(company)
    //Encerrar modal;
    setShowModal(false);
  };

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

        <CompanysContainer>

          <CompanysTitleContainer>
            <FontAwesome name='building-o' size={20} color='#008C81'/>
            <CompanysTitle>Empresas</CompanysTitle>
          </CompanysTitleContainer>

          <Companys>
            <FlatList
              data={companys}
              keyExtractor={(item) => item.company}
              renderItem={(item) => <CompanyCard data={item} handleSubmit={handleSubmit}/>}
            />            
          </Companys>

        </CompanysContainer>

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