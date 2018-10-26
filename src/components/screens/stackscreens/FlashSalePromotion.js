import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native'
import moment from 'moment'
import Collapsible from 'react-native-collapsible'
import axios from 'axios'
import _ from 'lodash'
import { Spinner } from '../../common';
import I18n from '../../config/i18n'



var config = {
  headers: {
    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
    'Content-Type': 'application/json'
  }
}

class FlashSalePromotion extends Component {
  static navigationOptions = { header: null }
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
    numComming: undefined,
    language: I18n.t('userlanguage')
  }

  componentWillMount() {
    var data = {
      "RqAppID": "1234",
      "UserLanguage": I18n.t('userlanguage'),
      "UserID": "",
      "ClientTime": "",
      "MarketID": "3",
      "ShopPromotionType": "A"
    }
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

  _toggleNow = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  _toggleSoon = () => {
    this.setState({ collapsedC: !this.state.collapsedC })
  }

  _setSection = section => {
    this.setState({ activeSection: section })
  }

  _dateFormating(date) {
    var a1 = date[0].split('/')
    var a2 = date[1].split(':')
    return new Date(a1[2], a1[1], a1[0], a2[0], a2[1], a2[2])
  }

  onPresentPress(items) {
    this.props.screenProps.headerStatusUpdate(false)
    this.props.screenProps.navigation.navigate('resPromotionDetail', {
      items : items,
      headerStatusUpdate : this.props.screenProps.headerStatusUpdate
    })
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

  _renderNowHeader() {
    return (
      <Text style={styles.headerText}> {I18n.t('flashsale_tab_1')} ({this.state.numPresent})</Text>
    )
  }

  _renderSoonHeader() {
    return (
      <Text style={styles.headerText}> {I18n.t('flashsale_tab_2')} ({this.state.numComming})</Text>
    )
  }

  _renderOngoingPromotion() {
    let count = null
    if (this.state.numPresent) {
      count = _.map((this.state.item.StaticLocation), (items) => {
        var dateNow = items.CurrentDateTime.split(' ')
        var Ctime = this._dateFormating(dateNow)

        var dateStart = items.StartDate.split(' ')
        var Stime = this._dateFormating(dateStart)

        var dateEnd = items.EndDate.split(' ')
        var Etime = this._dateFormating(dateEnd)
        if (Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'N') {
          return (
            <TouchableWithoutFeedback  key={items.Name + '_' + items.ShopID} onPress={() => this.onPresentPress(items)}>
              <View style={styles.content}>
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
              </View>
            </TouchableWithoutFeedback>
          )
        }
      })
    }
    return count
  }

  _renderSoonPromotion() {
    let num = 0
    let count = null
    if (this.state.numComming) {
      count = _.map((this.state.item.StaticLocation), (items) => {
        var dateNow = items.CurrentDateTime.split(' ')
        var Ctime = this._dateFormating(dateNow)

        var dateStart = items.StartDate.split(' ')
        var Stime = this._dateFormating(dateStart)

        var dateEnd = items.EndDate.split(' ')
        var Etime = this._dateFormating(dateEnd)
        if (Ctime <= Stime && items.Is_FlashSale === 'N') {
          num++
          return (
            <TouchableWithoutFeedback  key={items.Name} onPress={() => this.onPresentPress(items)}>
              <View style={styles.content}>
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
              </View>
            </TouchableWithoutFeedback>
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
    if(this.state.language === 'TH'){
      if (DateBefore[2] === DataBefore[2]) {
        const DayDate = moment(DateAfter).format("D")
        const MonthDateEN = moment(DateAfter).format("MMM")
        const DateTH = DayDate +" "+this._renderDateTH(MonthDateEN)
        const DayDate2 = moment(DataAfter).format("D")
        const MonthDateEN2 = moment(DataAfter).format("MMM")
        const YearDate2 = moment(DataAfter).format("YYYY")
        var Year2 = parseInt(YearDate2) + 543
        const DateTH2 = DayDate2 +" "+this._renderDateTH(MonthDateEN2)+ " "+ Year2
        return (
          <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {DateTH} - {DateTH2} </Text>
        )
      } else {
        const DayDate = moment(DateAfter).format("D")
        const MonthDateEN = moment(DateAfter).format("MMM")
        const YearDate1 = moment(DateAfter).format("YYYY")
        var Year1 = parseInt(YearDate1) + 543
        const DateTH = DayDate +" "+this._renderDateTH(MonthDateEN) + " " + Year1
        const DayDate2 = moment(DataAfter).format("D")
        const MonthDateEN2 = moment(DataAfter).format("MMM")
        const YearDate2 = moment(DataAfter).format("YYYY")
        var Year2 = parseInt(YearDate2) + 543
        const DateTH2 = DayDate2 +" "+this._renderDateTH(MonthDateEN2)+ " "+ Year2
        return (
          <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {DateTH} - {DateTH2} </Text>
        )
      }
    
    }else{
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
  }


  _renderDateTH(formattedDate){
    if(formattedDate === 'Jan'){
      return formattedDate = 'ม.ค.'
    }else if(formattedDate === 'Feb'){
      return formattedDate = 'ก.พ.'
    }else if(formattedDate === 'Mar'){
      return formattedDate = 'มี.ค.'
    }else if(formattedDate === 'Apr'){
      return formattedDate = 'เม.ย.'
    }else if(formattedDate === 'May'){
      return formattedDate = 'พ.ค.'
    }else if(formattedDate === 'Jun'){
      return formattedDate = 'มิ.ย.'
    }else if(formattedDate === 'Jul'){
      return formattedDate = 'ก.ค.'
    }else if(formattedDate === 'Aug'){
      return formattedDate = 'ส.ค.'
    }else if(formattedDate === 'Sep'){
      return formattedDate = 'ก.ย.'
    }else if(formattedDate === 'Oct'){
      return formattedDate = 'ต.ค.'
    }else if(formattedDate === 'Nov'){
      return formattedDate = 'พ.ย.'
    }else if(formattedDate === 'Dec'){
      return formattedDate = 'ธ.ค.'
    }
}


  _renderScreen() {
    if (this.state.numPresent === 0 && this.state.numComming === 0) {
      return (
        <View style={styles.containerflex}>
          <Image
            source={require('../../images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
          />
          <Text style={{ fontSize: 18, color: '#a6a6a6' }} > {I18n.t('promotiondetail')} </Text>
        </View>
      )
    } else {
      return (
        <ScrollView>
          <TouchableWithoutFeedback onPress={this._toggleNow}>
            <View style={styles.header}>
              {this._renderNowHeader()}
              {this._renderNowChev()}
            </View>
          </TouchableWithoutFeedback>
          <Collapsible collapsed={this.state.collapsed} align="center">
            {this._renderOngoingPromotion()}
          </Collapsible>

          <TouchableWithoutFeedback onPress={this._toggleSoon}>
            <View style={styles.header}>
              {this._renderSoonHeader()}
              {this._renderSoonChev()}
            </View>
          </TouchableWithoutFeedback>

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
    fontWeight: '200',
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

export default FlashSalePromotion