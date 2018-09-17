import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'

import { FlashSaleLightning,FlashSalePromotion } from './stackscreens'
import {
    createBottomTabNavigator,
    createStackNavigator,
    HeaderBackButton
} from 'react-navigation';
import { TabView, TabBar, SceneMap ,TabViewAnimated } from 'react-native-tab-view';
import { Header } from '../common/Header'

const INITAL_STATE = { 
    index: 0,
    routes: [
      { key: 'first', title: 'โปรฟ้าผ่า' },
      { key: 'second', title: 'โปรโมชั่น' },
    ],
};

export class FlashSaleScreen extends Component{

    state = INITAL_STATE;
    
    renderHeader = () => {
        //console.log(this.state.index);
        if(this.state.index == '0'){
            //console.log("เข้า IF");
            return  <Header headerText="โปรฟ้าผ่า" 
            backgroundImage= {require('../../components/images/drawable-hdpi/bg_more.webp')}/>
            
        }else { 
            //console.log("เข้า Else");
            return <Header headerText="โปรโมชั่น" 
            backgroundImage= {require('../../components/images/drawable-hdpi/bg_more.webp')}/>
            
        }
    }

    render(){
        return (
            <View style={styles.container}>
                {this.renderHeader(this.state.index)}
                <TabView
                    style={styles.tabbar}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: FlashSaleLightning,
                        second: FlashSalePromotion,
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width,height:Dimensions.get('window').height }}
                />
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

export default FlashSaleScreen