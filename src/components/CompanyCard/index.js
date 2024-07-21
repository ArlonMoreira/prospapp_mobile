import React, { useEffect, useState } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
//Components
import ButtonLg from '../ButtonLg';
//Styles
import { 
    Container,
    LogoArea,
    InfoArea,
    Logo,
    Title,
    SubTitle,
    ModalContainer,
    ModalContent,
    ModalTitle,
    ModalMensage,
    Button,
    Status,
    StatusLabel
} from './style';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const URL = process.env.EXPO_PUBLIC_API_URL;

const CompanyCard = ({data, handleSubmit}) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={{flex: 1}}>
            <Modal
                transparent={true}
                animationType='slide'
                visible={showModal}
                onRequestClose={() => setShowModal(false)} // For Android back button
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <ModalContainer>
                        <ModalContent>
                            <ModalTitle>Deseja associar à {data.item.slug_name}?</ModalTitle>
                            <ModalMensage>Ao clicar no botão abaixo, será enviado uma solicitação a empresa {data.item.slug_name}. Aguarde até que ela aceite.</ModalMensage>
                            <ButtonLg title="Confirmar" action={() => handleSubmit({company: data.item, setShowModal})}/>
                        </ModalContent>
                    </ModalContainer>
                </TouchableWithoutFeedback>
            </Modal>
            <Container>
                <Button onPress={() => setShowModal(true)}>
                    <LogoArea>
                        <Logo source={{uri:`${URL}files/${data.item.logo}`}}/>
                    </LogoArea>
                    <InfoArea>
                        <View style={{flex:1, justifyContent: 'space-between'}}>
                            <View>
                                <Title>{data.item.slug_name}</Title>
                                <SubTitle>{data.item.identification_number}</SubTitle>
                            </View>
                            {
                                data.item.is_pending && (
                                    <Status>
                                        <MaterialIcons name='hourglass-top' size={18} color='#008C81'/>
                                        <StatusLabel>Pendente</StatusLabel>
                                    </Status>
                                )
                            }
                            {
                                (!data.item.is_pending && !data.item.is_joined) && (
                                    <Status>
                                        <MaterialCommunityIcons name='cancel' size={18} color='#008C81'/>
                                        <StatusLabel>Não associado</StatusLabel>
                                    </Status>
                                )
                            }                            
                        </View>
                    </InfoArea>
                </Button>
            </Container>
        </View>
    )
}

export default CompanyCard;