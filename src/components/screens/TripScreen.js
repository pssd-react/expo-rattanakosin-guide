import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Header } from '../common/Header'
import { Exclusive,Interesting,Tripme } from './tripscreens'    
import I18n from '../config/i18n'


export class TripScreen extends Component{
        state = {
            index: 0,   
            routes: [
                { key: 'first', title: I18n.t('interestingTrip')},
                { key: 'second', title: I18n.t('exclusive')},
                { key: 'third', title: I18n.t('myTrip')},
            ] 
        };
    /* componentWillMount() {
        state = {
            index: 0,   
            routes: [
                { key: 'first', title: I18n.t('interestingTrip')},
                { key: 'second', title: I18n.t('exclusive')},
                { key: 'third', title: I18n.t('myTrip')},
            ] 
        };
    } */

    render(){
        return (
            <View style={styles.container}>
                <Header headerText={I18n.t('trip')}
                backgroundImage= {require('../../components/images/drawable-hdpi/bg_more.webp')}/>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: Interesting,
                        second: Exclusive,
                        third: Tripme
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width,height: Dimensions.get('window').height }}
                />
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