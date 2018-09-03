import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet} from 'react-native'

export class AboutAppScreen extends Component {
    static navigationOptions = {title: 'About App Screen'}
    render(){
        return (<View style={styles.container}>
                <Text>AboutAppScreen</Text>
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
