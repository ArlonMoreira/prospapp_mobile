import React, { useEffect, useContext } from 'react'
import { ScrollView } from 'react-native';
import { Text } from 'react-native';
//Redux
import { listUsersManager } from '../../../slices/managerSlice';
//Context
import { LoadingContext } from '../../../contexts/LoadingContext';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
//Styles
import { CardUser, Label, LabelsArea, IconArea, RoleUser, RoleContainer } from './styles'

import { SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

const ManagerProfile = ({ route }) => {

    //Redux
    const dispatch = useDispatch();
    const { data, loading: loadingManager } = useSelector((state) => state.manager);

    const { color, companyId } = route.params;

    useEffect(() => {
        dispatch(listUsersManager(companyId));
    }, [route]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: color, padding: 20, alignItems: 'flex-start' }}>
            {
                (data && data.length) && data.map((user, i) => (
                    <CardUser key={i}>
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
                                user.is_joined && <FontAwesome name='check' size={32} color="#fff"></FontAwesome>
                            }   
                            {
                                user.is_pending && <FontAwesome name='refresh' size={32} color="#fff"></FontAwesome>
                            }    
                            {
                                (!user.is_pending && !user.is_joined) && <FontAwesome name='remove' size={32} color="#fff"></FontAwesome>
                            }                                                                             
                        </IconArea>
                    </CardUser>                    
                ))
            }
        </ScrollView>
    )
}

export default ManagerProfile;