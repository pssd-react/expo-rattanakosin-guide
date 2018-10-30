import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Animated,
    Image,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import { Spinner, Card, CardSection, ModalSpinner } from '../common'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../common/Header'
import { ShopTap } from './shopdetailscreens/ShopTap';
import I18n from './../config/i18n'

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
};

const INITAIL_STATE = {
    item: undefined,
    shopID: '',
    loading: false,
    scrollY: new Animated.Value(0),
    bottomSize: 250,
    index: 0,
    fontSize: 60,
    opacityBox: 20,
    marginTopBox: 230,
    statusButton: false,
    tatusIcon: false,
    fromOverView: false
}

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');
// from native-base
const isIphoneX = ios && (height === 812 || width === 812);
const iphoneXTopInset = 24;
const initToolbarHeight = ios ? 46 : 60;

const paddingTop = ios ? 18 : 0;
const topInset = isIphoneX ? iphoneXTopInset : 0;

export class ShopDetailScreen extends Component {
    state = INITAIL_STATE

    componentDidMount() {
        const shopID = this.props.navigation.getParam('key', 'none')
        const fromOverView = this.props.navigation.getParam('fromOverView', false)
        //console.log(this.props.screenProps.userId)
        this.setState({
            loading: true,
            fromOverView: fromOverView,
            shopID: shopID
        }, () => {
            this._renderingItem()
        })
    }

    onButtonGoBack() {
        // const toggleHeaderPromotionStatus = this.props.navigation.getParam('toggleHeaderPromotionStatus', 'none')
        // if (toggleHeaderPromotionStatus !== 'none') {
        //     toggleHeaderPromotionStatus()
        // }
        this.props.navigation.goBack()
    }

    _getBackButton() {
        if (this.state.statusButton === true) {
            return (
                <View style={{ flex: 1, flexDirection: "column", justifyContent: 'flex-end' }}>
                    <HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()}
                        style={{ position: 'absolute' }} />
                </View>
            )
        }
    }

    _getTitleHeader(title) {
        const { titleStyle } = this.props;
        if (this.state.statusButton === true) {
            return (
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.Text style={[titleStyle, {
                        position: 'absolute',
                        //left: this.state.leftSize,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        bottom: this.state.bottomSize,
                        fontSize: this.state.fontSize,
                        color: "#fff"
                    }]}
                        numberOfLines={1}
                        ellipsizeModel="tail"
                    >
                        {title}
                    </Animated.Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 3 }}>
                <Animated.Text style={[titleStyle, {
                    position: 'absolute',
                    marginLeft: 20,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    //bottom: this.state.bottomSize,
                    fontSize: this.state.fontSize,
                    color: "#fff"
                }]}
                >
                    {title}
                </Animated.Text>
            </View>
        )
    }

    randomUpdate(){
        this.setState({
            loading: true
        },()=>{
            setTimeout(()=>{
                this.setState({
                    loading:false
                })
            },500)
        })
    }

    _getIconButton() {
        if (this.state.statusIcon === false) {
            return (
                <View style={{ flex: 1, marginTop: 20, justifyContent: "center", flexDirection: "row", }}></View>
            )
        } else {
            if (this.state.statusButton === true) {
                return (
                    <View style={{ flex: 1, marginRight: 15, marginTop: Dimensions.get('window').height*0.32, justifyContent: "center", flexDirection: "row", }}>
                        <TouchableOpacity>
                            <Image style={{ width: 25, height: 30 }} source={require('../../components/images/drawable-xhdpi/ic_fav_trip_unselected.webp')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10, }}>
                            <Image style={{ width: 21, height: 30 }} source={require('../../components/images/drawable-xhdpi/ic_share_merchant.webp')} />
                        </TouchableOpacity>
                    </View>
                )
            }
            return (
                <View style={{ flex: 1, marginTop: 20, justifyContent: "center", flexDirection: "row",}}>
                    <TouchableOpacity>
                        <Image style={{ width: 25, height: 30 }} source={require('../../components/images/drawable-xhdpi/ic_fav_trip_unselected.webp')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10, }}>
                        <Image style={{ width: 21, height: 30 }} source={require('../../components/images/drawable-xhdpi/ic_share_merchant.webp')} />
                    </TouchableOpacity>
                </View>
            )
        }

    }

    _renderingItem() {
        var data = {
            "RqAppID": "1234",
            "UserLanguage": I18n.t('serviceLang'),
            "ShopID": "",
            "UserID": "1",
            "MarketID": "3"
        }
        data.ShopID = this.state.shopID

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
            data, config)
            .then(response => {
                this.setState({
                    item: response.data,
                    loading: false
                })
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
    }

    _renderingPage() {
        let count = 0
        let isSkip = false
        if (this.state.loading === true) {
            locate = (<ModalSpinner loading={this.state.loading}  />)
        }
        else if (this.state.item !== undefined) {
            _.each(this.state, skipCheck => {
                if (skipCheck.ShopDetail === null) {
                    isSkip = true
                }
            })

            _.map((this.state.item), (items) => {
                //console.log(items.ImageUrl)
                if (!isSkip && items.ShopId !== undefined) {
                    count = 1
                    locate = (
                        <View style={{ flex: 1, }}>
                            <Animated.View style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                alignItems: 'center',
                            }}>
                            </Animated.View>

                            <ScrollView style={{ flex: 1, }}
                                scrollEventThrottle={16}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                                    {
                                        //useNativeDriver: true,
                                        listener: event => {
                                            const offsetY = event.nativeEvent.contentOffset.y
                                            //console.log(offsetY)
                                            if (offsetY <= 300) {
                                                this.setState({ fontSize: 60, bottomSize: 250, statusButton: false, opacityBox: 20, marginTopBox: 230, statusIcon: false });
                                            } else if (offsetY >= 550) {
                                                //console.log("Yes")
                                                this.setState({ fontSize: 20, bottomSize: 15, statusButton: true, opacityBox: 0, marginTopBox: 350, statusIcon: true });

                                            } else {
                                                this.setState({ fontSize: 50, bottomSize: 150, statusButton: false, opacityBox: 0, marginTopBox: 350, statusIcon: true });
                                            }
                                        },
                                    },
                                )}
                            >
                                <Animated.View style={{
                                    height: height,
                                    width: width,
                                }}>
                                    <ImageBackground source={{ uri: items.ImageUrl }}
                                        style={{ flex: 1, width: null, height: null }} >
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 5, marginLeft: 10, marginTop: 40, backgroundColor: '#000', opacity: 0.5, width: 30, height: 30, borderRadius: 25 }}>
                                            <TouchableOpacity onPress={() => this.onButtonGoBack()}>
                                                <Image source={require('../../components/images/drawable-hdpi/ic_arrow_back_black.webp')} style={{ tintColor: '#fff', width: 20, height: 20, alignItems: 'center' }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Animated.View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginLeft: this.state.opacityBox,
                                            marginRight: this.state.opacityBox,
                                            marginTop: this.state.marginTopBox
                                        }}>
                                            <Animated.View style={{
                                                flex: 1,
                                                backgroundColor: '#000',
                                                opacity: 0.5,
                                                width: '100%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>

                                                {this._getBackButton()}
                                                {this._getTitleHeader(items.ShopName)}
                                                {this._getIconButton()}

                                            </Animated.View>
                                        </Animated.View>

                                    </ImageBackground>
                                </Animated.View>

                                <Animated.View style={{ flex: 1, height: height*0.9 }}>
                                    <ShopTap screenProps={{ 
                                        items: items, 
                                        navigation: this.props.navigation, 
                                        forceUpdate: this.randomUpdate.bind(this),
                                        fromOverView: this.state.fromOverView,
                                        userId : this.props.screenProps.userId,
                                        userDisplay : this.props.screenProps.userDisplay,
                                        token : this.props.screenProps.token
                                        }} />
                                </Animated.View>

                            </ScrollView>
                        </View>
                    )
                }
                if (count === 0) {
                    locate =
                        (<View style={{ flex: 1 }}>
                            <Header headerText={I18n.t('no_place')}
                                backgroundImage={require('../../components/images/drawable-hdpi/bg_more.webp')}
                                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                        <View style={{ flex: 1, justifyContent:'center', flexDirection:'row' }}>
                            <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
                                <Image
                                    source={require('../../components/images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
                                />
                                <Text style={{fontSize: 18, marginTop: 20,color: '#a6a6a6',textAlign: 'center'}}>
                                {I18n.t('no_shop_detail')}
                            </Text>
                            </View>
                        </View>
                        </View>)
                }
            })
            return locate
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    //  height: headerHeight,
                    alignItems: 'center'
                }}>
                </Animated.View>
                {this._renderingPage()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff'
    }
})

Header.defaultProps = {
    opacityStyle: { margin: 20, opacity: 0.5, },
    titleStyle: { fontSize: 50, fontWeigth: 'bold', color: "#fff", },
    backTextStyle: { fontSize: 20, color: "#fff" },
}

export default ShopDetailScreen