import { Text } from 'react-native';
//Styles
import { Container, LabelsArea, Label, IconArea, InfoArea, Info } from '../WidgetLocals/styles';
import { Ionicons } from '@expo/vector-icons';

const Widget = ({ item, action, color, icon="enter-outline", iconSize=32 }) => {

    return (
        <Container onPress={action}>
            <LabelsArea>
                <Label style={{ fontSize: 12, opacity: 0.5 }}>Turma:</Label>
                <Label 
                    style={{ color, fontFamily: 'montserrat-semibold', width: 250 }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >{item.name}</Label>
                <InfoArea>
                    <Text style={{ opacity: 0.5, fontSize: 11 }}>Alunos matriculados:</Text>
                    <Info>
                        <Text style={{ color, fontSize: 11, fontFamily: 'montserrat-bold' }}>{item.student_count}</Text>
                    </Info>
                </InfoArea>                 
            </LabelsArea>
            <IconArea>
                <Ionicons name={icon} size={iconSize} color={color} />               
            </IconArea>        
        </Container>
    );

};

export default Widget;