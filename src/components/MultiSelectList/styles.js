import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin-bottom: 60px;
`;

export const List = styled.FlatList`
    flex: 1;
    width: 100%;
`;

export const Item = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;    
    padding: 8px;
    margin: 6px 0;
    border-radius: 26px;
    background-color: #eee;  
    gap: 15px;
    height: 40px;
`;

export const AreaSelect = styled.View`
    width: 25px;
    height: 25px;
    border-radius: 12.5px;  /* metade do tamanho para virar círculo */
    background-color: #fff;
    align-items: center;
    justify-content: center;     
`;

export const Select = styled.View`
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #eee; 
`;
