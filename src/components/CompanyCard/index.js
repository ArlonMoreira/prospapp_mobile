import React, { useEffect, useState } from 'react'
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
//Hooks
import { useSelector } from 'react-redux';
//Components
import ButtonLg from '../ButtonLg';
import SkeletonPlaceholder from '../SkeletonPlaceholder';
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
//libs
import { cnpj } from 'cpf-cnpj-validator';

const URL = process.env.EXPO_PUBLIC_API_URL;

const CompanyCard = ({data, handleSubmit, close, isLoading, setShowFade}) => {
    //Carregamento da solicitação.
    const { loadingPending } = useSelector((state) => state.companys);

    const [showModal, setShowModal] = useState(false);

    //Fechar o modal automaticamente quando ocorrer sucesso na requisição.
    useEffect(()=>{
        if(close){
            setShowModal(false);
        }
        
    }, [close]);

    const handleCloseModal = () => { //Permite que o modal seja fecha só se o carregamento não tiver ocorrendo o processamento de uma requisição, enquanto isso, o usuário não pode fechar o modal.
        if(!loadingPending){
            setShowModal(false);
        }
        
    };

    useEffect(()=>{
        if(setShowFade){
            if(showModal){
                setShowFade(true);
            } else {
                setShowFade(false);
            }
        }
        
    }, [showModal, setShowFade])

    return (
        <View style={{flex: 1}}>
            {
                data && (
                    <Modal
                        transparent={true}
                        animationType='slide'
                        visible={showModal}
                        onRequestClose={() => handleCloseModal()} //Permite fechar o modal quando clicado em uma área fora
                    >
                        <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                            <ModalContainer>
                                <ModalContent>
                                    {
                                        data.is_pending && (
                                            <>
                                                <ModalTitle>Deseja cancelar a solicitação ?</ModalTitle>
                                                <ModalMensage>Ao clicar no botão abaixo, será cancelado o pedido de associação à empresa {data && data.slug_name}. É possível cancelar o pedido de associação antes que a empresa aceite a solicitação.</ModalMensage>
                                            </>
                                        )
                                    }
                                    {        
                                        (!data.is_pending && !data.is_joined) && (
                                            <>
                                                <ModalTitle>Deseja associar à {data.slug_name}?</ModalTitle>
                                                <ModalMensage>Ao clicar no botão abaixo será enviado uma solicitação a empresa {data && data.slug_name}. Aguarde até que ela aceite.</ModalMensage>
                                            </>
                                        )
                                    }
                                    <ButtonLg title={data.is_pending ? "Cancelar" : "Confirmar"} action={() => handleSubmit(data)} loading={loadingPending}/>
                                </ModalContent>
                            </ModalContainer>
                        </TouchableWithoutFeedback>
                    </Modal>
                )
            }
            <Container disabled={isLoading} activeOpacity={isLoading ? 1 : 0.2}>
                <Button onPress={() => setShowModal(true)} disabled={loadingPending}>
                    <LogoArea>
                        {
                            isLoading && (
                                <SkeletonPlaceholder height={105} width={100}/>
                            )
                        }
                        {
                            !isLoading && data && (
                                <Logo source={{uri:`${URL}files/${data.logo}`}}/>
                            )
                        }
                    </LogoArea>
                    <InfoArea>
                        <View style={{flex:1, justifyContent: 'space-between'}}>
                            <View>
                                {
                                    isLoading && (
                                        <View style={{marginTop: 10}}>
                                            <SkeletonPlaceholder height={20} width={180}/>
                                            <View style={{marginTop: 5}}>
                                                <SkeletonPlaceholder height={15} width={130}/>
                                            </View>
                                        </View>
                                    ) 
                                }
                                {
                                    !isLoading && data && (
                                        <>
                                            <Title>{data && data.slug_name}</Title>
                                            <SubTitle>{data && cnpj.format(data.identification_number)}</SubTitle>                                        
                                        </>
                                    )
                                }
                            </View>
                            {
                                data && data.is_pending && (
                                    <Status>
                                        <MaterialIcons name='hourglass-top' size={18} color='#008C81'/>
                                        <StatusLabel>Pendente</StatusLabel>
                                    </Status>
                                )
                            }
                            {
                                data && (!data.is_pending && !data.is_joined) && (
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