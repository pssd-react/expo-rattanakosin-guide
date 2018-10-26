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
import { GiftVoucherScreen } from './src/components/screens/homelistscreens/GiftVoucherScreen'
import {
  EatScreen,
  ShoppingScreen,
  StaysScreen,
  PlacesScreen
} from './src/components/screens/recommendedscreens/'
import { HomeMenuScreens } from './src/components/screens/homelistscreens'
import { createStackNavigator } from 'react-navigation'
import IntroductionScreen from './src/components/screens/IntroductionScreen';
import { AboutRattanakosinScreen, LanguageMenu, HowToUseScreen, AboutAppScreen } from './src/components/screens/profilescreen';
import LoginForm from './src/components/screens/profilescreen/loginscreens/LoginForm';
import { RegisterForm } from './src/components/screens/profilescreen/loginscreens/RegisterForm';
import { ChangePassword } from './src/components/screens/profilescreen/loginscreens/ChangePassword';
import { RegisterOTP } from './src/components/screens/profilescreen/loginscreens/RegisterOTP';
import ShopDetailScreen from './src/components/screens/ShopDetailScreen';
import writereviwe from './src/components/screens/shopdetailscreens/reviewscreens/WriteReview';
import writereviweUpdate from './src/components/screens/shopdetailscreens/reviewscreens/WriteReviewUpdate';
import { ShopMoreDescriptionScreen } from './src/components/screens/shopdetailscreens/ShopMoreDescriptionScreen';
INITIAL_STATE = {
  lang: 'th',
  alreadyAccessed: false,
  userId: 'none',
  userDisplay: '',
  token: '',
  phone: ''
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

  loginMeth =(userId, userDisplay, token, phone)=>{
    this.setState({
      userId: userId,
      userDisplay: userDisplay,
      token: token,
      phone: phone
    })
  }

  logoutMeth =()=>{
    this.setState({
      userId: 'none',
      userDisplay: '',
      token: '',
      phone: ''
    })
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
        <MainStack screenProps={{ 
          langSet:this.langSet , 
          lang : this.state.lang,
          loginMeth : this.loginMeth,
          logoutMeth : this.logoutMeth,
          userId : this.state.userId,
          userDisplay : this.state.userDisplay,
          token : this.state.token,
          phone : this.state.phone
        }} />
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
  },
  resGiftVoucherScreen : {
    screen: GiftVoucherScreen , navigationOptions: { header: null }
  },
  resEatScreen : {
    screen: EatScreen , navigationOptions: { header: null }
  },
  resShoppingScreen : {
    screen: ShoppingScreen , navigationOptions: { header: null }
  },
  resStaysScreen : {
    screen: StaysScreen , navigationOptions: { header: null }
  },
  resPlacesScreen : {
    screen: PlacesScreen , navigationOptions: { header: null }
  },
  Setting: {
    screen: LanguageMenu, navigationOptions: { header: null }
  },
  HowToUse: {
      screen: HowToUseScreen, navigationOptions: { header: null }
  },
  AboutRattanakosin: {
    screen: AboutRattanakosinScreen, navigationOptions: { header: null }
  },
  AboutApp: {
    screen: AboutAppScreen, navigationOptions: { header: null }
  },
  Login: {
    screen: LoginForm, navigationOptions: { header: null }
  },
  Register: {
    screen: RegisterForm, navigationOptions: { header: null }
  },
  ChangePass: {
    screen: ChangePassword, navigationOptions: { header: null }
  },
  RegisterOTP: {
    screen: RegisterOTP, navigationOptions: { header: null }
  },
  resHomedetail : {
    screen: HomeMenuScreens , navigationOptions: { header: null }
  },
  shopDetail: {
    screen: ShopDetailScreen, navigationOptions: { header: null }
},
writeReview: {
  screen: writereviwe,navigationOptions: { header: null }
},
writeReviewUpdate: {
  screen: writereviweUpdate,navigationOptions: { header: null }
},
moreDescription: {
    screen: ShopMoreDescriptionScreen, navigationOptions:{ header : null}
}
})