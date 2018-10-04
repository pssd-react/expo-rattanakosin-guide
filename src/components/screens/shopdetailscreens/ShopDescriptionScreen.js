import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableWithoutFeedback
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
                                height: 300,
                                width: 200,
                                marginLeft: 20,
                                borderWidth: 0.5,
                                borderColor: '#dddddd',
                                backgroundColor: 'white',
                                borderRadius: 5
                            }}
                        >
                            <Image
                                style={{
                                    flex: 2,
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
                            /><Text style={{ flex: 1, fontSize: 18, marginTop: 10, marginLeft: 10 }}
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
            return <Text>zzz</Text>
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

            return (<Text numberOfLines={5}
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
        if(shopPhone !== ''){
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
        }else{
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

    renderPage() {
        return (
            <ScrollView
            nestedScrollEnabled={true}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{ 
                flex: 1 , 
                maxHeight:Dimensions.get('window').height}}
            >
            <View style={{ height: 300, marginTop: 20 }}>
                {this.renderImgSlider()}
            </View>
            <View
                style={{
                    width: Dimensions.get('window').width,
                    height: 150,
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: '#dddddd',
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: 'white'
                }}>

                {this.renderDecription()}
                <TouchableWithoutFeedback onPress={() => null}>
                    <View>
                        <Text style={{ color: 'purple', textAlign: 'center' }}>
                            Read more
                   </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{
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
            </View>
            <View style={{
                width: Dimensions.get('window').width,
                height: 300,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white'
            }}>
            {this.renderRecommend()}
            </View>
            <View style={{
                width: Dimensions.get('window').width,
                height: 300,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white'
            }}>
            <Text>sadasdkwqjfkgjalkgskadf</Text>
            </View>
            </ScrollView>
       )
    }

    render() {
        //console.log(this.props.screenProps.items)
        return this.renderPage()
    }
}

export { ShopDescriptionScreen }