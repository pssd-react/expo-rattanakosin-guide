import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity} from 'react-native'

class HomeScreen extends Component{
  render(){
    return (
        <View style={styles.container}>
            <Text>555</Text>
        </View>
    )
}
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
  }
})
export default HomeScreen