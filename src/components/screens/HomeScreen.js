import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    Platform,
    StatusBar,
    TextInput,
    Dimensions
} from 'react-native'
import Carousel from 'react-native-carousel-view'
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CardSection } from '../common/CardSection';
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import { HomeMenuScreens } from './homelistscreens'
import { createStackNavigator } from 'react-navigation'
import { Restaurants } from './itemscreens/Restaurants';

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

class HomeScreen extends Component {
    static navigationOptions = { header: null }
    state = {
        item: ''
    };

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }

        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
            data, config)
            .then(response => { this.setState({ item: response.data }) })
            .catch((error) => {
                console.log('axios error:', error);
            });

    }

    renderItem() {
        let i=0
        const list = _.map((this.state), (items) => {
            return (<ItemDetail key={i} items={items.MenuList} />)
            i++

        })
        return list
    }

    renderHeader(){
        return (
            <ImageBackground
            style={{ height: this.startHeaderHeight, borderBottomWidth: 1, borderBottomColor: '#dddddd', width: '100%' }}
            source={require('../../components/images/drawable-hdpi/bg_platinum_main.webp')}
            >
                <View style={{
                    width: '70%',
                    borderRadius: 8,
                    flexDirection: 'row', padding: 5,
                    backgroundColor: 'white', marginHorizontal: 20,
                    shadowOffset: { width: 0, height: 0 },
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    elevation: 1,
                    marginTop: Platform.OS == 'android' ? 30 : null}}>
                    <Icon name="search" size={20} style={{ marginRight: 10 }} />
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder="ค้นหา ..."
                        placeholderTextColor="grey"
                        style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}/>
                </View>
            </ImageBackground>
        )
    }

    renderTopMenu(){
        return (
            <CardSection style={{flex:1,bottom: 40, flexDirection: 'row', justifyContent: 'center', alignItems:'center' }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('restaurants')} >
                    <View style={styles.imgLeft}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_food.webp')}
                        />
                        <Text style={styles.textLeft} >
                            กิน
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> null}>
                    <View style={styles.imgRight}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_travel.webp')}
                        />
                        <Text style={styles.textLeft} >
                            เที่ยว
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> null}>
                    <View style={styles.imgRight}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_shop.webp')}
                        />
                        <Text style={styles.textLeft} >
                            ช้อป
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')} >
                    <View style={styles.imgEnd}>
                        <Image
                            style={{ width: 70, height: 70 }}
                            source={require('../images/drawable-hdpi/ic_main_other.webp')}
                        />
                        <Text style={styles.textLeft} >
                            อื่นๆ   
                        </Text>
                    </View>
                </TouchableOpacity>
            </CardSection>
        )}

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {this.renderHeader()}
                        {this.renderTopMenu()}
                    <View style={{flex:4, bottom:40}}>
                        {this.renderItem()}
                    </View>
                </View>
            </ScrollView>  
        )}
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
        fontWeight:'bold'
    },imgLeft: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        marginRight: '2.5%',
        marginTop: '5%',
        marginBottom: '5%',
        flex:1,
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
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }, imgEnd: {
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: '2.5%',
        marginTop: '5%',
        marginBottom: '5%',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    textLeft: {
        fontSize: 12
    },
    recomNameText: { 
        position:'absolute', 
        bottom: 0, 
        left:0, 
        fontSize: 8, 
        color: 'white', 
        fontWeight:'bold',
        textShadowColor:'black',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1
    },
    recomBlog:{ flex:1, 
        marginBottom:5, 
        marginLeft:5,
        shadowColor:'black',
        shadowOffset:{width: 2, height: 2}
    }

})

const {
    headerContentStyle,
    headerTextStyle,
    recomNameText,
    recomBlog
} = styles;

class ItemDetail extends Component {
    state = {
        item: []
    }

    renderImg(imgs) {
        const base_url = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'
        let imgRes = ''
        let i = 0
        let banner = 'banner'
        let imageF = 'imgF'
        let imageH = 'imgH'
        console.log(imgs.Sequence);
        if(imgs.Scale === 'F' && imgs.MenuType === '06' ){
            imgRes = _.map(imgs.SliderList, imgSlider => {
                return (
                    <ImageBackground
                        key={imageF+''+i}
                        style={{ 
                        width: 150, 
                        height: 100, 
                        marginRight: 10}}
                        source={{ uri: base_url + imgSlider.ImageURL }}
                    >
                        <View style={recomBlog}>
                            <Text style={recomNameText}>{imgSlider.Name}</Text>
                        </View>
                    </ImageBackground>
                )
                i++
            })

            return (
                <CardSection>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {imgRes}
                    </ScrollView>
                </CardSection>
            )
        }
        else if(imgs.Scale === 'H' && imgs.MenuType === '06'){
            imgRes =  _.map(imgs.SliderList, imgSlider => {
                return (
                    <ImageBackground
                        key={imageH+''+i}
                        style={{ 
                        width: 150,
                        height: 100, 
                        marginRight: 10}}
                        source={{ uri: base_url + imgSlider.ImageURL }}
                    >
                        <View style={recomBlog}>
                            <Text style={recomNameText}>{imgSlider.Name}</Text>
                        </View>
                    </ImageBackground>
                )
                i++
            })

            return (
                <CardSection>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {imgRes}
                    </ScrollView>
                </CardSection>
            )
        }else if(imgs.MenuType === '10'){
            imgRes = _.map(imgs.SliderList, imgSlider => {
                return (
                <View key={banner+''+i} style={{width: Dimensions.get('window').width, height: 150}}>
                    <Image
                        style={{height:150}}
                        source={{ uri: base_url + imgSlider.ImageURL }}
                    />
                </View>
                )
                i++
            })

            return (
                <Carousel
                    delay={3000}
                    indicatorAtBottom={true}
                    indicatorSize={20}
                    indicatorColor="purple"
                    width= {'100%'}
                    height={150}
                >
                {imgRes}
                </Carousel>
            )
        }

        
    }

    renderText(item){
        const base_url = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'
       if(item.MenuType === '06'){ 
           return (
            <CardSection style={{ flex: 1 }}>
                <View style={headerContentStyle}>
                    <CardSection style={{ flexDirection: 'row', flex: 1 , justifyContent: 'space-between'}}>
                        <Text style={headerTextStyle} >{item.Name}</Text>
                        <View style={{flexDirection:'row', justifyContent: 'space-around', alignItems:'center'}}>
                        <Text style={{color:'green', fontSize: 14}}>ดูทั้งหมด</Text>
                        <Image 
                        style={{height:15, width:15, tintColor: 'green'}}
                        source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                        </View>
                    </CardSection>
                </View>
            </CardSection>
        )}
    }

    renderData() {
        return _.map(this.props.items, item => {
            return (
                <View key={item.Sequence} style={{ flex: 1 }}>
                        {this.renderText(item)}
                        {this.renderImg(item)}
                </View>
            )
        })
    }

    render() {
        return (
            <View>
                {this.renderData()}
            </View>
        )
    }
}

const HomeMenu = createStackNavigator({
    Main: {
        screen: HomeScreen
    },
    Menu: {
        screen: HomeMenuScreens
    },
    restaurants: {
        screen: Restaurants
    }
})

export default HomeMenu