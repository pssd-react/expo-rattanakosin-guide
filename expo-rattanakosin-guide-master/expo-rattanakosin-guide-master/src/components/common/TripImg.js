
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TripImg = (props) => {
    const { stretch } = styles;

    return (
        <Image
            style={stretch}
            source={{uri: 'http://www.wikalenda.com/images/business_owner_image/main/MDAwMDAwMDAx_NTc0MjcwODIwMDkzNzAwNDU1MzAwNDc3.bmp'}}
        />
    );
};

const styles = StyleSheet.create({
    stretch: {
        width: 400,
        height: 150
    }
})

export { TripImg };