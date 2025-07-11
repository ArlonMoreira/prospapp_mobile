import React from 'react'
import { Text, View, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
//Redux
import { justify, resetForm } from '../../../slices/registerPointSlice';
//Hooks
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import useUtil from '../../../hooks/useUtil';
import { useDispatch, useSelector } from 'react-redux';
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
import { Errors, Error } from '../../Register/styles';

const Justify = ({ route }) => {
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  //Redux
  const dispatch = useDispatch();
  const { successJustify, loadingJustify, errosJustify } = useSelector(state => state.registerPoint);  

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
    const params = {
      local: local.id,
      entry_datetime: `${hourStart}:${minuteStart}:00`,
      exit_datetime: `${hourEnd}:${minuteEnd}:00`,
      justify_description: justification
    };

    dispatch(justify(params));

  };

  useEffect(() => {
    if(successJustify){
      navigation.navigate('Register');
      dispatch(resetForm());
    }

  }, [successJustify]);

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
        <ScrollArea
          scrollEventThrottle={16}
        >
          <TitleArea style={{height: 100}}>
            <Instruction>Registrar ponto no local:</Instruction>
            <Text style={{fontFamily: 'montserrat-semibold', color: '#64748b'}}>{local ? local.name : '-'}</Text>
          </TitleArea>          
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: 'montserrat-bold', fontSize: 44, color }}>
              {formatDate(now)}
            </Text>
          </View>           
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
          <Errors>
            { errosJustify.entry_datetime && errosJustify.entry_datetime.map((error, i) => <Error key={i}>{ error }</Error>) }
          </Errors>          
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
          <Errors>
            { errosJustify.exit_datetime && errosJustify.exit_datetime.map((error, i) => <Error key={i} style={{color: 'rgb(191, 159, 18)'}}>{ error }</Error>) }
          </Errors>            
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
          <Errors>
            { errosJustify.justify_description && errosJustify.justify_description.map((error, i) => <Error key={i} style={{color: 'rgb(191, 159, 18)'}}>{ error }</Error>) }
          </Errors>  
          <View style={{marginTop: 30, width: '100%', paddingLeft: 10, marginBottom: 20}}>
            <ButtonLg loading={loadingJustify} disabled={loadingJustify} action={() => handleRegister()} title={'Registrar'} color={color} fontColor='#fff' largeWidth={330}/>  
          </View>                   
        </ScrollArea>                             
      </PageArea>     
    </Container>
  )
};

export default Justify;