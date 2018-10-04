import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import { Spinner, Card, CardSection } from '../common'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../common/Header'
import { ShopTap } from './shopdetailscreens/ShopTap';

var data = {
    "RqAppID": "1234",
    "UserLanguage": "EN",
    "ShopID": "",
    "UserID": "1",
    "MarketID": "3"
}

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
    isHidden: false,
    scrollY: new Animated.Value(0),
    fadeAnim: new Animated.Value(1),
    index: 0,
    content: {}
}

HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 60
BG_IMAGE_HEIGHT = Dimensions.get('window').height - 20
BG_IMAGE_WIDTH = Dimensions.get('window').width

export class ShopDetailScreen extends Component {
    state = INITAIL_STATE

    componentDidMount() {
        const shopID = this.props.navigation.getParam('key', 'none')
        data.ShopID = shopID
        this.setState({
            loading: true,
            shopID: shopID
        }, ()=>{
            this._renderingItem()
        })        
        
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 5000,
            }
        ).start();
    }

    onButtonGoBack() {
        this.props.navigation.goBack()
    }

    _renderingItem() {
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
        var locate = ''
        var count = 0
        var isSkip = false
        let { fadeAnim } = this.state;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, BG_IMAGE_HEIGHT],
            outputRange: [BG_IMAGE_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const opacityImageHeight = this.state.scrollY.interpolate({
            inputRange: [0, 20],
            outputRange: [20, 0],
            extrapolate: 'clamp'
        })

        const backHeader = this.state.scrollY.interpolate({
            inputRange: [5, 200],
            outputRange: [5, BG_IMAGE_HEIGHT],
            extrapolate: 'clamp'
        })
        if (this.state.loading === true) {
            locate = (<Spinner size={'large'} />)
        }
        else if (this.state.item !== undefined) {
            _.each(this.state, skipCheck=>{
                if(skipCheck.ShopDetail === null){
                    isSkip = true
                }
            })

            _.map((this.state.item), (items) => {
                //console.log(items.ImageUrl)
                if(!isSkip && items.ShopId !== undefined){
                    count = 1
                        locate = (
                            <ScrollView 
                                scrollEventThrottle={16}
                                showsVerticalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } }, }],
                                )}
                            >
                                <Animated.View style={{
                                    height: BG_IMAGE_HEIGHT,
                                    width: BG_IMAGE_WIDTH,
                                    //backgroundColor: "transparent"
                                }}>
                                    <ImageBackground source={{uri: items.ImageUrl}}
                                        backfaceVisibility={'hidden'}
                                        style={{ flex: 1, width: null, height: null }} >
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 5, marginLeft: 10, marginTop: 40, backgroundColor: '#000', opacity: 0.5, width: 30, height: 30, borderRadius: 25 }}>
                                            <TouchableOpacity onPress={() => this.onButtonGoBack()}>
                                                <Image source={require('../../components/images/drawable-hdpi/ic_arrow_back_black.webp')} style={{ tintColor: '#fff', width: 20, height: 20, alignItems: 'center' }} />
                                            </TouchableOpacity>
                                        </View>
                                        <Animated.View style={{
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            marginLeft: opacityImageHeight,
                                            marginRight: opacityImageHeight,
                                        }}>
                                            <View style={{ flex: 3 }} />
                                            <View style={{
                                                flex: 1,
                                                backgroundColor: '#000',
                                                alignItems: 'center',
                                                opacity: 0.5,
                                                width: '100%'
                                            }}>
                                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: "#9c9595" }}>{items.ShopName}</Text>
                                            </View>
                                        </Animated.View>
                                    </ImageBackground>
                                </Animated.View>
                               
                                <View style={{ flex: 1, height: BG_IMAGE_HEIGHT*2}}>
                                   <ShopTap screenProps={{items : items}}/>
                                </View>
                            </ScrollView>
                        )
                }
                if (count === 0) {
                    locate =
                        (<Card style={{ flex: 1 }}>
                            <CardSection>
                                <Text>NONE OF IT EXIST!!!!!!</Text>
                            </CardSection>
                        </Card>)
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
        flex: 1,
    }
})

export default ShopDetailScreen