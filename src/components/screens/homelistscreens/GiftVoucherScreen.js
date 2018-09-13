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
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text';
import { ButtonStar,ButtonLocal } from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { Header,ButtonFollow } from '../../common';
import { Grayscale } from 'react-native-color-matrix-image-filters'

const data = {
    'RqAppID': '1234',
    'UserLanguage': 'EN',
    'MarketID': '3',
    'Version': '1.1.4'
}
const config = {
        headers: {
            'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
            'Content-Type': 'application/json'
        }
};


export class GiftVoucherScreen extends Component {
  
    state = {
        item: ''
    };

    componentWillMount() {
        this.startHeaderHeight = 80
     

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
            data, config)
            .then(response => { this.setState({ item: response.data }) })
            .catch((error) => {
                console.log('axios error:', error);
            });

    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    
    renderItem() {
        let i=0
        const list = _.map((this.state), (items) => {
            return (<ItemDetail key={i} items={items.MenuList}/>)
            i++

        })
        return list
    }

    render(){
        
        return (
            <View style={{flex:1}}>
                <Header headerText="Gift Voucher"
                backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                    
                        <ScrollView>
                            {this.renderItem()}
                            <View style ={{ flex: 1 , backgroundColor: '#ffffff'}} >
                                <View style ={{ marginTop: 90,marginBottom: 90 , alignItems: 'center'}}>
                                    <Text style = {{ alignItems: 'center' , fontSize: 18}}>Thank you participating merchants and customers for joining this promotional event. Stay tuned for</Text>
                                    <Text style = {{ alignItems: 'center' , fontSize: 18}}> more very soon! </Text>
                                </View>
                                <View style ={{flex: 1 , alignItems: 'center'}}>
                                    <TouchableOpacity style={{ justifyContent: 'center',height: 50,width: '95%' ,marginBottom: 20 ,backgroundColor: '#666666' , alignItems: 'center' , borderRadius: 20}}> 
                                        <Text style = {{ alignItems: 'center' , fontSize: 14 , color: '#ffffff' , justifyContent: 'center'}}> List participate shop </Text> 
                                    </TouchableOpacity>
                                </View> 
                            </View>
                            <View style={{ flex:1}}>
                                <View style={{marginTop: 20,marginLeft: 5,marginBottom: 20}}>
                                    <Text style={{ fontSize: 14 }}> Voucher Usage Terms</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Gift vouchers valued at 50 THB are valid for</Text>
                                    <Text style={{ fontSize: 15 }}>   participating shops within the Rattanakosin Guide</Text>
                                    <Text style={{ fontSize: 15 }}>   mobile app</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Discounts can be redeemed on the Rattanakosin</Text>
                                    <Text style={{ fontSize: 15 }}>   Guide mobile app when you are within close</Text>
                                    <Text style={{ fontSize: 15 }}>   Proximity of Koh Rattanakosin</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Each user to limited to one redemption per one</Text>
                                    <Text style={{ fontSize: 15 }}>   campaign. Up to 1,000 vouchers are available for</Text>
                                    <Text style={{ fontSize: 15 }}>   redemption every campaign</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Vouchers must be used between July 30,2018 to</Text>
                                    <Text style={{ fontSize: 15 }}>   August 5,2018 or as indicated on the terms and </Text>
                                    <Text style={{ fontSize: 15 }}>   conditions</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Each voucher is valid for one day starting from the</Text>
                                    <Text style={{ fontSize: 15 }}>   time of redemption, users must use the voucher</Text>
                                    <Text style={{ fontSize: 15 }}>   within the period</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} Siam Commercial Bank reserves the right to make</Text>
                                    <Text style={{ fontSize: 15 }}>   changes to the vouchers terms,conditions,usage</Text>
                                    <Text style={{ fontSize: 15 }}>   period without further notice</Text>
                                </View>
                            </View>
                        </ScrollView>
                    
            </View>
        )
    }
}

class ItemDetail extends Component {
    state = {
        item: []
    }

    renderImg(imgs){
        const base_url = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'

            return _.map(imgs.SliderList, imgSlider => {
               // console.log(imgSlider.Sequence)
                if(imgSlider.Sequence === '2'){
                    // console.log(imgSlider.ImageURL)
                    return(     
                           
                                <Image 
                                style={{height:150,width: Dimensions.get('window').width}}
                                source={{ uri: base_url + imgSlider.ImageURL }}
                                />         
                             
                    )
                }
            })
            
    }

    renderData() {
        return _.map(this.props.items, item => {
            //console.log(item.Sequence)
            if(item.Sequence === '1'){
                return (
                    <View style={{ flex: 1 }} >
                         {this.renderImg(item)}
                    </View>
                )
            }
        })
    }
 
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderData()}
            </View>
        )
    }
}