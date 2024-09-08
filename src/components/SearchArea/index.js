import React from 'react'
//Styles
import { 
    SearchContainer,
    Search,
    SearchIconArea    
} from './styles';
import { FontAwesome } from '@expo/vector-icons';

const SearchArea = ({color}) => {
  return (
    <SearchContainer>
      <Search style={{borderColor: color}}/>
      <SearchIconArea>
        <FontAwesome name="search" size={28} color={color} />
      </SearchIconArea>
    </SearchContainer>
  )
}

export default SearchArea;