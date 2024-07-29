import React, { useEffect, useState} from 'react'
import { StyleSheet, ScrollView} from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Redux
import { list, pending } from '../../slices/companysSlice';
//Components
import Footer from '../../components/Footer';
import CompanyCard from '../../components/CompanyCard';
import SkeletonPlaceholder from '../../components/SkeletonPlaceholder';
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

  //Close modal
  const [ closeModal, setCloseModal ] = useState(false);

  //Redux
  const dispatch = useDispatch();
  const { data, loadingPending } = useSelector((state) => state.companys);
  const [ companys, setCompanys ] = useState([]);
  const [ companysPending, setCompanysPending ] = useState([]);

  //Listar todas companias
  useEffect(()=>{
    dispatch(list());
  }, [dispatch]);

  //Serão listadas todas as empresas não associadas e não pendentes.
  useEffect(()=>{
    setCompanys(data.filter((company) => !company.is_pending && !company.is_joined));
    setCompanysPending(data.filter((company) => company.is_pending && !company.is_joined))
  }, [data]);

  const handleSubmit = async (company) => {
    await dispatch(pending({
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

        <ScrollView scrollEnabled={true} style={{width: '100%'}}>  
          <SkeletonPlaceholder height={25} width={200}/>
          <CompanyCard handleSubmit={handleSubmit} close={closeModal}/>       
          {
            companysPending.length > 0 && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <FontAwesome6 name='hourglass-end' size={20} color='#008C81'/>
                  <CompanysTitle>Aguardando confirmação</CompanysTitle>
                </CompanysTitleContainer>
    
                <Companys>
                  {
                    companysPending.map((item) => (
                      <CompanyCard key={item.company} data={item} handleSubmit={handleSubmit} close={closeModal}/>
                    ))
                  }
                </Companys>
              </CompanysContainer>
            )
          }
          {
            companys.length > 0 && (
              <CompanysContainer>
                <CompanysTitleContainer>
                  <MaterialIcons name='business-center' size={22} color='#008C81'/>
                  <CompanysTitle>Empresas</CompanysTitle>
                </CompanysTitleContainer>
    
                <Companys>
                  {
                    companys.map((item) => (
                      <CompanyCard key={item.company} data={item} handleSubmit={handleSubmit} close={closeModal}/>
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