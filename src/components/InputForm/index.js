import React from 'react'
import { View, TextInput, Text, Animated, StyleSheet } from 'react-native';
//Hooks
import { useState, useEffect, useRef } from 'react';
//Styles
import { 
    Container,
    Input
} from './styles';

const InputForm = ({label, value, setValue}) => {

    const [isFocused, setIsFocused] = useState(false);
    const animetedIsFocused = useRef(new Animated.Value(value ? 1: 0)).current;
    
    useEffect(()=>{
        Animated.timing(animetedIsFocused, {
            toValue: (isFocused || value ) ? 1: 0,
            duration: 300,
            useNativeDriver: false
        }).start();

    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        color: '#ffffff',
        fontFamily: 'montserrat-regular',
        left: 10,
        top: animetedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 5],
        })
    };

    return (
        <Container>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>        
            <Input
                value={value}
                onChangeText={(text) => setValue(text)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}               
            >
            </Input>
        </Container>
    )

};

export default InputForm;