import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {MapView, Location, Constants} from 'expo'

export class GoogleMap extends Component {
  render() {
    return (
      <View  style={{ flex: 1}}>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 13.755617,
              longitude: 100.498478,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0221,
            }}
            showsMyLocationButton= {true}
            showsUserLocation={true}
          />
          </View>
    );
  }
}
