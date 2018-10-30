import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    Button
} from 'react-native'
import axios from 'axios'
import Modal from "react-native-modal"
import { Spinner } from '../../common';
import _ from 'lodash'
import I18n from './../../config/i18n'

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
    loadingDetailService: false,
    isModalVisible: false,
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
            if(this.props.screenProps.fromOverView === true){
                this.props.navigation.navigate('ShopLoca')
            }
        })
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

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

    imgSlidePress(index){
        this._toggleModal()
    }


    renderImgSlider() { 
        if (this.state.loadingProService) {
            return <Spinner size={'large'} />
        } else {
            //console.log(this.state.imgSlide)
            var index = 0
            let imgSlide = _.map(this.state.imgSlide.ProductHighlight, proHighlight => {
                index++
                return (
                    <TouchableOpacity
                        key={proHighlight.ProductID}
                        onPress={() => this.imgSlidePress(index-1)}>
                        <View
                            style={{
                                height: Dimensions.get('window').height*0.25,
                                width: 150,
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

    onViewMorePress(){
        this.props.screenProps.navigation.navigate({
            routeName: 'moreDescription',
            params: {
                detailSec: this.state.detailSec
            }
        })
    }

    onRecommendPress(key){
        //console.log(key)
        this.props.screenProps.navigation.navigate({
            routeName: 'shopDetail',
            params: {
                key: key
            },
            key: 'shopDetail' + key
        })
    }

    renderRecommend() {
        if (this.state.loadingRecomService) {
            return <Spinner size={'large'} />
        } else {
            var index = -1
            let recomSlide = _.map(this.state.recomSlide.RecommendedShop, recom => {
                index++
                return (
                    <TouchableOpacity
                        key={recom.ShopID}
                        onPress={() => this.onRecommendPress(recom.ShopID)}>
                        <View
                            style={{
                                height: Dimensions.get('window').height*0.25,
                                width: 150,
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
                    {recomSlide}
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

    renderTextModal() {
    if (this.state.imgSlide !== undefined) {
        //console.log(this.state.imgSlide)
        var index = -1
        let imgSlide = _.map(this.state.imgSlide.ProductHighlight, proHighlight => {
            index++
            return (
                <TouchableOpacity
                    key={index+'_'+proHighlight.ProductID}
                    onPress={() => null}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            shadowColor: '#000',
                            shadowOffset: { width: 5, height: 5 },
                            shadowRadius: 5,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: Dimensions.get('window').width*0.9
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
                                borderTopRightRadius: 5,
                            }}
                            resizeMode="contain"
                            source={{ uri: proHighlight.thumbnailUrl }}
                        /><Text style={{ flex: 1, fontSize: 18, marginTop: 5, marginLeft: 10 }}>
                            {proHighlight.ProductName}
                        </Text>
                        <Text style={{ flex: 1, fontSize: 18, marginTop: 5, marginLeft: 10 }}>
                        {proHighlight.ProductDesc}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return (

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ref={scrollView  => this._scrollView = scrollView }
                style={{flex:1}}
            >
                {imgSlide}
            </ScrollView>
        )
    }
}

    renderModal() {
        return (
            <Modal isVisible={this.state.isModalVisible} style={{
                flex:1
            }}>
              <View style={{height: 100, width: 100, alignSelf: 'flex-end'}}>
                <Button
                  style={{width: 100, height: 100, right: 0, position: 'absolute', marginTop: 20 }}
                  title="X"
                  fontSize={20}
                  color='white'
                  onPress={() => this._toggleModal()} />
              </View>
              <View style={{
                flex:1,
              }}>
                {this.renderTextModal()}
              </View>
            </Modal>
        )
    }

    renderScollMain() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <View style={{ height: Dimensions.get('window').height*0.25, marginTop: 20 }}>
                    {this.renderImgSlider()}
                </View>
                <View
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height*0.2,
                        marginTop: 10,
                        borderWidth: 1,
                        borderColor: '#dddddd',
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 20,
                        backgroundColor: 'white'
                    }}>

                    {this.renderDecription()}
                    <TouchableWithoutFeedback onPress={() => this.onViewMorePress()}>
                        <View>
                            <Text style={{ color: 'purple', textAlign: 'center' }}>
                                {I18n.t('more_desc_shop')}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            <View style={{ height: 20, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>{I18n.t('simil_place')}</Text>
                </View>
                <View style={{ height: Dimensions.get('window').height*0.25, marginTop: 10 }}>
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
                {this.renderModal()}
            </View>
        )
    }
}


export { ShopDescriptionScreen }