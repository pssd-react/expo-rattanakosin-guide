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
    


export class TripScreen extends Component{

    state = {
        index: 0,
        routes: [
          { key: 'first', title: 'ทริปที่น่าสนใจ' },
          { key: 'second', title: 'Exclusive'},
          { key: 'third', title: 'ทริปของฉัน'},
        ],
        
      };



    render(){
        return (
            <View style={styles.container}>
                <Header headerText= 'ทริป' />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: Interesting,
                        second: Exclusive,
                        third: Tripme
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
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