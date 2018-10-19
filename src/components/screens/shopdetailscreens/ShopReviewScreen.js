import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
import { CardSection } from '../../../components/common/CardSection'
import moment from 'moment'
import StarRating from 'react-native-star-rating';
import { Button } from 'react-native-elements';
import WriteReview from './reviewscreens/WriteReview';
import WriteReviewUpdate from './reviewscreens/WriteReviewUpdate';
import { createStackNavigator } from 'react-navigation'
import Modal from "react-native-modal";

// import Tooltip from 'rn-tooltip';
// import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Spinner } from '../../common';



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
    loading: false,
    keyReview: '',
    isModalVisibleDeleteSuccess: false
  };
  componentWillMount(){
      this.setState({
          loading: true
      }, ()=>{
          this.fetchData()
      })
      
  }


  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });


  fetchData() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopReviewService',
      data, config)
      .then(response => { 
        this.setState({ 
          item: response.data,
          loading: false }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }

  returnData() {
    this.setState({ 
        item: '' },()=>{
            this.fetchData()
        }) 
  }

  _onPressUpdate(reviewId, ratings, reviewContent) {
    this.setState({
        loading: true
    }, ()=>{
         this.props.navigation.navigate({
        routeName:'writeReviewUpdate', 
        params : { 
            returnData: this.returnData.bind(this),
            reviewId: reviewId, 
            ratings: ratings, 
            reviewContent: reviewContent }});
    })
   

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
    this.setState({
        loading: true
    },()=>{
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/DeleteDataShopReviewService',
        data2, config)
        .then(response => {
          if (response.data.ResponseDetail === 'Success') {
            console.log('Delete Successsssssss')
            this.fetchData()
            this.setState({ 
                isModalVisible: false,
                isModalVisibleDeleteSuccess: true
            })
            
          }
        })
    })
  }

//   _onRefresh() {
//     this.setState({ refreshing: true });
//     setTimeout(() => {
//       this.setState({ refreshing: false });
//       this.fetchData()
//     }, 2000);
//   }

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

        <Text style={{ color: 'yellow' , fontWeight:'bold'}}>
          {key}
        </Text>

        <StarRating
          disabled={true}
          containerStyle={{ width: 100, marginLeft: 10 }}
          maxStars={5}
          rating={parseFloat(key)}
          fullStarColor={'yellow'}
          starSize={20}
        />
      </View>

    )

  }
  onPressWriteReview() {
      this.setState({
          loading: true
      },()=> {
        this.props.navigation.navigate('writeReview', { returnData: this.returnData.bind(this) });
      })
    
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
          <Image source={require('../../../components/images/drawable-hdpi/ic_delete_report.webp')}
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

    // console.log("Date", key)
    const res = key.substring(0, 10)
    const resT = key.substring(11, 16)
    const DateBefore = res.split("/")
    // console.log("Date DateBefore", DateBefore)
    // console.log("resT ", resT)
    const DateAfter = DateBefore[2] + '-' + DateBefore[1] + '-' + DateBefore[0]
    const formattedData = moment(DateAfter).format("D MMM YYYY")
    // console.log("Date formattedData", formattedData);

    return (
        <Text style={{fontSize: 12, fontWeight:'300'}}>
          {formattedData} เวลา {resT} น.
        </Text>
    
    )

  }

  renderReview() {
    // console.log(this.state.item);
    let resultMapping = ''
    _.map(this.state, items => {
        console.log(items)
        resultMapping = _.map(items.Reviews, reviews => {
        // console.log(reviews.ReviewID);
        let reviewId = ''
        reviewId = reviews.ReviewID
        return (
          <View 
          key={'rw_'+reviewId} 
          style={{ 
              flexDirection: 'column', 
              position: 'relative',
              justifyContent: 'flex-start', 
              paddingLeft: 5, 
              paddingRight: 5, 
              paddingTop: 20, 
              paddingBottom: 20, 
              width: Dimensions.get('window').width, 
              alignSelf:'baseline',
              borderWidth:0.5, 
              borderRadius:5, 
              borderColor:'#e8e7e7',
              marginTop: 20 
              }}>
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
                <View >
                  <Text style={{ fontSize: 20,marginTop: 10 }}>
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
                        style={{ 
                            aspectRatio: 0.25, 
                            resizeMode: 'center' }}
                        source={require('../../../components/images/drawable-xxxhdpi/ic_other_review.png')}
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
            <View style={{ marginLeft: 5,marginRight: 20,borderTopWidth:1, borderColor:'#cdcdcd', borderLeftWidth:1, borderTopLeftRadius:5 }}>
              <Text style={{ marginLeft: 20}}>
                {reviews.ReviewContent}
              </Text>
            </View>
          </View >
        )
      })
    })

    return resultMapping
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
          <Image source={require('../../../components/images/drawable-hdpi/ic_success_report.webp')}
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


  renderPage(){
      if(this.state.loading === true){
          return <Spinner/>
      }
      else{
        //   console.log(this.state.item)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              >        
             {this.renderReview()}
              </ScrollView>
                  
              {this.renderModalDelete()}
              {this.renderModalDeleteSuccess()}
      
            </View>
          );
      }
  }

  render() {
    // console.log(this.state.item);
    return this.renderPage()
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

const ShopReviewScreen = createStackNavigator({
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


export { ShopReviewScreen }