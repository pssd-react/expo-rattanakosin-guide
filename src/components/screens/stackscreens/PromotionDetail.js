import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Geolocation
} from 'react-native'
import { Button, } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'
import _ from 'lodash'
import moment from 'moment'
import { ButtonStar, ButtonLocal, Header, ButtonProduct , ButtonPromotion } from '../../common'
import geolib from 'geolib'



class PromotionDetail extends Component {
    static navigationOptions = { header: null }
    
    constructor() {
        super()
        this.state = {
            isFocused: true,
            lat: undefined,
            long: undefined
        }
      }

    componentDidMount(){
         navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({lat: position.coords.latitude, long: position.coords.longitude});
        },

        (error) => {alert("there was an error getting location")},

        {enableHighAccuracy: true}

        );
        console.log('component',this.state.lat,this.state.long)
    }
      
    toggleHeaderPromotionStatus() {
        if (this.state.isFocused === true) {
            this.setState({ isFocused: false })
        } else {
            this.setState({ isFocused: true })
        }
    }

    onButtonGoBack() {
        this.props.screenProps.headerStatusUpdate(true)
        this.props.navigation.navigate('FlashSaleMain')
    }

    _renderDate(items) {
        const StartDate = items.StartDate
        const res = StartDate.substring(0, 10)
        const DateBefore = res.split("/")
        const DateAfter = DateBefore[2] + '-' + DateBefore[1] + '-' + DateBefore[0]
        const EndDate = items.EndDate
        const ress = EndDate.substring(0, 10)
        const DataBefore = ress.split("/")
        const DataAfter = DataBefore[2] + '-' + DataBefore[1] + '-' + DataBefore[0]
        const formattedData = moment(DataAfter).format("D MMM YYYY")

        if (DateBefore[2] === DataBefore[2]) {
            const formattedDate = moment(DateAfter).format("D MMM")
            return (
                <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedData} </Text>
            )
        } else {
            const formattedDate = moment(DateAfter).format("D MMM YYYY")
            return (
                <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedData} </Text>
            )
        }
    }

    //   264 ร้านอาหาร   source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')} 
    //   268 สถานที่ท่องเที่ยว   source={ require('../../images/drawable-hdpi/ic_category_place_travel.webp')} 
    //   265 ร้านค้า  source={ require('../../images/drawable-hdpi/ic_category_shop.webp')} 
    //   267 ที่พัก  source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')} 
    //   266 ย่านการค้า  source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')} 
    //   459 ธนาคาร     source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')} 
    //   269 สถานศึกษา   source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')} 
    //   272 บริการต่างๆ     source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')} 
    //   271 สิ่งอำนวยความสะดวก   source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')} 

    _renderIcon(items) {
        return _.map((items), (shopID) => {
            if (shopID.ShopCategoryID === '264') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.ShopCategoryID === '268') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '265') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '267') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '266') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '459') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '269') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '272') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '271') {
                return (
                    <Image
                        key={shopID.CategoryName + '_' + shopID.ShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }

    _renderImg() {
        const { navigation } = this.props
        const items = navigation.getParam('items')
        return (
            <View style={{ flex: 2, flexDirection: 'column' }}>
                <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
                    <Image
                        style={{ width: '100%', height: '50%' }}
                        source={{ uri: items.ShopImageUrl }}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ marginLeft: 10, marginBottom: 10 }}>
                            <Text style={{ fontSize: 26 }}> {items.Name} </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ marginLeft: 15, marginBottom: 10 }}>
                            <Image
                                source={require('../../images/drawable-hdpi/ic_clock_promotion.webp/')}
                            />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            {this._renderDate(items)}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 20 }}>  {items.Description} </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    onImgSlidePress(key) {
        console.log(key)
        this.toggleHeaderPromotionStatus()
        this.props.navigation.navigate({
            routeName: 'shopDetail',
            params: {
                key: key,
                toggleHeaderPromotionStatus: this.toggleHeaderPromotionStatus.bind(this)
            }
        })
    }
    


    _renderLocation(){
        console.log('Location',this.state.lat,this.state.long)
        const { navigation } = this.props
        const items = navigation.getParam('items')
        console.log('Items: ',items.Latitude,items.Longitude)
        var distance = '';
        if(this.state.lat === undefined){
        return(
            <ButtonLocal style={{ width: 70 }}> 0.00 </ButtonLocal>
        )
        }else{
            distance = geolib.getDistanceSimple(
                {latitude: this.state.lat, longitude: this.state.long},
                {latitude: items.Latitude, longitude: items.Longitude}
            );

           distance = distance / 1000
           distance = distance.toFixed(2);
           console.log(distance , 'Km')
           return(
                <ButtonLocal style={{ width: 70 }}> {distance} </ButtonLocal>
           )
        }
    }


    _renderStore() {
        const { navigation } = this.props
        const items = navigation.getParam('items')
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'column', marginTop: 2, backgroundColor: '#ffffff' }} onPress={() => this.onImgSlidePress(items.ShopID)}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginLeft: 5, marginTop: 10, marginRight: 5 }}>
                            <Image
                                style={{ width: 120, height: 150 }}
                                source={{ uri: items.ShopImageUrl }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 3 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 3, marginLeft: 30, marginTop: 10, marginRight: 20, flexDirection: 'row' }}>
                                {this._renderIcon(items.ShopCategory)}
                                <Text style={{ fontSize: 22 }}> {items.ShopName} </Text>
                            </View>
                            <View style={{ flex: 1, marginTop: 10, alignItems: 'flex-end', marginRight: 3 }}>
                                <Image
                                    style={{ width: 25, height: 25 }}
                                    source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <View style={{ height: 40, marginLeft: 25, marginRight: 1 }} >
                                <ButtonStar style={{ width: 50 }}> {items.Rating} </ButtonStar>
                            </View>
                            <View style={{ height: 40 }}>
                                {this._renderLocation()}
                            </View>
                            <View style={{ height: 40 }}>
                                <ButtonProduct style={{ width: 50 }}>  </ButtonProduct>
                            </View>
                            <View style={{ height: 40 }}>
                                <ButtonPromotion style={{ width: 50 }}> </ButtonPromotion>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </TouchableOpacity>
        )
    }

    _renderHeaderScreen() {
        const { navigation } = this.props
        const items = navigation.getParam('items')
        if (this.state.isFocused === true) {
            return <Header headerText={items.Name}
                backgroundImage={require('../../../components/images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
        }
        else {
            return null
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._renderHeaderScreen()}
                {this._renderImg()}
                {this._renderStore()}
            </View>
        )
    }
}


export default PromotionDetail
