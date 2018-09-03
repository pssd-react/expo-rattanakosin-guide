import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';


const SignButton = ({ label, onPress, sign }) => {
    const { signupTextCont, signupText, signupButton } = styles;

    return(
        <View style={signupTextCont}>
            <Text style={signupText}>{label}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={signupButton}>{sign}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    signupTextCont : {
        flex: 1,
        alignItems:'flex-start',
        /* justifyContent :'center' , */
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'#9932CC',
        fontSize: 15
    },
    signupButton: {
        paddingTop: 2,
        color:'#9932CC',
        fontSize: 12,
        textDecorationLine: 'underline',
        
    }
}

export { SignButton };