import React from 'react';
import { Text, TouchableOpacity } from 'react-native'

const ButtonFollow = ({ onPress, children, color }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={color}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};


const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#EEF4F0',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10 ,
        paddingBottom: 10,
        paddingLeft:5, 
        paddingRight:5
    },
   
};

export { ButtonFollow };