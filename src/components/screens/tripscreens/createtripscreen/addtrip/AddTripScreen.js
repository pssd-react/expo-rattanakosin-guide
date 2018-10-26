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
import { ButtonTrip } from '../../../../common/ButtonTrip'
import { CardSection, Header, Card } from '../../../../common'
import { ButtonStar,ButtonLocal } from '../../../../common'
import { HeaderBackButton } from 'react-navigation'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text'
import { createStackNavigator } from 'react-navigation'


const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200

var data = {
	'RqAppID':'1234',
	'UserLanguage':'EN',
	'ViewType':'05',
	'RowNum':'0',
	'Keyword':'',
	'ShopCategory':'264,268,265,267,266,459,269,272,271',
	'UserID':'1',
	'MarketID':'3',
	'CouponType':'',
	'CouponSubType':''
}

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}


class AddTripScreen extends Component {
    static navigationOptions = { header: null }
    state = {
        item: ''
    };

    componentWillMount() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { this.setState({ item: response.data}) })
            .catch((error) => {
                console.log('axios error:', error);
        });
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    renderItem() {
    //    console.log(this.state.item)
        let loKey = 0
        const  CardItem = _.map((this.state), (items) => {
            loKey++
            return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} />)
        })

        return CardItem
    }

    render(){
        
        return (
            <View style={{flex:1}}>
            <Header headerText='เพิ่มทริป' 
            backgroundImage= {require('../../../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                    <Card>
                        <ScrollView>
                            {this.renderItem()}
                            <View style={{ height: 100}} />
                        </ScrollView>
                    </Card>
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
        width: 60,
    },
})

class ItemDetail extends Component {

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

    onAddTrip(ShopID) {
        
        console.log(ShopID)
        const data = {
                'RqAppID':'1234',
                'UserLanguage':'EN',
                'UserID':'1',
                'TripID':'',
                'TripShop':'',
                'ShopID': ShopID,
                'SessionToken':'',
                'MarketID':'3'
        }
        const config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type': 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/AddTripShopService',
            data, config)
            .then(response => { 
                this.setState({ item: response.data}) 
                if(response.data.ResponseDetail === 'Success'){
                    console.log('Successsssssss');
                }
            })
                
            .catch((error) => {
                console.log('axios error:', error);
            });
            // this.props.navigation.state.params.returnData()
            // this.props.navigation.goBack()

    }

    //   275 ร้านอาหาร   source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')} 
    //   274 สถานที่ท่องเที่ยว   source={ require('../../images/drawable-hdpi/ic_category_place_travel.webp')} 
    //   273 ร้านค้า  source={ require('../../images/drawable-hdpi/ic_category_shop.webp')} 
    //   276 ที่พัก  source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')} 
    //   281 ย่านการค้า  source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')} 
    //   277 ธนาคาร     source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')} 
    //   280 สถานศึกษา   source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')} 
    //   278 บริการต่างๆ     source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')} 
    //   460 สิ่งอำนวยความสะดวก   source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')} 

    renderIcon(item) {
        //console.log(item)
        return _.map((item), (shopID) => {
            if (shopID.ShopCategoryID === '274') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.ShopCategoryID === '275') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '273') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '276') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '281') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '277') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '280') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '278') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.ShopCategoryID === '460') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }

    checkIMG(item){
        //console.log(item)
        if(item.ImageUrl === ""){
            return(
                <Image 
                    style={{width:100, height:130}}
                    source={require('../../../../images/drawable-hdpi/placeholder_merchant_item.webp')}
                />
            )
            
        }
        return(
        <Image style={{width:100, height:130}}
            source={{ uri: item.ImageUrl}} 
        />
        )
    }

    renderData() {
        return _.map(this.props.items, item => {
           //console.log( item )
           
            return (
                <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                <CardSection style={{height:40}}> 
                            <View style={{flex:4,
                                    justifyContent:'flex-start', flexDirection:'row', alignSelf:'center'}}>
                            {/* <Image style={{width:30, height:30,marginRight:15}}
                                source={ require('../../../../images/drawable-hdpi/ic_type_category_food.webp')} 
                            />  */}
                            {this.renderIcon(item.ShopCategory)}
                                <Text style={styles.ViewTextStyle}> {item.LocationName} </Text>
                            </View>
                            
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={() => this.onAddTrip(item.ShopID)}>
                                    <Image
                                        style={{width:25, height:25 }}
                                        source={require('../../../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                    />
                                    </TouchableOpacity>
                                </View>
                            
                </CardSection>
                    <CardSection style={{flex:1,borderBottomWidth:1, borderColor: '#ddd'}}>   
                            <View style={styles.ViewContainer}>
                                    <View style={{flex: 1  }}>
                                     
                                    {this.checkIMG(item)}
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
        })
    }
    

    render() {
        return (
            <View style = {{flex:1, backgroundColor: '#FFFFFF'}}>
                {this.renderData()}
            </View>
        )
    }           
}

export {AddTripScreen}