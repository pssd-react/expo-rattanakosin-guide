import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

const Header = (props) => {
    const{ textStyle, viewStyle, thumbnailStyle } = styles;
    return (
        <ImageBackground
            source={ props.backgroundImage }
            style={thumbnailStyle}
            > 
            <View style={[viewStyle, props.headerContent]}>
                <View style={{justifyContent: 'flex-start', flex:1}}>
                 {props.headerLeft}
                </View>
                <View style={{justifyContent: 'center', alignItems:'center', flex:2 }}>
                    <Text style={[textStyle, props.fontStyle]}> {props.headerText} </Text>
                </View>
                <View style={{justifyContent: 'flex-end', flex:1 }}/>
                
            </View>
        </ImageBackground>
    );
};

const styles = {
    viewStyle: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        height: 80,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 10,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 20,
        color: "#fff",
    },
    thumbnailStyle: {
        //height: '100%',
        width:'100%'
        
    },
};

//Make the component available to other parts of the app
export { Header };