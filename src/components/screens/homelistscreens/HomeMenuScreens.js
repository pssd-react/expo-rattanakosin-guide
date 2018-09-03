import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet} from 'react-native'

export class HomeMenuScreens extends Component {
    static navigationOptions = {title: 'About App Screen'}
    render(){
        return (<View style={styles.container}>
                <Text>HomeMenuScreens</Text>
                </View>)
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
  })
