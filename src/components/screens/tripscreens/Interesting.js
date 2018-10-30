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
import I18n from '../../config/i18n'
import { Button, ModalSpinner } from '../../common';

const ImgWidth = null
const ImgHeight = 200

class TripListShop extends Component{
    static navigationOptions = { header: null }
    state = {
        items: '',
        loading: false
    }

    componentWillUpdate(){
        const data = {
            "RqAppID":"1234",
            "UserLanguage":I18n.t('serviceLang'),
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
            "UserLanguage":I18n.t('serviceLang'),
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
        this.props.screenProps.navigation.navigate('shop', {item})
    }

    _renderIcon(item) {
        return _.map((item), (shopID) => {
           // console.log(shopID.TripShopCategoryID)
            if (shopID.TripShopCategoryID === '273' || shopID.TripShopCategoryID === '264' || shopID.TripShopCategoryID === '282') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '274' || shopID.TripShopCategoryID === '265' || shopID.TripShopCategoryID === '283') {
                return (
                    <Image
                        key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                    />
                )
            } else if (shopID.TripShopCategoryID === '275' || shopID.TripShopCategoryID === '266' || shopID.TripShopCategoryID === '284') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '276' || shopID.TripShopCategoryID === '267' || shopID.TripShopCategoryID === '285') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '277' || shopID.TripShopCategoryID === '268' || shopID.TripShopCategoryID === '286') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '278' || shopID.TripShopCategoryID === '269' || shopID.TripShopCategoryID === '287') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '280' || shopID.TripShopCategoryID === '270' || shopID.TripShopCategoryID === '288') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '281' || shopID.TripShopCategoryID === '271' || shopID.TripShopCategoryID === '289') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }else if (shopID.TripShopCategoryID === '460' || shopID.TripShopCategoryID === '459' || shopID.TripShopCategoryID === '461') {
                return (
                    <Image
                    key={shopID.TripID+''+shopID.TripShopCategoryID}
                        style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
        })
    }

    checkImg(item){
        if(item.TripImageUrl === ""){
            //console.log(item)
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
                this.setState({loading: true},()=>{
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":I18n.t('serviceLang'),
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
                        if(Response.data.ResponseDetail == "Success"){
                            this.setState({loading: false})
                        }
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
                })       
            }else if(IsLike === "1"){
                this.setState({loading: true},()=>{
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":I18n.t('serviceLang'),
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
                        if(Response.data.ResponseDetail == "Success"){
                            this.setState({loading: false})
                        }
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
                })
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
                this.setState({loading: true},()=>{
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":I18n.t('serviceLang'),
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
                        this.setState({loading: false})
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
                })            
            }else if(IsFollow === "1"){
                this.setState({loading: true},()=>{
                    const data = {
                        "RqAppID":"1234",
                        "UserLanguage":I18n.t('serviceLang'),
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
                        this.setState({loading: false})
                    }).catch((error) => {
                        console.log('axios error:', error)
                    });
                })
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
                    {I18n.t('buttonFollow')}
                </Button>
            )
        }
        return (
            <Button onPress={() => this.onButtonFollow(item.TripID, item.IsFollow)}
                    style={{borderWidth: 1, borderColor: '#00BFFF', height: 30, alignSelf:"center", width:50, }}  
                    textStyle={{fontSize: 14, color:"#00BFFF"}} name={"md-add"} iconColor={"#00BFFF"}>
                {I18n.t('buttonFollow')}
            </Button>
        )
    }

    renderData() {
       if(this.state.loading === true){
           return (
               <ModalSpinner />
           )
       }
        let i = 0
        return _.map(this.state.items, items => {
            return _.map(items, item => {
                if(item.TripType === "02"){
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
                                            <Text style={{color:"gray"}} numberOfLines={2}>
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
})


export {Interesting}