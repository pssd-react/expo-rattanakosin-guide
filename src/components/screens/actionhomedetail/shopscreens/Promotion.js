import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import { CardSection } from '../../../../components/common'
import PromotionDetail from './promotion/PromotionDetail'
import { createStackNavigator } from 'react-navigation'

var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "UserID": "1",
  "ClientTime": "",
  "MarketID": "3",
  "ShopPromotionType": "A"
}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
};



class Promotion extends Component {


  state = {
    item: '',
    isDatePromo: '',
    numPresent: '',
    numComming: ''
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000)
    this._updateNumPresent()
    this._updateNumSoon()
    this.fetchData()
  }
  componentWillMount() {

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
      this.fetchData()
    }, 2000);
  }

  fetchData() {
      axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryFlashSaleService',
      data, config)
      .then(response => {
        this.setState({
          item: response.data
        }, () => {
          this._updateNumPresent()
          this._updateNumSoon()
        })
      })
      .catch((error) => {
        console.log('axios error:', error)
      })
  }

  onPresentPress(Promotion) {
    this.props.navigation.navigate('PromotionDetail', { Promotion });
  }
  
  _updateNumPresent() {
    let num = 0
    _.map((this.state.item.StaticLocation), (items) => {
      var dateNow = items.CurrentDateTime.split(' ')
      var Ctime = this._dateFormating(dateNow)

      var dateStart = items.StartDate.split(' ')
      var Stime = this._dateFormating(dateStart)

      var dateEnd = items.EndDate.split(' ')
      var Etime = this._dateFormating(dateEnd)
      if (Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'N') {
        num++
      }
      this.setState({ numPresent: num })
    })
  }

  _updateNumSoon() {
    let num = 0
    _.map((this.state.item.StaticLocation), (items) => {
      var dateNow = items.CurrentDateTime.split(' ')
      var Ctime = this._dateFormating(dateNow)

      var dateStart = items.StartDate.split(' ')
      var Stime = this._dateFormating(dateStart)

      var dateEnd = items.EndDate.split(' ')
      var Etime = this._dateFormating(dateEnd)
      if (Ctime <= Stime && items.Is_FlashSale === 'N') {
        num++
      }
      this.setState({ numComming: num })
    })
  }

  CreatedDate(key) {

    // console.log("Date", key) 
    const resDateStart = key.StartDate.substring(0, 10)
    const resEndDate = key.EndDate.substring(0, 10)
    // const resT = key.substring(11, 16)
    const DateBeforeS = resDateStart.split("/")
    const DateBeforeE = resEndDate.split("/")

    const DateAfterS = DateBeforeS[2] + '-' + DateBeforeS[1] + '-' + DateBeforeS[0]
    const DateAfterE = DateBeforeE[2] + '-' + DateBeforeE[1] + '-' + DateBeforeE[0]

    // const formattedDataS = moment(DateAfterS).format("D MMM YYYY")
    const formattedDataE = moment(DateAfterE).format("D MMM YYYY")


    if (DateBeforeS[2] === DateBeforeE[2]) {
      const formattedDate = moment(DateAfterS).format("D MMM")
      let isDatePromo = ''
      isDatePromo = formattedDate
      return (
        <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedDataE} </Text>

      )
    } else {
      const formattedDate = moment(DateAfterS).format("D MMM YYYY")
      // this.setState({ isDatePromo: formattedDate })
      return (
        <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedDataE} </Text>
      )
    }

  }

  _dateFormating(date) {
    var a1 = date[0].split('/')
    var a2 = date[1].split(':')
    return new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])
  }

  renderPromotionSoon() {
    // console.log("Pomotion",this.state.item)
    return _.map(this.state, item => {
      return _.map(item.StaticLocation, Promotion => {
        // console.log("Time cur", this.state.curTime)
        var dateNow = Promotion.CurrentDateTime.split(' ')
        var Ctime = this._dateFormating(dateNow)

        var dateStart = Promotion.StartDate.split(' ')
        var Stime = this._dateFormating(dateStart)
        // console.log("DateEnd ", DateEnd)
        if (Ctime <= Stime && Promotion.Is_FlashSale === 'N') {
          return (
            <TouchableOpacity onPress={() => this.onPresentPress(Promotion)}>
              <CardSection style={{ borderTopWidth: 1, }}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: '5%' }}>
                      {Promotion.Name}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '5%', marginTop: 10, marginBottom: 10 }}>
                    <Image
                      source={require('../../../images/drawable-hdpi/ic_clock_promotion.webp/')}
                    />
                    {this.CreatedDate(Promotion)}
                  </View>
                </View>
              </CardSection>
            </TouchableOpacity>
          )
        }

      })
    })
  }

  renderPromotionNow() {
    // console.log("Pomotion",this.state.item)

    return _.map(this.state, item => {
      return _.map(item.StaticLocation, Promotion => {
        // console.log("Time cur", this.state.curTime)
        var dateNow = Promotion.CurrentDateTime.split(' ')
        var Ctime = this._dateFormating(dateNow)

        var dateStart = Promotion.StartDate.split(' ')
        var Stime = this._dateFormating(dateStart)

        var dateEnd = Promotion.EndDate.split(' ')
        var Etime = this._dateFormating(dateEnd)
        // console.log("DateEnd ", DateEnd)
        if (Ctime >= Stime && Ctime <= Etime && Promotion.Is_FlashSale === 'N') {
          return (
            <TouchableOpacity onPress={() => this.onPresentPress(Promotion)}>
              <CardSection style={{ borderTopWidth: 1, }}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: '5%' }}>
                      {Promotion.Name}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '5%', marginTop: 10, marginBottom: 10 }}>
                    <Image
                      source={require('../../../images/drawable-hdpi/ic_clock_promotion.webp/')}
                    />
                    {this.CreatedDate(Promotion)}
                  </View>
                </View>
              </CardSection>
            </TouchableOpacity>
          )
        }

      })
    })
  }

  render() {
    if (this.state.numPresent === 0 && this.state.numComming === 0) {
      return (
        <View  style={styles.containerflex}>
          <Image
            source={require('../../../images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
          />
          <Text style={{ fontSize: 18, color: '#a6a6a6' }} >
            ยังไม่มีรายการโปรโมชัน
          </Text>
        </View>
      )
    } else {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <View style={{ flex: 1 }}>
            <View>
              <View >
                <Text style={{ height: 35, marginTop: 25, paddingLeft: '5%' }}>
                  ● โปรโมชันวันนี้
             </Text>
                <View>
                  {this.renderPromotionNow()}
                </View>
              </View>
            </View>
            <View >
              <Text style={{ height: 35, marginTop: 25, paddingLeft: '5%' }}>
                ● เร็วๆนี้
            </Text>
              <View>
                {this.renderPromotionSoon()}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}


const PromotionMenu = createStackNavigator({
  Main: {
    screen: Promotion, navigationOptions: { header: null }
  },
  PromotionDetail: {
    screen: PromotionDetail,
  },

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  containerflex: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center'
  }
})




export { PromotionMenu }

