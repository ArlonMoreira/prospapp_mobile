import React from 'react'
import { Text, View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
//Hooks
import { useState, useEffect } from 'react';
import useUtil from '../../../hooks/useUtil';
//Components
import Header from '../../../components/Header';
import ButtonLg from '../../../components/ButtonLg';
//styles
import { StatusBar } from 'react-native';
import { ScrollArea } from '../../ElectronicCall/ListClass/styles';
import { Container } from '../../ElectronicCall/styles';
import { PageArea, TitleArea } from '../styles';
import { Instruction } from '../../ElectronicCall/ListClass/styles';
import { SelectContainer, LabelSelect } from '../../ElectronicPoint/styles';
import { Select } from '../../Call/styles';

const Justify = ({ route }) => {

  //Route
  const { local, color } = route.params;  

  //Enviar justificativa
  const [ hourStart, setHourStart ] = useState('00');
  const [ minuteStart, setMinuteStart ] = useState('00');
  const [ hourEnd, setHourEnd ] = useState('00');
  const [ minuteEnd, setMinuteEnd ] = useState('00');  

  const [ hourOptions, setHourOptions ] = useState([]);
  const [ minuteOptions, setMinuteOptions ] = useState([]);
  
  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i || 0).padStart(2, '0'));
    setHourOptions(hours);

    const minutes = Array.from({ length: 60 }, (_, i) => String(i || 0).padStart(2, '0'));
    setMinuteOptions(minutes);

  }, []);

  const [justification, setJustification] = useState('');

  const handleRegister = () => {

  };

  //Data atual
  const [now] = useState(new Date());

  const { formatDate } = useUtil();

  return (
    <Container>
      <StatusBar 
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Header themeColor={color}/>
      <PageArea>
        <TitleArea>
          <Instruction>Registrar ponto no local:</Instruction>
          <Text style={{fontFamily: 'montserrat-semibold', color: '#64748b'}}>{local ? local.name : '-'}</Text>
        </TitleArea>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontFamily: 'montserrat-bold', fontSize: 44, color }}>
            {formatDate(now)}
          </Text>
        </View>        
        <ScrollArea
          scrollEventThrottle={16}
          style={{minHeight: 300}}
        >
          <Instruction style={{ marginTop: 20, marginBottom: 10}}>Horário de entrada.</Instruction>
          <SelectContainer>
            <View style={{ width: '49%' }}>
              <LabelSelect style={{ color }}>Hora</LabelSelect>
              <Select style={{ marginTop: 0, paddingHorizontal: 10 }}>
                <RNPickerSelect
                  onValueChange={(value) => setHourStart(value)}
                  value={hourStart}
                  placeholder={{ label: 'Selecione a hora', value: null }}
                  items={hourOptions.map((option) => ({
                    label: option,
                    value: option
                  }))}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    }
                  }}
                />
              </Select>
            </View>
            <View style={{ width: '49%' }}>
              <LabelSelect style={{ color }}>Minuto</LabelSelect>
              <Select style={{ marginTop: 0, paddingHorizontal: 10 }}>
                <RNPickerSelect
                  onValueChange={(value) => setMinuteStart(value)}
                  value={minuteStart}
                  placeholder={{ label: 'Selecione o minuto', value: null }}
                  items={minuteOptions.map((option) => ({
                    label: option,
                    value: option
                  }))}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    }
                  }}
                />
              </Select>
            </View>
          </SelectContainer>
          <Instruction style={{ marginTop: 20, marginBottom: 10}}>Horário de saída.</Instruction>
          <SelectContainer>
            <View style={{ width: '49%' }}>
              <LabelSelect style={{ color }}>Hora</LabelSelect>
              <Select style={{ marginTop: 0, paddingHorizontal: 10 }}>
                <RNPickerSelect
                  onValueChange={(value) => setHourEnd(value)}
                  value={hourEnd}
                  placeholder={{ label: 'Selecione a hora', value: null }}
                  items={hourOptions.map((option) => ({
                    label: option,
                    value: option
                  }))}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    }
                  }}
                />
              </Select>
            </View>
            <View style={{ width: '49%' }}>
              <LabelSelect style={{ color }}>Minuto</LabelSelect>
              <Select style={{ marginTop: 0, paddingHorizontal: 10 }}>
                <RNPickerSelect
                  onValueChange={(value) => setMinuteEnd(value)}
                  value={minuteEnd}
                  placeholder={{ label: 'Selecione o minuto', value: null }}
                  items={minuteOptions.map((option) => ({
                    label: option,
                    value: option
                  }))}
                  style={{
                    inputIOS: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    },
                    inputAndroid: {
                      fontSize: 16,
                      paddingHorizontal: 10,
                      paddingVertical: 0,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 4,
                      color: '#000',
                      backgroundColor: 'transparent',
                    }
                  }}
                />
              </Select>
            </View>
          </SelectContainer>   
          <Instruction style={{ marginTop: 30 }}>Justificativa (máx. 125 caracteres)</Instruction>
          <TextInput
            style={{
              height: 100,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              textAlignVertical: 'top',
              fontFamily: 'montserrat-regular',
              fontSize: 14,
              color: '#000',
              backgroundColor: '#fff',
              marginTop: 10,
            }}
            placeholder="Digite sua justificativa aqui..."
            maxLength={125}
            multiline
            numberOfLines={4}
            value={justification}
            onChangeText={setJustification}
          />
        </ScrollArea>    
        <View style={{marginTop: 30, width: '100%', paddingLeft: 10, marginBottom: 20}}>
          <ButtonLg action={() => handleRegister()} title={'Registrar'} color={color} fontColor='#fff' largeWidth={330}/>  
        </View>                      
      </PageArea>     
    </Container>
  )
};

export default Justify;