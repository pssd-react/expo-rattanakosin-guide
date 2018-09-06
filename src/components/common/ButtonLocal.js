import React from 'react';
import { Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonLocal = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <Image style={{width:20, height:20 , padding: 2 ,  }}
             source={ require('../images/drawable-hdpi/ic_star_fill.webp')} 
            /> 
            <Text style={[textStyle, props.textStyle]}>
             {props.children}
            </Text>
        </TouchableOpacity>
    );
};


const styles = {
    textStyle: {
        justifyContent : 'flex-end',
        alignSelf: 'center',
        color: '#000000',
        fontSize: 16,
        fontWeight: '600'
    },
    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fffff',
        borderColor: '#333333',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderWidth: 1
    },
};

export { ButtonLocal };