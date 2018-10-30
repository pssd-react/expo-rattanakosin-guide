import React from 'react';
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button = (props) => {
    const { buttonStyle, textStyle, iconColor } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <Ionicons 
            name = {props.name}
            size = {20}
            color = {props.iconColor}
            style={{marginTop: 5}}
            />
            <Text style={[textStyle, props.textStyle]}>{props.children}</Text>
        </TouchableOpacity>
    );
};


const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#0d0d0d',
        fontSize: 16,
        fontWeight: '300',
        paddingTop: 10 ,
        paddingBottom: 10,
        marginLeft: 5,
    },
    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 10,
       // borderWidth: 1,
        //borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
    },
};

export { Button };