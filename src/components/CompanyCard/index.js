import React, { useEffect } from 'react'
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
                <Title>{data.item.trade_name}</Title>
                <SubTitle>00.000.000/0000-00</SubTitle>
            </InfoArea>
        </Container>
    )
}

export default CompanyCard;