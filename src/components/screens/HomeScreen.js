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
    TextInput
} from 'react-native'
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CardSection } from '../common/CardSection';
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import { HomeMenuScreens } from './homelistscreens'
import { createStackNavigator } from 'react-navigation'
import { Restaurants } from './itemscreens/Restaurants';

var data = {
    'RqAppID': '1234',
    'UserLanguage': 'EN',
    'MarketID': '3',
    'Version': '1.1.4'
}
var config = {
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
        //console.log(this.state.item)
        const hellow = _.map((this.state), (items) => {
            return (<ItemDetail items={items.MenuList} />)
        })

        return hellow
    }



    render() {
        //console.log(this.state)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <ImageBackground
                        style={{ height: this.startHeaderHeight, borderBottomWidth: 1, borderBottomColor: '#dddddd', width: '100%', height: 200 }}
                        source={require('../assets/Wat-Suthat.jpg')}
                    >
  
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="ค้นหา ..."
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />

                        </View>

                    </ImageBackground>
                    <CardSection style={{ bottom: 50, marginLeft: '4%', marginRight: '4%' }}>
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('restaurants')} >
                                <View style={styles.imgLeft}>
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={require('../images/drawable-hdpi/ic_main_food.webp')}
                                    />
                                    <Text style={styles.textLeft} >
                                        กิน
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.imgRight}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../images/drawable-hdpi/ic_main_travel.webp')}
                                />
                                <Text style={styles.textLeft} >
                                    เที่ยว
                                </Text>
                            </View>

                            <View style={styles.imgRight}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('../images/drawable-hdpi/ic_main_shop.webp')}
                                />
                                <Text style={styles.textLeft} >
                                    ช้อป
                                </Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')} >
                                <View style={styles.imgRight}>
                                    <Image
                                        style={{ width: '100%', height: '100%' }}
                                        source={require('../images/drawable-hdpi/ic_main_other.webp')}
                                    />
                                    <Text style={styles.textLeft} >
                                        อื่นๆ   
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </CardSection>

                    <Card style={{ flex: 1 }}>
                        <ScrollView>
                            <CardSection>
                                {this.renderItem()}
                            </CardSection>
                        </ScrollView>
                    </Card>
                </ScrollView>
            </View>
        );
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
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnaiContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        width: '100%',
        flex: 1
    }, imgLeft: {
        flexDirection: 'column',
        marginRight: 20,
        marginTop: 20,
        marginBottom: 5,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }, imgRight: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLeft: {
        marginLeft: 50,
        marginTop: 10,
        width: '100%',
        fontSize: 12
    },
    imgCenter: {
        flexDirection: 'column',
        marginLeft: 40,
        marginRight: 45,
        marginTop: 20,
        marginBottom: 5,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },


})

const {
    thumbnailStyle,
    headerContentStyle,
    thumbnaiContainerStyle,
    headerTextStyle,
    imageStyle
} = styles;


class ItemDetail extends Component {
    state = {
        item: []
    }

    renderImg(imgs) {
        //if scale blah blah
        const base_url = 'https://djstorefrontprodblob.blob.core.windows.net/upload/'
     //   console.log(imgs.Sequence);
        if(imgs.Scale === 'F' && imgs.Sequence != '1' ){
            return _.map(imgs.SliderList, imgSlider => {
                return (<Image
                    style={{ width: 250, height: 100,  marginRight: 10 }}
                    source={{ uri: base_url + imgSlider.ImageURL }}
                />)
            })
        }
        else if(imgs.Scale === 'H' && imgs.Sequence != '1'){
            return _.map(imgs.SliderList, imgSlider => {
                return (<Image
                    style={{ width: 150, height: 100, marginRight: 10 }}
                    source={{ uri: base_url + imgSlider.ImageURL }}
                />)
             })
        }
    }

    

    renderData() {
        return _.map(this.props.items, item => {
            return (
                <Card style={{ flex: 4 }}>
                    <CardSection style={{ flex: 1 }}>
                        <View style={headerContentStyle}>
                            <CardSection style={{ flexDirection: 'row', flex: 1 }}>
                                <Text style={headerTextStyle} >{item.Name}</Text>
                                <Text style={{ justifyContent: 'flex-end' }} >ดูทั้งหมด</Text>
                            </CardSection>
                        </View>
                    </CardSection>
                    <CardSection >
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {this.renderImg(item)}
                        </ScrollView>
                    </CardSection>
                </Card>
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