import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import { createStackNavigator, HeaderBackButton } from 'react-navigation'
import SettingLanguage from './settingscreens/SettingLanguage'
import { Header } from '../../common'
import I18n from '../../config/i18n'


class SettingScreen extends Component {

    componentDidMount(){
        console.log(this.props.screenProps)
    }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    onChangeLanguage(){
        this.props.navigation.navigate({
            routeName: 'Language'
        })
    }
    onChangePassword(){
        this.props.navigation.navigate({
            routeName: 'ChangePass'
        })
    }

    renderListChangePassword(){
        if(this.props.screenProps.phone != ''){
            return (
                <TouchableWithoutFeedback onPress={() => this.onChangePassword()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>{I18n.t('settingNewPassword')}</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image source={require('../../images/drawable-hdpi/ic_arrow_right.webp')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        
    }

    render() {
        
        return (
            <View>
                <Header headerText={I18n.t('titleSetting')}
                    backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                    <TouchableWithoutFeedback onPress={() => this.onChangeLanguage()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{I18n.t('Language')}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Text style={[styles.listViewTextStyle, style = { color: '#aaa' }]}>{I18n.t('changelanguage')}</Text>
                                <Image
                                    source={require('../../images/drawable-hdpi/ic_arrow_right.webp')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {this.renderListChangePassword()}
                <View style={styles.viewBlockStyle} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listViewContainer: {
        padding: 10,
        marginBottom: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    thumbnailStyle: {
        height: '57%',
        width: '100%'
    },
    listViewTextContainer: {
        flex: 6
    },
    listViewTextStyle: {
        fontSize: 18
    },
    viewBlockStyle: {
        height: '10%'
    },
    iconStyle: {
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chevronContainerStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    chevronIconStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const LanguageMenu = createStackNavigator({
    Main: {
        screen: SettingScreen, navigationOptions: { header: null }
    },
    Language: {
        screen: SettingLanguage
    }
})

export { SettingScreen, LanguageMenu }