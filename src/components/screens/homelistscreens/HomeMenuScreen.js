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
import I18n from '../../config/i18n'




export class HomeMenuScreens extends Component {
    
    renderHeadingText(){
        return (
            <View style={styles.headerStyle}>   
                <Text style={styles.textStyle} > { I18n.t('catagories') } </Text>
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
                  
                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resRestaurants')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_food.webp')}
                                />
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                    { I18n.t('cat1') }
                                </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resTravel')}  
                         style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                         >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_place_travel.webp')}
                                />  
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                    { I18n.t('cat2') }
                                </Text>
                        </TouchableOpacity>
                  
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resShop')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shop.webp')}
                                />
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat3') }
                                </Text>
                        </TouchableOpacity>
                </CardSection>
                
                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resAccommondation')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_hotel.webp')}
                                />
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat4') }
                                </Text>
                        </TouchableOpacity>
                 
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('resCommercial_Areas')} 
                         style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                         >
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_shopping_mall.webp')}
                                />  
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat5') }
                                </Text>
                        </TouchableOpacity>
                   
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resBank')}
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >           
                                <Image
                                style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_bank.webp')}
                                />
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat6') }
                                </Text>
                        </TouchableOpacity> 
                </CardSection>

                <CardSection style={{ flexDirection: 'row', justifyContent:'space-around'  }} >

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resSchools_and_Government')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >     
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_office.webp')}
                                />
                                
                                    <Text style={{fontSize: 14, alignItems:'center'}} >
                                    { I18n.t('cat7') }
                                    </Text> 
                               
                        </TouchableOpacity>
                   

                    
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resServices')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >       
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_service.webp')}
                                />  
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat8') }
                                </Text>
                           
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('resFacilities')} 
                        style={{flex:1, flexDirection:'column', justifyContent:'space-between', alignItems:'center'}}
                        >
                                <Image
                                    style = { {width: 70 , height: 70, alignItems:'center'}}
                                    source={ require('../../images/drawable-hdpi/ic_type_category_facilities.webp')}
                                />
                                <Text style={{fontSize: 14, alignItems:'center'}} >
                                { I18n.t('cat9') }
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

