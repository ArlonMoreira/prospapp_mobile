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

  const [ usersData, setUsersData ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");

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

  // Normaliza string (remove acento, lowercase)
  const normalize = (str) => 
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Aplica busca sempre que users OU searchQuery mudar
  useEffect(() => {
    if (!searchQuery) {
      setUsersData(users); // sem busca → mostra todos
    } else {
      const query = normalize(searchQuery);
      const filtered = users.filter((user) =>
        normalize(user.user__full_name).includes(query)
      );
      setUsersData(filtered);
    }
  }, [users, searchQuery]);

  // Atualiza o texto da busca
  const handleSearchText = (text) => {
    setSearchQuery(text);
  };

  return (
    <>
      {
        loadingList ? <LoadingPage backgroundColor={currentColor} logo={currentLogo}/> : (
          <Container style={{ paddingTop: 20 }}>
            <Header themeColor={ currentColor }/>
            <PageArea>
              <TitleArea text={'Vincular usuário'} color={ currentColor }/>
              <View style={{maxHeight: 60, borderBottomWidth: 1, borderColor: '#eee', marginBottom: 20, paddingBottom: 44}}>
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
              <SearchArea color={ currentColor } onChangeText={handleSearchText}/>
              <InstructionArea text={'Selecione um ou mais colaboradores para integrar a esta turma. Poderão realizar chamadas e edita-la.'}/>
              {
                users.length > 0 && users && (
                  <MultiSelectList 
                    color={ currentColor } 
                    data={ 
                      ordenarObjectAsc(
                        usersData.map(user => { 
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
