//Components
import Header from "../../../components/Header";
import TitleArea from "../../../components/TitleArea";
import { ScrollView, TextInput, View, Text } from "react-native";
import InputForm from "../../../components/InputForm";
import InstructionArea from "../../../components/IntroductionArea";
import MapView, { Marker } from 'react-native-maps';
import ButtonLg from "../../../components/ButtonLg";
//Redux
import { register, resetStateRegister, change, resetStateChange } from '../../../slices/pointLocalsSlice';
//Hooks
import { useState, useEffect, useRef } from "react";
import useKeyboardStatus from "../../../hooks/useKeyboardStatus";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
//Styles
import { Container } from "../styles";
import { MapArea, MapSearchArea, MapButtonSearch } from "./styles";
import { PageArea } from "../../ElectronicCall/styles";
import { Octicons } from '@expo/vector-icons';
import { Errors, Error } from '../../Register/styles';

const RegisterLocal = ({ route }) => {

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const keyboardVisible = useKeyboardStatus();

  //Dados coletados durante a primeira navegação
  const { color, companyId, searchRef, local } = route.params;  
  
  const [ currentColor, setCurrentColor ] = useState('');
  const [ currentCompany, setCurrentCompany ] = useState(null);
  const [ currentSearchRef, setCurrentSearchRef ] = useState(searchRef);

  //Dados editáveis
  const [ edit, setEdit ] = useState(false);
  const [ currentLocal, setCurrentLocal ] = useState(null);

  useEffect(() => {
    dispatch(resetStateRegister());
    dispatch(resetStateChange());
    setCurrentColor(color);
    setCurrentCompany(companyId);
    setCurrentSearchRef(searchRef);

    if(local){
      setCurrentLocal(local);
      setEdit(true);
    }

  }, []);

  /**
   * Gerar mapa e busca no mapa
   */
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
  
  /**
   * Cadastrar local
   */
  const [ name, setName ] = useState('');  
  const [ iden, setIden ] = useState(null);
  const [ limitRadius, setLimitRadius ] = useState('100');

  const { loadingRegister, successRegister, errosRegister, loadingChange, successChange, errorsChange } = useSelector(state => state.pointLocals);
  
  const handleAddLocal = () => {  
    const data = {
      name: name,
      identification_number: iden && parseInt(iden.replace(/\D/g, '')),
      company: currentCompany,
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      limit_radius: parseInt(limitRadius)
    };
    
    if(edit) {
      dispatch(change({ data, localId: currentLocal.id }));
    } else {
      dispatch(register(data));
    }
  
  };

  useEffect(() => { //Quero redirecionar para a página inicial de cadastro quando um novo local for cadastrado.
    if(successRegister){
      dispatch(resetStateRegister());
      navigation.navigate('ElectronicPoint');
      currentSearchRef.current && currentSearchRef.current.clear();
      
    }

  }, [successRegister]);

  /**
   * Área editáveis 
   */

  useEffect(() => {
    if(edit && currentLocal){
      setName(currentLocal.name ? currentLocal.name:'');
      setIden(currentLocal.identification_number ? currentLocal.identification_number.toString() : null);
      setLimitRadius(currentLocal.limit_radius ? currentLocal.limit_radius.toString() : '100');
      setMarkerCoord({
        latitude: currentLocal.latitude,
        longitude: currentLocal.longitude,
      });

    }

  }, [edit, currentLocal]);

  useEffect(() => {
    if(successChange){
      dispatch(resetStateChange());
      navigation.goBack();
      currentSearchRef.current && currentSearchRef.current.clear();

    }

  }, [successChange]);

  return (
    <Container style={{ paddingTop: 20 }}>
      <Header themeColor={ currentColor }/>
      <PageArea style={{ flex: 1, justifyContent: 'space-between' }}>
        {
          !keyboardVisible && (
            <TitleArea title={ edit ? 'Editar local' : 'Adicionar local'} color={ currentColor } subtitle={ edit ? name : 'Realizar o cadastro de um local de ponto'}/>
          )
        }
        <ScrollView scrollEventThrottle={16}> 
          <InstructionArea text={'Abaixo informe os dados de identificação do local de ponto'}/>
          <InputForm label='Nome do Local/Empresa' value={name} setValue={setName} color={currentColor} pointerColor={currentColor}/>
          <Errors>
           {
              edit ? (
                errorsChange.name && errorsChange.name.map((error, i) => <Error key={i}>{error}</Error>)
              ) : (
                errosRegister.name && errosRegister.name.map((error, i) => <Error key={i}>{error}</Error>)
              )
           }
          </Errors>          
          <InputForm label='CNPJ do Local/Empresa' mask={'cnpj'} value={iden} setValue={setIden} color={currentColor} pointerColor={currentColor}/>        
          <InstructionArea marginTop={20} text={'Defina o raio limite para marcação de ponto (em metros). Este valor representa o perímetro de tolerância para registros. Colaboradores fora desse raio não poderão realizar a marcação de ponto.'}/>      
          <InputForm label='Raio (Metros)' value={limitRadius} setValue={setLimitRadius} color={currentColor} pointerColor={currentColor} keyboardType='numeric'/>        
          <InstructionArea marginTop={20} text={'Clique e segure em uma localzação no mapa para definir a localização do local de registro de ponto'}/>      
          <MapArea>
            <MapSearchArea>
              <TextInput
                placeholder="Buscar por ponto no mapa"
                value={searchInput}
                onChangeText={setSearchInput}
                style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, width: '86%' }}
              />
              <MapButtonSearch onPress={searchLocation}>
                <Octicons name='search' size={30} color={currentColor} />
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
            {
              edit ? (
                <ButtonLg loading={loadingChange} disabled={loadingChange} action={() => handleAddLocal()} title={'Editar'} color={currentColor} fontColor='#fff' largeWidth={335}/>  
              ) : (
                <ButtonLg loading={loadingRegister} disabled={loadingRegister} action={() => handleAddLocal()} title={'Adicionar'} color={currentColor} fontColor='#fff' largeWidth={335}/>
              )
            }
          </View>              
        </ScrollView>               
      </PageArea> 
    </Container>
  )
}

export default RegisterLocal;