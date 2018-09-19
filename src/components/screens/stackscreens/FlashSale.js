import React from 'react'
import { Button, View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import I18n from '../../config/i18n'
import  FlashSaleLightning from './FlashSaleLightning'
import  FlashSalePromotion from './FlashSalePromotion'
import {StoreGlobal} from './../../config/GlobalState';


const FlashSale = createMaterialTopTabNavigator({
    FlashLight:{
        screen: FlashSaleLightning
    },
    FlashPromotion: {
        screen: FlashSalePromotion
    },
},{
    navigationOptions: ({navigation}) =>({
        tabBarLabel: ({ focused })=>{
            const { routeName } = navigation.state;
            let labelName,textColor;
            if (routeName === 'FlashLight') {
                labelName = 'Flash Sale';
            } else if (routeName === 'FlashPromotion') {
                labelName = 'Promotion';
            }

            if(focused){
                textColor = 'white';
                StoreGlobal({type: 'set', key: 'flashhead', value: routeName})
            }else{
                textColor = 'black';
            }
            return (<Text style={{fontSize:18, color:textColor}}>{labelName}</Text>);
        }
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      indicatorStyle:{
        backgroundColor: 'black',
        height: null,
        top:0
      },
      pressColor: 'black',
      style: {
        backgroundColor: 'white',

      },
      tabStyle: {
        height: 40,
      },
      labelStyle: {
        flex:1
      },
      showLabel: true
    },
    animationEnabled: true,
    swipeEnabled: false,
})

export default FlashSale