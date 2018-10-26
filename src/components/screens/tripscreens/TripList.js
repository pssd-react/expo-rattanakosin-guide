import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text';
import { ButtonStar,ButtonLocal } from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';

var data = {
	"RqAppID":"1234",
	"UserLanguage":"EN",
	"ViewType":"04",
	"RowNum":"0",
	"Keyword":"",
	"ShopCategory":"264",
	"UserID":"1",
	"MarketID":"3",
	"CouponType":"",
	"CouponSubType":""
}

var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
};

class TripList extends Component {
    state = {
        item: []
    };

    componentWillMount() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { this.setState({ item: response.data}) })
            .catch((error) => {
                console.log('axios error:', error);
        });
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    renderItem() {
        console.log(this.state.item)
        let loKey = 0
        const  CardItem = _.map((this.state), (items) => {
            loKey++
            return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} />)
        })

        return CardItem
    }


    render(){
        
        return (
            <View style={{flex:1}}>
            <Header headerText="Restaurants" 
            backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                    <Card>
                        <ScrollView>
                            {this.renderItem()}
                            <View style={{ height: 100}} />
                        </ScrollView>
                    </Card>
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
    ViewContainer:{
        padding: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        flex: 1,
    },
    ViewTextContainer:{
        flex: 1
    },
    ViewTextStyle:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    iconContainerStyle:{
        alignItems: 'center',
        justifyContent : 'flex-start'
    },
    imgStyle: {
        flex: 1,
        justifyContent : 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    ViewimgStyle: {
        marginTop: 5,
        flex: 1,
        padding: 5,
        flexDirection: 'row'
    },
    buttonStarStyle: {
        backgroundColor: '#ffffff',
        width: 50,
       
    },
    buttonLocalStyle: {
        backgroundColor: '#ffffff',
        width: 60,
    },
})

class ItemDetail extends Component {

    state = {
        item: []
    }

    renderViewMore(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>Show more...</Text>
        )
    }
    renderViewLess(onPress){
        return(
          <Text onPress={onPress} style={{color:'blue'}}>Show less</Text>
        )
    }
    renderData() {
        return _.map(this.props.items, item => {
           //console.log( item )
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
                                <Image
                                    style={{width:20, height:20 }}
                                    source={require('../../images/drawable-hdpi/ic_fav_trip_unselected.webp')}
                                />
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
        })
    }
    

    render() {
        return (
            <View 
                key={item.Sequence} 
                style={{ flex: 1,backgroundColor: '#FFFFFF' }}
                navigation={this.props.navigation} >
            
                {this.renderData()}
            </View>
        )
    }           
}

export {TripList}