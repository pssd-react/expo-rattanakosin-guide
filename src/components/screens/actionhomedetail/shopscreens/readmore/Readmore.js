import React, { Component } from 'react';
import { View, Text, ScrollView, } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
// import {Header }from '../../../../../components/common/Header'

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

class Readmore extends Component {

  state = {
    item: []
  };

  componentWillMount() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }

  renderDescription() {
    // console.log("Read more",this.state.item);

    let shopDescription = ''

    _.map(this.state.item, items => {
      // console.log(items.ShopDescription);
      if (items.ShopDescription !== undefined) {
        shopDescription = items.ShopDescription

      }

    })
    return (
      <ScrollView>
        <Text
          style={{
            color: 'black', fontSize: 16, textAlign: 'justify',
            lineHeight: 30, marginLeft: 10, marginRight: 10, marginTop: 20
          }}>
          {shopDescription}
        </Text>
      </ScrollView>
    )
  }

  render() {
    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.renderDescription()}
        </View>
    );
  }
}

export default Readmore;
