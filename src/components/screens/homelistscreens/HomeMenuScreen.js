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
import { createStackNavigator } from 'react-navigation'
// Import Item Screens 



export class HomeMenuScreens extends Component {
    
    renderHeadingText(){
        return (
            <View style={styles.headerStyle}>   
                <Text style={styles.textStyle} > Categories </Text>
            </View>
        )
    }

    renderBlogContent(){
        return (
            <View style={{ flex:5,alignItems:'center',justifyContent:'space-around'}}>
                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >
                  
                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('restaurants')} >
                            
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Restaurants
                                </Text>
                            
                        </TouchableOpacity>
                    </View>
         
                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('travel')} >
           
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Points of Interest
                                </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('shop')} >
                           
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Shops
                                </Text>
                            
                        </TouchableOpacity>
                    </View>   
                </CardSection>
                
                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('accommodation')} >
                           
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Accommodation
                                </Text>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('commercial_areas')} >
                           
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Commercial Areas
                                </Text>
                           
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('bank')} >
                               
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Bank
                                </Text>
                           
                        </TouchableOpacity>
                    </View>   
                </CardSection>

                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('schools_and_government')} >
                                
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                                />
                                <View style={{flexDirection:'column', alignItems:'center'}}>
                                    <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Schools and Government offices 
                                    </Text>
                                </View>
                            
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('services')} >
                                 
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                Services
                                </Text>
                           
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('facilities')} >
                               
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                Facilities
                                </Text>
                           
                        </TouchableOpacity>
                    </View>

                </CardSection>
            </View>
        )
    }

    render(){
        return (
            <Card style={{flex:1,backgroundColor: '#ffffff'}}>
                {this.renderHeadingText()}
                {this.renderBlogContent()}
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
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle:{
        fontSize: 25,
        paddingTop: 20,
        paddingBottom: 30
    }
})





const HomeDetailMenu = createStackNavigator({
    Main: {
        screen: HomeMenuScreens
    },
})

export default HomeMenuScreens