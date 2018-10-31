import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from 'react-native'
import { 
    CardSection, 
    ButtonStar,
    ButtonLocal,
    Button, 
    Header,   
    Spinner,
    ModalSpinner} from '../../../../common';
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text';
import { HeaderBackButton } from 'react-navigation'
import geolib from 'geolib'
import I18n from '../../../../config/i18n'

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
};


export class ResultSearchLocation extends Component {
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
            searchText: '',
            ndHeaderStatus: false,
            loading: true,
            resultCount: 0
            
        }
      }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({
                lat: position.coords.latitude, 
                long: position.coords.longitude , 
                loading : false
            });
        },
        (error) => {alert("there was an error getting location")},
        {enableHighAccuracy: true}
        );            
     console.log('component',this.state.lat,this.state.long)
    }

    // componentDidUpdate(){
    //     this.ndHeaderStatusUpdate()
    // }

    ndHeaderStatusUpdate(){
        let resultView = false
        let resultCount = 0
             _.map((this.state.item.StaticLocation), (items) => {
                let loca = items.LocationName.toString()
                let shopDes = items.ShopDescription.toString()
                
                if((loca.includes(this.state.searchText) || shopDes.includes(this.state.searchText)) && this.state.searchText.length > 0){
                    resultView = true
                    resultCount++;
                }
            })
            console.log(resultView)
                   this.setState({
                    ndHeaderStatus : resultView,
                    resultCount : resultCount
                }) 

    }

    componentWillMount() {
        var data = {
            "RqAppID":"1234",
            "UserLanguage": I18n.t('serviceLang'),
            "ViewType":"05",
            "RowNum":"0",
            "Keyword":"",
            "ShopCategory":"",
            "UserID":"1",
            "MarketID":"3",
            "CouponType":"",
            "CouponSubType":""
        }
        const searchText = this.props.navigation.getParam('searchText', '')
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { 
                this.setState({ 
                    item: response.data,
                    searchText : searchText,
                    loading: true
                }, ()=>{
                    this.ndHeaderStatusUpdate()
                }) })
            .catch((error) => {
                console.log('axios error:', error);
        });
    }

    onButtonGoBack(){
        this.props.navigation.goBack()
    }
    
    renderItem() {
        let resultView = ''
        if(this.state.sortby === undefined){
            resultView = _.map((this.state.item.StaticLocation), (items) => {
                return this.renderCardData(items)
            })
            return resultView
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

            resultView = _.map((array), (items) => {
                //console.log(items)
                return(
                    <View>
                        {this.renderCardData(items)}
                    </View>
                )
            })

            return resultView
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
          
           resultView = _.map((sortItem), (items) => {
                //console.log(items)
                return(
                    <View>
                        {this.renderCardData(items)}
                    </View>
                )
            })

            return resultView
        }
    }
    
    _renderLocation(items){
        console.log('Location',this.state.lat,this.state.long)
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
           console.log(distance , 'Km')
           distance = distance.toFixed(2);
           return(
                <ButtonLocal style={styles.buttonLocalStyle}>  {distance} กม.</ButtonLocal>
           )
        }
    }

    renderCardData(items){
        let loca = items.LocationName.toString()
        let shopDes = items.ShopDescription.toString()
        if((loca.includes(this.state.searchText) || shopDes.includes(this.state.searchText)) && this.state.searchText.length > 0){
            return (
                <TouchableOpacity key={items.ShopID} style={{flex:1 ,  backgroundColor: '#ffffff',}} onPress={()=> this.onImgSlidePress(items.ShopID)}>
                    <CardSection style={{height:40, justifyContent:'center', alignItems: 'center'}}> 
                                <View style={{flex:1,
                                         flexDirection:'row', alignSelf:'flex-start'}}>
                                        <Image style={{width:30, height:30,marginRight:15}}
                                             source={ require('../../../../images/drawable-hdpi/ic_type_category_bank.webp')} 
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
                                        source={require('../../../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                    />
                                </View>
                    </CardSection>
                    <CardSection style={{flex:1,borderBottomWidth:1, borderColor: '#ddd'}}>   
                            <View style={styles.ViewContainer}>
                                    <View style={{flex: 1  }}>
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
                                            <View style={{flex:0.3}}></View>
                                            <View style={{ flex: 11, marginLeft: 5 , marginRight: 15}}>
                                            {this._renderLocation(items)}
                                            </View>
                                            <View  style={{ flex: 5}}/>
    
                                        </View>
                                     
                                        <View style= {{ flex: 1  }}>
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
        
    }

    renderViewMore(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>{I18n.t('txt_read_more')}</Text>
        )
    }
    renderViewLess(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>{I18n.t('txt_read_less')}</Text>
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
             { I18n.t('sort_by_distianct')}
        </Button>
        )
    }

    buttonScore(){
        return(
        <Button style = {{ backgroundColor: this.state.bt_sort ,borderRadius: 10}} onPress={() => this.changeStatusSortScore()}>
            {I18n.t('fab_label')}
        </Button>
        )
    }

    renderBottomBlock(){
        if(this.state.resultCount >= 3){
            return (<View style={{height:100, backgroundColor:'white'}}></View>)
        }
    }

    renderSecondHeader(){
        if(this.state.loading === true){
            return (
                <ModalSpinner loading={this.state.loading}  />
            )
        }
        else if(this.state.ndHeaderStatus === true){
            return (
                <View style={{flex:1}}>
                    <View style = {{ width: Dimensions.get('window').width, height: 60  , backgroundColor: '#f2f2f2' , flexDirection: 'row'}}>
                        <View style = {{ flex: 2 , justifyContent: 'center' , marginLeft: 20 }}>
                            <Text style = {{ alignItems: 'center' , justifyContent: 'center' , fontSize: 18, fontWeight:'300'}}> {I18n.t('sort_by')} </Text>
                        </View>
                        <View style = {{ flex: 3 , height: 30 , width: 80,marginTop: 15}}>
                            {this.buttonDistance()}
                        </View>
                        <View style = {{ flex: 3 ,height: 30 , width: 80,marginTop: 15 }}>
                            {this.buttonScore()}
                        </View>
                    </View>
                    <View>
                        <ScrollView>
                            {this.renderItem()}
                            {this.renderBottomBlock()}
                        </ScrollView>
                    </View>
                </View>
                
            )
        }else if(this.state.ndHeaderStatus === false){
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#f2f2f2',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Image
                  source={require('../../../../images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
                />
                <Text style={{ fontSize: 18, color: '#a6a6a6' }} > {I18n.t('home_search_no_item')} </Text>
              </View>
            )
        }
    }


    render(){
        return (
            <View style={{flex:1}}>
            <Header 
            headerText={this.state.searchText} 
            backgroundImage= {require('../../../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}
            textContainerStyle={{flex:4, alignItems:'flex-start'}}/>
                    {this.renderSecondHeader()}
                    <View style={{height: '10%', position: 'absolute', bottom:0}}></View>
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
        width: 90,
    },
})