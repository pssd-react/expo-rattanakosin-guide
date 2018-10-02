import React from 'react'
import {Text} from 'react-native'
import {createMaterialTopTabNavigator} from 'react-navigation'
import {ShopDescriptionScreen, ShopLocateScreen, ShopPromotionScreen, ShopReviewScreen } from './'

const ShopTap = createMaterialTopTabNavigator({
    ShopDes: {
        screen : ShopDescriptionScreen
    },
    ShopPro: {
        screen : ShopPromotionScreen
    },
    ShopLoca: {
        screen : ShopLocateScreen
    },
    ShopRe: {
        screen : ShopReviewScreen
    }
},{
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: ({ focused }) => {
            const { routeName } = navigation.state
            let labelName, textColor
            if (routeName === 'ShopDes') {
                labelName = 'รายละเอียด'
            } else if (routeName === 'ShopPro') {
                labelName = 'โปรโมชัน'
            } else if (routeName === 'ShopLoca') {
                labelName = 'แผนที่'
            } else if (routeName === 'ShopRe') {
                labelName = 'รีวิว'
            }

            if (focused) {
                textColor = 'white'
            } else {
                textColor = 'black'
            }
            return (<Text style={{ fontSize: 14, color: textColor }}>{labelName}</Text>)
        }
    }),
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        indicatorStyle: {
            backgroundColor: 'black',
            height: null,
            top: 0
        },
        pressColor: 'black',
        style: {
            backgroundColor: 'white',

        },
        tabStyle: {
            height: 40,
        },
        labelStyle: {
            flex: 1
        },
        showLabel: true
    },
    animationEnabled: true,
    swipeEnabled: false,
})

export {ShopTap}