import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { CardSection, Header, Button } from '../../common'
import { HeaderBackButton } from 'react-navigation'
import MapView, { Marker } from 'react-native-maps'

class MarkLocation extends Component {
    state = {
        _data: '',
        marginBottom: 1
    }
    static navigationOptions = { header: null }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    constructor(props) {
        super(props)

        this.state = {
            markers: []
        }

        this.handlePress = this.handlePress.bind(this)
        // this.handleButtonPress = this.handleButtonPress.bind(this)
        // this.handleButtonRelease = this.handleButtonRelease.bind(this)
      }
    //   handleButtonPress () {
    //     //   ic_marker_pin_red.webp
    //     this.buttonPressTimer = setTimeout(() => this.handlePress, 1500);
    //   }
    
    //   handleButtonRelease () {
    //     clearTimeout(this.buttonPressTimer);
    //   }

      handlePress(e) {
          
          this.setState({
              markers: [
                  ... this.state.markers,
                  {
                      coordinate: e.nativeEvent.coordinate
                  }
              ]
          })
      }

    render() {
        return (
            <MapView
            style={{ flex: 1, marginBottom: this.state.marginBottom }}
            onMapReady={() => this.setState({ marginBottom: 0 })}
                // onTouchStart={ this.handleButtonPress} 
                // onTouchEnd={ this.handleButtonRelease} 
                // onMouseDown={ this.handleButtonPress} 
                // onMouseUp={ this.handleButtonRelease}
            initialRegion={{
                latitude: 13.754658,
                longitude: 100.494037,
                latitudeDelta: 0.0222,
                longitudeDelta: 0.0122,
            }}
            onPress = {this.handlePress}
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
                
            ]}>
            {this.state.markers.map((markers) => {
                return <Marker {...markers}/>
            })}
            </MapView>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff'
    }
})

export {MarkLocation}