import React, { Component } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'
import FlashSale from './stackscreens/FlashSale'
import PromotionDetail from './stackscreens/PromotionDetail'
import {
    createStackNavigator,
    withNavigationFocus
} from 'react-navigation'
import { Header } from '../common/Header'
import { ShopDetailScreen } from './ShopDetailScreen'


class FlashSaleScreen extends Component {
    static navigationOptions = { header: null }
    _renderHeaderScreen() {
        if (this.props.isFocused) {
            return <Header headerText={'Flash Sale'}
                backgroundImage={require('../../components/images/drawable-hdpi/bg_more.webp')} />
        }
        else {
            return null
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderHeaderScreen()}
                <FlashSaleNavScreen />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#fff',
    }
})

const FlashSaleNavScreen = createStackNavigator({
    FlashSaleMain: {
        screen: FlashSale, navigationOptions: { header: null }
    },
    PromotionDetailScreen: {
        screen: PromotionDetail
    },
    shopDetail: {
        screen: ShopDetailScreen, navigationOptions: { header: null }
    }
    
})

export default withNavigationFocus(FlashSaleScreen)