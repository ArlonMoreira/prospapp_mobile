import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//Hooks
import { useDispatch } from 'react-redux';
//Components
import InputForm from '../../../../components/InputForm';
//Styles
import { 
  Container,
  InstructionArea,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';
import { 
  SelectContainer,
  LabelSelect,
  MapArea
} from './styles';
import { Select } from '../../../Call/styles';

const ListLocals = ({ route }) => {

  const dispatch = useDispatch();

  const { color } = route.params;

  const [ name, setName ] = useState('');  
  const [ iden, setIden ] = useState(null);
  const [ hour, setHour ] = useState('00');
  const [ minute, setMinute ] = useState('00');  

  const [ hourOptions, setHourOptions ] = useState([]);
  const [ minuteOptions, setMinuteOptions ] = useState([]);  

  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i || 0).padStart(2, '0'));
    setHourOptions(hours);

    const minutes = Array.from({ length: 60 }, (_, i) => String(i || 0).padStart(2, '0'));
    setMinuteOptions(minutes);

    //dispatch(resetForm());

  }, []);  

  return (
    <Container>
      <InstructionArea>
        <Instruction>Nos campos abaixo, você irá registrar o local/empresa de registro de ponto.</Instruction>
      </InstructionArea>            
      <ScrollArea>     
        <InputForm label='Nome do Local/Empresa' value={name} setValue={setName} color={color} pointerColor={color}/>
        <InputForm label='CNPJ do Local/Empresa' mask={'cnpj'} value={iden} setValue={setIden} color={color} pointerColor={color}/>                  
        <Instruction style={{ marginTop: 30}}>Selecione a carga horária especificada para esse local de registro de ponto.</Instruction>        
        <SelectContainer>
          <View style={{width: '44%'}}>
            <LabelSelect style={{ color }}>Hora</LabelSelect>
            <Select style={{marginTop: 0}}>
              <Picker
                selectedValue={hour}
                style={{
                  backgroundColor: 'transparent', // deixa o Picker sem cor
                  width: '100%',
                  height: '100%'
                }}
                onValueChange={(value) => setHour(value)}>
                {
                  hourOptions.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                }
              </Picker>
            </Select>
          </View>
          <View style={{width: '44%'}}>
            <LabelSelect style={{ color }}>Minuto</LabelSelect>
            <Select style={{marginTop: 0}}>
              <Picker
                selectedValue={minute}
                style={{
                  backgroundColor: 'transparent', // deixa o Picker sem cor
                  width: '100%',
                  height: '100%'
                }}
                onValueChange={(value) => setMinute(value)}>
                {
                  minuteOptions.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                }
              </Picker>
            </Select>
          </View>
        </SelectContainer> 
        <Instruction style={{ marginTop: 30}}>Abaixo, selecione a localização da empresa. Esse local é obrigatório, será utilizado no "Check-in" identificando se o colaborador está de fato no local de registro de ponto.</Instruction>        

      </ScrollArea>
    </Container>
  )
};

export default ListLocals