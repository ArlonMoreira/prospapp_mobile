import React from 'react'
//Styles
import { 
    SearchContainer,
    Search,
    SearchIconArea    
} from './styles';
import { EvilIcons } from '@expo/vector-icons';

const SearchArea = ({color}) => {
  return (
    <SearchContainer>
        <Search style={{borderColor: color}}/>
        <SearchIconArea>
            <EvilIcons name="search" size={42} color={color} />
        </SearchIconArea>
    </SearchContainer>
  )
}

export default SearchArea;