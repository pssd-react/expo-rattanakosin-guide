import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Header } from '../common'
import {TripTapScreen} from './tripscreens'    
    


export class TripScreen extends Component{


    render(){
        return (
            <View style={styles.container}>
                <Header headerText="ทริป" 
                backgroundImage= {require('../../components/images/drawable-hdpi/bg_more.webp')}/>
                <TripTapScreen screenProps={{userId:this.props.screenProps.userId, navigation : this.props.navigation}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       
    }
})

export default TripScreen