import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet} from 'react-native'

export class DetailScreen extends Component{
  

    render(){
        return (
            
            <View style={styles.container}>
                <Text>DetailScreen</Text>
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


