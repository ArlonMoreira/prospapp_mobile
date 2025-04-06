import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const CardUser = styled.TouchableOpacity`
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid;
    border-color: transparent;
    background: #ffffff24;
    padding: 10px;
    flex-direction: row;
    justify-content: space-between; 
    height: 90px;
`;

export const CardUserLoading = styled.View`
    width: 100%;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid;
    border-color: transparent;
    background: #ffffff24;
    height: 90px;
`;

export const Label = styled.Text`
    color: #fff;
    font-size: 14px;
`;

export const LabelsArea = styled.View`
    margin-left: 10px;
`;

export const IconArea = styled.View`
    width: 45px;
    height: 100%;
    align-items: center;
    justify-content: center;    
`;

export const RoleUser = styled.View`
    flex-direction: row;
    margin-top: 14px;
    gap: 10px;
`;

export const RoleContainer = styled.View`
    background: #fff;
    padding-inline: 10px;
    border-radius: 20px;
`;