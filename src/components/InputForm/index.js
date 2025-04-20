import React from 'react'
import { Animated } from 'react-native';
//Hooks
import { useState, useEffect, useRef } from 'react';
//Styles
import { Container, Input, InputMask, Stick, ShowPassword } from './styles';
import { Feather } from '@expo/vector-icons';

const InputForm = ({element, label, value, setValue, secureTextEntry, color='#fff', secundaryColor, cpfMask=false, pointerColor="#fff"}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordSecure, setIsPasswordSecure] = useState(secureTextEntry);
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
        color,
        fontFamily: 'montserrat-regular',
        fontSize: 11,
        left: 12,
        top: animetedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 5],
        })
    };

    const handleShowPassword = () => {
        if(isPasswordSecure){
            setIsPasswordSecure(false);
        } else {
            setIsPasswordSecure(true);
        }
    };

    return (
        <Container>
            <Stick style={{backgroundColor: color}}/>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>
            {
                cpfMask ? (
                    <InputMask
                        type={'cpf'}
                        ref={element}
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{borderBottomColor: color, color: secundaryColor ? secundaryColor: color}}   
                        selectionColor={pointerColor} 
                    >

                    </InputMask>
                ) : (
                    <Input
                        value={value}
                        ref={element}
                        onChangeText={(text) => setValue(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        secureTextEntry={isPasswordSecure}   
                        style={{borderBottomColor: color, color: secundaryColor ? secundaryColor: color}}  
                        selectionColor={pointerColor}     
                    >
                    </Input>
                )
            }        
            {
                secureTextEntry && (
                    <ShowPassword onPress={() => handleShowPassword()}>
                        <Feather name={isPasswordSecure ? 'eye': 'eye-off'} size={28} color={color} />
                    </ShowPassword>
                )
            }    
        </Container>
    )

};

export default InputForm;