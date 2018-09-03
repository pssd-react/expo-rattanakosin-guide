import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, lableStyle, containerStyle } = styles;

    return(
        <View style={containerStyle}>
            <Text style={lableStyle}>{label}</Text>
            <TextInput 
                style={inputStyle}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}/>
        </View>
    );
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 50, 
        width: 330
    },
    lableStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    }
}

export { Input };