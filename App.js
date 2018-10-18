import React from 'react'
import AppBottomNavigator from './src/components/AppBottomNavigator'
import { StoreGlobal } from './src/components/config/GlobalState'
import I18n from './src/components/config/i18n'
import { SearchResultScreen } from './src/components/screens/SearchResultScreen'
import {
  Restaurants,
  Bank,
  Commercial_Areas,
  Facilities,
  Shop,
  Schools_and_Government,
  Services,
  Travel,
  Accommodation
} from './src/components/screens/itemscreens/'
import  PromotionDetail  from './src/components/screens/stackscreens/PromotionDetail'
import { createStackNavigator } from 'react-navigation'
import IntroductionScreen from './src/components/screens/IntroductionScreen';
INITIAL_STATE = {
  lang: 'th',
  alreadyAccessed: false,
}

export default class App extends React.Component {
  state = INITIAL_STATE

  changeAccessingState =() =>{
    this.setState({
      alreadyAccessed: true
    })
  }

  componentWillMount() {
    this._defaultLangSetting(this.state.lang)
  }

  _defaultLangSetting(lang) {
    StoreGlobal({ type: 'set', key: 'lang', value: lang })
    I18n.locale = StoreGlobal({ type: 'get', key: 'lang' })
  }

  langSet =(lang)=>{
    console.log(lang)
    I18n.locale = lang
    this.setState({
      alreadyAccessed: false,
      lang : lang
    })
  }

  renderIntroduction(){
    if(this.state.alreadyAccessed === false){
      return (
      <IntroductionScreen changeAccessingState={this.changeAccessingState} />
      )
    }else{
      return (
        <MainStack screenProps={{ langSet:this.langSet , lang : this.state.lang}} />
      )
    }
  }

  render() {
    return this.renderIntroduction()
  }
}

const MainStack = createStackNavigator({
  mainApp : {
    screen: AppBottomNavigator, navigationOptions: { header: null }
  },
  resSearchScreen : {
    screen: SearchResultScreen, navigationOptions: { header: null }
  },
  resAccommondation : {
    screen: Accommodation, navigationOptions: { header: null }
  },
  resFacilities : {
    screen: Facilities, navigationOptions: { header: null }
  },
  resCommercial_Areas : {
    screen: Commercial_Areas, navigationOptions: { header: null }
  },
  resShop: {
    screen: Shop, navigationOptions: { header: null }
  },
  resSchools_and_Government : {
    screen: Schools_and_Government, navigationOptions: { header: null }
  },
  resServices: {
    screen: Services, navigationOptions: { header: null }
  },
  resTravel : {
    screen: Travel, navigationOptions: { header: null }
  },
  resRestaurants : {
    screen: Restaurants, navigationOptions: { header: null }
  },
  resBank : {
    screen: Bank, navigationOptions: { header: null }
  },
  resPromotionDetail : {
    screen: PromotionDetail , navigationOptions: { header: null }
  }
})