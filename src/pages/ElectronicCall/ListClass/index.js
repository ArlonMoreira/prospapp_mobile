import {  useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
//components
import Widget from '../../../components/Widget';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { Container, ScrollArea, InstructionArea, Instruction } from './styles';

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
                    <Widget item={item} key={i} color={color} action={() => navigation.navigate('Call', {classId: item.id, className: item.name})}></Widget>
                ))
            }
            </ScrollArea>
        </Container>
    )
}

export default ListClass;