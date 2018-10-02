import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
import { CardSection } from '../../../common/CardSection'
import { Card } from '../../../common/Card'
import { Rating } from 'react-native-ratings';



var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108428",
  "UserID": "1"
}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
};

export class Review extends Component {

  state = {
    item: ''
  };

  componentWillMount() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopReviewService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }

  renderReview() {
    //console.log(this.state.item);
    return _.map(this.state, items => {

      return _.map(items.Reviews, reviews => {
        // console.log(reviews.ReviewContent);
        return (
          <Card>
            <CardSection>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 0.4 }}>
                  <Image
                    style={
                      { width: 80, height: 80, borderRadius: 150 / 2 }
                    }
                    source={{ uri: reviews.ReviewerImage }}
                  />
                </View>
                <View style={{ flex: 1 ,}}>
                  <View >
                    <Text style={{fontSize:20,fontWeight: 'bold',}}>
                      {reviews.ReviewerDisplayName}
                    </Text>
                    <Rating
                      style={{marginTop:10}}
                      showReadOnlyText
                      imageSize={20}
                      readonly
                      startingValue={reviews.Rating}
                    />
                  </View>
                  <View style={{fontSize:20,}}>
                    <Text style={{marginTop:10}}>
                      {reviews.CreatedDate}
                    </Text>
                  </View>
                  <View>
                    <Text style={{marginTop:10}}>
                      {reviews.ReviewContent}
                    </Text>
                  </View>
                </View>
              </View>
            </CardSection>
          </Card>
        )
      })
    })
  }



  render() {
    // console.log(this.state.item);
    return (
      <View>
        {this.renderReview()}
      </View>
    );
  }
}


const styles = {
  urlStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  textnameStyle: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  }, thumbnailStyle: {
    height: 60,
    width: 60,
    borderRadius: 150 / 2
  },
};
