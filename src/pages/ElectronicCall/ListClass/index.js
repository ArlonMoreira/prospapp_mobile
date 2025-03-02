import React, { useEffect, useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
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
    const { ordenarObjectAsc } = useUtil();

    const classesOrder = useMemo(() => {
      return classes && classes.length > 0? ordenarObjectAsc([...classes], 'name'): [];
    }, [classes]);
    
    return (
        <Container>
            <InstructionArea>
                <Instruction>Escolhar uma turma para acessar a área de chamada:</Instruction>
            </InstructionArea>            
            <ScrollArea>
            {
                classesOrder && classesOrder.length > 0 && classesOrder.map((item, i) => (
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