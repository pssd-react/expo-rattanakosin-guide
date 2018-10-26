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
import I18n from '../config/i18n'

const INITIAL_STATE = {
    isFocused: true
}

class FlashSaleScreen extends Component {
    static navigationOptions = { header: null }
    state = INITIAL_STATE
    constructor(props) {
        super(props)

        this.headerStatusUpdate = this.headerStatusUpdate.bind(this)
    }

    headerStatusUpdate(status) {
        //nothing here
    }
    _renderHeaderScreen() {
            return <Header headerText={ I18n.t('text_flashsale') }
                backgroundImage={require('../../components/images/drawable-hdpi/bg_more.webp')} />
    }
    render() {
        return (
            <View style={styles.container}>
                {this._renderHeaderScreen()}
                <FlashSale screenProps={{ headerStatusUpdate: this.headerStatusUpdate, navigation: this.props.navigation }} />
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

export default withNavigationFocus(FlashSaleScreen)

