import React, { useEffect } from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
    Container,
    ScrollArea,
    ClassCard,
    TextArea,
    NameClass,
    IconArea,
    IconText,
    InstructionArea,
    Instruction
} from './styles'
import { Ionicons } from '@expo/vector-icons';

const ListClass = ({ route }) => {
    
    const navigation = useNavigation(); 
    
    const { classes, color } = route.params;

    return (
        <Container>
            <InstructionArea>
                <Instruction>Escolhar uma turma para acessar a área de chamada:</Instruction>
            </InstructionArea>            
            <ScrollArea>
                {
                    classes && classes.length > 0 && classes.map((item, i) => (
                        <ClassCard key={item.id} onPress={() => navigation.navigate('Call', {classId: item.id, className: item.name})}>
                            <TextArea>
                                <NameClass style={{color}}>{item.name}</NameClass>
                            </TextArea>
                            <IconArea>
                                <IconText style={{color}}>Chamada</IconText>
                                <Ionicons name='enter-outline' size={28} color={color}/>
                            </IconArea>
                        </ClassCard> 
                    ))
                }
            </ScrollArea>
        </Container>
    )
}

export default ListClass;