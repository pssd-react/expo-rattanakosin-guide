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
import { MapView } from 'expo'
import Modal from "react-native-modal"
import { Spinner } from '../common';
import { Button } from 'react-native-elements';
import I18n from '../config/i18n'


const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

class MapScreen extends Component {
    state = {
        _data: '',
        marginBottom: 1,
        loading: true,
        isModalVisible: false,
        curIcon: '',
        curImg: '',
        curTitle: '',
        curRating: '',
        curDes: '',
        curLat: '',
        curLong: '',
        curShopId: ''
    }

    componentWillMount() {
            this._renderService()
    }



    renderDesModal() {
        if (this.state.isModalVisible === true) {
            return (
                <View style={{
                    position:'absolute',
                    bottom: 50,
                    backgroundColor: '#fff',
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height/2.5,
                    shadowColor: '#000',
                    shadowOffset: { width: 5, height: 5 },
                    shadowRadius: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}>
                    
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10, alignItems:'center' }}>
                        <View style={{flex:1}}>
                            <Image
                        style={{ width: 30, height: 30, marginRight: 10 }}
                        source={this.state.curIcon} />
                        </View>
                        <View style={{flex:7}}>
                        <Text 
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{fontSize: 18, fontWeight: 'bold'}}>
                                {this.state.curTitle}
                        </Text>
                        </View>
                        <View style={{flex:1,padding: 10}}>
                            <Image
                                                        style={{width:25, height:30,}}
                                                        source={require('../../components/images/drawable-hdpi/ic_fav_trip_unselected.webp')}/>
                        </View>
                        </View>
                    <View style={{ flex: 3, flexDirection:'row', paddingLeft: 20, paddingRight: 20}}>
                        <View style={{flex:1, marginRight: 10}}>
                        <Image
                        style={{flex:1}}
                        source={{uri: this.state.curImg}}
                        />
                        </View>
                        <View style={{flex:2}}>
                        <Text 
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            style={{fontSize: 14, fontWeight: '200', flex: 2}}>
                                {this.state.curDes}
                    </Text>
                        </View>
                        </View>
                        <View style={{ flex: 1, flexDirection:'row', alignItems:'center'}}>
                            <Button
                            containerViewStyle={{flex:1}}
                            buttonStyle={{ backgroundColor:'#F6DA4B'}}
                            textStyle={{fontSize: 16, fontWeight: '400', color: 'black'}}
                            title={I18n.t('shop_map')}
                            onPress={()=> this.onViewPlacePress()}
                            />
                            <Button
                            containerViewStyle={{flex:1, borderRadius:5}}
                            buttonStyle={{ backgroundColor:'#F6DA4B'}}
                            textStyle={{fontSize: 16, fontWeight: '400', color: 'black'}}
                            title={I18n.t('navigate_map')}
                            onPress={()=> this.onDirectionsPress()}
                            />
                        </View>
                </View>
            )
        }
    }

    onDirectionsPress() {
        Platform.select({
            ios: () => {
                Linking.openURL('http://maps.apple.com/maps?daddr=' + this.state.curLat + ',' + this.state.curLong);
            },
            android: () => {
                Linking.openURL('http://maps.google.com/maps?daddr=' + this.state.curLat + ',' + this.state.curLong);
            }
        })();
    }

    onViewPlacePress() {
        this.setState({ isModalVisible: false },()=>{
            this.props.navigation.navigate({
                routeName: 'shopDetail',
                params: {
                    key: this.state.curShopId,
                    fromOverView : true,
                },
                key: 'shopDetail' + this.state.curShopId
            })
        })
        
    }

    _renderService() {
        var data = {
            'RqAppID': '1234',
            'UserLanguage': I18n.t('serviceLang'),
            'ViewType': '05',
            'RowNum': '0',
            'Keyword': '',
            'ShopCategory': '',
            'UserID': '1',
            'MarketID': '3',
            'CouponType': '',
            'CouponSubType': ''
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => {
                //console.log(I18n.t('serviceLang'))
                this.setState({
                    _data: response.data,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.log('axios error:', error)
            })
    }

    _renderMarker() {
        let _renderingIconType = ''
        let _iconName = ''
        return _.map((this.state._data.StaticLocation), _renderingData => {
            _renderingIconType = _.map((_renderingData.ShopCategory), _renderingCategory => {
                return _renderingCategory.ShopCategoryID
            })
            if (_renderingIconType[0] === '273' || _renderingIconType[0] === '264' || _renderingIconType[0] === '282') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_food.webp')
            }
            else if (_renderingIconType[0] === '274' || _renderingIconType[0] === '265' || _renderingIconType[0] === '283') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_shop.webp')
            }
            else if (_renderingIconType[0] === '275' || _renderingIconType[0] === '266' || _renderingIconType[0] === '284') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_shopping_mall.webp')
            }
            else if (_renderingIconType[0] === '276' || _renderingIconType[0] === '267' || _renderingIconType[0] === '285') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_hotel.webp')
            }
            else if (_renderingIconType[0] === '277' || _renderingIconType[0] === '268' || _renderingIconType[0] === '286') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_place_travel.webp')
            }
            else if (_renderingIconType[0] === '278' || _renderingIconType[0] === '269' || _renderingIconType[0] === '287') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_office.webp')
            }
            else if (_renderingIconType[0] === '280' || _renderingIconType[0] === '270' || _renderingIconType[0] === '288') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_facilities.webp')
            }
            else if (_renderingIconType[0] === '281' || _renderingIconType[0] === '271' || _renderingIconType[0] === '289') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_service.webp')
            }
            else if (_renderingIconType[0] === '460' || _renderingIconType[0] === '459' || _renderingIconType[0] === '461') {
                _iconName = require('./../images/drawable-hdpi/ic_type_category_bank.webp')
            }
            return (
                <MapView.Marker
                    key={_renderingData.LocationID + '' + _renderingData.ShopID}
                    title={_renderingData.LocationName}
                    description={_renderingData.ShopDescription}
                    coordinate={{
                        latitude: parseFloat(_renderingData.Latitude),
                        longitude: parseFloat(_renderingData.Longitude)
                    }}
                    onPress={() => this.setState({ 
                        isModalVisible: true,
                        curIcon: _iconName,
                        curImg: _renderingData.ImageUrl,
                        curTitle: _renderingData.LocationName,
                        curRating: _renderingData.Rating,
                        curDes: _renderingData.ShopDescription,
                        curLat: _renderingData.Latitude,
                        curLong: _renderingData.Longitude,
                        curShopId: _renderingData.ShopID
                    
                    })}
                >
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={_iconName} />
                </MapView.Marker>
            )
        })
    }



    render() {
        return (
            <View style={{height: Dimensions.get('window').height,width: Dimensions.get('window').width}}>
                <TouchableWithoutFeedback onPress={()=> this.setState({isModalVisible:false})}>
                <MapView
                style={{ flex:1,height: Dimensions.get('window').height,width: Dimensions.get('window').width, marginBottom: this.state.marginBottom }}
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
                ]}>
                {this._renderMarker()}
            </MapView> 
                </TouchableWithoutFeedback>
                
                        {this.renderDesModal()}
            </View>
            
        )
    }
}

export default MapScreen