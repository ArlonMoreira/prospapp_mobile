import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
//Redux
import { register, resetForm, change, resetErrorMessage } from '../../../slices/pointLocalsSlice';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
//Components
import InputForm from '../../../components/InputForm';
import ButtonLg from '../../../components/ButtonLg';
import Alert from '../../../components/Alert';
//Styles
import { 
  Container,
  Instruction,
  ScrollArea
} from '../../ElectronicCall/ListClass/styles';
import { 
  SelectContainer,
  LabelSelect,
  MapArea
} from './styles';
import { Select } from '../../Call/styles';
import { MapSearchArea, MapButtonSearch } from './styles';
import { Errors, Error } from '../../Register/styles';
import { Octicons } from '@expo/vector-icons';

const RegisterLocal = ({ route }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { successRegister, errors, loadingRegister, errorMessage } = useSelector(state => state.pointLocals);

  const [ editPage, setEditPage ] = useState(false);

  const { color, companyId, local, handleScroll, nameRef } = route.params;

  const [ id, setId ] = useState(null);
  const [ name, setName ] = useState('');  
  const [ iden, setIden ] = useState(null);
  const [ limitRadius, setLimitRadius ] = useState('100');

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  const handleAddLocal = () => {  
    const data = {
      name: name,
      identification_number: iden && parseInt(iden.replace(/\D/g, '')),
      company: companyId,
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      limit_radius: parseInt(limitRadius)
    };

    if(editPage){
      dispatch(change({data, localId: id}))
    } else {
      dispatch(register(data));
    }
  
  };

  useEffect(() => {
    if(successRegister) {
      console.log('TESTE')
      navigation.navigate('ListLocals');
    }
  }, [successRegister]);  

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

        const { lat, lon } = onlyGoias ? onlyGoias: result[0];
        const coord = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

        setMarkerCoord(coord);
        zoomToMarker();
        
      }

    }

  };

  useEffect(() => {
    if(local){
      setEditPage(true); //Caso vinher os dados do local como parâmetro será identificado como página de edição.
      local.id && setId(local.id);
      local.name && setName(local.name);
      local.identification_number && setIden(local.identification_number.toString());
      local.limit_radius && setLimitRadius(local.limit_radius.toString());
      if(local.latitude && local.latitude){
        setMarkerCoord({
          latitude: local.latitude,
          longitude: local.longitude
        });
      }
      
    }
    
  }, [local]); 
  
  //Alert mensagem
  const [showAlertError, setShowAlertError] = useState(false);

  //Apresentar o alert caso tiver mensagem de erro.
  useEffect(()=>{
    if(errorMessage){
      setShowAlertError(true);
    } else {
      setShowAlertError(false);
    }

  }, [errorMessage, setShowAlertError]);

  //Fechar a mensagem de erro automaticamente.
  useEffect(()=>{
    if(!showAlertError){ //Resetar o estado de errorMessage caso não tiver mais visível o alerta.
      dispatch(resetErrorMessage());
    } else { //Caso estiver aberto a mensagem de erro, 1 segundo depois será fechada sozinha.
      const timeoutClearMessage = setTimeout(()=>{
        dispatch(resetErrorMessage());
      }, 6000);

      return () => {
        clearTimeout(timeoutClearMessage);
      }

    }

  }, [showAlertError]);   

  return (
    <Container>        
      <ScrollArea
        onScroll={handleScroll}
        scrollEventThrottle={16}   
      > 
        {
          showAlertError && <Alert message={errorMessage} setShow={setShowAlertError}/>
        }             
        <InputForm element={nameRef} label='Nome do Local/Empresa' value={name} setValue={setName} color={color} pointerColor={color}/>
        <Errors>
          {
            errors.name && errors.name.map((error, i) => <Error key={i}>{error}</Error>)
          }
        </Errors>
        <InputForm label='CNPJ do Local/Empresa' mask={'cnpj'} value={iden} setValue={setIden} color={color} pointerColor={color}/>                  
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
        <View style={{marginTop: 30, width: '100%', paddingLeft: 10, marginBottom: 20}}>
          <ButtonLg loading={loadingRegister} disabled={loadingRegister} action={() => handleAddLocal()} title={editPage ? 'Alterar': 'Adicionar'} color={color} fontColor='#fff' largeWidth={365}/>  
        </View>         
      </ScrollArea>
    </Container>
  )
};

export default RegisterLocal;