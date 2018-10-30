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
import { Card  } from '../../common/Card'
import { CardSection } from '../../common/CardSection'
import ViewMoreText from 'react-native-view-more-text'
import { ButtonStar,ButtonLocal } from '../../common'


var data = {
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

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    } 
};
const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200

class TripInteresting extends Component {

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

    onButtonGoBack() {
        this.props.navigation.navigate('ทริป')
    }
    renderItem() {
        //console.log(this.state.item)
        let loKey = 0

        const { navigation } = this.props
        const itemList = navigation.getParam('item')
        const  CardItem = _.map((this.state), (items) => {
            loKey++
            return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} itemList={itemList}/>)
        })

        return CardItem
    }

    _renderImgCover() {
        const { navigation } = this.props
        const items = navigation.getParam('item')
        // console.log(items.TripShop)
        return (
            <ScrollView>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <Image
                    style={{ width: ImgWidth, height: ImgHeight }}
                    source={{ uri: items.TripImageUrl }}
                />
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ marginLeft: 10, marginBottom: 10 }}>
                        <Text style={{ fontSize: 26 }}> {items.TripName} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 12 }}>  {items.TripDescription} </Text>
                    </View>
                </View>
                
                </View>
                
                <View style={styles.imgLeft}>
                    <View style={{flexDirection: 'row', marginLeft: 10}}>
                        
                            {this._renderIcon(items.TripShopCategory)}
                    
                    </View>
                </View>
            </View>
            
            </ScrollView>
        )
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

    _renderIcon(items) {
        console.log(items)
        return _.map((items), (shopID) => {
            if (shopID.TripShopCategoryID === '274') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.TripShopCategoryID === '275') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '273') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '276') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '281') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '277') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '280') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '278') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '460') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }
    render(){
        return (
            <ScrollView>
            <View style={{ flex: 1 }}>
                {this._renderImgCover()}
                
                <View> 
                    {this.renderItem()}
                    <View style={{ height: 100}} />
                </View>
            </View>
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
        console.log(item)
        return _.map((item), (shopID) => {
            if (shopID.TripShopCategoryID === '274') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                    />
                )
            } else if (shopID.TripShopCategoryID === '275') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_category_place_travel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '273') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '276') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '281') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '277') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '280') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '278') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                    />
                )
            }
            else if (shopID.TripShopCategoryID === '460') {
                return (
                    <Image
                        style={{ width: 35, height: 35 }}
                        source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                    />
                )
            }
        })
    }
    
    renderData(){
        //console.log(this.props.itemList.TripShop)
        let renderingItem = _.map(this.props.itemList.TripShop, itemsShop => {
            // console.log(itemsShop.ShopID)
                return itemsShop.ShopID
           
        })
        
        return _.map(this.props.items, item => {
            for (let i=0; i<renderingItem.length; i++){
                if(renderingItem[i] === item.ShopID){
                    // console.log(renderingItem[i])
                   //console.log(item.TripShopCategory) 
                    return (
                        <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                        
                        
                            <CardSection style={{flex:2}}>   
                                    <View style={styles.ViewContainer}>
                                            <View style={{flex: 1  }}>
                                            <Image style={{width:120, height:150}}
                                                source={{ uri: item.ImageUrl}} 
                                            /> 
                                            </View>
                                            
                                            <View style={{ flex: 2 ,flexDirection: 'column'}}>
                                                <View style= {{ flexDirection: 'row' }}>
                                                    <Text style={styles.ViewTextStyle}> {item.LocationName} </Text>
                                                </View>

                                                <View style= {{ flexDirection: 'row' , height: 40}}>
                                                {/* <Image
                                                    style={{ width: 25, height: 25 }}
                                                    source={require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                                                /> */}
                                                
                                                {this.renderIcon(item)}
                                                </View>
                                                
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
            }
            //if(renderingItem === item.ShopID){
             
            // }
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

export {TripInteresting}