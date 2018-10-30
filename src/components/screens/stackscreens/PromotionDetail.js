import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    Geolocation,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import { Button, } from 'react-native-elements'
import { HeaderBackButton } from 'react-navigation'
import _ from 'lodash'
import moment from 'moment'
import { ButtonStar, ButtonLocal, Header, ButtonProduct , ButtonPromotion, Spinner } from '../../common'
import geolib from 'geolib'
import I18n from '../../config/i18n'
import axios from 'axios'

var config = {
    headers: {
      'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
      'Content-Type': 'application/json'
    }
}

var tripId = ''

class PromotionDetail extends Component {
    
    constructor() {
        super()
        this.state = {
            isFocused: true,
            lat: undefined,
            long: undefined,
            language: I18n.t('userlanguage'),
            headerStatusUpdate : undefined,
            AddShopId: '',
            loading: true
        }
      }

      componentWillMount(){

      }

    componentDidMount(){
         navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                lat: position.coords.latitude, 
                long: position.coords.longitude,
                headerStatusUpdate : this.props.navigation.getParam('headerStatusUpdate', undefined)
            });
        },

        (error) => {alert("there was an error getting location")},

        {enableHighAccuracy: true}

        );
        
    }

    toggleHeaderPromotionStatus() {
        // if (this.state.isFocused === true) {
        //     this.setState({ isFocused: false })
        // } else {
        //     this.setState({ isFocused: true })
        // }
    }

    onButtonGoBack() {
        if(this.state.headerStatusUpdate !== undefined){
            this.state.headerStatusUpdate(true)
        this.props.navigation.goBack()
        }else{
            this.props.navigation.goBack()
        }
        
    }

    _renderDate(key) {
        const StartDate = key.StartDate
        const res = StartDate.substring(0, 10)
        const DateBefore = res.split("/")
        const DateAfter = DateBefore[2] + '-' + DateBefore[1] + '-' + DateBefore[0]
        const EndDate = key.EndDate
        const ress = EndDate.substring(0, 10)
        const DataBefore = ress.split("/")
        const DataAfter = DataBefore[2] + '-' + DataBefore[1] + '-' + DataBefore[0]
        const formattedData = moment(DataAfter).format("D MMM YYYY")
        if(this.state.language === 'TH'){
          if (DateBefore[2] === DataBefore[2]) {
            const DayDate = moment(DateAfter).format("D")
            const MonthDateEN = moment(DateAfter).format("MMM")
            const DateTH = DayDate +" "+this._renderDateTH(MonthDateEN)
            const DayDate2 = moment(DataAfter).format("D")
            const MonthDateEN2 = moment(DataAfter).format("MMM")
            const YearDate2 = moment(DataAfter).format("YYYY")
            var Year2 = parseInt(YearDate2) + 543
            const DateTH2 = DayDate2 +" "+this._renderDateTH(MonthDateEN2)+ " "+ Year2
            return (
              <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {DateTH} - {DateTH2} </Text>
            )
          } else {
            const DayDate = moment(DateAfter).format("D")
            const MonthDateEN = moment(DateAfter).format("MMM")
            const YearDate1 = moment(DateAfter).format("YYYY")
            var Year1 = parseInt(YearDate1) + 543
            const DateTH = DayDate +" "+this._renderDateTH(MonthDateEN) + " " + Year1
            const DayDate2 = moment(DataAfter).format("D")
            const MonthDateEN2 = moment(DataAfter).format("MMM")
            const YearDate2 = moment(DataAfter).format("YYYY")
            var Year2 = parseInt(YearDate2) + 543
            const DateTH2 = DayDate2 +" "+this._renderDateTH(MonthDateEN2)+ " "+ Year2
            return (
              <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {DateTH} - {DateTH2} </Text>
            )
          }
        
        }else{
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
      }
    _renderDateTH(formattedDate){
        if(formattedDate === 'Jan'){
          return formattedDate = 'ม.ค.'
        }else if(formattedDate === 'Feb'){
          return formattedDate = 'ก.พ.'
        }else if(formattedDate === 'Mar'){
          return formattedDate = 'มี.ค.'
        }else if(formattedDate === 'Apr'){
          return formattedDate = 'เม.ย.'
        }else if(formattedDate === 'May'){
          return formattedDate = 'พ.ค.'
        }else if(formattedDate === 'Jun'){
          return formattedDate = 'มิ.ย.'
        }else if(formattedDate === 'Jul'){
          return formattedDate = 'ก.ค.'
        }else if(formattedDate === 'Aug'){
          return formattedDate = 'ส.ค.'
        }else if(formattedDate === 'Sep'){
          return formattedDate = 'ก.ย.'
        }else if(formattedDate === 'Oct'){
          return formattedDate = 'ต.ค.'
        }else if(formattedDate === 'Nov'){
          return formattedDate = 'พ.ย.'
        }else if(formattedDate === 'Dec'){
          return formattedDate = 'ธ.ค.'
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
        //console.log(key)
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
    //  console.log('Location',this.state.lat,this.state.long)
        const { navigation } = this.props
        const items = navigation.getParam('items')
    //  console.log('Items: ',items.Latitude,items.Longitude)
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
        //   console.log(distance , 'Km')
           return(
                <ButtonLocal style={{ width: 70 }}> {distance} </ButtonLocal>
           )
        }
    }


    renderBtAddTrip(items){
        //console.log(this.props.screenProps.trip)
        if(this.props.screenProps.userId === 'none'){
            this.props.navigation.navigate({
                routeName: 'Login',
                params: {
                    fromScreen: 'PromotionDetail'
                }
            })
        }else if(tripId === ''){
                console.log(tripId)
                var data = {
                    "RqAppID":"1234",
                    "UserLanguage":"EN",
                    "UserID": this.props.screenProps.userId,
                    "TripID": "",
                    "TripShop":[{
                        "ShopID": items
                    }],
                    "SessionToken":"",
                    "MarketID":"3"
                 }
                 axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/AddTripShopService',data, config)
                 .then(response => {
                     console.log(response.data)
                   this.setState({
                     loading: true
                   },()=>{
                       this.props.screenProps.updateInquiryTrip()
                   })
                 })
                 tripId = ''
        }else{
            console.log(tripId)
            var data =  {
                "RqAppID":"1234",
                "UserLanguage":"EN",
                "UserID": this.props.screenProps.userId,
                "TripID": tripId,
                "TripShop":[{
                    "ShopID":items
                }],
                "SessionToken":"",
                "MarketID":"3"
             }
             axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/DeleteTripShopService',data, config)
             .then(response => {
               this.setState({
                  loading: false
               },()=>{
                this.props.screenProps.updateInquiryTrip()
                })
             })
             tripId = ''
        }
    }



    renderBtImgAddTrip(ShopID){
        var result = ''
        var count = 0
        if(this.props.screenProps.userId === 'none'){
            //console.log(this.props.screenProps.InquiryTrip)
            result = (
                <Image
                    style={{ width: 25, height: 30 }}
                    source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                />
            )
        }else{  
            _.map((this.props.screenProps.InquiryTrip.Trip), (items) => {
                if(items.TripType === '01'){
                    _.map((items.TripShop), (item) => {
                        if(item.ShopID === ShopID && count === 0){ 
                            tripId = items.TripID
                            count = 1
                            result = (
                                <Image
                                    style={{ width: 25, height: 30 }}
                                    source={require('../../images/drawable-hdpi/ic_fav_trip_selected.webp')}
                                />
                            )
                        }
                    })
                }    
            })
            if(count===0){
                 result = (
                    <Image
                        style={{ width: 25, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                    />
                )
            }
           
        }

        return (<View style={{flex:1}}>{result}</View>)
     
    }

    _renderStore() {
        const { navigation } = this.props
        const items = navigation.getParam('items')
        
        return (
            <TouchableWithoutFeedback  onPress={() => this.onImgSlidePress(items.ShopID)}>
                <View style={{ flex: 1, flexDirection: 'column', marginTop: 2, backgroundColor: '#ffffff' }}>    
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginLeft: 5, marginTop: 10, marginRight: 5 }}>
                                <Image
                                    style={{ width: 100, height: 150 }}
                                    source={{ uri: items.ShopImageUrl }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 3, marginLeft: 30, marginTop: 10, marginRight: 20, flexDirection: 'row' }}>
                                    {this._renderIcon(items.ShopCategory)}
                                    <Text style={{ fontSize: 16 }} numberOfLines={1} ellipsizeMode={'tail'}> {items.ShopName} </Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1, marginTop: 10, alignItems: 'flex-end', marginRight: 3 }} onPress={() => this.renderBtAddTrip(items.ShopID)}>
                                    {this.renderBtImgAddTrip(items.ShopID)}
                                </TouchableOpacity>
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
                    <View style={{ flex: 1 ,  alignItems: 'center' ,marginTop: 100}}>
                            <Text style={{ fontSize: 16, color: '#4d0099' , textDecorationLine: 'underline' }} >  {I18n.t('flash_sale_see_shop')} </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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

