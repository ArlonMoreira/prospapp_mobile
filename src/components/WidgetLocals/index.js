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

const WidgetLocals = ({ item, color, icon="enter-outline", iconSize=32, action }) => {

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

    const formatCNPJ = (cnpj) => {
        if (!cnpj) return '';
      
        const cleaned = cnpj.toString().replace(/\D/g, '').padStart(14, '0');
      
        if (cleaned.length !== 14) return cnpj;
      
        return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, 
                               '$1.$2.$3/$4-$5');
    };    

    return (
        <Container onPress={() => action()}>
            <LabelsArea>
                <Label style={{ color, fontFamily: 'montserrat-semibold' }}>{item.name}</Label>
                <Label style={{ fontSize: 12, opacity: 0.5 }}>
                    {item.identification_number ? formatCNPJ(item.identification_number) : '00.000.000/0000-00'}
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
                <Ionicons name={icon} size={iconSize} color={color} />
            </IconArea>            
        </Container>
    );
};

export default WidgetLocals;
