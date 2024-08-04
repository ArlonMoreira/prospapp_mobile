import React, { useEffect, useState} from 'react'
import { StyleSheet, ScrollView} from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { list, sendRequest } from '../../slices/companysSlice';
//Components
import Footer from '../../components/Footer';
import CompanyCard from '../../components/CompanyCard';
import SkeletonPlaceholder from '../../components/SkeletonPlaceholder';
import Fade from '../../components/Fade';
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
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons'; 

const Company = () => {

  //Obter dados do usuário.
  const { userData } = useSelector((state) => state.me);
  const [ name, setName ] = useState('');

  useEffect(()=>{
    if(userData){
      const full_name = userData.full_name.split(' ');
      setName(`${full_name.shift()}`);
    }

  }, [userData]);  

  //Show fase
  const [ showFade, setShowFade ] = useState(false);

  //Close modal
  const [ closeModal, setCloseModal ] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const { data, loadingPending, loadingList } = useSelector((state) => state.companys);
  const [ companys, setCompanys ] = useState([]);
  const [ companysPending, setCompanysPending ] = useState([]);
  const [ companysJoined, setCompanysJoined ] = useState([]);

  //Listar todas companias
  useEffect(()=>{
    dispatch(list());
  }, [dispatch]);

  //Serão listadas todas as empresas não associadas e não pendentes.
  useEffect(()=>{
    setCompanysJoined(data.filter((company) => company.is_joined));
    setCompanys(data.filter((company) => !company.is_pending && !company.is_joined));
    setCompanysPending(data.filter((company) => company.is_pending && !company.is_joined))
  }, [data]);

  const handleSubmit = (company) => {
    dispatch(sendRequest({
      company: company.company
    }));

  };

  //Ao fim do carregamento encerrar o modal.
  useEffect(()=>{
    if(!loadingPending){
      setCloseModal(true);
    } else {
      setCloseModal(false);
    }

  }, [loadingPending]);

  return (
    <Container>
      { showFade && <Fade/> }
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
              {name}
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

        <ScrollView scrollEnabled={true} style={{width: '100%'}}>
          {
            (!loadingList && companysJoined.length > 0) && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <FontAwesome6 name='hourglass-end' size={20} color='#008C81'/>
                  <CompanysTitle>Minhas empresas</CompanysTitle>
                </CompanysTitleContainer>
    
                <Companys>
                  {
                    companysJoined.map((item) => (
                      <CompanyCard key={item.company} data={item}/>
                    ))
                  }
                </Companys>
              </CompanysContainer>              
            )
          }  
          {
            loadingList && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <SkeletonPlaceholder height={20} width={230}/>
                </CompanysTitleContainer>
    
                <Companys>
                  <CompanyCard isLoading={true}/>
                  <CompanyCard isLoading={true}/>
                </Companys>
              </CompanysContainer>
            )
          }
          {
            (!loadingList && companysPending.length > 0) && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <FontAwesome6 name='hourglass-end' size={20} color='#008C81'/>
                  <CompanysTitle>Aguardando confirmação</CompanysTitle>
                </CompanysTitleContainer>
    
                <Companys>
                  {
                    companysPending.map((item) => (
                      <CompanyCard key={item.company} data={item} handleSubmit={handleSubmit} close={closeModal} setShowFade={setShowFade}/>
                    ))
                  }
                </Companys>
              </CompanysContainer>
            )
          }
          {
            (!loadingList && companys.length > 0) && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <MaterialIcons name='business-center' size={22} color='#008C81'/>
                  <CompanysTitle>Empresas</CompanysTitle>
                </CompanysTitleContainer>
    
                <Companys>
                  {
                    companys.map((item) => (
                      <CompanyCard key={item.company} data={item} handleSubmit={handleSubmit} close={closeModal} setShowFade={setShowFade}/>
                    ))
                  }         
                </Companys>
              </CompanysContainer>
            )
          }
        </ScrollView>

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