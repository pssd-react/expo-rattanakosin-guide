import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { DetailMenu, Promotion, GoogleMap, ReviewMenu } from './shopscreens'
import axios from 'axios'
import _ from 'lodash'
import { Rating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';

var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108428",
  "UserID": "1",
  "MarketID": "3"

}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
};

class ShopDetail extends Component {
  state = {
    item: []
  };

  componentDidMount() {
    this.startHeaderHeight = 80
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight
    }

    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'รายละเอียด' },
      { key: 'second', title: 'โปรโมชัน' },
      { key: 'third', title: 'แผนที่' },
      { key: 'four', title: 'รีวิว' },

    ],

  };



  renderItem() {
    // console.log(this.state.item);
    let shopName = ''
    let totalReview = ''
    let rating = 0
    return _.map(this.state.item, items => {
      // console.log(items.ShopName);
      if (items.ShopName !== undefined) {
        return (
          <View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20, color: 'black' }}>
                {items.ShopName}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{color: 'yellow'}}>
                {items.Rating}
              </Text>
              <StarRating
                disabled={true}
                containerStyle={{ width: 100, }}
                maxStars={5}
                rating={items.Rating}
                fullStarColor={'yellow'}
                starSize={20}
              />
              <Text style={{ marginLeft: 10 }}>
                ({items.TotalReview})
          </Text>
            </View>

          </View>
        )
      }
    })
  }


  render() {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>

          <ImageBackground
            style={{ height: this.startHeaderHeight, borderBottomWidth: 1, borderBottomColor: '#dddddd' }}
            source={require('../../assets/padythai.jpg')}
          >
            <View style={{
              flexDirection: 'row',
              height: '60%',
              width: '90%',
              marginRight: 20,
              marginLeft: 20,
              backgroundColor: 'white', marginHorizontal: 20,
              shadowOffset: { width: 0, height: 0 },
              shadowColor: 'black',
              shadowOpacity: 0.2,
              elevation: 1,
              marginTop: 60
            }}>
              <View style={{ marginTop: 10, marginLeft: 20 }}>
                {this.renderItem()}
              </View>

            </View>

          </ImageBackground>

          <View style={styles.container} >
            <TabView

              navigationState={this.state}
              renderScene={SceneMap({
                first: DetailMenu,
                second: Promotion,
                third: GoogleMap,
                four: ReviewMenu

              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
              swipeEnabled={false}
            />
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})


export default ShopDetail;
