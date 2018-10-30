import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../../common'
import I18n from '../../../config/i18n'

var listData = [
    {
        'id': '1',
        'section': 'ไทย',
        'language': 'ไทย',
        'code': 'th'
    },
    {
        'id': '2',
        'section': 'English',
        'language': 'English',
        'code': 'en'
    },
    {
        'id': '3',
        'section': '中文',
        'language': '中文',
        'code': 'ch'
    },
]

class SettingLanguage extends Component {
    static navigationOptions = { header: null }
    constructor() {
        super()
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            dataSource: ds.cloneWithRows(listData)
        }
    }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    onRowPress(rowData) {
        if (rowData.id === '1') {
            this.props.screenProps.langSet('th')
        } else if (rowData.id === '2') {
            this.props.screenProps.langSet('en')
        } else if (rowData.id === '3') {
            this.props.screenProps.langSet('ch')
        }
    }

    render() {
        return (
            <View>
                <Header headerText={I18n.t('Language')}
                    backgroundImage={require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => {

                        return (
                            <TouchableWithoutFeedback onPress={() => this.onRowPress(rowData)}>
                                <View style={styles.listViewContainer}>
                                    <View style={styles.listViewTextContainer}>
                                        <Text style={styles.listViewTextStyle}>{rowData.language}</Text>
                                    </View>
                                    <View style={styles.chevronContainerStyle}>
                                        <Image
                                            source={
                                                rowData.code === this.props.screenProps.lang ? require('../../../images/drawable-hdpi/ic_correct_lang.webp') : null
                                            } />
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
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    chevronIconStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SettingLanguage