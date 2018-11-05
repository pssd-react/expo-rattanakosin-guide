import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Alert,Dimensions,
    Platform,
    Linking
} from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import MapView, { Marker } from 'react-native-maps'
import Modal from "react-native-modal"
import { Header } from '../../../../common';
import { Button } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation'
import geolib from 'geolib'
import I18n from '../../../../config/i18n'




class MarkLocation extends Component {
    
    constructor(props){

        super(props);

        this.state = {
            markers: [],
            lat: undefined,
            long: undefined,
        }
        this.handlePress = this.handlePress.bind(this);
    }

    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                lat: position.coords.latitude, 
                long: position.coords.longitude , 
                loading : false
            });
        },
        (error) => {alert("there was an error getting location")},
        {enableHighAccuracy: true}
        );            
     console.log('component',this.state.lat,this.state.long)
    }


    handlePress(e) {
        this.setState({
            markers: [
                ... this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                }
            ]      
        })
        const coordinate = e.nativeEvent.coordinate;
          const marker = this.state.markers.find(
            m => m.coordinate.latitude === coordinate.latitude && m.coordinate.longitude === coordinate.longitude
          );
        //   if (marker) {
              console.log(marker)
            // this.props.onMarkerPress(marker);
        //   }
        // {this._renderLocation()}
    }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    



    render() {
        return (
            
            <View style={{height: Dimensions.get('window').height,width: Dimensions.get('window').width}}>
            <Header headerText="สถานที่ปักหมุด"
                    backgroundImage={require('../../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <MapView
                style={{ flex:1,height: Dimensions.get('window').height,width: Dimensions.get('window').width, }}
                onMapReady={() => this.setState({ marginBottom: 0 })}
                initialRegion={{
                    latitude: 13.754658,
                    longitude: 100.494037,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0122,
                }}
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsPointsOfInterest={false}
                customMapStyle={[
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    }
                ]}
                onPress={this.handlePress}
                >
                {this.state.markers.map((marker) => {
                    return (
                        <Marker 
                        {...marker}
                        coordinate={marker.coordinate}
                        >
                            
                        </Marker>
                    ) 
                })}

                {/* {this.state.markers.map(marker => (
                    <MapView.Marker
                        { ...marker }
                        key={poi.marker}
                        coordinate={{
                            latitude: parseFloat(poi.latitude),
                            longitude: parseFloat(poi.longitude)
                        }}
                        title="This is a title"
                        description="This is a description"
                    >
                        <MapView.Callout>
                            <View>
                                <Text>This is a plain view</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                ))} */}

            </MapView> 
                
            </View>
            
        )
    }
}


export {MarkLocation}