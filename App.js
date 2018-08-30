import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppBottomNavigator from './src/components/AppBottomNavigator';
//import SettingLanguage from './src/components/screens/settingscreens/SettingLanguage';

export default class App extends React.Component {
  render() {
    return (
        <AppBottomNavigator />
        //<SettingLanguage />
    );
  }
}
