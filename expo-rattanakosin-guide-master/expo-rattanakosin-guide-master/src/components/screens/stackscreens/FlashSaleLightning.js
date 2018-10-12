import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import moment from 'moment'
import Collapsible from 'react-native-collapsible'
import axios from 'axios'
import _ from 'lodash'

var data = {
  "RqAppID": "1234",
  "UserLanguage": "EN",
  "UserID": "",
  "ClientTime": "",
  "MarketID": "3",
  "ShopPromotionType": "A"
}

var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
}


class FlashSaleLightning extends Component {
  state = {
    item: '',
    activeSection: false,
    collapsed: true,
    collapsedC: true,
    icons: {
      'up': require('../../images/drawable-hdpi/ic_arrow_expanable_up.webp'),
      'down': require('../../images/drawable-hdpi/ic_arrow_expanable_down.webp')
    },
    numPresent: undefined,
    numComming: undefined

  }

  _setSection = section => {
    this.setState({ activeSection: section })
  }
  _togglePresent = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  _toggleSoon = () => {
    this.setState({ collapsedC: !this.state.collapsedC })
  }

  componentWillMount() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryFlashSaleService',
      data, config)
      .then(response => { this.setState({ item: response.data }) })
      .catch((error) => {
        console.log('axios error:', error)
      })
  }

  onPresentPress(items) {
    this.props.navigation.navigate('PromotionDetailScreen', {
      items
    })
  }

  _updateNumSoon() {
    let num = 0
    _.map((this.state.item.StaticLocation), (items) => {
      var d1 = items.CurrentDateTime.split(' ')
      var a1 = d1[0].split('/')
      var a2 = d1[1].split(':')
      var Ctime = new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])

      var d2 = items.StartDate.split(' ')
      var b1 = d2[0].split('/')
      var b2 = d2[1].split(':')
      var Stime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])

      var d2 = items.EndDate.split(' ')
      var b1 = d2[0].split('/')
      var b2 = d2[1].split(':')
      var Etime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])
      if (Ctime <= Stime && items.Is_FlashSale === 'Y') {
        num++
      }
      this.setState({ numComming: num })
    })
  }

  _updateNumPresent() {
    let num = 0
    _.map((this.state.item.StaticLocation), (items) => {
      var d1 = items.CurrentDateTime.split(' ')
      var a1 = d1[0].split('/')
      var a2 = d1[1].split(':')
      var Ctime = new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])

      var d2 = items.StartDate.split(' ')
      var b1 = d2[0].split('/')
      var b2 = d2[1].split(':')
      var Stime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])

      var d2 = items.EndDate.split(' ')
      var b1 = d2[0].split('/')
      var b2 = d2[1].split(':')
      var Etime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])

      if (Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'Y') {
        num++
      }
      this.setState({ numPresent: num })
    })
  }

  _renderNowHeader() {
    return (
      <Text style={styles.headerText}>ปัจจุบัน ({this.state.numPresent})</Text>
    )
  }

  _renderSoonHeader() {
    return (
      <Text style={styles.headerText}>เร็วๆ นี้ ({this.state.numComming})</Text>
    )
  }

  _renderOngoingPromotion() {
    let count = null
    if (this.state.numPresent === undefined) {
      this._updateNumPresent()
    } else if (this.state.numPresent) {
      count = _.map((this.state.item.StaticLocation), (items) => {
        var d1 = items.CurrentDateTime.split(' ')
        var a1 = d1[0].split('/')
        var a2 = d1[1].split(':')
        var Ctime = new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])

        var d2 = items.StartDate.split(' ')
        var b1 = d2[0].split('/')
        var b2 = d2[1].split(':')
        var Stime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])

        var d2 = items.EndDate.split(' ')
        var b1 = d2[0].split('/')
        var b2 = d2[1].split(':')
        var Etime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])
        if (Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'Y') {
          return (
            <TouchableOpacity style={styles.content} key={items.Name} onPress={() => this.onPresentPress(items)}>
              <View style={{ flex: 6 }}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flex: 1, marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {items.Name} </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                      source={require('../../images/drawable-hdpi/ic_clock_promotion.webp/')}
                    />
                    {this._renderDate(items)}
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Image
                  source={require('../../images/drawable-hdpi/ic_arrow_right.webp/')}
                />
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
    return count
  }

  _renderSoonPromotion() {
    let num = 0
    let count = null
    if (this.state.numComming === undefined) {
      this._updateNumSoon()
    } else if (this.state.numComming) {
      count = _.map((this.state.item.StaticLocation), (items) => {
        var d1 = items.CurrentDateTime.split(' ')
        var a1 = d1[0].split('/')
        var a2 = d1[1].split(':')
        var Ctime = new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])

        var d2 = items.StartDate.split(' ')
        var b1 = d2[0].split('/')
        var b2 = d2[1].split(':')
        var Stime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])

        var d2 = items.EndDate.split(' ')
        var b1 = d2[0].split('/')
        var b2 = d2[1].split(':')
        var Etime = new Date(b1[2], b1[1], b1[0], b2[0], b2[1], b2[2])
        if (Ctime <= Stime && items.Is_FlashSale === 'Y') {
          num++
          return (
            <TouchableOpacity style={styles.content} key={items.Name} onPress={() => this.onPresentPress(items)}>
              <View style={{ flex: 6 }}>
                <View style={{ flexDirection: 'column' }}>
                  <View style={{ flex: 1, marginBottom: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {items.Name} </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                      source={require('../../images/drawable-hdpi/ic_clock_promotion.webp/')}
                    />
                    {this._renderDate(items)}
                  </View>
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <Image

                  source={require('../../images/drawable-hdpi/ic_arrow_right.webp/')}
                />
              </View>
            </TouchableOpacity>
          )
        }
      })
    }
    return count
  }

  _renderNowChev() {
    if (this.state.collapsed === true) {
      return (
        <Image style={{ width: 15, height: 10, right: 0 }}
          source={this.state.icons.down}
        />
      )
    } else {
      return (
        <Image style={{ width: 15, height: 10, right: 0 }}
          source={this.state.icons.up}
        />
      )
    }

  }

  _renderSoonChev() {
    if (this.state.collapsedC === true) {
      return (
        <Image style={{ width: 15, height: 10, right: 0 }}
          source={this.state.icons.down}
        />
      )
    } else {
      return (
        <Image style={{ width: 15, height: 10, right: 0 }}
          source={this.state.icons.up}
        />
      )
    }
  }

  _renderDate(key) {
    const StartDate = key.StartDate
    const res = StartDate.substring(0, 10)
    const DateBefore = res.split("/")
    const DateAfter = DateBefore[2] + '-' + DateBefore[1] + '-' + DateBefore[0]
    const EndDate = key.EndDate
    const ress = EndDate.substring(0, 10)
    const DataBefore = ress.split("/")
    const DataAfter = DataBefore[2] + '-' + DataBefore[1] + '-' + DataBefore[0]
    const formattedData = moment(DataAfter).format("D MMM YYYY")
    if (DateBefore[2] === DataBefore[2]) {
      const formattedDate = moment(DateAfter).format("D MMM")
      return (
        <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedData} </Text>
      )
    } else {
      const formattedDate = moment(DateAfter).format("D MMM YYYY")
      return (
        <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedData} </Text>
      )
    }
  }

  _renderScreen() {
    if (this.state.numPresent === 0 && this.state.numComming === 0) {
      return (
        <View style={styles.containerflex}>
          <Image
            source={require('../../images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
          />
          <Text style={{ fontSize: 18, color: '#a6a6a6' }} > ไม่มีรายการโปรฟ้าฝ่า </Text>
        </View>
      )
    } else {
      return (
        <ScrollView>
          <TouchableOpacity onPress={this._togglePresent}>
            <View style={styles.header}>
              {this._renderNowHeader()}
              {this._renderNowChev()}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            {this._renderOngoingPromotion()}
          </Collapsible>
          <TouchableOpacity onPress={this._toggleSoon}>
            <View style={styles.header}>
              {this._renderSoonHeader()}
              {this._renderSoonChev()}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsedC} align="center">
            {this._renderSoonPromotion()}
          </Collapsible>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderScreen()}
      </View>
    )
  }
}

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
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row'
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 2
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
})

export default FlashSaleLightning