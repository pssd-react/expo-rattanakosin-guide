import React, {Component} from 'react'
import axios from 'axios'
import _ from 'lodash'
import { createStackNavigator } from 'react-navigation'
import {
    View,
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'
import { CardSection } from '../../common/CardSection'
import {TripInteresting} from './TripInteresting'
import ViewMoreText from 'react-native-view-more-text'
import { Button, ModalSpinner } from '../../common';

const ImgWidth = null
const ImgHeight = 200

class TripListShop extends Component{
    static navigationOptions = { header: null }
    state = {
        items: '',
        Banner: '',
    }

    componentWillUpdate(){
        const data = {
            "RqAppID":"1234",
            "UserLanguage":"EN",
            "MarketID":"3",
            "UserID": this.props.screenProps.userId
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
        
    }

    componentWillMount() {
        const data = {
            "RqAppID":"1234",
            "UserLanguage":"EN",
            "MarketID":"3",
            "UserID": this.props.screenProps.userId
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
        
    } 

    onCardPress(item){
        this.props.navigation.navigate('shop', {item})
    }

    _renderIcon(item) {
        return _.map((item), (shopID) => {
            if (shopID.TripShopCategoryID === '274') {
                return (
                    <Image
                        key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.TripShopCategoryID === '275') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '273') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '276') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '281') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '277') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '280') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '278') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '460') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }

    checkImg(item){
        if(item.TripImageUrl === ""){
            return(
                <ImageBackground
                key={item.TripID}
                    style={{ width: ImgWidth, height: ImgHeight }}
                    source={require('../../images/drawable-hdpi/placeholder_trip_default_image.webp')}
                >
                    <View style={{flex:1, flexDirection: 'row', marginTop:ImgHeight-15 }}>
                        {this._renderIcon(item.TripShopCategory)}
                    </View>
                </ImageBackground>
            )
            
        }
        return (
            <ImageBackground
            key={item.TripID}
                style={{ width: ImgWidth, height: ImgHeight }}
                source={{ uri: item.TripImageUrl }}
            >
                <View style={{flex:1, flexDirection: 'row', marginTop:ImgHeight-15 }}>
                    {this._renderIcon(item.TripShopCategory)}
                </View>
            </ImageBackground>
        )
    }

    onButtonLike(TripID, IsLike){
        if(this.props.screenProps.userId !== 'none' ){
            if(IsLike === "0"){
                
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":"EN",
                        "UserID": this.props.screenProps.userId,
                        "TripID": TripID,
                        "SessionToken":""
                    }
                    const config = {
                        headers: {
                            'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                            'Content-Type' : 'application/json'
                        }
                    }
                    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateLikeTripService',
                    data, config)
                    .then(Response => { 
                        console.log(Response.data.ResponseDetail)
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
                            
            }else if(IsLike === "1"){
               
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":"EN",
                        "UserID": this.props.screenProps.userId,
                        "TripID": TripID,
                        "SessionToken":""
                    }
                    const config = {
                        headers: {
                            'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                            'Content-Type' : 'application/json'
                        }
                    }
                    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateUnLikeTripService',
                    data, config)
                    .then(Response => { 
                        console.log(Response.data.ResponseDetail)
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
           
            }
        }else{
            this.props.screenProps.navigation.navigate({ 
                routeName:'Login',
                params: {
                    fromScreen : 'Interesting'
                }
            })
        }
    }

    renderButtonLike(item){
        if(item.IsLike === "1"){
            return (
               <TouchableOpacity key={item.TripID} onPress={() => this.onButtonLike(item.TripID, item.IsLike)}>
                    <Image style={{width: 29, height: 25}} source={require('../../images/drawable-xhdpi/ic_trip_selected.webp')}/>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity key={item.TripID} onPress={() => this.onButtonLike(item.TripID, item.IsLike)}>
                <Image style={{width: 29, height: 26}} source={require('../../images/drawable-xhdpi/ic_trip_unselected.webp')}/>
            </TouchableOpacity>
        )
    }

    onButtonFollow(TripID, IsFollow){
        if(this.props.screenProps.userId !== 'none' ){
            if(IsFollow === "0"){
                const data = {
                    "RqAppID":"1234",
                    "UserLanguage":"EN",
                    "UserID": this.props.screenProps.userId,
                    "TripID": TripID,
                    "SessionToken":""
                }
                const config = {
                    headers: {
                        'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                        'Content-Type' : 'application/json'
                    }
                }
                axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateFollowTripService',
                data, config)
                .then(Response => { 
                    console.log(Response.data.ResponseDetail)
                }).catch((error) => {
                    console.log('axios error:', error)
                });
                            
            }else if(IsFollow === "1"){
                const data = {
                    "RqAppID":"1234",
                    "UserLanguage":"EN",
                    "UserID": this.props.screenProps.userId,
                    "TripID": TripID,
                    "SessionToken":""
                }
                const config = {
                    headers: {
                        'Authorization' : 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                        'Content-Type' : 'application/json'
                    }
                }
                axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateUnFollowTripService',
                data, config)
                .then(Response => { 
                    console.log(Response.data.ResponseDetail)
                }).catch((error) => {
                    console.log('axios error:', error)
                });
            }
        }else{
            this.props.screenProps.navigation.navigate({ 
                routeName:'Login',
                params: {
                    fromScreen : 'Interesting'
                }
            })
        }
    }

    renderButtonFollow(item){
        if(item.IsFollow === "1"){
            return (
                <Button onPress={() => this.onButtonFollow(item.TripID, item.IsFollow)}
                        style={{borderWidth: 1, borderColor: '#00BFFF', height: 30, alignSelf:"center", width:50, backgroundColor:"#00BFFF"}}  
                        textStyle={{fontSize: 14, color:"#fff"}} name={"md-add"} iconColor={"#fff"}>
                    ติดตาม
                </Button>
            )
        }
        return (
            <Button onPress={() => this.onButtonFollow(item.TripID, item.IsFollow)}
                    style={{borderWidth: 1, borderColor: '#00BFFF', height: 30, alignSelf:"center", width:50, }}  
                    textStyle={{fontSize: 14, color:"#00BFFF"}} name={"md-add"} iconColor={"#00BFFF"}>
                ติดตาม
            </Button>
        )
    }

    renderData() {
       
        let i = 0
        return _.map(this.state.items, items => {
            return _.map(items, item => {
                if(item.TripType == '02'){
                    return (
                        <View key={i++}>
                        <View style={{margin: 5,}}>
                            <CardSection >
                                <View style={styles.ViewContainer}>
                                <TouchableWithoutFeedback  onPress={()=> this.onCardPress(item)} >
                                    <View style={{ flex: 1 }} >
                                        {this.checkImg(item)}
                                        <Text style={styles.ViewTextStyle}> {item.TripName} </Text>
                                        <View style= {{ flex: 1, marginLeft: 5, marginRight: 5 }}>
                                            <Text  numberOfLines={2}>
                                                {item.TripDescription}
                                            </Text>
                                        </View>
                                    </View>
                                    </TouchableWithoutFeedback >
                                    <View style={{ flex: 1, flexDirection:"row", justifyContent: 'space-between', marginLeft: 5, marginRight: 5, marginTop: 15, marginBottom: 15 }}>
                                        <View style={{ flex:3, flexDirection:"row",}}>
                                            {this.renderButtonLike(item)}
                                            <Text style={{marginLeft:5}}>{item.TripLikeQty}</Text>
                                        </View>
                                        <View style={{ flex:1, flexDirection:"row",}}>
                                            {this.renderButtonFollow(item)}
                                        </View>
                                    </View>
                                </View> 
                            </CardSection>
                        </View> 
                        </View>  
                    )
                }
            })
            // }
        })
    }
    
    render(){
        return ( 
            <ScrollView>
                <View>
                    <Image
                        style={{width: Dimensions.get('window').width,
                            height: 150}}
                        source={{uri: 'http://www.wikalenda.com/images/business_owner_image/main/MDAwMDAwMDAx_NTc0MjcwODIwMDkzNzAwNDU1MzAwNDc3.bmp'}}
                    />

                </View>
                {this.renderData()}
            </ScrollView>
        )
    }

}

class ItemDetail extends Component {
    static navigationOptions = { header: null }
    state = {
    } 

    
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    ViewContainer:{
       // padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        elevation: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        flex: 1,
    },
    ViewTextContainer:{
        flex: 1
    },
    ViewTextStyle:{
        marginTop:15,
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

const Interesting = createStackNavigator({
    Home: { 
        screen: TripListShop, navigationOptions:{header:null} 
    },
    shop: {
        screen: TripInteresting, navigationOptions:{header:null}
    }
})


export {Interesting}