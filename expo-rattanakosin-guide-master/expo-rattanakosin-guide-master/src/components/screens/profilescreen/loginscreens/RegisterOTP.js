import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Linking, } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header } from '../../../common'
import { StoreGlobal } from '../../../config/GlobalState'
import axios from 'axios'
import Modal from "react-native-modal"
import OtpInputs from 'react-native-otp-inputs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TimerCountdown from 'react-native-timer-countdown'

const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

export class RegisterOTP extends Component {
    static navigationOptions = { header: null }
    state = { error: '', loading: false, isModalVisible: false, isModalSuccess: false, alert_phone: '', timer: false, codeOTP: '' }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
    _activeModal = () => this.setState({ isModalVisible: true })
    _deactiveModal = () => this.setState({ isModalVisible: false })
    _successModalTrue = () => this.setState({ isModalSuccess: true })
    _successModalFalse = () => this.setState({ isModalSuccess: false })


    onModalFailedRender() {
        if (this.state.loading === true) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    marginBottom: 270,
                    marginTop: 270,
                    marginLeft: 140,
                    marginRight: 140,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 5, height: 5 },
                    shadowRadius: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner />
                </View>
            )
        }
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
                    <Image source={require('../../../images/drawable-xxhdpi/ic_failure_report.webp')}
                        style={{ width: 70, height: 70 }} />
                </CardSection>
                <CardSection style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 22 }}>ขอโทษค่ะ</Text>
                </CardSection>
                <CardSection style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 16 }}>{this.state.alert_phone}</Text>
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'flex-end', padding: 0, marginTop: 60 }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderRightWidth: 0.5, borderColor: '#aaa', height: 50 }}
                        onPress={() => this._deactiveModal()}>
                        <Text style={{ fontSize: 16 }}>ปิด</Text>
                    </TouchableOpacity>
                </CardSection>
            </View>
        )
    }
    onModalSucceedRender() {
        if (this.state.loading === true) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    marginBottom: 270,
                    marginTop: 270,
                    marginLeft: 140,
                    marginRight: 140,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 5, height: 5 },
                    shadowRadius: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner />
                </View>
            )
        }
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
                <CardSection style={{ flex: 5, alignItems: 'center', justifyContent: 'center', paddingRight: 30 }}>
                    <Image source={require('../../../images/drawable-xxhdpi/ic_register_success.webp')}
                        style={{ width: 130, height: 130 }} />
                </CardSection>
                <CardSection style={{ flex: 1, justifyContent: 'flex-end', padding: 0, marginTop: 60 }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffc94c', borderTopWidth: 1, borderRightWidth: 0.5, borderColor: '#aaa', height: 50 }}
                        onPress={() => this.onButtonToProfile()}>
                        <Text style={{ fontSize: 16 }}>เริ่มต้นการใช้งาน</Text>
                    </TouchableOpacity>
                </CardSection>
            </View>
        )
    }

    onOTPButtonPressed() {
        if (this.state.timer === true) {
            return (
                <View style={{ backgroundColor: '#CDC9C9', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                        onPress={() => this.onRefreshOTP()}>
                        <Ionicons name={'ios-sync'} size={20} color={'blue'} />
                        <Text style={{ fontSize: 16, marginLeft: 8 }}>ขอรหัสผ่าน OTP</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: '#CDC9C9', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ marginRight: 5, fontSize: 16, color: 'blue' }}>ขอรหัสผ่านใหม่ได้ในอีก</Text>
                    <TimerCountdown
                        initialSecondsRemaining={500 * 60}
                        onTimeElapsed={() => this.setState({ timer: true })}
                        allowFontScaling={true}
                        style={{ fontSize: 16, color: 'blue' }}
                    />
                </View>
            )
        }


    }

    onButtonGoBack() {
        this.props.navigation.navigate('Register')
    }

    onButtonToProfile() {
        const RequestOTPService = StoreGlobal({ type: 'get', key: 'RequestOTPService' })
        this.setState({ loading: true })
        this._successModalTrue()
        const dataRegister = {
            "RqAppID": "1234",
            "Email": RequestOTPService.Phone,
            "Password": RequestOTPService.Password,
            "ConfirmPassword": RequestOTPService.ConfirmPassword,
            "DisplayName": RequestOTPService.DisplayName,
            "UserLanguage": "TH"
        }
        const dataLogin = {
            "RqAppID": "1234",
            "Email": RequestOTPService.Phone,
            "Password": RequestOTPService.Password,
            "UserLanguage": "TH",
            "MarketID": "1"
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/EmailRegisterService',
            dataRegister, config)
            .then(response => {
                if (response.data.ResponseDetail === 'Success') {
                    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/EmailLoginService',
                        dataLogin, config)
                        .then(response => {
                            this.setState({ loading: false })
                            this._successModalFalse()
                            if (response.data.ResponseDetail === 'Success') {
                                StoreGlobal({ type: 'set', key: 'userPhone', value: response.data })
                                StoreGlobal({ type: 'set', key: 'RequestOTPService', value: null })
                                this.props.navigation.navigate(
                                    'Main'
                                )
                            } else {
                                console.log("Login Fail")
                            }
                        })
                        .catch((error) => {
                            console.log('axios error: ' + error)
                        })
                } else {
                    console.log("Register Fail")
                }
            })
            .catch((error) => {
                console.log('axios Register error: ' + error)
            })
    }

    onRefreshOTP() {
        const RequestOTPService = StoreGlobal({ type: 'get', key: 'RequestOTPService' })
        this.setState({ timer: false })
        const data = {
            "RqAppID": "1234",
            "Mobile": RequestOTPService.Phone,
            "Type": "1",
            "UserLanguage": "TH"
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/RequestOTPService',
            data, config)
            .then(response => {
                if (response.data.ResponseStatus === '00') {
                    StoreGlobal({
                        type: 'set', key: 'RequestOTPService', value: {
                            "DisplayName": RequestOTPService.DisplayName,
                            "Phone": RequestOTPService.Phone,
                            "Password": RequestOTPService.Password,
                            "ConfirmPassword": RequestOTPService.ConfirmPassword,
                            "Reference": response.data.Reference,
                        }
                    })

                }
            })
    }

    onButtonConfirm() {
        this.setState({ loading: true })
        this._activeModal()
        const RequestOTPService = StoreGlobal({ type: 'get', key: 'RequestOTPService' })
        const data = {
            "RqAppID": "1234",
            "Mobile": RequestOTPService.Phone,
            "Type": "1",
            "UserLanguage": "TH",
            "OTP": this.state.codeOTP,
            "Reference": RequestOTPService.Reference
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/ValidateOTPService',
            data, config)
            .then(response => {
                this.setState({ loading: false })
                this._deactiveModal()
                if (response.data.ResponseStatus === '00') {
                    this._successModalTrue()
                } else {
                    this.setState({ alert_phone: response.data.ResponseDetail })
                    this._toggleModal()
                }
            })
    }

    _renderFailedModal() {
        return (
            <Modal isVisible={this.state.isModalVisible} style={{ flex: 1 }}>
                {this.onModalFailedRender()}
            </Modal>
        )
    }
    _renderSucceedModal() {
        return (
            <Modal isVisible={this.state.isModalSuccess} style={{ flex: 1 }}>
                {this.onModalSucceedRender()}
            </Modal>
        )
    }

    renderButton() {
        if (this.state.codeOTP.length !== "") {
            return (
                <Button onPress={() => this.onButtonConfirm()}
                    style={{ backgroundColor: '#9f4289' }}
                    textStyle={{ color: '#fff' }}>
                    ยืนยัน
                </Button>
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    backgroundColor: '#CDC9C9',
                    borderRadius: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    height: 50
                }}  >
                    <Text style={{
                        alignSelf: 'center',
                        color: '#8B8989',
                        fontSize: 16,
                        fontWeight: '600',
                        paddingTop: 10,
                        paddingBottom: 10
                    }}>
                        ยืนยัน
                    </Text>
                </View>
            )
        }
    }

    render() {
        const { viewStyle, textStyle } = styles

        return (
            <View style={{ backgroundColor: "#fff", flex: 1 }}>
                <Header headerText="ลงทะเบียน"
                    backgroundImage={require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />

                <View style={viewStyle}>
                    <Text style={textStyle}> ยืนยัน OTP </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 5 }}>

                    <CardSection style={{ marginLeft: 10, marginRight: 10, flex: 3, flexDirection: 'column', }}>
                        <View style={{ backgroundColor: '#CDC9C9', flex: 3, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', }}>
                            <Text style={{ fontSize: 20, height: 25 }}>กรอกรหัสผ่าน OTP 6 หลัก</Text>
                            <View style={{ flex: 1 }}>
                                <OtpInputs inputStyles={{ flex: 1, width: 30, backgroundColor: '#fff', borderRadius: 5, color: '#000', borderWidth: 1, borderColor: '#aaa' }}
                                    handleChange={code => (code.length === 6) ? this.setState({ codeOTP: code }) : null}
                                    numberOfInputs={6}
                                    focusedBorderColor={'#000'}
                                />
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#CDC9C9', flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontSize: 14 }}>เลขที่อ้างอิง BYFA, OTP จะหมดอายุภายใน 5 นาที</Text>
                        </View>
                        {this.onOTPButtonPressed()}
                    </CardSection>
                    <CardSection style={{ flex: 2, justifyContent: 'center', marginLeft: 10, marginRight: 10 }} >
                    </CardSection>
                    <CardSection style={{ flex: 1, justifyContent: 'flex-end', marginLeft: 10, marginRight: 10 }}>
                        {this.renderButton()}
                    </CardSection>
                </View>
                {this._renderFailedModal()}
                {this._renderSucceedModal()}
            </View>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 200,
        paddingRight: 30,
        paddingLeft: 30,

    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
        marginTop: 40
    },
    containerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 60
    },
    alignButton: {
        padding: 5,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 65
    },
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        position: 'relative',
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 18,
        color: "#000"
    }
}