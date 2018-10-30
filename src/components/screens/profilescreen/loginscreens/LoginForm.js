import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ImageBackground, Image,TextInput } from 'react-native'
import {LabelInput, Button, CardSection, ModalSpinner} from '../../../common'
import { SocialIcon } from 'react-native-elements'
import {StoreGlobal} from '../../../config/GlobalState'
import axios from 'axios'
import Modal from "react-native-modal"
import I18n from '../../../config/i18n'

const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

class LoginForm extends Component {
    static navigationOptions = { header: null }
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false,  userInfo: '', user: '', isModalVisible: false, alert_phone: '' }
  
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
    _activeModal = () => this.setState({ isModalVisible: true })
    _deactiveModal = () => this.setState({ isModalVisible: false })

    async loginWithFacebook(){
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
                   '',
                   response.data.UserDetail.Contact,
                   response.data.UserDetail.Trip  )
               StoreGlobal({ type: 'set', key: 'userInfo', value: userInfoFB })
                this.setState({ 
                    userInfoFB
                 },()=>{
                    this.onButtonToProfile()})
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
        }
    }

    onButtonLogin(){
        this.setState({loading:true})
        this._activeModal()
        console.log("Number: "+ this.state.phone + " Pass: "+this.state.password)
        const data = {
            "RqAppID":"1234",
            "Email": this.state.phone,
            "Password": this.state.password,
            "UserLanguage": I18n.t('serviceLang'),
            "MarketID":"1"
        }
        const config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type': 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/EmailLoginService',
            data, config)
        .then(response =>  {
            this.setState({loading:false})
            this._deactiveModal()
            if(response.data.ResponseDetail === 'Success'){
                //console.log(this.props.screenProps)
                this.props.screenProps.loginMeth(
                    response.data.UserDetail.UserID,
                    response.data.UserDetail.DisplayName,
                    response.data.UserDetail.SessionToken,
                    response.data.UserDetail.Contact,
                    response.data.UserDetail.Trip  )
                StoreGlobal({type: 'set', key: 'userPhone', value: response.data})
                this.onButtonToProfile()
            }else if(response.data.ResponseDetail === ' Email is Require Or Not Empty  ,  Password is Require Or Not Empty ' || response.data.ResponseDetail === ' Email is Require Or Not Empty '){
                this.setState({alert_phone:I18n.t('aleartPhone')})
                this._toggleModal()
            }else if(response.data.ResponseDetail === ' Password is Require Or Not Empty '){
                this.setState({alert_phone:I18n.t('aleartPassword')})
                this._toggleModal()
            }else{
                this.setState({alert_phone:response.data.ResponseDetail})
                this._toggleModal()
            } 
        }
        )
        .catch((error) => {
            console.log('axios error: '+ error )
        })
    }

    onButtonToProfile(){
        const reload = null
        const fromScreen = this.props.navigation.getParam('fromScreen', 'none')
        
        if(fromScreen === 'none'){
            this.props.navigation.navigate(
                'Main', {reload}
              )
        }else{
            this.props.navigation.goBack()
        }

        
    }

    onButtonChangePass(){
        this.props.navigation.navigate('ChangePass')
    }

    onButtonRegister(){
        StoreGlobal({type: 'set', key: 'RegisterStatus', value: {"Status":"FromLogin"}})
        this.props.navigation.navigate('Register')
    }

    onModalRender(){
        return(
            <View style={{ flex: 1, 
                backgroundColor: '#fff', 
                marginBottom:130, 
                marginTop:100,
                borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: { width: 5, height: 5 },
                shadowRadius: 5,
                flexDirection: 'column',
                justifyContent: 'space-between',}}>
                    <CardSection style={{flex:3, alignItems:'center', justifyContent:'center'}}>
                        <Image source={require('../../../images/drawable-xxhdpi/ic_failure_report.webp')}
                                style={{width: 70, height: 70}}/>
                    </CardSection>
                    <CardSection style={{paddingLeft:20}}>
                        <Text style={{ fontSize: 22}}>{I18n.t('commonError')}</Text>
                    </CardSection>
                    <CardSection style={{paddingLeft:20,  paddingRight: 20}}>
                        <Text style={{ fontSize: 16}}>{this.state.alert_phone}</Text>
                    </CardSection>
                    <CardSection style={{flex:1, justifyContent: 'flex-end', padding: 0, marginTop:60}}>
                        <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderRightWidth: 0.5, borderColor:'#aaa', height: 50}} 
                            onPress={() => this._deactiveModal()}>
                                <Text style={{ fontSize: 16}}>{I18n.t('buttonClose')}</Text>
                        </TouchableOpacity>
                    </CardSection>
                </View>
        )
    }

    _renderModal(){
        if(this.state.loading === true){
            return (
                <ModalSpinner/>
            )
        }
        return(
            <Modal isVisible={this.state.isModalVisible} style={{flex:1}}>
                {this.onModalRender()}
            </Modal>
        )
    }

    render() {
        return (
            <ImageBackground
            source={ require('../../../images/drawable-hdpi/bg_welcome.webp') }
            style={{width: '100%', height: '100%'}}
            > 
                <View style={{justifyContent: 'center', flex:1}}>
                    <View style={{ marginLeft: 30, marginRight: 30 , flex:1}}>
                        <CardSection style={{ justifyContent: 'center', marginTop: 60}}>
                            <Text style={{  fontSize: 40, fontWeight: 'bold' }}>{I18n.t('titleLogin')}</Text>
                        </CardSection>
                        <CardSection >
                            <LabelInput 
                                label={I18n.t('placeholderPhone')}
                                value={this.state.phone}
                                onChangeText={phone => this.setState({ phone })}
                                autoFocus={true}
        
                                /> 
                        </CardSection>
                        <CardSection>
                            <LabelInput 
            
                                label={I18n.t('placeholderPassword')}
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                        
                            /> 
                        </CardSection>
                        <CardSection>
                            <Button onPress={() => this.onButtonLogin()} 
                                style={{backgroundColor: '#ffc94c'}} 
                                textStyle={{color: '#000'}}>
                                {I18n.t('buttonLogin')}
                            </Button>
                        </CardSection>
                        <CardSection style={{ justifyContent: 'center'}}>
                            <Text style={{  fontSize: 18 }}>{I18n.t('titleOR')}</Text>
                        </CardSection>
                        <CardSection >
                            <SocialIcon style={{ flex: 1, borderRadius: 5 }}
                            title={I18n.t('loginWithFacebook')}
                            fontStyle={{fontSize:16 }}
                            button
                            type='facebook'
                            onPress={() => this.loginWithFacebook()}
                            />
                        </CardSection>
                        <CardSection style={{ justifyContent: 'center'}}>
                            <TouchableOpacity onPress={() => this.onButtonToProfile()}>
                                <Text style={{  fontSize: 20, textDecorationLine: 'underline', color:'#9932CC', }}>{I18n.t('titleSkip')}</Text>
                            </TouchableOpacity >
                        </CardSection>
                    </View>
                    <View style={{flex:1, justifyContent: 'flex-end'}}>
                        <CardSection style={{ justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => this.onButtonChangePass()}>
                                <Text style={{  fontSize: 20, color:'#9932CC', }}>{I18n.t('titleforgetPassword')}</Text>
                                </TouchableOpacity >
                            <TouchableOpacity onPress={() => this.onButtonRegister()}>
                                <Text style={{  fontSize: 20, color:'#9932CC',  }}>{I18n.t('titleRegister')}</Text>
                            </TouchableOpacity >
                        </CardSection>
                    </View>
                </View>
            {this._renderModal()}
          </ImageBackground>
        )
    }
}

export default LoginForm