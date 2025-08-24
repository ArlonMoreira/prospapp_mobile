import { Text, View } from 'react-native';
//Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useUtil from '../../../hooks/useUtil';
//Redux
import { list, resetState, addUser } from '../../../slices/classUsersSlice';
//Components
import Header from '../../../components/Header';
import MultiSelectList from '../../../components/MultiSelectList';
import LoadingPage from '../../../components/LoadingPage';
import SearchArea from '../../../components/SearchArea';
import InstructionArea from '../../../components/IntroductionArea';
import TitleArea from '../../../components/TitleArea';
//Styles
import { Container } from '../../ElectronicCall/styles';
import { PageArea } from '../../Point/styles';

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

  //Selecionar usuário.
  const handleAddUser = (id) => {
    if(currentData && currentData?.id){
      const data = {
        classOfStudent: currentData.id,
        user: id
      };

      dispatch(addUser(data));

    }
  };

  //Busca textual
  const [ dataFiltered, setDataFiltered ] = useState([]);

  return (
    <>
      {
        loadingList ? <LoadingPage backgroundColor={currentColor} logo={currentLogo}/> : (
          <Container style={{ paddingTop: 20 }}>
            <Header themeColor={ currentColor }/>
            <PageArea>
              <TitleArea text={'Vincular usuário'} color={ currentColor }/>
              <View style={{maxHeight: 36, marginBottom: 20, paddingBottom: 10}}>
                <Text>Turma:</Text>
                {
                  currentData?.name && (
                    <Text
                      style={{fontFamily: 'montserrat-semibold', color: '#64748b'}}
                      ellipsizeMode="tail"
                      numberOfLines={1}                    
                    >{ currentData.name }</Text>
                  )
                }
              </View>
              <SearchArea color={ currentColor } placeholder='Busque aqui pelo usuário desejado.' setDataFiltered={ setDataFiltered } data={ users } fieldFilter={'user__full_name'}/>
              <InstructionArea text={'Selecione um ou mais colaboradores para integrar a esta turma.'}/>
              {
                dataFiltered.length > 0 && dataFiltered && (
                  <MultiSelectList 
                    color={ currentColor } 
                    data={ 
                      ordenarObjectAsc(
                        dataFiltered.map(user => { 
                          return { id: user.user__id, label: user.user__full_name, selected: user.selected } 
                        }), 
                      'label') 
                    }
                    action={ handleAddUser }
                  />
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
