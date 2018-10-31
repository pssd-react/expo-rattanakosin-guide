import React from 'react';
import { Text, TouchableOpacity } from 'react-native'

const ButtonTrip = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <Text style={[textStyle, props.textStyle]}>
                {props.children}
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
    },
    buttonStyle:{
        //color: '#0E0D00',
        flex: 1,
        alignSelf: 'stretch',
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 40,
       // borderWidth: 1,
        //borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
};

export { ButtonTrip };