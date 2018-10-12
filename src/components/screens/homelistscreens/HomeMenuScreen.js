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
import { createStackNavigator, HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';
// Import Item Screens 



export class HomeMenuScreens extends Component {
    
    renderHeadingText(){
        return (
            <View style={styles.headerStyle}>   
                <Text style={styles.textStyle} > Categories </Text>
            </View>
        )
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    renderBlogContent(){
        return (
            
            <View style={{ flex:6,alignItems:'center',justifyContent:'space-around'}}>
                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >
                  
                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('restaurants')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Restaurants
                                </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('travel')}  
                         style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                         >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Points of Interest
                                </Text>
                        </TouchableOpacity>
                  
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('shop')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Shops
                                </Text>
                        </TouchableOpacity>
                </CardSection>
                
                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('accommodation')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Accommodation
                                </Text>
                        </TouchableOpacity>
                 
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('commercial_areas')} 
                         style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                         >
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Commercial Areas
                                </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('bank')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >           
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                    Bank
                                </Text>
                        </TouchableOpacity> 
                </CardSection>

                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('schools_and_government')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >     
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                                />
                                <View style={{flexDirection:'column', alignItems:'center',justifyContent: 'center'}}>
                                    <Text style={{fontSize: 12, alignItems:'center'}} >
                                         Schools and Government offices 
                                    </Text> 
                                </View> 
                        </TouchableOpacity>
                   

                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('services')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >       
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                                />  
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                Services
                                </Text>
                           
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('facilities')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                                />
                                <Text style={{fontSize: 12, alignItems:'center'}} >
                                Facilities
                                </Text>
                           
                        </TouchableOpacity>
                </CardSection>
            </View>
        )
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Header headerText="" 
                backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                <View style={{flex:1,backgroundColor: '#ffffff'}}>
                    {this.renderHeadingText()}
                    {this.renderBlogContent()}
                </View>
            </View>
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

