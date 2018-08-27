import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet} from 'react-native'
import {MapView} from 'expo'
    
class MapScreen extends Component{

    render(){
        return (
            <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )
    }
}


export default MapScreen