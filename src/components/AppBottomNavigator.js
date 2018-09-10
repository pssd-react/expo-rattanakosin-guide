import React, {Component} from 'react'
import { Button, View, Text, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from 'react-navigation'
import MapScreen from './screens/MapScreen'
import {HomeMenu} from './screens/HomeScreen'
import {ProfileMenu} from './screens/ProfileScreenMain'
import FlashSaleScreen from './screens/FlashSaleScreen'
import TripScreen from './screens/TripScreen'

const AppBottomNavigator = createMaterialTopTabNavigator(
    {
        Home : {screen: HomeMenu},
        Map:{screen: MapScreen},
        Flash_Sale:{screen: FlashSaleScreen},
        Trip: {screen: TripScreen},
        Profile : {screen: ProfileMenu}
    },{ 
        navigationOptions: ({navigation}) =>({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                iconName = 'ios-home';
                } else if (routeName === 'Map') {
                iconName = 'ios-pin';
                }else if (routeName === 'Flash_Sale') {
                iconName = 'ios-flash';
                } else if (routeName === 'Trip') {
                iconName = 'ios-navigate';
                } else if (routeName === 'Profile') {
                iconName = 'ios-person';
                }
                return (<Ionicons name={iconName} size={20} color={tintColor} />);
               // return (<Image source={require()}  size={20}  />);
            },
            tabBarLabel: ({ focused })=>{
                const { routeName } = navigation.state;
                let labelName,textColor;
                if (routeName === 'Home') {
                labelName = 'Home';
                } else if (routeName === 'Map') {
                labelName = 'Live Map';
                }else if (routeName === 'Flash_Sale') {
                labelName = 'Flash Sale';
                } else if (routeName === 'Trip') {
                labelName = 'Trip';
                } else if (routeName === 'Profile') {
                labelName = 'Profile';
                }

                if(focused){
                    textColor = 'white';
                }else{
                    textColor = 'black';
                }
                return (<Text style={{fontSize:10, color:textColor}}>{labelName}</Text>);
            }
        }),
        tabBarPosition: 'bottom',
        tabBarOptions: {
          activeTintColor: 'white',
          inactiveTintColor: 'black',
          indicatorStyle:{
            backgroundColor: 'black',
            height: null,
            top:0
          },
          pressColor: 'black',
          showIcon: true,
          style: {
            backgroundColor: 'white',
          },
          tabStyle: {
            height: 50
          },
          labelStyle: {
            flex:1
          },
          showLabel: true
        },
        animationEnabled: true,
        swipeEnabled: false,
    }
);

export default AppBottomNavigator;