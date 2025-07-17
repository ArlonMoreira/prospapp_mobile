import { Text } from 'react-native';
//Styles
import { Container, Label, LabelsArea } from './styles';
import { IconArea, InfoArea } from '../WidgetLocals/styles';
import { Ionicons } from '@expo/vector-icons';

const WidgetPrimary = ({ title='', text='', action, color='#fff', icon="enter-outline", iconSize=32 }) => {

    return (
        <Container onPress={action}>
            <LabelsArea>
                <Label>{title}</Label>
                <InfoArea>
                    <Text style={{ fontSize: 11, color: '#fff', textAlign: 'justify' }}>{text}</Text>
                </InfoArea>                 
            </LabelsArea>
            <IconArea>
                <Ionicons name={icon} size={iconSize} color={color} />               
            </IconArea>        
        </Container>
    );

};

export default WidgetPrimary;