import React, { useEffect } from 'react'
import { View } from 'react-native';
//Styles
import { 
    Container,
    LogoArea,
    InfoArea,
    Logo,
    Title,
    SubTitle
} from './style';

const URL = process.env.EXPO_PUBLIC_API_URL;

const CompanyCard = ({data}) => {

    useEffect(()=>{
        console.log(data.item)
    }, [data])

    return (
        <Container>
            <LogoArea>
                <Logo source={{uri:`${URL}files/${data.item.logo}`}}/>
            </LogoArea>
            <InfoArea>
                <View style={{flex:1}}>
                    <Title>{data.item.slug_name}</Title>
                    <SubTitle>{data.item.identification_number}</SubTitle>
                </View>
            </InfoArea>
        </Container>
    )
}

export default CompanyCard;