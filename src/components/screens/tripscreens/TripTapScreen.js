import React from 'react'
import { Text } from 'react-native'
import { createMaterialTopTabNavigator } from 'react-navigation'
import {Exclusive,TripMe,Interesting} from './'
import { StoreGlobal } from './../../config/GlobalState'


const TripTapScreen = createMaterialTopTabNavigator({
    Interesting: {
        screen: Interesting
    },
    Exclusive: {
        screen: Exclusive
    },
    MyTrip : {
        screen: TripMe
    }
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state
                let labelName, textColor
                if (routeName === 'Interesting') {
                    labelName = 'ทริปที่น่าสนใจ'
                } else if (routeName === 'Exclusive') {
                    labelName = 'Exclusive'
                } else if (routeName === 'MyTrip') {
                    labelName = 'ทริปของฉัน'
                }

                if (focused) {
                    textColor = 'white'
                    StoreGlobal({ type: 'set', key: 'flashhead', value: routeName })
                } else {
                    textColor = 'black'
                }
                return (<Text style={{ fontSize: 12, color: textColor }}>{labelName}</Text>)
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

export {TripTapScreen}