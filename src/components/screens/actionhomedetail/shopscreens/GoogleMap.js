import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Image, Platform, StyleSheet, Share, TextInput, Button, Alert } from 'react-native';
import { MapView, Location, Constants } from 'expo'
import axios from 'axios'
import _ from 'lodash'

var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108511",
  "UserID": "1",
  "MarketID": "3"

}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
};





export class GoogleMap extends Component {
  constructor() {
    super();

    this.state =
      {
        TextInputValueHolder: '',
        item: '',
        isDatePromo: '',
        numPresent: '',
        numComming: ''
      }
  }

  componentWillMount(){
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
    data, config)
    .then(response => { this.setState({ item: response.data }) })
    .catch((error) => {
      console.log('axios error:', error);
    });
  }
  ShareMessage(key){
    this.setState({ TextInputValueHolder: key })
    console.log("key ",key);
    Share.share(
      {
        message: key
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  renderShare() {
    return (
      <View>

        <TextInput
          underlineColorAndroid="transparent"
          placeholder="Enter Text Here To Share"

          onChangeText={(TextInputText) => { this.setState({ TextInputValueHolder: TextInputText }) }}
        />

        <Button title="Click Here To Share TextInput Inside Typed Text as Message" onPress={this.ShareMessage} />

      </View>
    );
  }

  renderShopDetail() {
    let share = ''
    return _.map(this.state.item, items => {
      // console.log(items.ShopName);
      if (items.ShopName !== undefined) {
        share = items.Facebook_Link
        console.log("share ",share);
        return (
          <View>
            <Text>
              {items.Facebook_Link}
            </Text> 

            <Button title="Click Here To Share TextInput Inside Typed Text as Message" onPress={ () => this.ShareMessage(share)} />
          </View>
        )
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {this.renderShopDetail()} */}
      </View>
    );
  }
}
