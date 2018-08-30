import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import axios from 'axios'

var token = 'Basic Z3Vlc3Q6cGFzc3dvcmQ=';
var  data = {
        'RqAppID':'1234',
        'UserLanguage':'EN',
        'MarketID':'3',
        'Version':'1.1.4'
    }
var config = {
    headers: {  
        'Authorization': token,
        'Content-Type': 'application/json'
            }
};

class HomeScreen extends Component{
    componentWillMount(){
        //console.log(this.props.user);

    }

    onPressGetData(){
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
        data , config )
        .then(( response ) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log('axios error:',error);
        });
    }

  render(){
    return (
        <View style={styles.container}>
            <Button 
            title='BUTTON WITH RIGHT ICON'
            onPress={()=> this.onPressGetData()}
            />
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