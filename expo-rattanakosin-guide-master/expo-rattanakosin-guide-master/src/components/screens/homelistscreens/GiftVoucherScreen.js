import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar
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
import I18n from '../../config/i18n'

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

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);

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
        this.props.navigation.goBack()
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
                <Header headerText= { I18n.t('herdergift') }
                backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                    
                        <ScrollView>
                            {this.renderItem()}
                            <View style ={{ flex: 1 , backgroundColor: '#ffffff'}} >
                                <View style ={{ marginTop: 90,marginBottom: 90 , alignItems: 'center'}}>
                                    <Text style = {{ alignItems: 'center' , fontSize: 18}}>{ I18n.t('detail1') }{ I18n.t('detail2') }</Text>
                                </View>
                                <View style ={{flex: 1 , alignItems: 'center'}}>
                                    <TouchableOpacity style={{ justifyContent: 'center',height: 50,width: '95%' ,marginBottom: 20 ,backgroundColor: '#666666' , alignItems: 'center' , borderRadius: 20}}> 
                                        <Text style = {{ alignItems: 'center' , fontSize: 14 , color: '#ffffff' , justifyContent: 'center'}}> { I18n.t('detail3') } </Text> 
                                    </TouchableOpacity>
                                </View> 
                            </View>
                            <View style={{ flex:1}}>
                                <View style={{marginTop: 20,marginLeft: 5,marginBottom: 20}}>
                                    <Text style={{ fontSize: 14 }}> { I18n.t('detail4') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail5') } { I18n.t('detail6') }{ I18n.t('detail7') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail8') }{ I18n.t('detail9') }{ I18n.t('detail10') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail11') }{ I18n.t('detail12') }{ I18n.t('detail13') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail14') }{ I18n.t('detail15') }{ I18n.t('detail16') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail17') }{ I18n.t('detail18') }{ I18n.t('detail19') }</Text>
                                </View>
                                <View style={{ marginLeft: 20}}>
                                    <Text style={{ fontSize: 15 }}> {'\u2022'} { I18n.t('detail20') }{ I18n.t('detail21') } { I18n.t('detail22') }</Text>
                                    <Text style={{ fontSize: 15 }}>  </Text>
                                    <Text style={{ fontSize: 15 }}>  </Text>
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
                                key={imgSlider.Sequence+'_'+imgSlider.ImageURL}
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
                    <View key={item.Sequence+'_'+item.ImageURL} style={{ flex: 1 }} >
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor:'#52BDE8',
        height: APPBAR_HEIGHT,
  },
});
