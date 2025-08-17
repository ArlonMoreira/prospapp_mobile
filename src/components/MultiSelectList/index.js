import React, { useEffect } from 'react';
import { Text } from 'react-native';
//Hooks
import { useState } from 'react';
//Styles
import { Container, List, Item, AreaSelect, Select } from './styles';

const MultiSelectList = ({ color='#000', data=[] }) => {

    //Item selecionado
    const [selectedItems, setSelectedItems] = useState([]);

    // carregar itens já selecionados por padrão
    useEffect(() => {
        if (Array.isArray(data)) {
            const preSelected = data
                .filter(item => item.selected)
                .map(item => item.id);
            setSelectedItems(preSelected);
        }
    }, [data]);

    //Selecionar e selecionar item
    const toggleSelect = (id) => {
        if( selectedItems.includes(id) ){
            //Remove se já estiver selecionado
            setSelectedItems(selectedItems.filter((item) => item !== id));
        } else {
            //Adicionar item a lista;
            setSelectedItems([...selectedItems, id]);
        }
    };

    //Renderizar item
    const renderItem = ({ item }) => {
        
        const isSelected = selectedItems.includes(item.id);

        return (
            <Item
                onPress={() => toggleSelect(item.id)}
                style={{ backgroundColor: isSelected ? color: '#fff', borderColor: color, borderWidth: 1 }}
            >
                <AreaSelect style={{ borderColor: color, borderWidth: 1 }}>
                    {
                        isSelected && <Select style={{ backgroundColor: isSelected ? color: '#cecece' }}/>
                    }
                </AreaSelect>
                <Text 
                    numberOfLines={1} 
                    ellipsizeMode="tail" 
                    style={{ 
                        flex: 1,                // ocupa o espaço restante no row
                        color: isSelected ? '#fff' : color, 
                        fontFamily: 'montserrat-medium' 
                    }}                
                >
                    { item.label }

                </Text>
            </Item>
        )

    };

    return (
        <Container>
            <List
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </Container>
    )
}

export default MultiSelectList;