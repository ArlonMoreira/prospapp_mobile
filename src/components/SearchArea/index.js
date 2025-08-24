import { useState, useEffect } from 'react'
//Styles
import { SearchContainer, Search, SearchIconArea } from './styles';
import { Octicons } from '@expo/vector-icons';

const SearchArea = ({ color, data=[],  setDataFiltered, placeholder = '', fieldFilter='name' }) => {

  // Busca textual
  const [searchQuery, setSearchQuery] = useState("");

  // Normaliza string (remove acento, lowercase)
  const normalize = (str) => 
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();  

  useEffect(() => {
    if (!searchQuery) {
      setDataFiltered(data); // sem busca → mostra todos
      
    } else {
      const query = normalize(searchQuery);

      const filtered = data.filter((item) =>
        normalize(item[fieldFilter]).includes(query)
      );

      setDataFiltered(filtered);

    }

  }, [data, searchQuery]);

  return (
    <SearchContainer>
      <SearchIconArea>
        <Octicons name="search" size={28} color={color} />
      </SearchIconArea>      
      <Search 
        style={{ borderColor: color, fontSize: 12 }}
        placeholder={placeholder}
        placeholderTextColor={'#abababff'}
        cursorColor={color}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)} 
      />
    </SearchContainer>
  )
}

export default SearchArea;
