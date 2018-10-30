import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ListView,
    Linking,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common'
import I18n from '../../config/i18n'

INITIAL_STATE = {
    dataSource: '',
}

export class HowToUseScreen extends Component {

    static navigationOptions = { header: null }
    state = INITIAL_STATE

    componentWillMount() {
        listData = [
            { 'id': '1', 'section': I18n.t('howToSearch'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/index.html' },
            { 'id': '2', 'section': I18n.t('howToMap'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/help2.html' },
            { 'id': '3', 'section': I18n.t('howToReview'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/help3.html' },
            { 'id': '4', 'section': I18n.t('howToTrip'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/help4.html' },
            { 'id': '5', 'section': I18n.t('howToCreatePin'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/help5.html' },
            { 'id': '6', 'section': I18n.t('howToSettingApp'), 'url': 'https://uat-shop.digitalventures.co.th/rattanakosin/'+I18n.t('linkLang')+'/help6.html' },
        ]
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.setState({ dataSource: ds.cloneWithRows(listData) })
    }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    render() {

        return (
            <View>
                <Header headerText={I18n.t('titleHowToUse')}
                    backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => Linking.openURL(rowData.url)}>
                                <View style={styles.listViewContainer}>
                                    <View style={styles.listViewTextContainer}>
                                        <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                                    </View>
                                    <View style={styles.chevronContainerStyle}>
                                        <Image
                                            source={require('../../images/drawable-hdpi/ic_arrow_right.webp')} />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    contentContainerStyle={{ width: '100%', backgroundColor: '#DDDDDD' }}
                />
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
        flex: 10
    },
    listViewTextStyle: {
        fontSize: 16
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