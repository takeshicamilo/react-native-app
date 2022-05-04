import React, { useEffect, useRef, Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Animated, Pressable, TouchableHighlight} from 'react-native';


class AnimatedButton extends Component {

    constructor(props){  
        super();  
        
        // this.animatedButtonTextColor = new Animated.Value(0);
        this.state = {
            animatedButtonScale: new Animated.Value(1),
            animatedButtonTextColor: new Animated.Value(1),
        }

        this.animatedButtonInteporlate = this.state.animatedButtonTextColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(117, 98, 126, 1)', 'rgba(27,43,89,1)']

        });

    }
    onPressIn = () => {
        Animated.spring(this.state.animatedButtonScale, {
            toValue: 1.03,
            useNativeDriver: true,
        }).start();

        Animated.spring(this.state.animatedButtonTextColor, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    onPressOut = () => {
        Animated.spring(this.state.animatedButtonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    
    render() {
        
        const animatedScaleStyle = {
            transform: [{scale: this.state.animatedButtonScale}]
        };

        const animatedColorStyle = {
            color: this.animatedButtonInteporlate
        }
        
        return(
            <TouchableOpacity onPress={() => {this.props.function() }}onPressIn={this.onPressIn} onPressOut={this.onPressOut} style={[{width: '80%'}]}>
                <Animated.View style={[styles.container, { backgroundColor: this.props.color }, animatedScaleStyle]}>
                    
                        <Text style={[styles.text, {color: this.props.textColor}]}>{this.props.children}</Text>
                </Animated.View>
            </TouchableOpacity>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },

    text: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

export { AnimatedButton };

export default AnimatedButton;
