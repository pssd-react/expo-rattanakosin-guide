import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    TouchableWithoutFeedback
} from 'react-native'
import { Header } from '../../common'
import { HeaderBackButton } from 'react-navigation'
import I18n from '../../config/i18n'

export class AboutAppScreen extends Component {

    static navigationOptions = { header: null }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    render() {

        return (
            <View>
                <Header headerText={I18n.t('titleAboutThisApp')}
                    backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <TouchableWithoutFeedback onPress={() => Linking.openURL('http://dv.co.th/rattanakosin-guide/terms.html')}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>{I18n.t('textTermsOfUse')}</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image
                                source={require('../../images/drawable-hdpi/ic_arrow_right.webp')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.listViewContainer}>
                    <View style={styles.listViewTextContainer}>
                        <Text style={styles.listViewTextStyle}>{I18n.t('textVersion')}</Text>
                    </View>
                    <View style={styles.chevronContainerStyle}>
                        <Text style={{ color: '#aaa' }}>0.0.1</Text>
                    </View>
                </View>
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
        flexDirection: 'row'
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
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    chevronIconStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})