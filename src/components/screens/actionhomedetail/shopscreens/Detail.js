import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { Card } from '../../../common/Card';
import { CardSection } from '../../../common/CardSection';
import axios from 'axios'
import _ from 'lodash'
// import ViewMoreText from 'react-native-view-more-text';
import { createStackNavigator, HeaderBackButton } from 'react-navigation'
import Readmore from './readmore/Readmore'
import Communications from 'react-native-communications';
import Modal from "react-native-modal";
import { Button } from 'react-native-elements';



var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108428",
  "UserID": "1",
  "MarketID": "3"

}

var data2 = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108428"
}
var data3 = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "ShopID": "108428"
}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
};

class Detail extends Component {
  state = {

    isModalVisible: false,
    imgs: ''
  }
  state = {
    item: ''
  };
  state = {
    recom: []
  };
  state = {
    img: []
  };



  _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  componentWillMount() {
    // console.disableYellowBox = true;

    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryShopDetailService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });

    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryProductService',
      data2, config)
      .then(response => { this.setState({ img: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });

    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryRecommendedShopService',
      data3, config)
      .then(response => { this.setState({ recom: response.data }) })
      .catch((error) => {
        console.log('axios error:', error);
      });
  }

  onSlidePress(imgs) {
    // console.log(imgs)
    this.setState({ imgs: imgs }, () => {
      this._toggleModal()
    })


  }

  renderTextModal() {

    if (this.state.imgs !== undefined) {
      // console.log(this.state.imgs.thumbnailUrl)
      return (
        <View>
          <Image
            style={{ width: 350, height: 400 }}
            resizeMode="contain"
            source={{ uri: this.state.imgs.thumbnailUrl }}
          />
          <Text style={{ marginTop: 5, fontSize: 20, color: 'white' }}>
            {this.state.imgs.ProductName}
          </Text>

          <Text style={{ marginTop: 10, fontSize: 20, color: 'white' }}>
            {this.state.imgs.ProductDesc}
          </Text>

        </View>

      )

    }


  }

  renderModal() {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
          <View style={{ width: 100, height: 100, right: 0, position: 'absolute', marginTop: 20 }}>
            <Button
              style={{ flex: 1, alignSelf: 'flex-end' }}
              title="X"
              fontSize={20}
              color='white'
              onPress={() => this._toggleModal()} />
          </View>
          <View style={{
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {this.renderTextModal()}
          </View>
        </Modal>
      </View>
    )
  }

  renderImg() {
    //console.log(this.state.recom);
    let img = _.map(this.state.img.ProductHighlight, imgs => {
      console.log(imgs.thumbnailUrl)
      return (
        <TouchableOpacity key={imgs} onPress={() => this.onSlidePress(imgs)}>
          <View style={{ height: 200, width: 150, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', }}>

            <Image
              style={{
                flex: 1, width: null, height: null, resizeMode: 'cover', shadowOffset: { width: 20, height: 20, },
                shadowColor: 'black',
                shadowOpacity: 1.0,
              }}
              source={{ uri: imgs.thumbnailUrl }}
            /><Text style={{ flex: 0.5, fontSize: 18, marginTop: 10, marginLeft: 10 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {imgs.ProductName}
            </Text>
          </View>
        </TouchableOpacity>

      )
    })

    return (

      <ScrollView key={img}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {img}
      </ScrollView>
    )
  }

  renderRecommend() {
    //  console.log(this.state.recom);
    let recom = _.map(this.state.recom, recoms => {
      return _.map(recoms, bbb => {

        if (bbb.ShopName !== undefined) {
          // console.log(bbb.ShopName)
          return (
            <View style={{ height: 200, width: 150, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd', }}>

              <Image
                style={{
                  flex: 1, width: null, height: null, resizeMode: 'cover', shadowOffset: { width: 20, height: 20, },
                  shadowColor: 'black',
                  shadowOpacity: 1.0,
                }}
                source={{ uri: bbb.ImageUrl }}
              />
              <Text style={{ flex: 0.5, fontSize: 18, marginTop: 10, marginLeft: 10 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {bbb.ShopName}
              </Text>
            </View>

          )
        }
      })
    })

    return (<ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {recom}
    </ScrollView>)
  }

  renderPhone() {
    let shopPhone = ''
    _.map(this.state.item, items => {
      // console.log(items.ShopDescription);
      if (items.ShopPhone !== undefined) {
        shopPhone = items.ShopPhone
      }

    })
    return (

      <View >
        <CardSection >
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../images/drawable-hdpi/ic_phone.webp')}
            />
            <TouchableOpacity onPress={() => Communications.phonecall(shopPhone, true)}>
              <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 5, color: 'black',textDecorationLine:'underline' }}>
                {shopPhone}
              </Text>
            </TouchableOpacity>
          </View>
        </CardSection>
      </View>

    )
  }

  renderDescription() {
    // console.log(this.state.item);

    let shopDescription = ''

    _.map(this.state.item, items => {
      // console.log(items.ShopDescription);
      if (items.ShopDescription !== undefined) {
        shopDescription = items.ShopDescription

      }

    })
    return (
      <Text numberOfLines={5}
        ellipsizeMode="tail"
        style={{ color: 'black', fontSize: 16 }}>
        {shopDescription}
      </Text>
    )
  }



  // renderViewMore(onPress) {
  //   return (
  //     <Text onPress={onPress} style={{ color: 'purple', textAlign: 'center' }}>
  //       Read more
  //     </Text>
  //   )
  // }

  // renderViewLess(onPress) {
  //   return (

  //     <View>
  //       <Text onPress={onPress} style={{ color: 'purple', textAlign: 'center' }}>
  //         Read less
  //     </Text>
  //     </View>


  //   )
  // }

  onRowPress() {
    this.props.navigation.navigate('Readmore');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView
        >

          <View style={{ height: 200, marginTop: 20 }}>
            {this.renderImg()}
          </View>



          <View style={{ flex: 1, height: 150, marginTop: 20, borderWidth: 1, borderColor: '#dddddd' }}>
            <CardSection>
              {/* <ViewMoreText
                numberOfLines={3}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{ textAlign: 'center' }}
              >
                <Text>
                  Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.
                </Text>
              </ViewMoreText> */}

              <View >
                {this.renderDescription()}
                <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                  <View>
                    <Text style={{ color: 'purple', textAlign: 'center' }}>
                      Read more
                   </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

            </CardSection>
          </View>


          <View style={{ flex: 1, height: 50, marginTop: 20, borderWidth: 1, borderColor: '#dddddd' }}>

            {this.renderPhone()}
          </View>


          <View style={{ height: 200, marginTop: 20 }}>
            {this.renderRecommend()}
          </View>

        </ScrollView>
        {this.renderModal()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  }, modal: {
    backgroundColor: 'black',
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  }
})


const DetailMenu = createStackNavigator({
  Main: {
    screen: Detail, navigationOptions: { header: null }
  },
  Readmore: {
    screen: Readmore,
  }
})



export { DetailMenu }