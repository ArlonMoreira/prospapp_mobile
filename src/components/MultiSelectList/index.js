import React from 'react';
import { Text } from 'react-native';
//Styles
import { Container, List, Item, AreaSelect, Select } from './styles';

const MultiSelectList = ({ color = '#000', data = [], action }) => {

    //Renderizar item
    const renderItem = ({ item }) => {
        const toggleSelect = () => {
            action(item.id); // pai decide se adiciona/remove
        };

        return (
            <Item
                onPress={toggleSelect}
                style={{
                    backgroundColor: item.selected ? color : '#fff',
                    borderColor: color,
                    borderWidth: 1
                }}
            >
                <AreaSelect style={{ borderColor: color, borderWidth: 1 }}>
                    {item.selected && (
                        <Select style={{ backgroundColor: color }} />
                    )}
                </AreaSelect>
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                        flex: 1,
                        color: item.selected ? '#fff' : color,
                        fontFamily: 'montserrat-medium'
                    }}
                >
                    {item.label}
                </Text>
            </Item>
        );
    };

    return (
        <Container>
            <List
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </Container>
    );
};

export default MultiSelectList;