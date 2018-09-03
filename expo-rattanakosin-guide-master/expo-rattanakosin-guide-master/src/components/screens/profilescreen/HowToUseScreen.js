import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet} from 'react-native'

export class HowToUseScreen extends Component {
    static navigationOptions = {title: 'How To Use Screen'}
    render(){
        return (<View style={styles.container}>
                <Text>HowToUseScreen</Text>
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
