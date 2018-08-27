import React, {Component} from 'react';
import { Text, View, TextInput } from 'react-native';


const InputLogin = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, lableStyle, containerStyle, inputBox } = styles;

    return(
        <View style={containerStyle}>
            <TextInput 
                style={inputBox}
                underlineColorAndroid='rgba(0,0,0,0)' 
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor = "#ffffff"
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}/>
        </View>
    );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        /* lineHeight: 23, */
        flex: 2,
        height: 50, 
        width: 330,
    },
    lableStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:18,
        color:'#ffffff',
        marginVertical: 10
    }
}

export { InputLogin };