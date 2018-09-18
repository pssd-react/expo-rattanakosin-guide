import React, {Component} from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import {HeaderBackButton } from 'react-navigation'
import {LabelInput, Button, CardSection, Input, Spinner, Header} from '../../../common'
import OtpInputs from 'react-native-otp-inputs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TimerCountdown from 'react-native-timer-countdown'
import {StoreGlobal} from '../../../config/GlobalState'
import axios from 'axios'
import Modal from "react-native-modal"

const config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
}

export class ChangePassword extends Component {
    static navigationOptions = { header: null }
    state ={ phone: '', 
            password: '', 
            confirm_password: '', 
            error: '', 
            loading: false,
            statusOTP: false,
            onButtonOTP: false,
            timer: false,
            codeOTP: '',
            isModalVisible: false,
            isModalSuccess: false,
            alert_phone: '' };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _activeModal = () => this.setState({ isModalVisible: true });
    _deactiveModal = () => this.setState({ isModalVisible: false });
    _successModalTrue = () => this.setState({ isModalSuccess: true });
    _successModalFalse = () => this.setState({ isModalSuccess: false });

    onChangeInput(type,text){
        console.log(text)
        if(type === 'phone'){
        this.setState({phone: text},() =>{
            console.log('password: '+this.state.password)
            if(this.state.phone.length === 10 && this.state.password.length >= 6 && this.state.confirm_password.length >= 6 
                && (this.state.password === this.state.confirm_password)){
                    this.setState({statusOTP: true})               
                    console.log('password: '+this.state.password+' === '+ this.state.confirm_password)
            }else{
                this.setState({statusOTP: false})
            }
        })
        }        
        else if(type === 'password'){
            this.setState({password: text},() =>{
                console.log('password: '+this.state.password)
                if(this.state.phone.length === 10 && this.state.password.length >= 6 && this.state.confirm_password.length >= 6 
                    && (this.state.password === this.state.confirm_password)){
                        this.setState({statusOTP: true})               
                        console.log('password: '+this.state.password+' === '+ this.state.confirm_password)
                }else{
                    this.setState({statusOTP: false})
                }
            })
            
        }
        else if(type === 'confirm'){
            this.setState({confirm_password: text},() =>{
                console.log('password: '+this.state.password)
                if(this.state.phone.length === 10 && this.state.password.length >= 6 && this.state.confirm_password.length >= 6 
                    && (this.state.password === this.state.confirm_password)){
                        this.setState({statusOTP: true})               
                        console.log('password: '+this.state.password+' === '+ this.state.confirm_password)
                }else{
                    this.setState({statusOTP: false})
                }
            })
        }
        return text;
    }

    requireOTP(){
        const data = { 
            "RqAppID":"1234",
            "Mobile": this.state.phone,
            "Type":"2",
            "UserLanguage":"TH"
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/RequestOTPService',
            data, config)
        .then(response =>  {
            console.log(response.data)
            if(response.data.ResponseStatus === '00'){
                console.log(true, response.data.ResponseDetail)
                StoreGlobal({type: 'set', key: 'RequestOTPService', value: {"Phone":this.state.phone,
                                                                            "Password":this.state.password,
                                                                            "ConfirmPassword":this.state.confirm_password,
                                                                            "Reference": response.data.Reference,}})
                this.setState({onButtonOTP:true})
            }else{
                console.log(false, response.data.ResponseDetail)
                this.setState({alert_phone:response.data.ResponseDetail})
                this._toggleModal()
            }
        })
        .catch((error) => {
            console.log('axios error: '+ error )
        });
     
    }

    //Modal
    renderModal(){
        return(
                <Modal isVisible={this.state.isModalVisible} style={{flex:1}}>
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
                            <Text style={{ fontSize: 22}}>ขอโทษค่ะ</Text>
                        </CardSection>
                        <CardSection style={{paddingLeft:20}}>
                            <Text style={{ fontSize: 16}}>{this.state.alert_phone}</Text>
                        </CardSection>
                        <CardSection style={{flex:1, justifyContent: 'flex-end', padding: 0, marginTop:60}}>
                            <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderRightWidth: 0.5, borderColor:'#aaa', height: 50}} 
                                onPress={() => this._deactiveModal()}>
                                    <Text style={{ fontSize: 16}}>ปิด</Text>
                            </TouchableOpacity>
                        </CardSection>
                    </View>
                </Modal>
        )
    }

    renderModalSuccess(){
        return(
                <Modal isVisible={this.state.isModalSuccess} style={{flex:1}}>
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
                            <Image source={require('../../../images/drawable-xxhdpi/ic_success_report.webp')}
                                    style={{width: 70, height: 70}}/>
                        </CardSection>
                        <CardSection style={{paddingLeft:20}}>
                            <Text style={{ fontSize: 22}}>เปลี่ยนรหัสผ่านสำเร็จ</Text>
                        </CardSection>
                        <CardSection style={{paddingLeft:20}}>
                            <Text style={{ fontSize: 16}}>ระบบได้เปลี่ยนรหัสผ่านให้เรียบร้อยแล้ว</Text>
                        </CardSection>
                        <CardSection style={{flex:1, justifyContent: 'flex-end', padding: 0, marginTop:60}}>
                            <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderRightWidth: 0.5, borderColor:'#aaa', height: 50}} 
                                onPress={() => this.onButtonGoBack()}>
                                    <Text style={{ fontSize: 16, color:'#9f4289' }}>ปิด</Text>
                            </TouchableOpacity>
                        </CardSection>
                    </View>
                </Modal>
        )
    }

    onChangedOTP(){
        if(this.state.statusOTP === true){
            if(this.state.onButtonOTP === false){
                return(
                    <CardSection style={{ marginLeft: 30, marginRight: 30 }}>
                        <Button onPress={() => this.requireOTP()} 
                            style={{backgroundColor: '#ffc94c'}} 
                            textStyle={{color: '#000'}}>
                            ขอรหัส OTP
                        </Button>
                    </CardSection>
                )
            }
            
        }else{
            return(
                <CardSection style={{ marginLeft: 30, marginRight: 30 }}>
                    <View style={{flex: 1,
                        alignSelf: 'stretch',
                        backgroundColor: '#CDC9C9',
                        borderRadius: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        height: 50}}> 
                        <Text style={{alignSelf: 'center',
                            color: '#8B8989',
                            fontSize: 16,
                            fontWeight: '600',
                            paddingTop: 10 ,
                            paddingBottom: 10}}>
                        ขอรหัส OTP
                        </Text>
                    </View>
                </CardSection> 
                
            )
        }
    }


    onTimer(){
      
        if( this.state.Timer === true){
            return (
                <View style={{backgroundColor: '#CDC9C9', flex:1, justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
                    <TouchableOpacity  style={{flexDirection:'row'}}
                        onPress={() => this.setState({Timer:false})}>
                        <Ionicons name={'ios-sync'} size={20} color={'blue'} />
                        <Text style={{fontSize: 16, marginLeft:8}}>ขอรหัสผ่าน OTP</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return (
                <View style={{backgroundColor: '#CDC9C9', flex:1, justifyContent:'center', alignItems: 'center',flexDirection:'row'}}>
                    <Text style={{marginRight:5, fontSize: 16, color:'blue'}}>ขอรหัสผ่านใหม่ได้ในอีก</Text>
                    <TimerCountdown
                        initialSecondsRemaining={500*60}
                        onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                        onTimeElapsed={() => this.setState({Timer:true})}
                        allowFontScaling={true}
                        style={{ fontSize: 16, color:'blue' }}
                    />
                </View>
            )
        }
    }

    onButtonConfirm(){
        const RequestOTPService = StoreGlobal({type: 'get', key: 'RequestOTPService'})
        console.log("Number: "+ RequestOTPService.Phone + " Pass: "+ RequestOTPService.Password+ " Confirm: "+ RequestOTPService.ConfirmPassword)
        const data = { 
            "RqAppID":"1234",
            "Mobile": RequestOTPService.Phone,
            "Type":"2",
            "UserLanguage":"TH",
            "OTP": this.state.codeOTP,
            "Reference":RequestOTPService.Reference
        }
        const dataResetPass = { 
            "RqAppID":"1234",
            "UserLanguage":"TH",
            "Contact": RequestOTPService.Phone,
            "NewPassword": RequestOTPService.Password,
            "UserID":"1",
            "SessionToken":""
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/ValidateOTPService',
            data, config)
            .then(response =>  {
                console.log(response.data)
                if(response.data.ResponseStatus === '00'){
                    console.log(true, response.data.ResponseDetail)
                    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/ResetPasswordService',
                    dataResetPass, config)
                    .then(response =>  {
                        console.log(response.data)
                        if(response.data.ResponseStatus === '00'){
                            console.log(true, response.data.ResponseDetail)
                            this._successModalTrue()
                        }else{
                            console.log(false, response.data.ResponseDetail)
                            this.setState({alert_phone:response.data.ResponseDetail})
                            this._toggleModal()
                        }
                    })
                   // this._successModalTrue()
                }else{
                    console.log(false, response.data.ResponseDetail)
                    this.setState({alert_phone:response.data.ResponseDetail})
                    this._toggleModal()
                }
            })
    }

    renderButton(){
        if(this.state.codeOTP.length === 6){
            return (
                <Button onPress={() => this.onButtonConfirm()} 
                    style={{backgroundColor: '#ffc94c'}} 
                    textStyle={{color: '#000'}}>
                    ยืนยัน
                </Button>
            )
        }else{
            return (
                <View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    backgroundColor: '#CDC9C9',
                    borderRadius: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    height: 50}}  >
                    <Text style={{alignSelf: 'center',
                        color: '#8B8989',
                        fontSize: 16,
                        fontWeight: '600',
                        paddingTop: 10 ,
                        paddingBottom: 10}}>
                        ยืนยัน
                    </Text>
                </View> 
            )
        }
        
    }

    renderButtonOTP(){
        if(this.state.onButtonOTP === true){
            return (
                <View style={{flex:1}}>
                <CardSection style={{ marginLeft:15, marginRight:15, flex:3, flexDirection:'column'}}>
                    <View style={{backgroundColor: '#CDC9C9', flex:3, justifyContent:'space-between', alignItems: 'center',flexDirection:'column'}}>  
                        <Text style={{fontSize: 20,height:25}}>กรอกรหัสผ่าน OTP 6 หลัก</Text>
                            <View style={{flex:1}}>
                            <OtpInputs inputStyles={{flex: 1, width: 30, backgroundColor:'#fff',borderRadius:5,color:'#000', borderWidth:1, borderColor:'#aaa'}} 
                            handleChange={code => this.setState({codeOTP:code})} 
                            numberOfInputs={6}
                            focusedBorderColor={'#000'}
                            />
                            </View>
                    </View>
                    <View style={{backgroundColor: '#CDC9C9', flex:1, justifyContent:'center', alignItems: 'center',flexDirection:'column'}}>
                        <Text style={{fontSize: 14}}>เลขที่อ้างอิง BYFA, OTP จะหมดอายุภายใน 5 นาที</Text>
                    </View>
                    {this.onTimer()}
                </CardSection>
                <CardSection style={{flex: 1, justifyContent:'flex-end',marginLeft:10,marginRight:10}}>
                    {this.renderButton()}
                </CardSection>
            </View>
            )
        }
    }

    onButtonGoBack(){
        this._successModalFalse()
        this.props.navigation.navigate('Login')
    }

    render() {
        const { container, containerStyle, alignButton, signupTextCont } = styles
        return (
            
            <View style={{backgroundColor: '#fff', flex: 1, flexDirection:'column'}}>
            <Header headerText="เปลี่ยนรหัสผ่าน" 
                    backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
            <View style={{justifyContent: 'center',paddingTop:10}}>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <CardSection>
                        <LabelInput 
                            label="เบอร์โทรศัพท์ที่ลงทะเบียน"
                            value={this.state.phone}
                            onChangeText={this.onChangeInput.bind(this,'phone')}
                            autoFocus = {true}
                            /> 
                    </CardSection>
                    <CardSection>
                        <LabelInput 
                            label="รหัสผ่านใหม่ 6 หลักขึ้นไป"
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={this.onChangeInput.bind(this,'password')}
                            /> 
                    </CardSection>
                    <CardSection>
                        <LabelInput 
                            label="ยืนยันรหัสผ่านใหม่"
                            secureTextEntry
                            value={this.state.confirm_password}
                            onChangeText={this.onChangeInput.bind(this,'confirm')}
                            /> 
                    </CardSection>
                    {this.onChangedOTP()}
                   
                </View>
            </View>
            {this.renderButtonOTP()}
            {this.renderModal()}
            {this.renderModalSuccess()}
        </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
    container : {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent :'center',
        paddingTop: 200, 
        paddingRight: 30,
        paddingLeft: 30,
       
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row',
        marginTop: 70 
    },
    containerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 60  
    },
    alignButton: {
  /*       flex: 1,
        alignItems:'flex-end', */
        padding: 5,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 65
    }

}