import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
import { CardSection } from '../../../common/CardSection'
import StarRating from 'react-native-star-rating';
import { Rating } from 'react-native-ratings';
import { Button } from 'react-native-elements';
import WriteReview from './writereview/WriteReview';
import WriteReviewUpdate from './writereview/WriteReviewUpdate';
import { createStackNavigator } from 'react-navigation'
import Tooltip from 'rn-tooltip';


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

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  state = {
    item: '',
    isModalVisible: false,
    loadRefresh: false
  };

  // componentWillMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       loading: false
  //     })
  //   }, 3000);
  // }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopReviewService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }




  returnData() {
    if (this.state.loadRefresh === true) {
      this.setState({ loadRefresh: false });
      this.fetchData()

    } else {
      this.setState({ loadRefresh: true });
      this.fetchData()
    }

  }

  _onPressUpdate(reviewId, ratings, reviewContent) {
    this.props.navigation.navigate('writeReviewUpdate', { returnData: this.returnData.bind(this) });
    this.props.navigation.navigate('writeReviewUpdate', { reviewId, ratings, reviewContent });

  }

  _onPressDelete(key) {
    // console.log(key)
    const data2 = {
      "RqAppID": "1234",
      "ReviewID": key,
      "UserID": "1",
      "ShopID": "108428",
      "SessionToken": ""
    }
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/DeleteDataShopReviewService',
      data2, config)
      .then(response => {
        this.setState({ Review: response.data })
        if (response.data.ResponseDetail === 'Success') {
          console.log('Delete Successsssssss');
          this.fetchData()
        }
      })
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.fetchData()
    }, 2000);
  }

  renderRating(key) {
    console.log(key)
    return (
      // <Rating
      //   style={{ marginTop: 10 }}
      //   showReadOnlyText
      //   imageSize={20}
      //   readonly
      //   startingValue={key}
      // />

      <StarRating
        disabled={true}
        containerStyle={{ width: 100, }}
        maxStars={5}
        rating={key}
        fullStarColor={'yellow'}
        starSize={20}
      />


    )
  }

  renderReview() {
    console.log(this.state.item);
    return _.map(this.state, items => {

      return _.map(items.Reviews, reviews => {
        // console.log("items.Reviews",items.Reviews);
        return (
          <CardSection style={{ flexDirection: 'column' }}>
            <View style={{ height: 100, flexDirection: 'row' }}>
              <View style={{ height: 100, alignItems: 'center' }}>
                <Image
                  style={
                    { width: 65, height: 65, borderRadius: 150 / 2 }
                  }
                  source={{ uri: reviews.ReviewerImage }}
                />
              </View>
              <View style={{ flex: 3, marginLeft: 20 }}>
                <View >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', }}>
                    {reviews.ReviewerDisplayName}
                  </Text>
                  {this.renderRating(reviews.Rating)}
                </View>
                <View style={{ fontSize: 20, }}>
                  <Text style={{ marginTop: 10 }}>
                    {reviews.CreatedDate}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                <Tooltip
                  withPointer={true}
                  height={80}
                  width={130}
                  pointerColor="black"
                  backgroundColor="#ffffff"
                  containerStyle={{ borderWidth: 1, }}
                  popover={
                    <View style={{ flex: 1, }}>
                      <View style={{ flex: 1, }}>
                        <TouchableOpacity onPress={() => this._onPressUpdate(reviews.ReviewID, reviews.Rating, reviews.ReviewContent)}>
                          <Image
                            source={require('../../../images/drawable-hdpi/ic_menu_edit.webp')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, }}>
                        <TouchableOpacity onPress={() => this._onPressDelete(reviews.ReviewID)}>
                          <Image
                            source={require('../../../images/drawable-hdpi/ic_menu_delete.webp')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                  }
                >
                  <Image
                    style={{ height: 20, width: 5, }}
                    source={require('../../../images/drawable-xxxhdpi/ic_other_review.png')}
                  />
                </Tooltip>
              </View>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text>
                {reviews.ReviewContent}
              </Text>
            </View>
          </CardSection >
        )
      })
    })
  }

  onPressWriteReview() {
    this.props.navigation.navigate('writeReview', { returnData: this.returnData.bind(this) });
  }

  renderPage() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView >
          <View style={{ marginTop: '5%', alignItems: 'center' }}>
            <Button
              onPress={this.onPressWriteReview.bind(this)}
              title="Write a review"
              color='black'
              buttonStyle={{
                backgroundColor: 'white',
                width: 200,
                height: 45,
                borderColor: "black",
                borderWidth: 0.5,
                borderRadius: 25,
              }}
            />
          </View>
          <View style={{ flex: 1, marginTop: '5%' }}>
            {this.renderReview()}
          </View>
        </ScrollView>
      </View>
    );
  }





  render() {
    // console.log(this.state.item);
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={{ marginTop: '5%', alignItems: 'center' }}>
            <Button
              onPress={this.onPressWriteReview.bind(this)}
              title="Write a review"
              color='black'
              buttonStyle={{
                backgroundColor: 'white',
                width: 200,
                height: 45,
                borderColor: "black",
                borderWidth: 0.5,
                borderRadius: 25,
              }}
            />
          </View>
          <View style={{ flex: 1, marginTop: '5%' }}>
            {this.renderReview()}
          </View>
        </ScrollView>
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
  }, container: {
    borderColor: "black"
  },
};

const ReviewMenu = createStackNavigator({
  Main: {
    screen: Review, navigationOptions: { header: null }
  },
  writeReview: {
    screen: WriteReview,
  },
  writeReviewUpdate: {
    screen: WriteReviewUpdate,
  }
})


export { ReviewMenu }
