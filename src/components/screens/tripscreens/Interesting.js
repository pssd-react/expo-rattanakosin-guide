import React, {Component} from 'react'
import axios from 'axios'
import _ from 'lodash'
import Carousel from 'react-native-carousel-view'
import { createStackNavigator } from 'react-navigation'
import {
    View,
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import { Card } from '../../common/Card'
import { CardSection } from '../../common/CardSection'
import {TripInteresting} from './TripInteresting'
import ViewMoreText from 'react-native-view-more-text'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200
const BannerWidth = Dimensions.get('window').width
const BannerHeight = 200

// const images = [
//     'https://thumbs.dreamstime.com/b/museum-siam-located-sanamchai-road-bangkok-thailand-set-inside-very-large-neoclassical-house-57946193.jpg',
//     'https://www.smartsme.co.th/wp-content/uploads/2017/10/SCB-%E0%B8%A2%E0%B9%88%E0%B8%AD-%E0%B8%A2%E0%B8%B7%E0%B8%94-%E0%B8%82%E0%B8%A2%E0%B8%B2%E0%B8%A2.jpg',
// ];
const data = {
    'RqAppID':'1234',
    'UserLanguage':'EN',
    'ViewType':'05',
    'RowNum':'1',
    'Keyword':'',
    'ShopCategory':'',
    'UserID':'',
    'MarketID':'3',
    'CouponType':'',
    'CouponSubType':''   
}
const data1 = {
    'RqAppID':'1234',
    'UserLanguage':'EN',
    'ViewType':'05',
    'RowNum':'1',
    'Keyword':'',
    'ShopCategory':'',
    'UserID':'',
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


class TripListShop extends Component{
    static navigationOptions = { header: null }
    state = {
        item: ''
    }
    state = {
        Banner: ''
    }

    componentWillMount() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryTripService',
        data, config)
        .then(Response => { this.setState({ item: Response.data }) })
        .catch((error) => {
            console.log('axios error:', error)
        });

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryAdvertisingService',
        data1, config)
        .then(Response => { this.setState({ Banner: Response.data }) })
        .catch((error) => {
            console.log('axios error:', error)
        });
        
    } 

    renderBanner(){
        //const baseURL = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'
        let _renderingBanner = '_renderingBanner'
        return _.map(this.state.Banner.AdvertisingList, imgSlider => {
            //console.log(imgSlider.Image_url)
                return (
                    <View key={imgSlider.ShopID } style={{ width: Dimensions.get('window').width, height: 150 }} >
                        <Image
                            style={{ width: ImgWidth, height: ImgHeight }}
                            source={{ uri: imgSlider.Image_url }}
                        />
                    </View>
                )  
            })
    }

    renderItem() {
        let i=0
        const CardItem = _.map((this.state), (items) => {
            //console.log(this.props.navigation)
            return (<ItemDetail key={i} items={items.Trip} navigation={this.props.navigation} />)
            i++
        })
        return CardItem
    }
    
    

    render(){
        return ( 
            <ScrollView>
                {/* <Carousel
                    delay={3000}
                    indicatorAtBottom={true}
                    indicatorSize={20}
                    indicatorColor="purple"
                    width={'100%'}
                    height={150}>
                    {this.renderBanner()}
                    <Text>รูปมันไม่ยอมออก</Text>
                </Carousel> */}
                {this.renderItem()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    ViewContainer:{
        padding: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        flex: 1,
    },
    ViewTextContainer:{
        flex: 1
    },
    ViewTextStyle:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconContainerStyle:{
        alignItems: 'center',
        justifyContent : 'flex-start'
    },
    imgStyle: {
        flex: 1,
        justifyContent : 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    ViewimgStyle: {
        marginTop: 5,
        flex: 1,
        padding: 5,
        flexDirection: 'row'
    },
    buttonStarStyle: {
        backgroundColor: '#ffffff',
        width: 50,
       
    },
    buttonLocalStyle: {
        backgroundColor: '#ffffff',
        width: 60,
    },
})



class ItemDetail extends Component {
    static navigationOptions = { header: null }
    state = {
        item: []
    } 

    renderViewMore(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>Show more...</Text>
        )
    }
    renderViewLess(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>Show less</Text>
        )
    }

    onCardPress(item){
        this.props.navigation.navigate('shop', {item})
    }

    _renderIcon(item) {
       // console.log(item)
        return _.map((item), (shopID) => {
            if (shopID.TripShopCategoryID === '274') {
                return (
                    <Image
                        key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.TripShopCategoryID === '275') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '273') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '276') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '281') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '277') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '280') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '278') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '460') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }

    checkImg(item){
        if(item.TripImageUrl === ""){
            return(
                <Image
                key={item.TripID}
                    style={{ width: ImgWidth, height: ImgHeight }}
                    source={require('../../images/drawable-hdpi/placeholder_trip_default_image.webp')}
                />
            )
            
        }
        return (
            <Image
            key={item.TripID}
                style={{ width: ImgWidth, height: ImgHeight }}
                source={{ uri: item.TripImageUrl }}
            />
        )
    }

    renderData() {
        return _.map(this.props.items, item => {
            //console.log(item.TripShop)
            // if(item.TripImageUrl !== ''){
                return (
                    <TouchableOpacity key={item.TripID} onPress={()=> this.onCardPress(item)} >
                    <Card>
                        <CardSection style={{borderBottomWidth:1, borderColor: '#ddd'}}>
                        
                            <View style={styles.ViewContainer}>
                            
                                <View style={{ flex: 1 }} >
                                {/* <TouchableOpacity onPress={()=> this.onCardPress(item)} > */}
                                    
                                    {this.checkImg(item)}
                                {/* </TouchableOpacity> */}
                                    <View style={{ flexDirection: 'row', marginTop: 1 }}>
                                        <View style={{flexDirection: 'row', marginLeft: 10 }}>
                                            {this._renderIcon(item.TripShopCategory)}
                                        </View>
                                    </View>
                                    <Text style={styles.ViewTextStyle}> {item.TripName} </Text>
                                    
                                    <View style= {{ flex: 1  }}>
                                                    <Text />
                                                    <ViewMoreText
                                                    numberOfLines={3}
                                                    renderViewMore={this.renderViewMore}
                                                    renderViewLess={this.renderViewLess}
                                                    >
                                                        <Text>
                                                            {item.TripDescription}
                                                        </Text>
                                                    </ViewMoreText>
                                                </View>
                                    {/* <Text style={{ fontSize: 12 }}> {item.TripDescription} </Text> */}
                                </View>
                            </View>
                        </CardSection>
                    </Card> 
                    </TouchableOpacity>  
                )
            // }
        })
    }

    render() {
        return (
            <View>
                {this.renderData()}
            </View>
        )
    }
}
const Interesting = createStackNavigator({
    Home: { 
        screen: TripListShop, navigationOptions:{header:null} 
    },
    shop: {
        screen: TripInteresting, navigationOptions:{header:null}
    }
})


export {Interesting}