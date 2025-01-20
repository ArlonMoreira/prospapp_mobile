import React from 'react'
//Styles
import { Container } from './styles';

const EditProfile = ({ route }) => {

    const { color } = route.params;

    return (
        <Container style={{ backgroundColor: color }}>
        </Container>
    )
}

export default EditProfile;