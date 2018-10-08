import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native'
import axios from 'axios'
import { Spinner } from '../../common';
import _ from 'lodash'

var data = {
    "RqAppID": "1234",
    "UserLanguage": "EN"
}

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
};

const INITAIL_STATE = {
    detailSec: '',
    imgSlide: [],
    recomSlide: [],
    loadingProService: false,
    loadingRecomService: false,
    loadingDetailService: false
}

class ShopDescriptionScreen extends Component {
    state = INITAIL_STATE

    componentDidMount() {
        this.setState({
            loadingProService: true,
            loadingRecomService: true,
            loadingDetailService: true
        }, () => {
            this._postInquiryProductService()
            this._postInquiryRecommendedShopService()
            this._postInquiryShopDetailService()
        })
    }

    _postInquiryShopDetailService() {
        const proData = {
            "RqAppID": data.RqAppID,
            "UserLanguage": data.UserLanguage,
            "ShopID": this.props.screenProps.items.ShopId,
            "UserID": "1",
            "MarketID": "3"
        }

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
            proData, config)
            .then(response => {
                this.setState({
                    detailSec: response.data,
                    loadingDetailService: false
                })
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
    }

    _postInquiryProductService() {
        const proData = {
            "RqAppID": data.RqAppID,
            "UserLanguage": data.UserLanguage,
            "ShopID": this.props.screenProps.items.ShopId
        }

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryProductService',
            proData, config)
            .then(response => {
                this.setState({
                    imgSlide: response.data,
                    loadingProService: false
                })
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
    }

    _postInquiryRecommendedShopService() {
        const proData = {
            "RqAppID": data.RqAppID,
            "UserLanguage": data.UserLanguage,
            "ShopID": this.props.screenProps.items.ShopId
        }

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryRecommendedShopService',
            proData, config)
            .then(response => {
                this.setState({
                    recomSlide: response.data,
                    loadingRecomService: false
                })
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
    }

    renderImgSlider() {
        if (this.state.loadingProService) {
            return <Spinner size={'large'} />
        } else {
            //console.log(this.state.imgSlide)
            let imgSlide = _.map(this.state.imgSlide.ProductHighlight, proHighlight => {
                return (
                    <TouchableOpacity
                        key={proHighlight.ProductID}
                        onPress={() => null}>
                        <View
                            style={{
                                height: 150,
                                width: 100,
                                marginLeft: 20,
                                borderWidth: 0.5,
                                borderColor: '#dddddd',
                                backgroundColor: 'white',
                                borderRadius: 5
                            }}
                        >
                            <Image
                                style={{
                                    flex: 3,
                                    width: null,
                                    height: null,
                                    resizeMode: 'cover',
                                    shadowOffset: { width: 20, height: 20, },
                                    shadowColor: 'black',
                                    shadowOpacity: 1.0,
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5
                                }}
                                source={{ uri: proHighlight.thumbnailUrl }}
                            /><Text style={{ flex: 1, fontSize: 18, marginTop: 5, marginLeft: 10 }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {proHighlight.ProductName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            return (

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {imgSlide}
                </ScrollView>
            )
        }
    }

    renderRecommend() {
        if (this.state.loadingRecomService) {
            return <Spinner size={'large'} />
        } else {
            let imgSlide = _.map(this.state.recomSlide.RecommendedShop, recom => {
                return (
                    <TouchableOpacity
                        key={recom.ShopID}
                        onPress={() => null}>
                        <View
                            style={{
                                height: 120,
                                width: 100,
                                marginLeft: 20,
                                borderWidth: 0.5,
                                borderColor: '#dddddd',
                                backgroundColor: 'white',
                                borderRadius: 5
                            }}
                        >
                            <Image
                                style={{
                                    flex: 3,
                                    width: null,
                                    height: null,
                                    resizeMode: 'cover',
                                    shadowOffset: { width: 20, height: 20, },
                                    shadowColor: 'black',
                                    shadowOpacity: 1.0,
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5
                                }}
                                source={recom.ImageUrl !== '' ? { uri: recom.ImageUrl } : require('../../images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
                            /><Text style={{ flex: 1, fontSize: 14, marginTop: 5, marginLeft: 10 }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {recom.ShopName}
                            </Text>
                        </View>
                    </TouchableOpacity>

                )
            })
            return (

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {imgSlide}
                </ScrollView>
            )
        }
    }

    renderDecription() {
        let shopDescription = ''
        if (this.state.loadingDetailService) {
            return <Spinner size={'large'} />
        } else {

            _.map(this.state.detailSec, detailShop => {
                if (detailShop.ShopDescription !== undefined) {
                    shopDescription = detailShop.ShopDescription
                }
            })

            return (<Text numberOfLines={3}
                ellipsizeMode="tail"
                style={{ color: 'black', fontSize: 16 }}>
                {shopDescription}
            </Text>)
        }
    }

    renderContact() {
        let shopPhone = ''
        _.map(this.state.detailSec, items => {
            // console.log(items.ShopDescription);
            if (items.ShopPhone !== undefined) {
                shopPhone = items.ShopPhone
            }
        })
        if (shopPhone !== '') {
            return (

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../../components/images/drawable-hdpi/ic_phone.webp')}
                    />
                    <TouchableOpacity onPress={() => null}>
                        <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 5, color: 'black', textDecorationLine: 'underline' }}>
                            {shopPhone}
                        </Text>
                    </TouchableOpacity>
                </View>

            )
        } else {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('../../../components/images/drawable-hdpi/ic_phone.webp')}
                    />
                    <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 5, color: 'black', textDecorationLine: 'underline' }}>
                        -
                        </Text>
                </View>
            )
        }

    }

    renderScollMain() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <View style={{ height: 150, marginTop: 20 }}>
                    {this.renderImgSlider()}
                </View>
                <View
                    style={{
                        width: Dimensions.get('window').width,
                        height: 120,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 20,
                        backgroundColor: 'white'
                    }}>

                    {this.renderDecription()}
                    <TouchableWithoutFeedback onPress={() => null}>
                        <View>
                            <Text style={{ color: 'purple', textAlign: 'center' }}>
                                More detail...
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/* <View style={{
                width: Dimensions.get('window').width,
                height: 50,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white'
            }}>
                {this.renderContact()}
            </View> */}
            <View style={{ height: 20, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Similar Places</Text>
                </View>
                <View style={{ height: 150, marginTop: 10 }}>
                    {this.renderRecommend()}
                </View>
            </View>
        )
    }

    render() {
        //console.log(this.props.screenProps.items)
        return (
            <View style={{ flex: 1 }}>
                {this.renderScollMain()}
            </View>
        )
    }
}

export { ShopDescriptionScreen }