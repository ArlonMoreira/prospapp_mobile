import React, { useState, useEffect } from 'react';
import { Modal, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//Components
import Header from '../../components/Header';
import Menager from './Menager';
import Employee from './Employee';
import LoadingPage from '../../components/LoadingPage';
import Fade from '../../components/Fade';
import InputForm from '../../components/InputForm';
import ButtonLg from '../../components/ButtonLg';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { list, register, resetForm } from '../../slices/pointLocalsSlice';
//Styles
import { StatusBar } from 'expo-status-bar';
import { 
  Body,
  TitleAreaPage,
  TitlePage,
  Container,
  ModalView,
  ModalContent,
  ModalTitle,
  ModalResume
} from '../ElectronicCall/styles';
import { Select } from '../Call/styles';
import { 
  SelectContainer,
  LabelSelect
} from './styles';
import { Errors, Error } from '../Register/styles';

const URL = process.env.EXPO_PUBLIC_API_URL;

const ElectronicPoint = () => {

  const { userData } = useSelector((state) => state.me);
  const [ primaryColor, setPrimaryColor ] = useState('#fff');
  const [ staffPerfil, setStaffPerfil ] = useState(false);
  const [ companyId, setCompanyId ] = useState();
  const [ logo, setLogo ] = useState(null);
  
  useEffect(()=>{
    if(userData){

      if(userData.is_staff) setStaffPerfil(true);

      if(userData.companys_joined.length){
        setPrimaryColor(userData.companys_joined[0].primary_color);
        setCompanyId(userData.companys_joined[0].company_id_annotated);
        setLogo(`${URL}/files/${userData.companys_joined[0].logo}`);        
        if(userData.companys_joined[0].role == 'Gestor') setStaffPerfil(true);

      }

    }

  }, [userData]);  

  //Carregar locais de ponto
  const dispatch = useDispatch();
  const { loading, data, success, errors, loadingRegister } = useSelector(state => state.pointLocals);
  
  //Carregr locais de ponto
  useEffect(() => {
    if(companyId){
      dispatch(list(companyId));
    }
    
  }, [companyId]);

  //Registrar empresa
  const [ showModalAddLocal, setShowModalAddLocal ] = useState(false);
  const [ nameSelected, setNameSelected ] = useState('');
  const [ idenSelected, setIdenSelected ] = useState(null);
  const [ hourSelected, setHourSelected ] = useState('00');
  const [ minuteSelected, setMinuteSelected ] = useState('00');

  const [ hourOptions, setHourOptions ] = useState([]);
  const [ minuteOptions, setMinuteOptions ] = useState([]);

  const closeModalAddLocal = () => {
    setNameSelected('');
    setIdenSelected(null);
    setHourSelected('00');
    setMinuteSelected('00');    
    setShowModalAddLocal(false);
  };

  useEffect(() => {
    const hours = Array.from({ length: 24 }, (_, i) => String(i || 0).padStart(2, '0'));
    setHourOptions(hours);

    const minutes = Array.from({ length: 60 }, (_, i) => String(i || 0).padStart(2, '0'));
    setMinuteOptions(minutes);

    dispatch(resetForm());

  }, []);

  const handleAddLocal = () => {  
    const data = {
      name: nameSelected,
      identification_number: idenSelected && parseInt(idenSelected.replace(/\D/g, '')),
      workload_hour: hourSelected,
      workload_minutes: minuteSelected,
      company: companyId
    };

    dispatch(register(data));
    
  };

  useEffect(() => {
    if(success){
      closeModalAddLocal();
      dispatch(resetForm());
    }

  }, [success]);

  return (
    <>
      {
        loading ? <LoadingPage backgroundColor={primaryColor} logo={logo}/> : (
          <Container>
            {(showModalAddLocal) && <Fade/>}            
            <Modal
              transparent={true}
              animationType='slide'
              visible={showModalAddLocal}
              onRequestClose={() => setShowModalAddLocal(false)} //Permite fechar o modal quando clicado em uma área fora      
            >
              <TouchableWithoutFeedback onPress={() => setShowModalAddLocal(false)}>
                <ModalView>
                  <ModalContent>
                    <ModalTitle style={{color: primaryColor}}>Adicionar Local</ModalTitle>
                    <ModalResume>Nos campos abaixo, você irá registrar o local/empresa de registro de ponto. </ModalResume>
                    <InputForm label='Nome do Local/Empresa' value={nameSelected} setValue={setNameSelected} color={primaryColor} pointerColor={primaryColor}/>
                    <Errors>
                      {
                        errors.name && errors.name.map((error, i) => <Error key={i}>{error}</Error>)
                      }
                    </Errors>
                    <InputForm label='CNPJ do Local/Empresa' mask={'cnpj'} value={idenSelected} setValue={setIdenSelected} color={primaryColor} pointerColor={primaryColor}/>                  
                    <Text style={{ color: primaryColor, marginLeft: 6, fontFamily: 'montserrat-medium', marginTop: 20, marginBottom: 10 }}> Carga horária: </Text>
                    <SelectContainer>
                      <View style={{width: '44%'}}>
                        <LabelSelect style={{ color: primaryColor }}>Hora</LabelSelect>
                        <Select style={{marginTop: 0}}>
                          <Picker
                            selectedValue={hourSelected}
                            style={{
                              backgroundColor: 'transparent', // deixa o Picker sem cor
                              width: '100%',
                              height: '100%'
                            }}
                            onValueChange={(hour) => setHourSelected(hour)}>
                            {
                              hourOptions.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                            }
                          </Picker>
                        </Select>
                      </View>
                      <View style={{width: '44%'}}>
                        <LabelSelect style={{ color: primaryColor }}>Minuto</LabelSelect>
                        <Select style={{marginTop: 0}}>
                          <Picker
                            selectedValue={minuteSelected}
                            style={{
                              backgroundColor: 'transparent', // deixa o Picker sem cor
                              width: '100%',
                              height: '100%'
                            }}
                            onValueChange={(hour) => setMinuteSelected(hour)}>
                            {
                              minuteOptions.map((option) => <Picker.Item key={option} value={option} label={option}/>)
                            }
                          </Picker>
                        </Select>
                      </View>
                    </SelectContainer>  
                    <View style={{marginTop: 30, width: '100%', paddingLeft: 10}}>
                      <ButtonLg loading={loadingRegister} disabled={loadingRegister} action={() => handleAddLocal()} title={'Adicionar'} color={primaryColor} fontColor='#fff' largeWidth={300}/>  
                    </View>            
                  </ModalContent>
                </ModalView>
              </TouchableWithoutFeedback>
            </Modal>            
            <StatusBar 
              translucent
              backgroundColor="transparent"
            />      
            <Header themeColor={primaryColor}/>
            <Body>
              <TitleAreaPage>
                <TitlePage style={{color: primaryColor}}>Locais de Ponto</TitlePage>
              </TitleAreaPage>
              {
                staffPerfil ?        
                  <Menager 
                    primaryColor={primaryColor}
                    locals={data}
                    setShowModalAddLocal={setShowModalAddLocal}
                    logo={logo}/>
                : 
                  <Employee/>
              }
            </Body>
          </Container>        
        )
      }
    </>
  )
};

export default ElectronicPoint;