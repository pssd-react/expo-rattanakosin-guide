import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity,Linking,} from 'react-native';
import {HeaderBackButton } from 'react-navigation'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../../common';
import {StoreGlobal} from '../../../config/GlobalState'
import axios from 'axios';
import Modal from "react-native-modal";

export class RegisterForm extends Component {
    static navigationOptions = {header: null}
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false, isModalVisible: false, alert_phone:'' };
    
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _activeModal = () => this.setState({ isModalVisible: true });
    _deactiveModal = () => this.setState({ isModalVisible: false });

    onButtonPress(){
        console.log("Name: "+this.state.name+" Number: "+ this.state.phone + " Pass: "+this.state.password+ " com_Pass: "+this.state.confirm_password)
        if(this.state.password < 6 ){

            this.setState({alert_phone: "รหัสผ่าน ต้องมีความยาวไม่น้อยกว่า 6 ตัวอักษร"})
            this._toggleModal()
        }else if(this.state.confirm_password !== this.state.password){
            this.setState({alert_phone: "โปรดระบุรหัสผ่านให้ตรงกัน"})
            this._toggleModal()
        }else{
            this.setState({loading:true})
            this._activeModal()
            const data = { 
                "RqAppID":"1234",
                "Mobile": this.state.phone,
                "Type":"1",
                "UserLanguage":"TH"
            }
            const config = {
                headers: {
                    'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                    'Content-Type': 'application/json'
                }
            }
            axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/RequestOTPService',
                data, config)
            .then(response =>  {
                console.log(response.data)
                this.setState({loading:false})
                this._deactiveModal()
                if(response.data.ResponseStatus === '00'){
                    console.log(true, response.data.ResponseDetail)
                    StoreGlobal({type: 'set', key: 'RequestOTPService', value: {"DisplayName":this.state.name, 
                                                                                "Phone":this.state.phone,
                                                                                "Password":this.state.password,
                                                                                "ConfirmPassword":this.state.confirm_password,
                                                                                "Reference": response.data.Reference,}})
                    this.onButtonRegisterOTP()
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
        
    }

    //Modal
    renderModal(){
        return(
                <Modal isVisible={this.state.isModalVisible} style={{flex:1}}>
                   {this.modalRender()}
                </Modal>
        )
    }
    
    //ViewInModal
    modalRender(){
        if(this.state.loading === true){
            return (
                <View style={{ flex: 1, 
                    backgroundColor: '#fff', 
                    marginBottom:270, 
                    marginTop:270,
                    marginLeft:140,
                    marginRight:140,
                    borderRadius: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 5, height: 5 },
                    shadowRadius: 5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                <Spinner/>
            </View>
            )
        }
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
                        <Text style={{ fontSize: 22}}>ลงทะเบียนไม่สำเสร็จ</Text>
                    </CardSection>
                    <CardSection style={{paddingLeft:20, paddingRight: 20}}>
                        <Text style={{ fontSize: 16}}>{this.state.alert_phone}</Text>
                    </CardSection>
                    <CardSection style={{flex:1, justifyContent: 'flex-end', padding: 0, marginTop:60}}>
                        <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderRightWidth: 0.5, borderColor:'#aaa', height: 50}} 
                            onPress={() => this._deactiveModal()}>
                                <Text style={{ fontSize: 16}}>ปิด</Text>
                        </TouchableOpacity>
                    </CardSection>
                </View>
        )
    }

    renderButton(){
        if(this.state.name !== '' && this.state.phone !== '' && this.state.password !== '' && this.state.confirm_password !== ''){
            return (
                <Button onPress={()=>this.onButtonPress()} style={{backgroundColor: '#9f4289'}} textStyle={{color: '#fff'}}>
                    ต่อไป
                </Button> 
            );
        }
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
                    ต่อไป
                </Text>
            </View> 
        );
    }

    onButtonGoBack(){
       const Register = StoreGlobal({type: 'get', key: 'RegisterStatus'})
       if(Register.Status === "FromProfile"){
            StoreGlobal({type: 'set', key: 'RegisterStatus', value: null})
            this.props.navigation.popToTop()
       }else if(Register.Status === "FromLogin"){
            StoreGlobal({type: 'set', key: 'RegisterStatus', value: null})
            this.props.navigation.navigate('Login')
       }
    }

    onButtonRegisterOTP(){
        console.log('RegisterOTP')
        this.props.navigation.navigate('RegisterOTP');
    }

    render() {
        const { container, containerStyle, alignButton, signupTextCont, viewStyle, textStyle } = styles
      
        return (
            <View style={{backgroundColor: "#fff", flex: 1}}>
                <Header headerText="ลงทะเบียน" 
                    backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>

                <View style={viewStyle}>
                    <Text style={textStyle}> กรอกข้อมูลส่วนตัว </Text>
                </View>
                <View style={{justifyContent: 'center',marginTop:5}}>
                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <CardSection>
                            <LabelInput 
                                label="ชื่อผู้ใช้งาน"
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                                autoFocus={true}
                                /> 
                        </CardSection>
                        <CardSection>
                            <LabelInput 
                                label="หมายเลขโทรศัพท์"
                                value={this.state.phone}
                                onChangeText={phone => this.setState({ phone })}
                                /> 
                        </CardSection>
                        <CardSection>
                            <LabelInput 
                                label="รหัสผ่าน" 
                                secureTextEntry
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                                /> 
                        </CardSection>
                        <CardSection>
                            <LabelInput 
                                label="ยืนยันรหัสผ่าน" 
                                secureTextEntry
                                value={this.state.confirm_password}
                                onChangeText={confirm_password => this.setState({ confirm_password })}
                                /> 
                        </CardSection>
                        <View  > 
                            <SignButton label="I Agree to the " sign="Term of user" onPress={() => Linking.openURL('http://dv.co.th/rattanakosin-guide/terms.html')}/> 
                        </View> 
                        <View style={signupTextCont}>
                            {this.renderButton()}
                        </View> 
                    </View>
                </View>
                {this.renderModal()}
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
  /*       flex: 1,
        alignItems:'flex-end', */
        padding: 5,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 65
    },
    viewStyle : {
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        position: 'relative',
        flexDirection: 'row',
    },
    textStyle : {
        fontSize: 18,
        color: "#000"
    }

}