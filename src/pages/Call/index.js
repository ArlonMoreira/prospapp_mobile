import React, { useState, useEffect } from 'react';
//Hooks
import useCurrentDate from '../../hooks/useCurrentDate';
//Components
import Header from '../../components/Header';
import SearchArea from '../../components/SearchArea';
//Redux
import { useSelector } from 'react-redux';
//Styles
import { StatusBar } from 'expo-status-bar';
import {
  Container,
  Body,
  TitleAreaPage,
  TitlePage,
  InfoArea,
  InfoText,
  InfoName,
  Edit
} from './styles'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const Call = ({ route }) => {

  const currentDate = useCurrentDate();

  const { classId, className } = route.params;

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  
  useEffect(()=>{
    if(userData){
      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
      }

    }

  }, [userData]);

  return (
    <Container>
      <StatusBar 
        translucent
        backgroundColor="transparent"
      />      
      <Header themeColor={primaryColor}/>
      <Body>
        <TitleAreaPage>
          <TitlePage style={{color: primaryColor}}>Chamada</TitlePage>
        </TitleAreaPage>   
        <InfoArea>
          <InfoText>
            <SimpleLineIcons name='graduation' size={22} color={'#606060'}/>
            <InfoName>{className}</InfoName>
            <Edit>
              <MaterialIcons name='edit' size={24} color={primaryColor}/>
            </Edit>
          </InfoText>
          <InfoText>
            <SimpleLineIcons name='calendar' size={18} color={'#606060'}/>
            <InfoName>{currentDate}</InfoName>
          </InfoText>          
        </InfoArea>
        <SearchArea color={primaryColor}/>   
      </Body>
    </Container>
  )
};

export default Call;