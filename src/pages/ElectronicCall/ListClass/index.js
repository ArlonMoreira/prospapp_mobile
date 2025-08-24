import { useMemo } from 'react'
import useUtil from '../../../hooks/useUtil';
//components
import Widget from '../../../components/Widget';
import InstructionArea from '../../../components/IntroductionArea';
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { Container, ListArea } from './styles';
import { FlatList } from 'react-native';

const ListClass = ({ route }) => {
    
    const navigation = useNavigation(); 
    
    const { classes, color } = route.params;
    const { ordenarObjectAsc } = useUtil();

    const classesOrder = useMemo(() => {
        return classes && classes.length > 0 
            ? ordenarObjectAsc([...classes], 'name') 
            : [];
    }, [classes]);
    
    return (
        <Container>
            <InstructionArea text={'Escolha uma turma para acessar a área de chamada.'}/>
            <ListArea>
                <FlatList
                    data={classesOrder}
                    keyExtractor={(item) => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Widget 
                            item={item} 
                            color={color} 
                            action={() => navigation.navigate('Call', { classId: item.id, className: item.name })}
                        />
                    )}
                />
            </ListArea>
        </Container>
    )
}

export default ListClass;
