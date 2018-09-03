import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import { Button  } from '../common/Button';
import { Card  } from '../common/Card';
import { CardSection } from '../common/CardSection';
import { Icon} from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import { HomeMenuScreens } from './homelistscreens'
import { createStackNavigator } from 'react-navigation'

var  data = {
        'RqAppID':'1234',
        'UserLanguage':'EN',
        'MarketID':'3',
        'Version':'1.1.4'
    }
var config = {
    headers: {  
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
            }
};



class HomeScreen extends Component{
    state = { 
        item: ''
    };

    componentWillMount(){
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
        data , config )
        .then(response => {this.setState({ item : response.data } ) })
        .catch((error) => {
            console.log('axios error:',error);
        });
       
    }
    
    renderItem(){
       //console.log(this.state.item)
            const hellow =  _.map((this.state), (items) => {
                return (<ItemDetail items={ items.MenuList } />)
            })
        
        return  hellow 
    }



  render(){
        //console.log(this.state)
        return (
            <Card style={{flex:1}}>
                <CardSection>
                    <View style={{ flexDirection: 'row' ,  marginLeft: 60  }} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ flexDirection: 'colu mn', marginLeft: 10 }}
                                source={ require('../images/drawable-hdpi/ic_type_category_food.webp')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ flexDirection: 'column', marginLeft: 10 }}
                                source={ require('../images/drawable-hdpi/ic_type_category_bank.webp')}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ flexDirection: 'column', marginLeft: 10 }}
                                source={ require('../images/drawable-hdpi/ic_type_category_facilities.webp')}
                            />
                        
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Menu')}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ flexDirection: 'column', marginLeft: 10 }}
                                source={ require('../images/drawable-hdpi/ic_type_category_hotel.webp')}
                            />
                        </View>
                        </TouchableOpacity>
                     </View>
                </CardSection>
                <CardSection>
                    {this.renderItem()}
                </CardSection>
            </Card>
            
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
    thumbnailStyle:{
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
    }
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
        item : []
    }
  
    renderImg(imgs){
        //if scale blah blah
        const base_url = 'https://uat-shop.digitalventures.co.th'

            return _.map(imgs.SliderList, imgSlider=>{
               return (<Image
                        style={{width: 150, height: 100, borderRightWidth: 5}}
                        source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/51Gji7jFNjL._SX425_.jpg'}}
                        />)
            })
 
    }

    renderData(){
        return _.map(this.props.items, item =>{
            return (
                <Card  style={{ flex: 4}}>
                    <CardSection  style={{ flex: 1}}>
                    <View style={headerContentStyle}>
                        <CardSection style={{flexDirection:'row', flex:1}}>
                        <Text style={headerTextStyle} >{item.Name}</Text>
                        <Text style={{justifyContent:'flex-end'}} >ดูทั้งหมด</Text>
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

    render(){
        return (
            <ScrollView>
                {this.renderData()}
            </ScrollView>
        )
    }
}





const HomeMenu = createStackNavigator({
    Main : {
        screen : HomeScreen
    },
    Menu : {
        screen : HomeMenuScreens
    },
})




export default HomeMenu