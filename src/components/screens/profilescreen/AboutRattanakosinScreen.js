import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { CardSection, Header } from '../../common'
import { HeaderBackButton } from 'react-navigation'
import I18n from '../../config/i18n'

export class AboutRattanakosinScreen extends Component {
    static navigationOptions = { header: null }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    render() {
        return (
            <View>
                <Header headerText={I18n.t('titleAboutGuide')}
                    backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ScrollView>
                    <View style={styles.container}>
                        <CardSection>
                            <Text style={{ fontSize: 30 }}>{I18n.t('headAboutGuide')}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={{ fontSize: 18 }}>{I18n.t('aboutGuide01')}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={{ fontSize: 18 }}>{I18n.t('aboutGuide02')}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={{ fontSize: 18 }}>{I18n.t('aboutGuide03')}</Text>
                        </CardSection>
                        <CardSection>
                            <Text style={{ fontSize: 18 }}>{I18n.t('aboutGuide04')}</Text>
                        </CardSection>
                        <CardSection>
                        <View style={styles.viewBlockStyle} />
                        </CardSection>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff',
        flex: 1
    },
    viewBlockStyle: {
        marginTop: 60,
        flex: 1,
        
    }
})