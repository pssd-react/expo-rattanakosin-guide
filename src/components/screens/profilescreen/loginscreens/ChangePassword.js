import React, {Component} from 'react'
import {AppRegistry, Text, View, TouchableOpacity } from 'react-native'
import {HeaderBackButton } from 'react-navigation'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../../common'
import OtpInputs from 'react-native-otp-inputs'
import Ionicons from 'react-native-vector-icons/Ionicons'

export class ChangePassword extends Component {
    static navigationOptions = { header: null }
    state ={ phone: '', 
            password: '', 
            confirm_password: '', 
            otp: '', 
            confirm_otp: '', 
            error: '', 
            loading: false,
            statusOTP: false,
            onButtonOTP: false };


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

    onChangedOTP(){
       
        if(this.state.statusOTP === true){
            console.log('im here')
            if(this.state.onButtonOTP === false){
                return(
                    <CardSection style={{ marginLeft: 30, marginRight: 30 }}>
                        <Button onPress={() => this.setState({onButtonOTP:true})} 
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
                            color: '#000',
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

    renderButtonOTP(){
        if(this.state.onButtonOTP === true){
            return (
                <View style={{flex:1}}>
                <CardSection style={{ marginLeft:15, marginRight:15, flex:3, flexDirection:'column'}}>
                    <View style={{backgroundColor: '#CDC9C9', flex:2, justifyContent:'space-between', alignItems: 'center',flexDirection:'column'}}>  
                        <Text style={{fontSize: 20,height:25}}>กรอกรหัสผ่าน OTP 6 หลัก</Text>
                            <View style={{flex:1}}>
                            <OtpInputs inputStyles={{flex: 1, width: 30, backgroundColor:'#fff',borderRadius:5,color:'#000', borderWidth:1, borderColor:'#aaa'}} 
                            handleChange={code => console.log(code)} 
                            numberOfInputs={6}
                            focusedBorderColor={'#000'}
                            />
                            </View>
                    </View>
                    <View style={{backgroundColor: '#CDC9C9', flex:1, justifyContent:'center', alignItems: 'center',flexDirection:'column'}}>
                    <Text style={{fontSize: 14}}>เลขที่อ้างอิง BYFA, OTP จะหมดอายุภายใน 5 นาที</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Ionicons name={'ios-sync'} size={20} color={'blue'} />
                            <Text style={{fontSize: 16, marginLeft:10}}>ขอรหัสผ่าน OTP</Text>
                        </View>
                    </View>
                </CardSection>
                <CardSection style={{flex: 1, justifyContent:'flex-end',marginLeft:10,marginRight:10}}>
                <Button onPress={() => null} 
                        style={{backgroundColor: '#CDC9C9'}} 
                        textStyle={{color: '#000'}}>
                        ยืนยัน
                    </Button>
            </CardSection>
            </View>
            )
        }
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
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
                            autoFocus={true}
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