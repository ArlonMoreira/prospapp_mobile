import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
//Redux
import { register, resetForm } from '../../../../slices/pointLocalsSlice';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//Components
import InputForm from '../../../../components/InputForm';
import ButtonLg from '../../../../components/ButtonLg';
//Styles
import { 
  Container,
  Instruction,
  ScrollArea
} from '../../../ElectronicCall/ListClass/styles';
import { 
  SelectContainer,
  LabelSelect,
  MapArea
} from './styles';
import { Select } from '../../../Call/styles';
import { MapSearchArea, MapButtonSearch } from './styles';
import { Errors, Error } from '../../../Register/styles';
import { Octicons } from '@expo/vector-icons';

const RegisterLocal = ({ route }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { success, errors, loadingRegister } = useSelector(state => state.pointLocals);

  const { color, companyId } = route.params;

  const nameRef = useRef(null);
  const [ name, setName ] = useState('');  
  const [ iden, setIden ] = useState(null);
  const [ hour, setHour ] = useState('00');
  const [ minute, setMinute ] = useState('00');
  const [ limitRadius, setLimitRadius ] = useState('100');

  const [ hourOptions, setHourOptions ] = useState([]);
  const [ minuteOptions, setMinuteOptions ] = useState([]);  

  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i || 0).padStart(2, '0'));
    setHourOptions(hours);

    const minutes = Array.from({ length: 60 }, (_, i) => String(i || 0).padStart(2, '0'));
    setMinuteOptions(minutes);

    dispatch(resetForm());

    nameRef.current?.focus();

  }, []);

  const handleAddLocal = () => {  
    const data = {
      name: name,
      identification_number: iden && parseInt(idenSelected.replace(/\D/g, '')),
      workload_hour: hour,
      workload_minutes: minute,
      company: companyId,
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      limit_radius: parseInt(limitRadius)
    };

    dispatch(register(data));
  
  };

  useEffect(() => {
    if(success) navigation.navigate('ListLocals');
  }, [success]);  

  //Obter localização geográfico do gráfico de locais de ponto

  const mapRef = useRef(null);

  const [ markerCoord, setMarkerCoord ] = useState({
    latitude: -16.690628576263858,
    longitude: -49.25220351666212,
  });  

  const handleMapPress = (e) => {
    const coord = e.nativeEvent.coordinate;
    setMarkerCoord(coord);

    // Mover a câmera para a nova coordenada
    mapRef.current?.animateToRegion({
      ...coord,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);

  };

  const [ searchInput, setSearchInput ] = useState(null);

  const zoomToMarker = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: markerCoord.latitude,
        longitude: markerCoord.longitude,
        latitudeDelta: 0.005, // Quanto menor, mais zoom
        longitudeDelta: 0.005,
      }, 1000); // Duração da animação em ms

    }

  };  

  const searchLocation = async () => {
    if(searchInput){
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchInput)}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ReactNativeApp/1.0 (arlon.silva28@gmail.com)', // Substitua por seu e-mail real
          'Accept-Language': 'pt-BR',
        }
      });
      const result = await response.json();

      if (result.length > 0) {
        //Dá preferência pra localização em Goiás
        const onlyGoias = result.filter(item => item.display_name.includes("Goiás"))[0];
        console.log('onlyGoias', onlyGoias)
        const { lat, lon } = onlyGoias ? onlyGoias: result[0];
        const coord = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

        setMarkerCoord(coord);
        zoomToMarker();
        
      }

    }

  };

  return (
    <Container>        
      <ScrollArea>     
        <InputForm element={nameRef} label='Nome do Local/Empresa' value={name} setValue={setName} color={color} pointerColor={color}/>
        <Errors>
          {
            errors.name && errors.name.map((error, i) => <Error key={i}>{error}</Error>)
          }
        </Errors>
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
        <Instruction style={{ marginTop: 30}}>Defina o raio limite para marcação de ponto (em metros). Este valor representa o perímetro de tolerância para registros. Colaboradores fora desse raio não poderão realizar a marcação de ponto.</Instruction>        
        <InputForm label='Raio (Metros)' value={limitRadius} setValue={setLimitRadius} color={color} pointerColor={color} keyboardType='numeric'/>        
        <Instruction style={{ marginTop: 30}}>Abaixo, selecione a localização da empresa, clique e segure sobre a localização. Esse local é obrigatório, será utilizado no "Check-in" identificando se o colaborador está de fato no local de registro de ponto.</Instruction>        
        <MapArea>
          <MapSearchArea>
            <TextInput
              placeholder="Buscar por ponto no mapa"
              value={searchInput}
              onChangeText={setSearchInput}
              style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, width: '86%' }}
            />  
            <MapButtonSearch onPress={searchLocation}>
              <Octicons name='search' size={30} color={color} />
            </MapButtonSearch>
          </MapSearchArea>   
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: 300 }}
            initialRegion={{
              latitude: markerCoord.latitude,
              longitude: markerCoord.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            onLongPress={handleMapPress}
          >
            <Marker coordinate={markerCoord}/>
          </MapView>
        </MapArea>
        <View style={{marginTop: 30, width: '100%', paddingLeft: 10}}>
          <ButtonLg loading={loadingRegister} disabled={loadingRegister} action={() => handleAddLocal()} title={'Adicionar'} color={color} fontColor='#fff' largeWidth={330}/>  
        </View>         
      </ScrollArea>
    </Container>
  )
};

export default RegisterLocal;