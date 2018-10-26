import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import axios from 'axios'
import _ from 'lodash'
import { Card  } from '../../common/Card'
import { CardSection } from '../../common/CardSection'
import { ButtonTrip } from '../../common/ButtonTrip'
// import  LoginForm   from '../../authen/LoginForm'
import { Actions } from 'react-native-router-flux'
import { createStackNavigator } from 'react-navigation'
import { CreateTripScreen } from './createtripscreen/CreateTripScreen'
import { AddTripScreen } from './createtripscreen/addtrip/AddTripScreen'
import { MarkLocation } from './MarkLocation'


const INITAL_STATE = {
    textbox: 'เลือกร้านค้าและสร้างทริปส่วนตัวได้ที่นี่',
    textbox1: 'ตำแหน่งปักหมุดของคุณ',
    textBT: 'เริ่มสร้างทริป',
    login: 0
}

var data = {
	'RqAppID':'1234',
	'UserLanguage':'EN',
	'ViewType':'04',
	'RowNum':'0',
	'Keyword':'',
	'ShopCategory':'264',
	'UserID':'1',
	'MarketID':'3',
	'CouponType':'',
	'CouponSubType':''
}

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}


class Tripme extends Component{
   state = INITAL_STATE;

   componentWillMount() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
        data, config)
        .then(response => { this.setState({ item: response.data}) })
        .catch((error) => {
            console.log('axios error:', error);
        });
    }

    renderItem() {
        //    console.log(this.state.item)
        let loKey = 0
        const  CardItem = _.map((this.state), (items) => {
            loKey++
            return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} />)
        })

        return CardItem
        }

    onCreateTrip() {
        this.props.navigation.navigate('trip')
    }

    onCardPress() {
        this.props.navigation.navigate('markmap')
    }



    render(){
        return (
            <Card>
                <CardSection>         
                    <ImageBackground
                        source={require('../../images/drawable-hdpi/bg_trip_main.webp')}
                        style={styles.stretch}
                        >
                      <View style= {styles.overlayContainer}>
                            <View style = {styles.top}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            
                            <View style = {styles.top}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={() => this.onCreateTrip()}
                                 > 
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                            
                      </View>
                    </ImageBackground> 
                </CardSection>

                <TouchableOpacity onPress={()=> this.onCardPress()}>
                    <CardSection>         
                        <ImageBackground
                            source={require('../../images/drawable-hdpi/bg_position_sticky.webp')}
                            style={styles.stretch}
                            >
                        <View style= {styles.overlayContainer}>
                                <View style = {styles.top}>
                                    <Text style={styles.header}> {this.state.textbox1}</Text>
                                </View>
                                
                                {/* <View style = {styles.top}>
                                    
                                </View> */}
                                
                        </View>
                        </ImageBackground> 
                    </CardSection>
                </TouchableOpacity>
            </Card>
            
        )
    }
}

const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
       // color: '#FFFFFF'
    },
    stretch: {
        flex:1,
        width: 400,
        height: 150
    },
    header: {
        color: '#000000',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
    },
    buttonStyle: {
        //color: '#131313',
        //fontSize: 18,
        backgroundColor: '#F8E21C',
        width: 100,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 150,
        marginBottom: 20
    },
    top: {
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center'
    },

})
class ItemDetail extends Component {

    state = {
        item: []
    }

    renderData() {
        return _.map(this.props.items, item => {
           console.log( this.props.ShopID )
           if(this.props.ShopID === item.ShopID){
            return (
                <View key={item.CategoryName+'_'+item.ShopID} style={{flex:1}}>
                <CardSection style={{height:40}}> 
                            <View style={{flex:4,
                                    justifyContent:'flex-start', flexDirection:'row', alignSelf:'center'}}>
                            <Image style={{width:30, height:30,marginRight:15}}
                                source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')} 
                            /> 
                                <Text style={styles.ViewTextStyle}> {item.LocationName} </Text>
                            </View>
                            
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                <TouchableOpacity onPress={() => this.onAddTrip(item.ShopID)}>
                                    <Image
                                        style={{width:25, height:25 }}
                                        source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                    />
                                    </TouchableOpacity>
                                </View>
                            
                </CardSection>
                    <CardSection style={{flex:1,borderBottomWidth:1, borderColor: '#ddd'}}>   
                            <View style={styles.ViewContainer}>
                                    <View style={{flex: 1  }}>
                                    <Image style={{width:100, height:130}}
                                        source={{ uri: item.ImageUrl}} 
                                    /> 
                                    </View>
                                    
                                    <View style={{ flex: 2 ,flexDirection: 'column'}}>
                                        <View style= {{ flexDirection: 'row' , height: 40}}>
                                            <View style={{ flex: 1 , marginRight: 15} }>
                                                <ButtonStar style={styles.buttonStarStyle}
                                                > 
                                                {item.Rating}
                                                </ButtonStar>
                                            </View>
                                            <View style={{ flex: 2, marginLeft: 5}}>
                                                <ButtonLocal style={styles.buttonLocalStyle}
                                                > 
                                                    8.03
                                                </ButtonLocal>
                                            </View>

                                            <View  style={{ flex: 3}}/>

                                        </View>
                                     
                                        <View style= {{ flex: 1  }}>
                                            <Text />
                                            <ViewMoreText
                                            numberOfLines={3}
                                            renderViewMore={this.renderViewMore}
                                            renderViewLess={this.renderViewLess}
                                            >
                                                <Text>
                                                    {item.ShopDescription}
                                                </Text>
                                            </ViewMoreText>
                                        </View>
                                    </View>
                            </View>
                    </CardSection>
                </View>
               
        
                )
            }   
        })
    }
    

    render() {
        return (
            <View style = {{flex:1, backgroundColor: '#FFFFFF'}}>
                {this.renderData()}
            </View>
        )
    } 
}

const TripMe = createStackNavigator({
    Home: { 
        screen: Tripme, navigationOptions:{header:null} 
    },
    trip: {
        screen: AddTripScreen, navigationOptions: {header: null}
    },
    markmap: {
        screen: MarkLocation, navigationOptions:{}
    }
    
})


export default TripMe