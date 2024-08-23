import React, { useState, useEffect } from 'react'
//Redux
import { useSelector } from 'react-redux';
//Styles
import {  
  Container,
} from './styles';

const Perfil = () => {

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
    <Container style={{backgroundColor: primaryColor}}>
    </Container>
  )
};

export default Perfil;