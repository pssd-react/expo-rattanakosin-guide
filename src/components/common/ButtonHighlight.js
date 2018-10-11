import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonHighlight = (props) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={props.onPress} style={[buttonStyle, props.style]}>
            <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
            <Image style={{width:20, height:20, alignSelf:'center'}}
             source={ require('../images/drawable-hdpi/ic_product_of_platinum.webp')} 
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
        backgroundColor: '#f2f2f2',
        borderColor: '#333333',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1
    },
};

export { ButtonHighlight };