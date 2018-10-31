import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native'
import _ from 'lodash'
import axios from 'axios'
import { ButtonTrip } from '../../../../common/ButtonTrip'
import { createStackNavigator } from 'react-navigation'
import { HeaderBackButton } from 'react-navigation'
import  Search  from './Search'
import { ResultSearchLocation } from './ResultSearchLocation'
import { AddTripScreen } from './AddTripScreen'
import I18n from '../../../../config/i18n'
import { ButtonStar,ButtonLocal, CardSection, Header, Button, ModalSpinner } from '../../../../common'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200

export class TripMeAddLocation extends Component {
    
    static navigationOptions = { header: null }
    state = {
        textbox: 'ทริปของฉัน',
        textbox1: 'ร้านค้าที่ต้องการไป',
        textBT: 'เพิ่มสถานที่',
        login: 0,
        items: '',
        itemShop: '',
        loading: false,
    };

    componentWillMount(){
        const data = {
            "RqAppID":"1234",
            "UserLanguage":I18n.t('serviceLang'),
            "MarketID":"3",
            "UserID": this.props.screenProps.userId
        }
        var dataList = {
            'RqAppID':'1234',
            'UserLanguage':I18n.t('serviceLang'),
            'ViewType':'05',
            'RowNum':'1',
            'Keyword':'',
            'ShopCategory':'',
            'UserID': this.props.screenProps.userId,
            'MarketID':'3',
            'CouponType':'',
            'CouponSubType':''
        }
        const config = {
            headers: {
                'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type' : 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryTripService',
        data, config)
        .then(Response => { this.setState({ items: Response.data })})
        .catch((error) => {
            console.log('axios error:', error)
        });
   
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
        dataList, config)
        .then(Response => { this.setState({ itemShop: Response.data })})
        .catch((error) => {
            console.log('axios error:', error)
        });
    }

    componentWillUpdate(){
        const data = {
            "RqAppID":"1234",
            "UserLanguage":I18n.t('serviceLang'),
            "MarketID":"3",
            "UserID": this.props.screenProps.userId
        }
        var dataList = {
            'RqAppID':'1234',
            'UserLanguage':I18n.t('serviceLang'),
            'ViewType':'05',
            'RowNum':'1',
            'Keyword':'',
            'ShopCategory':'',
            'UserID': this.props.screenProps.userId,
            'MarketID':'3',
            'CouponType':'',
            'CouponSubType':''
        }
        const config = {
            headers: {
                'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type' : 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryTripService',
        data, config)
        .then(Response => { this.setState({ items: Response.data })})
        .catch((error) => {
            console.log('axios error:', error)
        });
   
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
        dataList, config)
        .then(Response => { this.setState({ itemShop: Response.data })})
        .catch((error) => {
            console.log('axios error:', error)
        });
    }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    onCreateTrip() {
        console.log("click!")
        this.props.navigation.navigate('search')
    }

    renderIconShopCategory(item){
        return _.map((item), (shopID) => {
            // console.log(shopID.TripShopCategoryID)
             if (shopID.ShopCategoryID === '273' || shopID.ShopCategoryID === '264' || shopID.ShopCategoryID === '282') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_food.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '274' || shopID.ShopCategoryID === '265' || shopID.ShopCategoryID === '283') {
                 return (
                     <Image
                         key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_shop.webp')}
                     />
                 )
             } else if (shopID.ShopCategoryID === '275' || shopID.ShopCategoryID === '266' || shopID.ShopCategoryID === '284') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '276' || shopID.ShopCategoryID === '267' || shopID.ShopCategoryID === '285') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '277' || shopID.ShopCategoryID === '268' || shopID.ShopCategoryID === '286') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '278' || shopID.ShopCategoryID === '269' || shopID.ShopCategoryID === '287') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_office.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '280' || shopID.ShopCategoryID === '270' || shopID.ShopCategoryID === '288') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '281' || shopID.ShopCategoryID === '271' || shopID.ShopCategoryID === '289') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_service.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '460' || shopID.ShopCategoryID === '459' || shopID.ShopCategoryID === '461') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../../../images/drawable-hdpi/ic_type_category_bank.webp')}
                     />
                 )
             }
         })
    }

    onImgSlidePress(key) {
        this.props.navigation.navigate({
            routeName: 'shopDetail',
            params: {
                key: key
            },
            key: 'shopDetail' + key
        })
    }

    _renderListTrip(){
        let renderingItem = []
        let i=0
         _.map(this.state.items.Trip, items => {
            if(items.TripType === "01" && items.TripShop.length > 0){
                _.map(items.TripShop, TripShop => {
                    renderingItem[i] = TripShop.ShopID
                    i++
        })
            }
        })

        if(renderingItem.length !== 0){
            return _.map(this.state.itemShop, items => {
                return _.map(items, item => {
                    for (let i=0; i<renderingItem.length; i++){
                       // return <Text>{renderingItem[i]}</Text>
                      if(renderingItem[i] === item.ShopID){
                            return (
                                <TouchableOpacity onPress={() => this.onImgSlidePress(item.ShopID)}>
                                    <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                                        <CardSection style={{flex:2}}>   
                                        <View style={{flex:1, flexDirection: 'column', backgroundColor: "#FFFAFA", padding:10}}>
                                            <View style={styles.ViewContainer}>
                                                <View style={{flex: 1  }}>
                                                    <Image style={{width:120, height:120}}
                                                        source={(item.ImageUrl === "")? require('../../../../images/drawable-hdpi/placeholder_merchant_item.webp'):{uri: item.ImageUrl} } /> 
                                                </View>
                                                <View style={{ flex: 2 ,flexDirection: 'column', marginLeft: 15 }}>
                                                    <View style= {{ flexDirection: 'row' }}>
                                                        <Text style={styles.ViewTextStyle} numberOfLines={1}> {item.LocationName} </Text>
                                                    </View>
                                                    <View style= {{ flexDirection: 'row' , height: 40}}>
                                                        {this.renderIconShopCategory(item.ShopCategory)}
                                                    </View>
                                                    <View style= {{ flexDirection: 'row' , height: 40}}>
                                                        <View style={{ flex: 1 , marginRight: 15} }>
                                                            <ButtonStar style={styles.buttonStarStyle}> 
                                                            {item.Rating}
                                                            </ButtonStar>
                                                        </View>
                                                        <View  style={{ flex: 3}}/>
                                                    </View>
                                                </View>
                                            </View>
                                            </View>
                                        </CardSection>
                                    </View> 
                                </TouchableOpacity>
                            )
                        }
                    }
                })
            })
        }else{
            return (
                <View style={{flex: 1, flexDirection:"column", alignItems: "center", justifyContent: "center", marginTop: 20}}>
                    <View style={{ flex:1, alignItems: "center", flexDirection:"row", marginRight:40 }}>
                        <Image style={{ width:60, height:80}}
                            source={require('../../../../images/drawable-xhdpi/ic_arrow_no_trip.webp')}/> 
                        <Text style={{color: "gray", marginTop:40 }} >{I18n.t('tripNotInteresting')}</Text>
                    </View>
                    <View style={{ flex:1, alignItems: "center"}}>
                       
                        <Text style={{color: "gray" }} >{I18n.t('needAddNotStore')}</Text>
                        <Text style={{color: "gray" }} >{I18n.t('needAddNotStore01')}</Text>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                <Header headerText="ทริปของฉัน"
                    backgroundImage={require('../../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ScrollView>
                    <ImageBackground
                        style={{width: ImgWidth, height: ImgHeight}}
                        source={require('../../../../images/drawable-hdpi/bg_add_trip.webp')}
                    >
                        <View style= {styles.overlayContainer}>
                            <View style={{flex: 2, justifyContent: "flex-start", marginTop: 10}}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            <View style={{flex:1}}>
                                <ButtonTrip style={styles.buttonStyle} onPress={()=> this.onCreateTrip()}>
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                        </View>
                    </ImageBackground>

                    {this._renderListTrip()}
                 
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft:20
       // color: '#FFFFFF'
    },
    container: {
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        flex: 1
    },
    viewBlockStyle: {
        marginTop: 60,
        flex: 1,
        
    },
    header: {
        color: '#000000',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#ffc94c',
        width: 150,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    top: {
        alignItems: 'flex-start',
      
        //justifyContent: 'center'
    },
    ViewContainer:{
        backgroundColor: "#FFFAFA",
        flexDirection: 'row',
        flex: 1,
    },
})

const TripMeAddLocations = createStackNavigator({
    Home: { 
        screen: TripMeAddLocation, navigationOptions:{header:null} 
    },
})


export  {TripMeAddLocations}