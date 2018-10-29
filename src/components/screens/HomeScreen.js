import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    StatusBar,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'
import {
    Restaurants,
    Bank,
    Commercial_Areas,
    Facilities,
    Shop,
    Schools_and_Government,
    Services,
    Travel,
    Accommodation
} from './itemscreens'
import {
    EatScreen,
    ShoppingScreen,
    PlacesScreen,
    StaysScreen
} from './recommendedscreens'
import Carousel from 'react-native-carousel-view'
import { CardSection } from '../common/CardSection'
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import { HomeMenuScreens } from './homelistscreens'
import { createStackNavigator } from 'react-navigation'
import { GiftVoucherScreen } from './homelistscreens/GiftVoucherScreen'
import { ShopDetailScreen } from './ShopDetailScreen'
import { ShopMoreDescriptionScreen } from './shopdetailscreens/ShopMoreDescriptionScreen';
import SearchScreen from './SearchScreen'
import { SearchResultScreen } from './SearchResultScreen';
import I18n from '../config/i18n'

// const data = {
//     'RqAppID': '1234',
//     'UserLanguage': I18n.t('userlanguage'),
//     'MarketID': '3',
//     'Version': '1.1.4'
// }
const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

class HomeScreen extends Component {
    static navigationOptions = { header: null }
    state = {
        state_item: ''
    }

    onSearchbarPress(){
        this.props.navigation.navigate('searchScreen')
    }

    componentWillMount() {
    
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
        this._renderService()
    }

    _renderService() {
        var data = {
            'RqAppID': '1234',
            'UserLanguage': I18n.t('userlanguage'),
            'MarketID': '3',
            'Version': '1.1.4'
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
            data, config)
            .then(response => { this.setState({ state_item: response.data }) })
            .catch((error) => {
                console.log('axios error:', error)
            })
    }

    _renderMenuDetail() {
        let i = 0
        const list = _.map((this.state), (_renderingItems) => {
            i++
            return (<ItemDetail
                key={i}
                _renderingItems={_renderingItems.MenuList}
                navigation={this.props.navigation} />
            )
        })
        return list
    }

    _renderHeadBanner() {
        return (

            <ImageBackground
                style={{ height: this.startHeaderHeight, borderBottomWidth: 1, borderBottomColor: '#dddddd', width: '100%' }}
                source={require('../../components/images/drawable-hdpi/bg_platinum_main.webp')}>
                <TouchableWithoutFeedback onPress={()=> this.onSearchbarPress()}>
                <View style={{
                    width: '70%',
                    borderRadius: 8,
                    flexDirection: 'row', padding: 5,
                    backgroundColor: 'white', marginHorizontal: 20,
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    elevation: 1,
                    marginTop: Platform.OS == 'android' ? 30 : null
                }}>
                    <Icon name="search" size={20} style={{ marginRight: 10 }} />
                    <Text
                        style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }} >
                        {I18n.t('searching')} ...   
                        </Text>
                </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }

    _renderFloatingMenu() {
        return (
            <CardSection style={{ flex: 1, bottom: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('resRestaurants')} >
                    <View style={styles.imgLeft}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_food.webp')}
                        />
                        <Text style={styles.textLeft} >
                             { I18n.t('eat') }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('resTravel')}>
                    <View style={styles.imgRight}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_travel.webp')}
                        />
                        <Text style={styles.textLeft} >
                            { I18n.t('travel') }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('resShop')}>
                    <View style={styles.imgRight}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_shop.webp')}
                        />
                        <Text style={styles.textLeft} >
                        { I18n.t('shop') }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('resHomedetail')} >
                    <View style={styles.imgEnd}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_other.webp')}
                        />
                        <Text style={styles.textLeft} >
                        { I18n.t('etc') }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </CardSection>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {this._renderHeadBanner()}
                    {this._renderFloatingMenu()}
                    <View style={{ flex: 4, bottom: 40 }}>
                        {this._renderMenuDetail()}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 5
    },
    headerTextStyle: {
        fontSize: 14,
        fontWeight: 'bold'
    }, imgLeft: {
        flexDirection: 'column',
        paddingTop: 5,
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
    }, imgEnd: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: '2.5%',
        marginTop: '5%',
        marginBottom: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    textLeft: {
        fontSize: 12
    },
    recomNameText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        fontSize: 8,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1
    },
    recomBlog: {
        flex: 1,
        marginBottom: 5,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 }
    }

})

const {
    headerContentStyle,
    headerTextStyle,
    recomNameText,
    recomBlog
} = styles

class ItemDetail extends Component {

    _renderImageByCondition(_renderingImgs) {
        const baseURL = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'
        let _imgResult = ''
        let _renderingBanner = '_renderingBanner'
        let _renderingImgFull = '_renderingImgFull'
        let _renderingImgHalf = '_renderingImgHalf'
        if (_renderingImgs.Scale === 'F' && _renderingImgs.MenuType === '06') {
            _imgResult = _.map(_renderingImgs.SliderList, imgSlider => {
                return (
                <TouchableWithoutFeedback key={_renderingImgFull + '&&' + imgSlider.ImageURL} onPress={() => this.onImgSlidePress(imgSlider.SlideParam)}>
                    <View  style={{ flex: 1 }}>
                            <ImageBackground
                                style={{
                                    width: 200,
                                    height: 100,
                                    marginRight: 10
                                }}
                                source={{ uri: baseURL + imgSlider.ImageURL }}
                            >
                                <View style={recomBlog}>
                                    <Text style={recomNameText}>{imgSlider.Name}</Text>
                                </View>
                            </ImageBackground>
                    </View>
                    </TouchableWithoutFeedback>
                )
            })

            return (
                <CardSection>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {_imgResult}
                    </ScrollView>
                </CardSection>
            )
        }
        else if (_renderingImgs.Scale === 'H' && _renderingImgs.MenuType === '06') {
            _imgResult = _.map(_renderingImgs.SliderList, imgSlider => {
                return (
                        <TouchableWithoutFeedback key={_renderingImgHalf + '&&' + imgSlider.ImageURL} onPress={() => this.onImgSlidePress(imgSlider.SlideParam)}>
                            <View style={{ flex: 1 }}><ImageBackground
                                style={{
                                    width: 150,
                                    height: 100,
                                    marginRight: 10
                                }}
                                source={{ uri: baseURL + imgSlider.ImageURL }}
                            >
                                <View style={recomBlog}>
                                    <Text style={recomNameText}>{imgSlider.Name}</Text>
                                </View>
                            </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                )
            })

            return (
                <CardSection>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {_imgResult}
                    </ScrollView>
                </CardSection>
            )
        } else if (_renderingImgs.MenuType === '10') {
            _imgResult = _.map(_renderingImgs.SliderList, imgSlider => {
                return (
                    <View key={_renderingBanner + '&&' + imgSlider.ImageURL} style={{ width: Dimensions.get('window').width, height: 150 }} >
                        <TouchableWithoutFeedback onPress={() => this.onBannerPress(imgSlider.Sequence)}>
                            <Image
                                style={{ height: 150 }}
                                source={{ uri: baseURL + imgSlider.ImageURL }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                )
            })

            return (
                <Carousel
                    delay={3000}
                    indicatorAtBottom={true}
                    indicatorSize={20}
                    indicatorColor="purple"
                    width={'100%'}
                    height={150}>
                    {_imgResult}
                </Carousel>
            )
        }


    }

    onBannerPress(key) {
        if (key === '1') {
            //do something here
        }
        else if (key === '2') {
            this.props.navigation.navigate('resGiftVoucherScreen')
        }
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

    onRecommendedPress(key) {
        if (key === '2') {
            this.props.navigation.navigate('resEatScreen')
        }
        else if (key === '3') {
            this.props.navigation.navigate('resShoppingScreen')
        }
        else if (key === '4') {
            this.props.navigation.navigate('resPlacesScreen')
        }
        else if (key === '5') {
            this.props.navigation.navigate('resStaysScreen')
        }
    }

    _renderSliderComposition(_renderingItem) {
        if (_renderingItem.MenuType === '06') {
            return (
                <CardSection style={{ flex: 1 }}>
                    <View style={headerContentStyle}>
                        <CardSection style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <Text style={headerTextStyle} >{_renderingItem.Name}</Text>
                            <TouchableWithoutFeedback onPress={() => this.onRecommendedPress(_renderingItem.Sequence)}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ color: 'green', fontSize: 14 }}>{ I18n.t('seeall') }</Text>
                                <Image
                                    style={{ height: 15, width: 15, tintColor: 'green' }}
                                    source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                            </View>
                            </TouchableWithoutFeedback>
                        </CardSection>
                    </View>
                </CardSection>
            )
        }
    }

    _renderBottomComposition() {
        return _.map(this.props._renderingItems, _renderingItem => {
            return (
                <View
                    key={_renderingItem.Sequence}
                    style={{ flex: 1 }}
                    navigation={this.props.navigation}>
                    {this._renderSliderComposition(_renderingItem)}
                    {this._renderImageByCondition(_renderingItem)}
                </View>
            )
        })
    }

    render() {
        return (
            <View>
                {this._renderBottomComposition()}
            </View>
        )
    }
}

const HomeMenu = createStackNavigator({
    Main: {
        screen: HomeScreen
    },
    Menu: {
        screen: HomeMenuScreens, navigationOptions: { header: null }
    },
    recomEat: {
        screen: EatScreen, navigationOptions: { header: null }
    },
    recomShop: {
        screen: ShoppingScreen, navigationOptions: { header: null }
    },
    recomPlaces: {
        screen: PlacesScreen, navigationOptions: { header: null }
    },
    recomStays: {
        screen: StaysScreen, navigationOptions: { header: null }
    },
    giftVou: {
        screen: GiftVoucherScreen, navigationOptions: { header: null }
    },
    searchScreen: {
        screen: SearchScreen , navigationOptions: {header : null}
    },
    searchResultScreen: {
        screen: SearchResultScreen, navigationOptions: {header: null}
    }
})

export default HomeMenu