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
  Share,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { DetailMenu, Promotion, GoogleMap, ReviewMenu, PromotionMenu } from './shopscreens'
import axios from 'axios'
import _ from 'lodash'
import { Rating } from 'react-native-ratings';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import { CardSection } from '../../common/CardSection'

var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "6553",
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

  ShareMessage(key){
    console.log("key ",key);
    if(key === null){
      this.setState({ isModalVisibleDeleteSuccess: true })
    }else{
      Share.share(
      {
        message: key
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
    
    
    
  }

  state = {
    index: 0,TextInputValueHolder: '',
    item: [],
    isModalVisibleDeleteSuccess: false,
    routes: [
      { key: 'first', title: 'รายละเอียด' },
      { key: 'second', title: 'โปรโมชัน' },
      { key: 'third', title: 'แผนที่' },
      { key: 'four', title: 'รีวิว' },

    ],

  };

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
          <Image source={require('../../images/drawable-hdpi/ic_notify_sensor.webp')}
            style={{}} />
        </CardSection>
        <CardSection style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 24 }}>ขออภัย ไม่มีข้อมูล</Text>
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

  renderItem() {
    // console.log(this.state.item);
    let shopName = ''
    let totalReview = ''
    let rating = 0
    return _.map(this.state.item, items => {
      // console.log(items.ShopName);
      if (items.ShopName !== undefined) {
        share = items.Facebook_Link
        console.log("share ",share);
        return (
          <View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20, color: 'black' }}>
                {items.ShopName}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'yellow' }}>
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
              <TouchableOpacity onPress={()=> this.ShareMessage(share)}>
                <Image
                  style={{ width: 20, height: 20, marginLeft: 60, justifyContent: 'flex-end', alignItems: 'flex-end' }}
                  source={require('../../images/drawable-hdpi/ic_share_merchant.webp')}
                />
              </TouchableOpacity>
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
                second: PromotionMenu,
                third: GoogleMap,
                four: ReviewMenu

              })}
              onIndexChange={index => this.setState({ index })}
              initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
              swipeEnabled={false}
            />
          </View>

        </View>
        {this.renderModalDeleteSuccess()}
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
