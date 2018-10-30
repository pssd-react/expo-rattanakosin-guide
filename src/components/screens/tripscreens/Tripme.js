import React, {Component} from 'react'
import axios from 'axios'
import _ from 'lodash'
import { createStackNavigator } from 'react-navigation'
import {
    View,
    Text, 
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'
import { CardSection } from '../../common/CardSection'
import { ButtonTrip } from '../../common/ButtonTrip'
import { Button, ModalSpinner } from '../../common';
import I18n from '../../config/i18n'

const ImgWidth = null
const ImgHeight = 200

class Tripme extends Component{
    static navigationOptions = { header: null }

   state = {
        items: '',
        loading: false,
        textbox: 'เลือกร้านค้าและสร้างทริปส่วนตัวได้ที่นี่',
        textbox1: 'ตำแหน่งปักหมุดของคุณ',
        textBT: 'เริ่มสร้างทริป',
        login: 0
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

   /* renderItem() {
        let loKey = 0
        const  CardItem = _.map((this.state), (items) => {
            loKey++
            return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} />)
        })

        return CardItem
        }*/

    onCreateTrip() {
        this.props.screenProps.navigation.navigate('trip')
    }

    onCardPress() {
        this.props.screenProps.navigation.navigate('markmap')
    }

    onCardShop(item){
        this.props.screenProps.navigation.navigate('shop', {item})
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
                if(item.TripType === "02" && item.IsFollow === "1"){
                    return (
                        <View key={i++}>
                        <View style={{margin: 5,}}>
                            <CardSection >
                                <View style={styles.ViewContainer}>
                                <TouchableWithoutFeedback  onPress={()=> this.onCardShop(item)} >
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
        })
    }

    render(){
        return (
            <ScrollView>
                <CardSection style={{marginLeft:10, marginRight:10,}}>         
                    <ImageBackground
                        source={require('../../images/drawable-hdpi/bg_trip_main.webp')}
                        style={styles.stretch }
                        >
                      <View style= {styles.overlayContainer}>
                            <View style = {styles.top}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            
                            <View style = {styles.top}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={() => this.onCreateTrip()}
                                 > 
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                            
                      </View>
                    </ImageBackground> 
                </CardSection>

                <TouchableOpacity onPress={()=> this.onCardPress()}>
                    <CardSection style={{marginLeft:10, marginRight:10,}}>         
                        <ImageBackground
                            source={require('../../images/drawable-hdpi/bg_position_sticky.webp')}
                            style={styles.stretch}
                            >
                            <View style= {styles.overlayContainer}>
                                <View style = {styles.top}>
                                    <Text style={styles.header}> {this.state.textbox1}</Text>
                                </View>
                            </View>
                        </ImageBackground> 
                    </CardSection>
                </TouchableOpacity>
                {this.renderData()}
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
       // color: '#FFFFFF'
    },
    stretch: {
        flex:1,
        width: 400,
        height: 200,
    },
    header: {
        color: '#000000',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#ffc94c',
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    top: {
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center'
    },
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
/*
class ItemDetail extends Component {

    state = {
        item: []
    }

    renderData() {
        return _.map(this.props.items, item => {
           console.log( this.props.ShopID )
           if(this.props.ShopID === item.ShopID){
            return (
                <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                <CardSection style={{height:40}}> 
                            <View style={{flex:4,
                                    justifyContent:'flex-start', flexDirection:'row', alignSelf:'center'}}>
                            <Image style={{width:30, height:30,marginRight:15}}
                                source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')} 
                            /> 
                                <Text style={styles.ViewTextStyle}> {item.LocationName} </Text>
                            </View>
                            
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={() => this.onAddTrip(item.ShopID)}>
                                    <Image
                                        style={{width:25, height:25 }}
                                        source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                    />
                                    </TouchableOpacity>
                                </View>
                            
                </CardSection>
                    <CardSection style={{flex:1,borderBottomWidth:1, borderColor: '#ddd'}}>   
                            <View style={styles.ViewContainer}>
                                    <View style={{flex: 1  }}>
                                    <Image style={{width:100, height:130}}
                                        source={{ uri: item.ImageUrl}} 
                                    /> 
                                    </View>
                                    
                                    <View style={{ flex: 2 ,flexDirection: 'column'}}>
                                        <View style= {{ flexDirection: 'row' , height: 40}}>
                                            <View style={{ flex: 1 , marginRight: 15} }>
                                                <ButtonStar style={styles.buttonStarStyle}
                                                > 
                                                {item.Rating}
                                                </ButtonStar>
                                            </View>
                                            <View style={{ flex: 2, marginLeft: 5}}>
                                                <ButtonLocal style={styles.buttonLocalStyle}
                                                > 
                                                    8.03
                                                </ButtonLocal>
                                            </View>

                                            <View  style={{ flex: 3}}/>

                                        </View>
                                     
                                        <View style= {{ flex: 1  }}>
                                            <Text />
                                            <ViewMoreText
                                            numberOfLines={3}
                                            renderViewMore={this.renderViewMore}
                                            renderViewLess={this.renderViewLess}
                                            >
                                                <Text>
                                                    {item.ShopDescription}
                                                </Text>
                                            </ViewMoreText>
                                        </View>
                                    </View>
                            </View>
                    </CardSection>
                </View>
               
        
                )
            }   
        })
    }
    

    render() {
        return (
            <View style = {{flex:1, backgroundColor: '#FFFFFF'}}>
                {this.renderData()}
            </View>
        )
    } 
}*/

const TripMe = createStackNavigator({
    Home: { 
        screen: Tripme, navigationOptions:{header:null} 
    },
    
    
})


export  {TripMe}