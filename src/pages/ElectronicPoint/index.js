import React, { useState, useEffect } from 'react';
//Components
import Header from '../../components/Header';
import Menager from './Menager';
import Employee from './Employee';
import LoadingPage from '../../components/LoadingPage';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { list } from '../../slices/pointLocalsSlice';
//Styles
import { StatusBar } from 'expo-status-bar';

import { 
  Body,
  TitleAreaPage,
  TitlePage,
  Container, 
} from '../ElectronicCall/styles';

const URL = process.env.EXPO_PUBLIC_API_URL;

const ElectronicPoint = () => {

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ staffPerfil, setStaffPerfil ] = useState(false);
  const [ companyId, setCompanyId ] = useState();
  const [ logo, setLogo ] = useState(null);
  
  useEffect(()=>{
    if(userData){

      if(userData.is_staff) setStaffPerfil(true);

      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setCompanyId(userData.companys_joined[0].company_id_annotated);
        setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);        
        if(userData.companys_joined[0].role == 'Gestor') setStaffPerfil(true);

      }

    }

  }, [userData]);  

  //Carregar locais de ponto
  const dispatch = useDispatch();
  const { loading, data } = useSelector(state => state.pointLocals);
  
  //Carregr locais de ponto
  useEffect(() => {
    if(companyId){
      dispatch(list(companyId));
    }
    
  }, [companyId]);

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={primaryColor} logo={logo}/> : (
          <Container>
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />      
            <Header themeColor={primaryColor}/>
            <Body>
              <TitleAreaPage>
                <TitlePage style={{color: primaryColor}}>Locais de Ponto</TitlePage>
              </TitleAreaPage>
              {
                staffPerfil ?        
                  <Menager primaryColor={primaryColor} locals={data}/>
                : 
                  <Employee/>
              }
            </Body>
          </Container>        
        )
      }
    </>
  )
};

export default ElectronicPoint;