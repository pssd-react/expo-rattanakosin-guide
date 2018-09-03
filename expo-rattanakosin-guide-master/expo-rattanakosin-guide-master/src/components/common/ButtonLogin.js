import React from 'react';
import { Text, TouchableOpacity } from 'react-native'

const ButtonLogin = ({ onPress, children }) => {
    const { buttonStyle, textStyle, button } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};


const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10 ,
        paddingBottom: 10
        
    },
    buttonStyle:{
        flex: 1,
        /* alignSelf: 'stretch', */
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#007aff',
        width:300,

    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
    },
};

export { ButtonLogin };