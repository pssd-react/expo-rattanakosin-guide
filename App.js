import React from 'react'
import AppBottomNavigator from './src/components/AppBottomNavigator'
import { StoreGlobal } from './src/components/config/GlobalState'
import I18n from './src/components/config/i18n'
import { SearchResultScreen } from './src/components/screens/SearchResultScreen'
import { Accommodation } from './src/components/screens/itemscreens/Accommodation'
import { createStackNavigator } from 'react-navigation'
import IntroductionScreen from './src/components/screens/IntroductionScreen';
INITIAL_STATE = {
  lang: 'th'
}

export default class App extends React.Component {
  state = INITIAL_STATE
  componentWillMount() {
    this._defaultLangSetting(this.state.lang)
  }

  _defaultLangSetting(lang) {
    StoreGlobal({ type: 'set', key: 'lang', value: lang })
    I18n.locale = StoreGlobal({ type: 'get', key: 'lang' })
  }

  render() {
    return (
      <MainStack />
    )
  }
}

const MainStack = createStackNavigator({
  introScreen : {
    screen: IntroductionScreen, navigationOptions: { header: null }
  },
  mainApp : {
    screen: AppBottomNavigator, navigationOptions: { header: null }
  },
  resSearchScreen : {
    screen: SearchResultScreen, navigationOptions: { header: null }
  },
  resAccommondation : {
    screen: Accommodation, navigationOptions: { header: null }
  }
})