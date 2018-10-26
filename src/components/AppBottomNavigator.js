import React from 'react'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from 'react-navigation'
import MapScreen from './screens/MapScreen'
import HomeMenu from './screens/HomeScreen'
import { ProfileMenu } from './screens/ProfileScreenMain'
import FlashSaleScreen from './screens/FlashSaleScreen'
import TripScreen from './screens/TripScreen'
import I18n from './config/i18n'

const AppBottomNavigator = createMaterialTopTabNavigator(
    {
        Home: { screen: HomeMenu },
        Map: { screen: MapScreen },
        Flash_Sale: { screen: FlashSaleScreen },
        Trip: { screen: TripScreen },
        Profile: { screen: ProfileMenu }
    }, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state
                let iconName
                if (routeName === 'Home') {
                    iconName = 'ios-home'
                } else if (routeName === 'Map') {
                    iconName = 'ios-pin'
                } else if (routeName === 'Flash_Sale') {
                    iconName = 'ios-flash'
                } else if (routeName === 'Trip') {
                    iconName = 'ios-navigate'
                } else if (routeName === 'Profile') {
                    iconName = 'ios-person'
                }
                return (<Ionicons name={iconName} size={20} color={tintColor} />)
            },
            tabBarLabel: ({ focused }) => {
                const { routeName } = navigation.state
                let labelName, textColor
                if (routeName === 'Home') {
                    labelName = I18n.t('home')
                } else if (routeName === 'Map') {
                    labelName = I18n.t('livemap')
                } else if (routeName === 'Flash_Sale') {
                    labelName = I18n.t('flashsale')
                } else if (routeName === 'Trip') {
                    labelName = I18n.t('trip')
                } else if (routeName === 'Profile') {
                    labelName = I18n.t('prof')
                }

                if (focused) {
                    textColor = 'white'
                } else {
                    textColor = 'black'
                }
                return (<Text style={{ fontSize: 10, color: textColor }}>{labelName}</Text>)
            }
        }),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'black',
            indicatorStyle: {
                backgroundColor: 'black',
                height: null,
                top: 0
            },
            showIcon: true,
            style: {
                backgroundColor: 'white',
            },
            tabStyle: {
                height: 50
            },
            labelStyle: {
                flex: 1
            },
            showLabel: true
        },
        animationEnabled: true,
        swipeEnabled: false,
    }
)

export default AppBottomNavigator