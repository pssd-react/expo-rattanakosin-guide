import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'
import FlashSale from './stackscreens/FlashSale'
import PromotionDetail from './stackscreens/PromotionDetail'
import {
    createStackNavigator,
    HeaderBackButton,
    withNavigationFocus
} from 'react-navigation';
import { TabView, TabBar, SceneMap ,TabViewAnimated } from 'react-native-tab-view';
import { Header } from '../common/Header'
import {StoreGlobal} from './../config/GlobalState';

class FlashSaleScreen extends Component{
    static navigationOptions = { header: null }
    renderHeaderScreen(){
        if(this.props.isFocused){
            return  <Header headerText={'Flash Sale'} 
        backgroundImage= {require('../../components/images/drawable-hdpi/bg_more.webp')}/>
        }
        else{
            return null
        }
      }
    render(){
        return (
            <View style={styles.container}>
                {this.renderHeaderScreen()} 
                <FlashSaleNavScreen />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tabbar: {
        backgroundColor: '#fff',
    }
})

const FlashSaleNavScreen = createStackNavigator({
    FlashSaleMain:{
        screen : FlashSale, navigationOptions:{header:null}
    },
    PromotionDetailScreen:{
        screen : PromotionDetail
    }
})

export default withNavigationFocus(FlashSaleScreen)