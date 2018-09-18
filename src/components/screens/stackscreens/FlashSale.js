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
                labelName = I18n.t('home');
            } else if (routeName === 'FlashPromotion') {
                labelName = I18n.t('livemap');
            }

            if(focused){
                textColor = 'white';
                StoreGlobal({type: 'set', key: 'flashhead', value: routeName})
            }else{
                textColor = 'black';
            }
            return (<Text style={{fontSize:10, color:textColor}}>{labelName}</Text>);
        }
    }),
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
        height: 50,
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