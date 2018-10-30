import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native'
import { Button, CardSection, ModalSpinner} from '../common'
import firebase from 'firebase'
import axios from 'axios'
import { SocialIcon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation'
import { StoreGlobal } from '../config/GlobalState'
import { ScrollView } from '../../../node_modules/react-native-gesture-handler'
import Modal from "react-native-modal"
import I18n from '../config/i18n'

const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyAcl5k2W8F5BWDpzSYBkI_jTiYPfi8yLnM",
    authDomain: "rattanakosin-5112f.firebaseapp.com",
    databaseURL: "https://rattanakosin-5112f.firebaseio.com",
    projectId: "rattanakosin-5112f",
    storageBucket: "rattanakosin-5112f.appspot.com",
    messagingSenderId: "796800591279"
}

firebase.initializeApp(firebaseConfig)

const BACKGROUND_URI = require('../images/drawable-hdpi/bg_more.webp/')

class ProfileScreenMain extends Component {
    static navigationOptions = { header: null }
    state = {
        userInfo: '',
        dataSource: '',
        loading: false,
        isModalVisible: false,
        user: '',
        userPhone: undefined
    }

    componentWillMount() {
        this.setState({ isModalVisible: false })
    }

    componentDidMount() {
        this.setState({ isModalVisible: false })
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
    _activeModal = () => this.setState({ isModalVisible: true })
    _deactiveModal = () => this.setState({ isModalVisible: false })

    async loginWithFacebook() {
        const data = {
            "RqAppID":"1234",
            "FacebookID":"",
            "NickName":"",
            "FirstName":"",
            "LastName":"",
            "ProfilePicture":"",
            "Email":"",
            "SessionToken":"287789215160486",
            "UserLanguage":"EN",
            "MarketID":"3"
             }
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
            ( data.SessionToken, { permissions: ['public_profile'] })

        if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),short_name,email`)
            const userInfoFB = await response.json()
            const fullName = userInfoFB.name.split(' ')
            const firstName = fullName[0]
            const lastName = fullName[1]

            let userData ={
                "RqAppID": data.RqAppID,
                "FacebookID":userInfoFB.id,
                "NickName":userInfoFB.short_name,
                "FirstName":firstName,
                "LastName":lastName,
                "ProfilePicture":userInfoFB.picture.data.url,
                "Email":userInfoFB.email,
                "SessionToken": data.SessionToken,
                "UserLanguage": data.UserLanguage,
                "MarketID": data.MarketID
            }
            axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/FacebookLoginService',
            userData, config)
            .then(response => {
               this.props.screenProps.loginMeth(
                   response.data.UserDetail.UserID,
                   response.data.UserDetail.DisplayName,
                   data.SessionToken,
                   response.data.UserDetail.Contact,
                   response.data.UserDetail.Trip  )
               StoreGlobal({ type: 'set', key: 'userInfo', value: userInfoFB })
                this.setState({ userInfoFB })
            })
            .catch((error) => {
                console.log('axios error:', error);
            });

            
        }
    }

    onButtonLoginNumber() {
        this.props.navigation.navigate('Login')
    }

    onButtonRegister() {
        StoreGlobal({ type: 'set', key: 'RegisterStatus', value: { "Status": "FromProfile" } })
        this.props.navigation.navigate('Register')

    }

    onListSetting() {
        
        this.props.navigation.navigate({
            routeName: 'Setting'
        })
    }

    onListHowToUse() {
        this.props.navigation.navigate('HowToUse')
    }

    onListAboutRattanakosin() {
        this.props.navigation.navigate('AboutRattanakosin')
    }

    onListAboutApp() {
        this.props.navigation.navigate('AboutApp')
    }

    onLogOutModal() {
        this.state.loading = true
        this._deactiveModal()
        this._activeModal()
        setTimeout(() => {
            this._toggleModal(),
                this.state.loading = false,
                this.onLogoutSuccess()
        }, 2000)
    }

    onListLogOut() {
        this._activeModal()
    }

    onLogoutSuccess() {
        StoreGlobal({ type: 'set', key: 'userInfo', value: null })
        StoreGlobal({ type: 'set', key: 'userPhone', value: null })
        this.props.screenProps.logoutMeth()
        this.state.userInfoFB = undefined
        this.setState({ loading: false })
    }

    onLoginSuccess() {
        this.setState({ loading: false })
    }

    onLogoutModalRender() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                marginBottom: 130,
                marginTop: 100,
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: { width: 5, height: 5 },
                shadowRadius: 5,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <CardSection style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../images/drawable-hdpi/ic_logout_jj.webp')}
                        style={{ width: 70, height: 70 }} />
                </CardSection>
                <CardSection style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 24 }}>{I18n.t('listSignOut')}</Text>
                </CardSection>
                <CardSection style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 16 }}>{I18n.t('logoutDetail')}</Text>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'flex-end', padding: 0, marginTop: 60 }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderRightWidth: 0.5, borderColor: '#aaa', height: 50 }}
                        onPress={() => this._deactiveModal()}>
                        <Text style={{ fontSize: 16 }}>{I18n.t('buttonCancel')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderLeftWidth: 0.5, borderColor: '#aaa', height: 50 }}
                        onPress={() => this.onLogOutModal()}>
                        <Text style={{ fontSize: 16 }}>{I18n.t('buttonConfirm')}</Text>
                    </TouchableOpacity>
                </CardSection>

            </View>
        )
    }

    _renderUserPhone(userPhone) {
        return (
            <View style={{ alignItems: 'center' }}>
                <CardSection style={{ justifyContent: 'center', marginTop: 20 }}>
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Image
                        source={require('../images/drawable-xhdpi/placeholder_profile_item.webp')}
                        style={{ width: 150, height: 150 }}
                    />
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>{userPhone.UserDetail.DisplayName}</Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={null}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 30 }}
                                    source={require('../images/drawable-hdpi/ic_report_review_item.webp')}
                                />
                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>{I18n.t('textreviewHistory')}</Text>
                                    <Text style={{ fontSize: 20, color: '#fff' }}>0</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 22, height: 28 }}
                                source={require('../images/drawable-hdpi/ic_report_coupon.webp')}
                            />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 16, color: '#fff' }} >{I18n.t('textCoupon')}</Text>
                            </View>
                        </View>
                    </View>
                </CardSection>
            </View>
        )
    }

    _renderUserInfo(userInfoFB) {
        return (
            <View style={{ alignItems: 'center' }}>
                <CardSection style={{ justifyContent: 'center', marginTop: 20 }}>
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Image
                        source={{ uri: userInfoFB.picture.data.url }}
                        style={{ width: 150, height: 150 }}
                    />
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>{userInfoFB.name}</Text>
                </CardSection>
                <CardSection style={{ justifyContent: 'space-between', marginTop: 20 }}>
                    <View style={{ flex: 1, alignItems: 'center', marginLeft: 20 }}>
                        <TouchableOpacity onPress={null}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 25, height: 30 }}
                                    source={require('../images/drawable-hdpi/ic_report_review_item.webp')}
                                />
                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>{I18n.t('textreviewHistory')}</Text>
                                    <Text style={{ fontSize: 20, color: '#fff' }}>0</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 22, height: 28 }}
                                source={require('../images/drawable-hdpi/ic_report_coupon.webp')}
                            />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 16, color: '#fff' }} >{I18n.t('textCoupon')}</Text>
                            </View>
                        </View>
                    </View>
                </CardSection>
            </View>
        )
    }

    _renderProfile() {
        return (
            <View>
                <CardSection style={{ justifyContent: 'center', marginTop: 60 }}>
                    <Text style={{ fontSize: 22, color: '#fff' }}>{I18n.t('titleNotLogin')}</Text>
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <Button onPress={() => this.onButtonLoginNumber()}
                        style={{ backgroundColor: '#ffc94c' }}
                        textStyle={{ color: '#000' }}>
                        {I18n.t('loginWithEmail')}
                        </Button>
                </CardSection>
                <CardSection style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <SocialIcon style={{ flex: 1, borderRadius: 5 }}
                        title={I18n.t('loginWithFacebook')}
                        fontStyle={{ fontSize: 16 }}
                        button
                        type='facebook'
                        onPress={() => this.loginWithFacebook()}
                    />
                </CardSection>
                <CardSection style={{ justifyContent: 'center', marginTop: 18 }}>
                    <TouchableOpacity onPress={() => this.onButtonRegister()}>
                        <Text style={{ fontSize: 16, textDecorationLine: 'underline', color: '#fff', }}>{I18n.t('titleRegister')}</Text>
                    </TouchableOpacity >
                </CardSection>
            </View>
        )
    }

    _renderFacebookButton() {
        this.state.userInfoFB = StoreGlobal({ type: 'get', key: 'userInfo' })
        this.state.userPhone = StoreGlobal({ type: 'get', key: 'userPhone' })
        if (this.state.userPhone) {
            return (
                this._renderUserPhone(this.state.userPhone)
            )
        }
        else if ((!this.state.userInfoFB) || this.state.userInfoFB === "") {
            return (
                this._renderProfile()
            )
        }
        else if (this.state.userInfoFB) {
            return (
                this._renderUserInfo(this.state.userInfoFB)
            )
        }

    }

    _renderEmptyBlog() {
        if (this.state.userInfoFB || this.state.userPhone) {
            return (<View style={styles.viewBlockStyle} />)
        }
    }

    _renderLogoutStack() {
      //  console.log(this.state.userPhone)
        if (this.state.userInfoFB || this.state.userPhone) {
            return (
                <TouchableWithoutFeedback onPress={() => this.onListLogOut()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.iconContainerStyle}>
                            <Image style={{ width: 22, height: 22 }}
                                source={require('../images/drawable-hdpi/ic_more_logout.webp')} />
                        </View>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>{I18n.t('listSignOut')}</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image
                                source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (<View></View>)
        }

    }

    _renderLogoutModal() {
        if (this.state.loading === true) {
            return (
                <ModalSpinner />
            )
        }
        return (
            <Modal isVisible={this.state.isModalVisible} style={{ flex: 1 }}>
                {this.onLogoutModalRender()}
            </Modal>
        )
    }

    render() {
        return (
            <View>
                <ImageBackground
                    source={BACKGROUND_URI}
                    style={styles.thumbnailStyle}
                >
                    {this._renderLogoutModal()}
                    {this._renderFacebookButton()}
                </ImageBackground>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={() => this.onListSetting()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.iconContainerStyle}>
                                <Image style={{ width: 22, height: 22 }}
                                    source={require('../images/drawable-hdpi/ic_more_setting.webp')} />
                            </View>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{I18n.t('listSetting')}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Image
                                    source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.onListHowToUse()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.iconContainerStyle}>
                                <Image style={{ width: 22, height: 22 }}
                                    source={require('../images/drawable-hdpi/ic_more_how_to_use.webp')} />
                            </View>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{I18n.t('listHowToUse')}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Image
                                    source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.onListAboutRattanakosin()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.iconContainerStyle}>
                                <Image style={{ width: 22, height: 22 }}
                                    source={require('../images/drawable-hdpi/ic_more_about_jj.webp')} />
                            </View>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{I18n.t('listAboutGuide')}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Image
                                    source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => this.onListAboutApp()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.iconContainerStyle}>
                                <Image style={{ width: 22, height: 22 }}
                                    source={require('../images/drawable-hdpi/ic_about_jj.webp')} />
                            </View>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{I18n.t('listAboutThisApp')}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Image
                                    source={require('../images/drawable-hdpi/ic_arrow_right.webp/')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {this._renderLogoutStack()}
                </ScrollView>
                {this._renderEmptyBlog()}

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
    },
    thumbnailStyle: {
        height: 360,
        width: '100%'
    },
    listViewTextContainer: {
        flex: 6
    },
    listViewTextStyle: {
        fontSize: 16
    },
    viewBlockStyle: {
        height: '18%'
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

export const ProfileMenu = createStackNavigator({
    Main: {
        screen: ProfileScreenMain
    },
})