import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { Card } from '../../common/Card'
import { CardSection } from '../../common/CardSection'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text'
import { ButtonStar, ButtonLocal, ButtonHighlight ,Button , Spinner , Heartload} from '../../common'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common'
import geolib from 'geolib'

const data = {
    "RqAppID": "1234",
    "UserLanguage": "EN",
    "ViewType": "04",
    "RowNum": "0",
    "Keyword": "",
    "ShopCategory": "264",
    "UserID": "1",
    "MarketID": "3",
    "CouponType": "",
    "CouponSubType": ""
}

const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

export class EatScreen extends Component {

    constructor() {
        super()
        this.state = {
            item: '',
            lat: undefined,
            long: undefined,
            sortby: undefined,
            sort: '',
            bt_sort: '#ffffff',
            bt_non: '#ffffff',
            loading: true
        }
      }

    componentDidMount(){
         navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({lat: position.coords.latitude, long: position.coords.longitude ,  loading : false});
        },

        (error) => {alert("there was an error getting location")},

        {enableHighAccuracy: true}

        );
        console.log('component',this.state.lat,this.state.long)
    }

    componentWillMount() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { this.setState({ item: response.data ,  loading : true}) })
            .catch((error) => {
                console.log('axios error:', error);
        });
    }

    onButtonGoBack(){
        this.props.navigation.goBack()
    }
    
    renderItem() {

        if(this.state.sortby === undefined){
            return _.map((this.state.item.StaticLocation), (items) => {
                if(items.HighlightShop === 'Y'){
                    return(
                        <View>
                            {this.renderCardData(items)}
                        </View>
                    )
                }
            })
        }else if(this.state.sortby === true){
            var distance = '';
            var array = [];
            var i = 0;
             _.map((this.state.item.StaticLocation), (items) => {
                distance = geolib.getDistanceSimple(
                    {latitude: this.state.lat, longitude: this.state.long},
                    {latitude: items.Latitude, longitude: items.Longitude}
                );
                distance = distance / 1000
                distance = distance.toFixed(2);

                array[i] = { 
                "CategoryID": items.CategoryID,
                "LocationID": items.LocationID,
                "ShopID": items.ShopID,
                "CategoryName": items.CategoryName,
                "LocationName": items.LocationName,
                "Address": items.Address,
                "Latitude": items.Latitude,
                "Longitude": items.Longitude,
                "Section": items.Section,
                "Soi": items.Soi,
                "Rating": items.Rating,
                "TotalReview": items.TotalReview,
                "HighlightShop":items.HighlightShop,
                "IsPromotion": items.IsPromotion,
                "IsFlashSale": items.IsFlashSale,
                "ShopDescription":items.ShopDescription,
                "Zone": items.Zone,
                "Class": items.Class,
                "Moo": items.Moo,
                "Building": items.Building,
                "Road": items.Road,
                "Sub_District":items.Sub_District,
                "District": items.District,
                "City": items.City,
                "Room": items.Room,
                "ProductHighlight":items.ProductHighlight,
                "ImageUrl": items.ImageUrl,
                "IsMyTrip": items.IsMyTrip,
                "CouponType": items.CouponType,
                "Distance": distance
                }
              
                i++;
            })

            for(var j = 0 ; j < array.length ; j++){
                array.sort(function(a, b){return a.Distance - b.Distance});  
               // console.log(array[i])
            }

            return _.map((array), (items) => {
                //console.log(items)
                if(items.HighlightShop === 'Y'){
                    return(
                        <View>
                            {this.renderCardData(items)}
                        </View>
                    )
                }
            })
        }else if(this.state.sortby === false){
            var array = [];
            var sortItem = [];
            var i = 0;
            _.map((this.state.item.StaticLocation), (items) => {
                // array = items;
                sortItem[i] = items;
                i++
            })
           for(var j = 0 ; j < sortItem.length ; j++){
                sortItem.sort(function(a, b){return b.Rating - a.Rating});
                //console.log(sortItem[j]);   
           }
          
            return _.map((sortItem), (items) => {
                //console.log(items)
                if(items.HighlightShop === 'Y'){
                    return(
                        <View>
                            {this.renderCardData(items)}
                        </View>
                    )
                }
            })
        }
    }
    _renderLocation(items){
        //console.log('Location',this.state.lat,this.state.long)
        var distance = '';
        if(this.state.lat === undefined){
        return(
            <ButtonLocal style={styles.buttonLocalStyle}>  0.00 กม.</ButtonLocal>
        )
        }else{
            distance = geolib.getDistanceSimple(
                {latitude: this.state.lat, longitude: this.state.long},
                {latitude: items.Latitude, longitude: items.Longitude}
            );
           distance = distance / 1000
           //console.log(distance , 'Km')
           distance = distance.toFixed(2);
           return(
                <ButtonLocal style={styles.buttonLocalStyle}>  {distance} กม.</ButtonLocal>
           )
        }
    }


    renderCardData(items){
        return (
                <TouchableOpacity style={{flex:1 ,  backgroundColor: '#ffffff',}} onPress={()=> this.onImgSlidePress(items.ShopID)}>
                    <CardSection style={{height:40, justifyContent:'center', alignItems: 'center'}}> 
                        <View style={{flex:1,flexDirection:'row', alignSelf:'flex-start'}}> 
                                <Image style={{width:30, height:30,marginRight:15}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')} 
                                /> 
                        </View>
                        <View style={{flex:10}}>
                        <Text 
                            style={styles.ViewTextStyle} 
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            > {items.LocationName} </Text>
                        </View>
                        <View style={{flex:1,}}>
                            <Image
                                style={{width:25, height:30,}}
                                source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                            />
                        </View>
                    </CardSection>
                    <CardSection style={{flex:1,borderBottomWidth:1, borderColor: '#ddd'}}>   
                            <View style={styles.ViewContainer}>
                                    <View style={{flex: 1 }}>
                                    <Image style={{width:110, height:150}}
                                        source={{ uri: items.ImageUrl}} 
                                    /> 
                                    </View>
                                    
                                    <View style={{ flex: 2 ,flexDirection: 'column'}}>
                                        <View style= {{ flexDirection: 'row' , height: 40}}>
                                            <View style={{ flex: 5} }>
                                                <ButtonStar style={styles.buttonStarStyle}
                                                > 
                                                {items.Rating}
                                                </ButtonStar>
                                            </View>
                                            <View style={{ flex: 7 }}>
                                                {this._renderLocation(items)}
                                            </View>
                                            <View style={{ flex: 2 }}>
                                                <ButtonHighlight style={styles.buttonHightLightStyle}>
                                                </ButtonHighlight>
                                            </View>
                                            <View  style={{ flex: 6}}/>

                                        </View>
                                    
                                        <View style= {{ flex: 1 }}>
                                            <Text />
                                            <ViewMoreText
                                                numberOfLines={3}
                                                renderViewMore={this.renderViewMore}
                                                renderViewLess={this.renderViewLess}
                                            >
                                                <Text>
                                                    {items.ShopDescription}
                                                </Text>
                                            </ViewMoreText>
                                        </View>
                                    </View>
                            </View>
                    </CardSection>
                </TouchableOpacity>
        )
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

    onImgSlidePress(key){
        console.log( key )
        this.props.navigation.navigate('shopDetail', {key})
    }

    changeStatusSortDistance(){
        this.setState({ bt_non: '#d9d9d9' , bt_sort: '#ffffff' })
        this.setState({ sortby: true })
        console.log(this.state.sortby)
    }

    changeStatusSortScore(){
        this.setState({ bt_sort: '#d9d9d9', bt_non: '#ffffff'  })
        this.setState({ sortby: false })
        console.log(this.state.sortby)
    }


    buttonDistance(){
        
        return(
        <Button style = {{ backgroundColor: this.state.bt_non ,borderRadius: 10 }} onPress={() => this.changeStatusSortDistance()}>
             ระยะทาง
        </Button>
        )
    }

    buttonScore(){
        return(
        <Button style = {{ backgroundColor: this.state.bt_sort ,borderRadius: 10}} onPress={() => this.changeStatusSortScore()}>
            ความนิยม
        </Button>
        )
    }

    renderPageView(){
        if(this.state.loading === true){
            return (
                <Heartload  />
            )
        }
        else{
            return (
                <View style={{flex:1}}>
                <View style = {{ width: Dimensions.get('window').width, height: 60  , backgroundColor: '#f2f2f2' , flexDirection: 'row'}}>
                    <View style = {{ flex: 2 , justifyContent: 'center' , marginLeft: 20}}>
                        <Text style = {{ alignItems: 'center' , justifyContent: 'center' , fontSize: 18, fontWeight:'300'}}> เรียงตาม </Text>
                    </View>
                    <View style = {{  flex: 3 , height: 30 , width: 80,marginTop: 15 }}>
                        {this.buttonDistance()}
                    </View>
                    <View style = {{ flex: 3 ,height: 30 , width: 80,marginTop: 15}}>
                        {this.buttonScore()}
                    </View>
                </View>
                <View>
                    <ScrollView>
                        {this.renderItem()}
                        <View style={{ height: 50 ,backgroundColor: '#ffffff',}} />
                    </ScrollView>
                </View>
            </View>
            )
        }
    }


    render(){
        
        return (
            <View style={{flex:1}}>
            <Header headerText="Recommend Eat" 
            backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                 {this.renderPageView()}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ViewContainer: {
        padding: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        flex: 1,
    },
    ViewTextContainer: {
        flex: 1
    },
    ViewTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    imgStyle: {
        flex: 1,
        justifyContent: 'flex-start',
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
        width: 80,
    },
    buttonHightLightStyle: {
        backgroundColor: '#ffffff',
        width: 25,
    }
})
