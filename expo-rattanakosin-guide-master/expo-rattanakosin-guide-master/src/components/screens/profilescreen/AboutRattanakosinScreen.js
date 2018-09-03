import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet} from 'react-native'

export class AboutRattanakosinScreen extends Component {
    static navigationOptions = {title: 'About Rattanakosin Screen'}
    render(){
        return (<View style={styles.container}>
                <Text>AboutRattanakosinScreen</Text>
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
