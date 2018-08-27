import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableOpacity } from 'react-native';
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../common';

export default class ChangePassword extends Component {
    state ={ phone: '', otp: '', confirm_otp: '', error: '', loading: false };
    render() {
        const { container, containerStyle, alignButton, signupTextCont } = styles
        return (
            <View style={{justifyContent: 'center'}}>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <CardSection>
                        <LabelInput 
                            label="เบอร์โทรศัพท์ที่ลงทะเบียน"
                            value={this.state.phone}
                            onChangeText={phone => this.setState({ phone })}
                            autoFocus={true}
                            /> 
                    </CardSection>
                    <CardSection>
                        <LabelInput 
                            label="รหัสผ่านใหม่ 6 หลัก"
                            value={this.state.otp}
                            onChangeText={otp => this.setState({ otp })}
                            /> 
                    </CardSection>
                    <CardSection>
                        <LabelInput 
                            label="ยืนยันรหัสผ่านใหม่"
                            value={this.state.confirm_otp}
                            onChangeText={confirm_otp => this.setState({ confirm_otp })}
                            /> 
                    </CardSection>
                    <CardSection style={{ marginLeft: 30, marginRight: 30 }}>
                        <Button onPress={null} 
                            style={{backgroundColor: '#CDC9C9'}} 
                            textStyle={{color: '#000'}}>
                            ขอรหัส OTP
                        </Button>
                    </CardSection>
                </View>
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