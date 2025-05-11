import styled from 'styled-components/native';

export const SelectContainer = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 20px;
    margin-left: 10px;
    margin-top: 20;
`;

export const LabelSelect = styled.Text`
    fontSize: 10;
    fontFamily: 'montserrat-semibold';
`;

export const MapArea = styled.View`
    padding: 10px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 10px;
    margin-top: 20px;
`;

export const MapSearchArea = styled.View`
    flex-direction: row;
`;

export const MapButtonSearch = styled.TouchableOpacity`
    width: 45;
    height: 45;
    align-items: center;
    justify-content: center;  
`;