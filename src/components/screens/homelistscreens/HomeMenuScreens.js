import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { Icon} from 'react-native-elements'

export class HomeMenuScreens extends Component {
    




    render(){
        return (
            <Card style={{flex:1,backgroundColor: '#ffffff'}}>
                <View style={styles.headerStyle}>   
                    <Text style={styles.textStyle} > Categories </Text>
                </View>
                <CardSection style={{ marginLeft: '5%',marginRight: '5%' ,marginBottom: '5%'}}>
                    <View style={{ flexDirection: 'row'  }} >
                            <View style={styles.imgLeft}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                                />
                                <Text style={styles.textLeft} >
                                    Restaurants
                                </Text>
                            </View>
                            <View style={styles.imgCenter}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                                />  
                                <Text style={styles.textLeft} >
                                    Points of Interest
                                </Text>
                            </View>
                            <View style={styles.imgRight}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                                />
                                <Text style={styles.textLeft} >
                                    Shops
                                </Text>
                            </View>   
                    </View>
                </CardSection>
                <CardSection style={{ marginLeft: '5%',marginRight: '5%' ,marginBottom: '5%'}}>
                        <View style={{ flexDirection: 'row' }} >
                                <View style={styles.imgLeft}>
                                    <Image
                                        style = { {width: '100%' , height: '100%'}}
                                        source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                                    />
                                    <Text style={styles.textLeft} >
                                        Accommodation
                                    </Text>
                                </View>
                                <View style={styles.imgCenter}>
                                    <Image
                                        style = { {width: '100%' , height: '100%'}}
                                        source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                                    />  
                                    <Text style={styles.textLeft} >
                                        Commercial Areas
                                    </Text>
                                </View>
                                <View style={styles.imgRight}>
                                    <Image
                                        style = { {width: '100%' , height: '100%'}}
                                        source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                                    />
                                    <Text style={styles.textLeft}>
                                        Bank
                                    </Text>
                                </View>   
                        </View>
                 </CardSection>

                 <CardSection style={{ marginLeft: '5%',marginRight: '5%'  ,marginBottom: '5%'}}>
                    <View style={{ flexDirection: 'row' }} >
                            <View style={styles.imgLeft}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                                />
                                <Text style={styles.textLeft} >
                                Schools and Government offices 
                                </Text>
                            </View>
                            <View style={styles.imgCenter}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                                />  
                                <Text style={styles.textLeft} >
                                Services
                                </Text>
                            </View>
                            <View style={styles.imgRight}>
                                <Image
                                    style = { {width: '100%' , height: '100%'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                                />
                                <Text style={styles.textLeft} >
                                Facilities
                                </Text>
                            </View>   
                    </View>
                </CardSection>
           </Card>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    headerStyle:{
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle:{
        fontSize: 25,
        paddingTop: 20,
        paddingBottom: 30
    },
    imgLeft:{
        flexDirection: 'column', 
        marginLeft: 10,
        marginRight: 20 , 
        marginTop: 20,
        marginBottom: 5,
        width: 70, 
        height: 70,
        alignItems: 'center'  , 
        justifyContent:'center'
    },
    imgCenter:{
        flexDirection: 'column', 
        marginLeft: 40 , 
        marginRight: 45 , 
        marginTop: 20,
        marginBottom: 5,
        width: 70, 
        height: 70,
        alignItems: 'center'  , 
        justifyContent:'center'
    },
    imgRight:{
        flexDirection: 'column', 
        marginLeft: 10, 
        marginRight: 20 , 
        marginTop: 20,
        marginBottom: 5,
        width: 70, 
        height: 70,
        alignItems: 'center' , 
        justifyContent:'center'
    },
    textLeft: {
        width: '100%' , 
        fontSize: 12, 
    },
    textCenter: {
        width: '100%' , 
        fontSize: 12, 
    },
    textRight:{
        width: '100%' , 
        fontSize: 12, 
    }
  })
