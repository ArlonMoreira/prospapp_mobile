import React, { useState, useEffect } from 'react';
//Components
import Header from '../../components/Header';
//Redux
import { useSelector } from 'react-redux';
//Styles
import { StatusBar } from 'expo-status-bar';
import { Container } from './styles'

const Call = ({ route }) => {

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

  useEffect(()=>{
    console.log(className)
  }, [className])

  return (
    <Container>
      <StatusBar 
        translucent
        backgroundColor="transparent"
      />      
      <Header themeColor={primaryColor}/>
    </Container>
  )
};

export default Call;