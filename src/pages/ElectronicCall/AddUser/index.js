import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import useUtil from '../../../hooks/useUtil';
//Redux
import { list, resetState } from '../../../slices/classUsersSlice';
//Components
import Header from '../../../components/Header';
import MultiSelectList from '../../../components/MultiSelectList';
import LoadingPage from '../../../components/LoadingPage';
//Styles
import { StatusBar } from 'react-native';
import { Container } from '../../ElectronicCall/styles';
import { PageArea, TitleArea } from '../../Point/styles';
import { InstructionArea } from '../../ElectronicCall/ListClass/styles';
import { Instruction } from '../../ElectronicCall/ListClass/styles';
import { TitleAreaPage, TitlePage } from '../../ElectronicCall/styles';

const AddUser = ({ route }) => {

  const { ordenarObjectAsc } = useUtil();
  const dispatch = useDispatch();

  //Dados coletados durante a primeira navegação
  const { color, data, company, logo } = route.params;

  const [ currentColor, setCurrentColor ] = useState('');
  const [ currentData, setCurrentData ] = useState({});
  const [ currentCompany, setCurrentCompany ] = useState(null);
  const [ currentLogo, setCurrentLogo ] = useState(null);

  useEffect(() => {
    //Resetar todos os estados
    dispatch(resetState());

    setCurrentColor(color);
    setCurrentData(data);
    setCurrentCompany(company);
    setCurrentLogo(logo);

  }, []);

  //Listar os usuários na lista de permissão
  const { data: users, loadingList } = useSelector(state => state.classUsers);

  useEffect(() => {
    if(currentData && currentData?.id && currentCompany){
      const classId = currentData.id;
      const company = currentCompany;

      dispatch(list({
        classId,
        company
      }));

    }

  }, [currentData, currentCompany]);

  useEffect(() => {
    console.log(loadingList);
    
  }, [loadingList]);

  return (
    <>
      {
        loadingList ? <LoadingPage backgroundColor={currentColor} logo={currentLogo}/> : (
          <Container style={{ paddingTop: 20 }}>
            <Header themeColor={ currentColor }/>
            <PageArea>
              <TitleAreaPage>
                <TitlePage style={{color: currentColor}}>Vincular usuário</TitlePage>
              </TitleAreaPage>        
              <TitleArea style={{maxHeight: 50, borderBottomWidth: 1, borderColor: '#eee', marginBottom: 20}}>
                <Instruction>Turma:</Instruction>
                {
                  currentData?.name && (
                    <Text style={{fontFamily: 'montserrat-semibold', color: '#64748b'}}>{ currentData.name }</Text>
                  )
                }
              </TitleArea>
              <InstructionArea>
                <Instruction>Selecione um ou mais colaboradores para integrar a esta turma. Poderão realizar chamadas e edita-la.</Instruction>
              </InstructionArea>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: currentColor, fontFamily: 'montserrat-medium' }}>Usuários</Text>
              </View>
              {
                users.length > 0 && users && (
                  <MultiSelectList 
                    color={ currentColor } 
                    data={ 
                      ordenarObjectAsc(
                        users.map(user => { 
                          return { id: user.user__id, label: user.user__full_name, selected: user.selected } 
                        }), 
                      'label') 
                  }/>
                )
              } 
            </PageArea> 
          </Container>      
        )
      }
    </>
  )
}

export default AddUser;