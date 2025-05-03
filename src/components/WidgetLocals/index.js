import React from 'react'
//Styles
import { 
    Container,
    LabelsArea,
    Label
} from './styles';

const WidgetLocals = ({item}) => {

    return (
        <Container>
            <LabelsArea>
                <Label>{item.name}</Label>
                <Label>{item.identification_number}</Label>
            </LabelsArea>
        </Container>
    )
};

export default WidgetLocals;