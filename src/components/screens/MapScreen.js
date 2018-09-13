import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ActivityIndicator,
    Image
    } from 'react-native'
import axios from 'axios'
import {MapView, Location, Constants} from 'expo'



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



class MapScreen extends Component{
    
    componentWillMount() {
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryNewStaticLocationService',
            data, config)
            .then(response => { this.setState({ item: response.data}) })
            .catch((error) => {
                console.log('map error:', error);
        });
    }

    componentDidMount(){
        this.setState({ mapLoaded: true});
    }

    onRegionChangeComplete = (region) =>{
       // console.log(region);
        this.setState({ region });
    }
    
  
    state = {
        item: '',
        mapLoaded: false,
        region: {
            latitude: 13.755617,
            longitude: 100.498478,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0221,
        },
        markers : 
        {
          latitude: 13.744147,
          longitude: 100.494137,
          title: 'Foo Place',
          subtitle: '1234 Foo Drive'
        }
    
    }


    renderMarker(){
        // console.log(this.state.item.StaticLocation)
      

        // let loKey = 0
        // const  CardItem = _.map((this.state), (items) => {
        //     loKey++
        //     return (<ItemDetail key={'location_'+loKey} items={items.StaticLocation} />)
        // })

        // return CardItem

            return(
                <MapView.Marker
                coordinate={{latitude: 13.73913079623,
                longitude: 100.51648126149}}
                image={require('../images/drawable-hdpi/ic_category_place_travel.webp')}
                />
            )
       
    }


    render(){
        if( !this.state.mapLoaded){
            return (
                <View style ={{flex: 1,justifyContent: 'center'}}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    

        return (
        <View  style={{ flex: 1}}>
        <MapView
            style={{ flex: 1 }}
            region={ this.state.region }
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
            {this.renderMarker()}
          </MapView>
          </View>
        )
    }
}






// const ItemDetail = ({ items }) => {

//     return(
//         <MapView.Marker
//         coordinate={{latitude: 13.73913079623,
//         longitude: 100.51648126149}}
//         image={require('../images/drawable-hdpi/ic_category_place_travel.webp')}
//         />
//     )

// }






export default MapScreen