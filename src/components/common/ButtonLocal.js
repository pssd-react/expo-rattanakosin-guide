import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonLocal = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <View style={{flexDirection: 'row', justifyContent:'space-around', flex:1}}>
            <Image style={{width:14, height:20, alignSelf:'center'}}
             source={ require('../images/drawable-hdpi/ic_location_active.webp')} 
            /> 
            <Text style={[textStyle, props.textStyle]}>
             {props.children}
            </Text>
            </View>
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
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1
    },
};

export { ButtonLocal };

