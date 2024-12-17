import React, { useEffect } from 'react'
//Hooks
import { useNavigation } from '@react-navigation/native';
//Styles
import { 
    Container,
    ScrollArea,
    ClassCard,
    Stick,
    TextArea,
    NameClass,
    IconArea
} from './styles'
import { Ionicons } from '@expo/vector-icons';

const SelectClass = ({ route }) => {
    
    const navigation = useNavigation(); 
    
    const { classes, color } = route.params;

    return (
        <Container>
            <ScrollArea>
                {
                    classes && classes.length > 0 && classes.map((item, i) => (
                        <ClassCard key={item.id} onPress={() => navigation.navigate('Call', {classId: item.id, className: item.name})}>
                            <Stick/>
                            <TextArea>
                                <NameClass style={{color}}>{item.name}</NameClass>
                            </TextArea>
                            <IconArea>
                                <Ionicons name='enter-outline' size={28} color={color}/>
                            </IconArea>
                        </ClassCard> 
                    ))
                }
            </ScrollArea>
        </Container>
    )
}

export default SelectClass;