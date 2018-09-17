import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import {LabelInput, Button, CardSection,} from '../../../common'
import { SocialIcon } from 'react-native-elements'
import {StoreGlobal} from '../../../config/GlobalState'
import axios from 'axios';
import Modal from "react-native-modal";

class LoginForm extends Component {
    static navigationOptions = { header: null }
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false,  userInfo: '', user: '', isModalVisible: false, alert_phone: '' };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _activeModal = () => this.setState({ isModalVisible: true });
    _deactiveModal = () => this.setState({ isModalVisible: false });

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
        ('1886750428085436', { permissions: ['public_profile'] })

        if(type === 'success'){
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            StoreGlobal({type: 'set', key: 'userInfo', value: userInfo})
            this.setState({ userInfo });
            this.onButtonToProfile()
        }
    }

    onButtonLogin(){
        console.log("Number: "+ this.state.phone + " Pass: "+this.state.password)
        const data = {
            "RqAppID":"1234",
            "Email": this.state.phone,
            "Password": this.state.password,
            "UserLanguage":"TH",
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
            if(response.data.ResponseDetail === 'Success'){
                StoreGlobal({type: 'set', key: 'userPhone', value: response.data})
                this.onButtonToProfile()
            }else{
                this.setState({alert_phone:response.data.ResponseDetail})
                this._toggleModal()
            } 
        }
        )
        .catch((error) => {
            console.log('axios error: '+ error )
        });
        

    }

    onButtonToProfile(){
        //this.props.navigation.popToTop()
        const reload = null
        this.props.navigation.navigate(
            'Main', {reload}
          )
    }

    onButtonChangePass(){
        console.log('ChangePass')
        this.props.navigation.navigate('ChangePass');
    }

    onButtonRegister(){
        console.log('Register')
        this.props.navigation.navigate('Register');
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
                        <CardSection style={{paddingLeft:20,  paddingRight: 20}}>
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

    render() {
        return (
            <ImageBackground
            source={ require('../../../images/drawable-hdpi/bg_welcome.webp') }
            style={{width: '100%', height: '100%'}}
            > 
            <View style={{justifyContent: 'center'}}>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <CardSection style={{ justifyContent: 'center', marginTop: 60}}>
                        <Text style={{  fontSize: 40, fontWeight: 'bold' }}>เข้าสู่ระบบ</Text>
                    </CardSection>
                    <CardSection>
                        <LabelInput 
                            label="หมายเลขโทรศัพท์"
                            value={this.state.phone}
                            onChangeText={phone => this.setState({ phone })}
                            autoFocus={true}
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
                        <Button onPress={() => this.onButtonLogin()} 
                            style={{backgroundColor: '#ffc94c'}} 
                            textStyle={{color: '#000'}}>
                            เข้าสู่ระบบ
                        </Button>
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center'}}>
                        <Text style={{  fontSize: 18 }}>หรือ</Text>
                    </CardSection>
                    <CardSection >
                        <SocialIcon style={{ flex: 1, borderRadius: 5 }}
                        title='เข้าสู่ระบบด้วย Facebook'
                        fontStyle={{fontSize:16 }}
                        button
                        type='facebook'
                        onPress={() => this.loginWithFacebook()}
                        />
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => this.onButtonToProfile()}>
                            <Text style={{  fontSize: 20, textDecorationLine: 'underline', color:'#9932CC', }}>ใช้งานแบบไม่ login</Text>
                        </TouchableOpacity >
                    </CardSection>
                </View>
                    <CardSection style={{ marginTop: 35, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.onButtonChangePass()}>
                            <Text style={{  fontSize: 20, color:'#9932CC', }}>ลืมรหัสผ่าน</Text>
                            </TouchableOpacity >
                        <TouchableOpacity onPress={() => this.onButtonRegister()}>
                            <Text style={{  fontSize: 20, color:'#9932CC',  }}>ลงทะเบียน</Text>
                        </TouchableOpacity >
                    </CardSection>
            </View>
            {this.renderModal()}
          </ImageBackground>
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

export default LoginForm