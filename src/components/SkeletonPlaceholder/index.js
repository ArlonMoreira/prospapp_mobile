import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonPlaceholder = ({width, height}) => {

    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        const startAnimation = () => {
            animatedValue.setValue(0);
            Animated.loop(
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.linear,
                    useNativeDriver: false,
                })
            ).start();
        };

        startAnimation();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width]
    });

    return (
        <View style={{...styles.container, height, width}}>
            <AnimatedLG
                colors={['#dfdfdf', '#ededed', '#dfdfdf']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    ...StyleSheet.absoluteFill,
                    transform: [{ translateX }]
                }}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dfdfdf',
        overflow: 'hidden',
        borderRadius: 8
    }
});

export default SkeletonPlaceholder;
