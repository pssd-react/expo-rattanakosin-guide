import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    SafeAreaView,
    FlatList
} from 'react-native'
import { Card } from '../common/Card'
import { CardSection } from '../common/CardSection'
import { List, ListItem,SearchBar } from 'react-native-elements';
import { getUsers } from '../../api/index';
import axios from 'axios';

const  data = {
    RqAppID:"1234",
    UserLanguage:"EN",
    MarketID:"3",
    Version:"1.1.4"
}
    

var token = 'Basic Z3Vlc3Q6cGFzc3dvcmQ=';

var  headers = {
    "Content-Type": 'application/json',
    "Authorization": token
}

class HomeScreen extends Component{

    componentWillMount(){
        //console.log(this.props.user);
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
        {data: data} , {headers: headers} )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log('axios error:',error);
        });
    }

 
    
    render() {
        return (
         <View style={ styles.container}>
            <Text style={ styles.textStyle}> ABC </Text>
         </View>
        );
      }
}
const styles = StyleSheet.create({
    textStyle:{
        color: '#a6a6a6',
        fontSize : 16,
        textDecorationLine: 'underline'
       // color: '#FFFFFF'
    },
    overlayContainer:{
        flex:1,
       // color: '#FFFFFF'
    },
  container:{
      flex: 1,
      padding: 10,
      marginTop: 15,
      marginBottom: 15,
      
  },
  stretch: {
    flex:1,
    width: 200,
    height: 500
    },
    header: {
        color: '#FFFFFF',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
    },
})
export default HomeScreen