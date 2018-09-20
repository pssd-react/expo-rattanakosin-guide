import React from 'react'
import AppBottomNavigator from './src/components/AppBottomNavigator'
import { StoreGlobal } from './src/components/config/GlobalState'
import I18n from './src/components/config/i18n'

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
      <AppBottomNavigator />
    )
  }
}
