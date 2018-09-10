import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity} from 'react-native'
import { Button } from '../common';
import {createStackNavigator} from 'react-navigation'
import {detail} from './homeDetail/detail'

class HomeScreen extends Component{

    onButtonChangePage(){
        this.props.navigation.navigate('DetailList')
    }

  render(){
    return (
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 60}}>
                <Button onPress={() => this.onButtonChangePage()} 
                    style={{backgroundColor: '#ffc94c'}} 
                    textStyle={{color: '#000'}}>
                    Page
                </Button>
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
      //flexDirection: 'row',
  }
})

export const HomeMenu = createStackNavigator({
    Main : {
        screen : HomeScreen
    },
    DetailList : {
        screen : detail, navigationOptions:{header:null}
    },
})
