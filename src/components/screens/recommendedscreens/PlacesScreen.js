import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet} from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';

export class PlacesScreen extends Component{
   
    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    render(){
        return (
            <View style={{flex:1}}>
            <Header headerText="Recommended Places" 
            backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
            <View style={styles.container}>
                <Text> PlacesScreen </Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        padding: 20,
    },
    text:{
        textAlign:'center',
        backgroundColor: '#d35400'
    },
    
})

