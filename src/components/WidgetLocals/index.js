import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
//Styles
import { 
    Container,
    LabelsArea,
    Label,
    InfoArea,
    Info,
    IconArea
} from './styles';
import { Ionicons } from '@expo/vector-icons';

const WidgetLocals = ({ item, color }) => {

    const [hour, setHour] = useState('00');
    const [minutes, setMinutes] = useState('00');

    useEffect(() => {
        if (item) {
            const h = String(item.workload_hour || 0).padStart(2, '0');
            const m = String(item.workload_minutes || 0).padStart(2, '0');
            setHour(h);
            setMinutes(m);
        }
    }, [item]);

    return (
        <Container>
            <LabelsArea>
                <Label style={{ color, fontFamily: 'montserrat-semibold' }}>{item.name}</Label>
                <Label style={{ fontSize: 12, opacity: 0.5 }}>
                    {item.identification_number ? item.identification_number : '00.000.000/0000-00'}
                </Label>
                <InfoArea>
                    <Text style={{ opacity: 0.5, fontSize: 11 }}>Carga horária:</Text>
                    <Info>
                        <Text style={{ color, fontSize: 11, fontFamily: 'montserrat-bold' }}>
                            {hour}:{minutes}
                        </Text>
                    </Info>
                </InfoArea>
            </LabelsArea>
            <IconArea>
                <Ionicons name="enter-outline" size={32} color={color} />
            </IconArea>            
        </Container>
    );
};

export default WidgetLocals;
