import React, {Component} from 'react'
import {
    Text, 
    View, 
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import _ from 'lodash'
import axios from 'axios'
import { HeaderBackButton } from 'react-navigation'
import { CardSection, Header, Button, ModalSpinner} from '../../common'
import ViewMoreText from 'react-native-view-more-text'
import { ButtonStar,ButtonLocal } from '../../common'
import I18n from '../../config/i18n'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200

class TripInteresting extends Component {

    state = {
        items: '',
        itemShop: '',
        loading: false,
    };

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


    componentWillMount() {
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
        var config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type': 'application/json'
            } 
        };
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
        this.props.navigation.goBack()
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
            this.props.navigation.navigate({ 
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
            this.props.navigation.navigate({ 
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

    _renderImgCover() {
        const itemsCard = this.props.navigation.getParam('item')
        let i = 0
        return _.map(this.state.items, items => {
            return _.map(items, item => {
            //console.log(items)
            if(itemsCard.TripID === item.TripID){
                if(this.state.loading === true){
                    return (
                        <ModalSpinner />
                    )
                }
                return (
                    <View key ={i++} style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff', }}> 
                        <Image
                            style={{ width: ImgWidth, height: ImgHeight }}
                            source={{ uri: item.TripImageUrl }}
                        />
                        <View style={{ flex: 1, marginLeft: 10, marginRight: 10}}>
                            <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                                <Text style={{ fontSize: 26 }}> {item.TripName} </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color:"gray" }}>  {item.TripDescription} </Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                                {this._renderIcon(item.TripShopCategory)}
                            </View>
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
                    </View>
                )
            }
            })
        })
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

    renderIconShopCategory(item){
        return _.map((item), (shopID) => {
            // console.log(shopID.TripShopCategoryID)
             if (shopID.ShopCategoryID === '273' || shopID.ShopCategoryID === '264' || shopID.ShopCategoryID === '282') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '274' || shopID.ShopCategoryID === '265' || shopID.ShopCategoryID === '283') {
                 return (
                     <Image
                         key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                     />
                 )
             } else if (shopID.ShopCategoryID === '275' || shopID.ShopCategoryID === '266' || shopID.ShopCategoryID === '284') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '276' || shopID.ShopCategoryID === '267' || shopID.ShopCategoryID === '285') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '277' || shopID.ShopCategoryID === '268' || shopID.ShopCategoryID === '286') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '278' || shopID.ShopCategoryID === '269' || shopID.ShopCategoryID === '287') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '280' || shopID.ShopCategoryID === '270' || shopID.ShopCategoryID === '288') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '281' || shopID.ShopCategoryID === '271' || shopID.ShopCategoryID === '289') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                     />
                 )
             }else if (shopID.ShopCategoryID === '460' || shopID.ShopCategoryID === '459' || shopID.ShopCategoryID === '461') {
                 return (
                     <Image
                     key={'ID_'+shopID.ShopCategoryID}
                         style={{ width: 30, height: 30 , marginLeft:5, marginLeft:5}}
                         source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
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

   renderData(){
        const itemList = this.props.navigation.getParam('item')
        let renderingItem = _.map(itemList.TripShop, itemsShop => {
            //console.log(itemsShop.ShopID)
            return itemsShop.ShopID
        })
        return _.map(this.state.itemShop, items => {
            return _.map(items, item => {
            for (let i=0; i<renderingItem.length; i++){
                if(renderingItem[i] === item.ShopID){
                    return (
                    <TouchableOpacity onPress={() => this.onImgSlidePress(item.ShopID)}>
                        <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                            <CardSection style={{flex:2}}>   
                            <View style={{flex:1, flexDirection: 'column', backgroundColor: "#FFFAFA", padding:10}}>
                                <View style={styles.ViewContainer}>
                                    <View style={{flex: 1  }}>
                                        <Image style={{width:120, height:120}}
                                            source={{ uri: item.ImageUrl}} /> 
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
                                            <View style={{ flex: 2, marginLeft: 5}}>
                                                <ButtonLocal style={styles.buttonLocalStyle}> 
                                                    8.03
                                                </ButtonLocal>
                                            </View>
                                            <View  style={{ flex: 3}}/>
                                        </View>
                                    </View>
                                </View>
                                <View style= {{ flex: 1, flexDirection: 'column', paddingTop: 10, paddingBottom: 10}}>
                                    <View style={{flex:1, backgroundColor:'#DCDCDC', padding: 5, borderRadius: 5,}}>
                                        <Text>
                                            {item.ShopDescription}
                                        </Text>
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
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                <Header headerText={I18n.t('interestingTrip')}
                backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ScrollView>
                        {this._renderImgCover()}
                        {this.renderData()}
                </ScrollView>
            </View>
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
        backgroundColor: "#FFFAFA",
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
    imgLeft: {
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 5,
        marginRight: '2.5%',
        marginTop: '5%',
        marginBottom: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, imgRight: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: '5%',
        marginBottom: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export {TripInteresting}