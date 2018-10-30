import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import { MapView } from 'expo'
import { Spinner } from '../../common';

const data = {
    'RqAppID': '1234',
    'UserLanguage': 'EN',
    'ViewType': '05',
    'RowNum': '0',
    'Keyword': '',
    'ShopCategory': '',
    'UserID': '1',
    'MarketID': '3',
    'CouponType': '',
    'CouponSubType': ''
}
const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

class ShopLocateScreen extends Component {
    state = {
        _data: '',
        marginBottom: 1,
        curLat: '',
        curLong: '',
        curTitle: '',
        curDes: '',
        curIcon: ''
    }

    componentWillMount() {
        this.setState({
            loading : true
        },()=>{
            this._renderService()
        })
        
    }


    _renderService() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { this.setState({ 
                _data: response.data,
                },()=>{
                    this.getCurrentData()
                }) })
            .catch((error) => {
                console.log('axios error:', error)
            })
    }

    getCurrentData(){
        let _renderingIconType = ''
        let _iconName = ''
         _.map((this.state._data.StaticLocation), _renderingData => {
            _renderingIconType = _.map((_renderingData.ShopCategory), _renderingCategory => {
                return _renderingCategory.ShopCategoryID
            })
            if (_renderingIconType[0] === '273') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_food.webp')
            }
            else if (_renderingIconType[0] === '274') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_shop.webp')
            }
            else if (_renderingIconType[0] === '275') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')
            }
            else if (_renderingIconType[0] === '276') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_hotel.webp')
            }
            else if (_renderingIconType[0] === '277') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_place_travel.webp')
            }
            else if (_renderingIconType[0] === '278') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_office.webp')
            }
            else if (_renderingIconType[0] === '280') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_facilities.webp')
            }
            else if (_renderingIconType[0] === '281') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_service.webp')
            }
            else if (_renderingIconType[0] === '460') {
                _iconName = require('./../../images/drawable-hdpi/ic_type_category_bank.webp')
            }
            
            if(this.props.screenProps.items.ShopId === _renderingData.ShopID){
                this.setState({
                    curTitle:_renderingData.LocationName,
                    curDes:_renderingData.ShopDescription,
                    curLat: _renderingData.Latitude,
                    curLong: _renderingData.Longitude,
                    curIcon: _iconName,
                    loading : false 
                })
               
            }
            
        })
    }

    _renderMarker() {
        
            return (
                <MapView.Marker
                    title={this.state.curTitle}
                    description={this.state.curDes}
                    coordinate={{
                        latitude: parseFloat(this.state.curLat),
                        longitude: parseFloat(this.state.curLong)
                    }}
                >
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={this.state.curIcon} />
                </MapView.Marker>
            )    
    }
    renderMap(){
        if(this.state.loading === true){
            return <Spinner />
        }else {
            return (
                <MapView
                style={{ flex: 1, marginBottom: this.state.marginBottom }}
                onMapReady={() => this.setState({ marginBottom: 0 })}
                initialRegion={{
                    latitude: parseFloat(this.state.curLat),
                    longitude: parseFloat(this.state.curLong),
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
                ]}>
                {this._renderMarker()}
            </MapView>
            )
        }
    }

    render() {
        return this.renderMap()
    }
}

export {ShopLocateScreen}