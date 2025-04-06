import React, { useEffect, useContext } from 'react'
import { ScrollView, Text, View } from 'react-native';
//Redux
import { listUsersManager } from '../../../slices/managerSlice';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Styles
import { CardUser, Label, LabelsArea, IconArea, RoleUser, RoleContainer, CardUserLoading } from './styles';
import { TitleArea, Title } from '../EditProfile/styles';

import { FontAwesome } from '@expo/vector-icons';

const ManagerProfile = ({ route }) => {

    //Redux
    const dispatch = useDispatch();
    const { data, loading: loadingManager } = useSelector((state) => state.manager);
    
    //Obter parâmetors da rota
    const { color, companyId, action } = route.params;

    //Carregar os dados da página assim 
    useEffect(() => {
        dispatch(listUsersManager(companyId));
    }, [route]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 10, alignItems: 'flex-start' }}>
            <TitleArea style={{ alignSelf: 'stretch', marginBottom: 10 }}>
                <Title>Clique em um usuário para gerir suas solicitações e perfil:</Title>
            </TitleArea>
            {
                !loadingManager ? (
                    <View style={{paddingInline: 10}}>
                    {
                        data && data.length > 0 && data.map((user, i) => (
                            <CardUser key={i} onPress={() => action(user)}>
                                <LabelsArea>
                                    <Label style={{fontFamily: 'montserrat-semibold'}}>{user.full_name}</Label>
                                    <Label style={{color: '#e9e9e9', fontSize: 11}}>{user.email}</Label>
                                    <RoleUser>
                                        <Text style={{color: '#e9e9e9', fontSize: 11}}>Perfil:</Text>
                                        <RoleContainer>
                                            <Text style={{color: color, fontSize: 11, fontFamily: 'montserrat-bold'}}>{user.role}</Text>
                                        </RoleContainer>
                                    </RoleUser>
                                </LabelsArea>
                                <IconArea>
                                    {
                                        user.is_joined ? <FontAwesome name="check" size={32} color="#fff" /> : null
                                    }
                                    {
                                        user.is_pending ? <FontAwesome name="refresh" size={32} color="#fff" /> : null
                                    }
                                    {
                                        !user.is_pending && !user.is_joined ? <FontAwesome name="remove" size={32} color="#fff" /> : null
                                    }                                                                            
                                </IconArea>
                            </CardUser>                    
                        ))
                    }            
                    </View>
                ): (
                    <View style={{paddingInline: 10, width: '100%'}}>
                        <CardUserLoading></CardUserLoading>
                        <CardUserLoading></CardUserLoading>
                        <CardUserLoading></CardUserLoading>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default ManagerProfile;