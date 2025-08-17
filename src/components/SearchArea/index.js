import React from 'react'
//Styles
import { 
    SearchContainer,
    Search,
    SearchIconArea    
} from './styles';
import { FontAwesome } from '@expo/vector-icons';

const SearchArea = ({ color, onChangeText }) => {
  return (
    <SearchContainer>
      <SearchIconArea>
        <FontAwesome name="search" size={28} color={color} />
      </SearchIconArea>      
      <Search 
        style={{ borderColor: color }}
        cursorColor={ color }
        onChangeText={onChangeText}   // <- passa o texto digitado
      />
    </SearchContainer>
  )
}

export default SearchArea;