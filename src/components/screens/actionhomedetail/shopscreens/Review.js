import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
import { CardSection } from '../../../common/CardSection'
import moment from 'moment'
import StarRating from 'react-native-star-rating';
import { Rating } from 'react-native-ratings';
import { Button } from 'react-native-elements';
import WriteReview from './writereview/WriteReview';
import WriteReviewUpdate from './writereview/WriteReviewUpdate';
import { createStackNavigator } from 'react-navigation'
import Modal from "react-native-modal";

// import Tooltip from 'rn-tooltip';
// import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import PopoverTooltip from 'react-native-popover-tooltip';



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
    loadRefresh: false,
    loading: false,
    keyReview: '',
    isModalVisibleDeleteSuccess: false
  };


  componentDidMount() {
    this.fetchData()
  }



  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


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

  _onPressDelete() {
    // console.log("key  ",key)
    const data2 = {
      "RqAppID": "1234",
      "ReviewID": this.state.keyReview,
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
          this.setState({ isModalVisible: false })
          this.setState({ isModalVisibleDeleteSuccess: true })
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
    // console.log(key)
    return (
      // <Rating
      //   style={{ marginTop: 10 }}
      //   showReadOnlyText
      //   imageSize={20}
      //   readonly
      //   startingValue={key}
      // />
      <View style={{ flexDirection: 'row' }}>

        <Text style={{ color: 'yellow' }}>
          {key}
        </Text>

        <StarRating
          disabled={true}
          containerStyle={{ width: 100, marginLeft: 10 }}
          maxStars={5}
          rating={key}
          fullStarColor={'yellow'}
          starSize={20}
        />
      </View>

    )

  }
  onPressWriteReview() {
    this.props.navigation.navigate('writeReview', { returnData: this.returnData.bind(this) });
  }

  toggleModal(key) {
    // console.log("key toggleModal ", key)
    this.setState({
      isModalVisible: true,
      keyReview: key
    });

  }

  renderModalDelete() {
    //console.log("key renderModalLogOut ",key)
    return (
      <Modal isVisible={this.state.isModalVisible} style={{ flex: 1 }}>
        {this.modalRenderDelete()}
      </Modal>
    )
  }


  modalRenderDelete() {
    if (this.state.loading === true) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          marginBottom: 270,
          marginTop: 270,
          marginLeft: 140,
          marginRight: 140,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 5 },
          shadowRadius: 5,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>


        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 130,
        marginTop: 100,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardSection style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../images/drawable-hdpi/ic_delete_report.webp')}
            style={{}} />
        </CardSection>
        <CardSection style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 24 }}>ยืนยันการลบรีวิว</Text>
        </CardSection>
        <CardSection style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 16 }}>หากคุณหกยืนยัน รีวิวที่แสดงอยู่จะหายไป</Text>
        </CardSection>
        <CardSection style={{ flex: 1, justifyContent: 'flex-end', padding: 0, marginTop: 60 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderRightWidth: 0.5, borderColor: '#aaa', height: 50 }}
            onPress={() => this.setState({ isModalVisible: false })}>
            <Text style={{ fontSize: 16 }}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderLeftWidth: 0.5, borderColor: '#aaa', height: 50 }}
            onPress={() => this._onPressDelete()}>
            <Text style={{ fontSize: 16 }}>ยืนยัน</Text>
          </TouchableOpacity>
        </CardSection>

      </View>
    )

  }

  CreatedDate(key) {

    console.log("Date", key)
    const res = key.substring(0, 10)
    const resT = key.substring(11, 16)
    const DateBefore = res.split("/")
    console.log("Date DateBefore", DateBefore)
    console.log("resT ", resT)
    const DateAfter = DateBefore[2] + '-' + DateBefore[1] + '-' + DateBefore[0]
    const formattedData = moment(DateAfter).format("D MMM YYYY")
    console.log("Date formattedData", formattedData);

    return (
        <Text>
          {formattedData} เวลา {resT} น.
        </Text>
    
    )

  }

  renderReview() {
    // console.log(this.state.item);
    return _.map(this.state, items => {

      return _.map(items.Reviews, reviews => {
        // console.log(reviews.ReviewID);
        let reviewId = ''
        reviewId = reviews.ReviewID
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
                    {this.CreatedDate(reviews.CreatedDate)}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                <PopoverTooltip
                  ref='tooltip4'
                  buttonComponent={
                    <View style={{ width: 50, height: 50, alignItems: 'center' }}>
                      <Image
                        style={{ height: 20, width: 5, }}
                        source={require('../../../images/drawable-xxxhdpi/ic_other_review.png')}
                      />
                    </View>
                  }
                  items={[
                    {
                      label: 'Edit',
                      onPress: () => this._onPressUpdate(reviews.ReviewID, reviews.Rating, reviews.ReviewContent)
                    },
                    {
                      label: 'Delete',
                      onPress: () => this.toggleModal(reviewId)
                    }
                  ]}

                  labelContainerStyle={{ backgroundColor: '#ffffff', width: 120, marginRight: 20 }}
                  labelSeparatorColor='#1BD1A5'
                />
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

  renderModalDeleteSuccess() {
    return (
      <Modal isVisible={this.state.isModalVisibleDeleteSuccess} style={{ flex: 1 }}>
        {this.modalRenderDeleteSuccess()}
      </Modal>
    )
  }

  modalRenderDeleteSuccess() {
    if (this.state.loading === true) {
      return (
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          marginBottom: 270,
          marginTop: 270,
          marginLeft: 140,
          marginRight: 140,
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: { width: 5, height: 5 },
          shadowRadius: 5,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>


        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 130,
        marginTop: 100,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <CardSection style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../images/drawable-hdpi/ic_success_report.webp')}
            style={{}} />
        </CardSection>
        <CardSection style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 24 }}>ลบสำเร็จ</Text>
        </CardSection>
        <CardSection style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 16 }}>ระบบทำการลบเรียบร้อย</Text>
        </CardSection>
        <CardSection style={{ flex: 1, justifyContent: 'flex-end', padding: 0, marginTop: 60 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderRightWidth: 0.5, borderColor: '#aaa', height: 50 }}
            onPress={() => this.setState({ isModalVisibleDeleteSuccess: false })}>
            <Text style={{ fontSize: 16 }}>ปิด</Text>
          </TouchableOpacity>
        </CardSection>

      </View>
    )

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
        {this.renderModalDelete()}
        {this.renderModalDeleteSuccess()}

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
