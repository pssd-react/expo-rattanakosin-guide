import React, {Component} from 'react'
import {Text, View, TouchableOpacity } from 'react-native'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../common'


export default class LoginForm extends Component {
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false };

    render() {
        const { container, containerStyle, alignButton, signupTextCont } = styles
        return (
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
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            /> 
                    </CardSection>
                    <CardSection>
                        <Button onPress={null} 
                            style={{backgroundColor: '#FFA500'}} 
                            textStyle={{color: '#000'}}>
                            เข้าสู่ระบบ
                        </Button>
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center'}}>
                        <Text style={{  fontSize: 18 }}>หรือ</Text>
                    </CardSection>
                    <CardSection>
                       <Button onPress={null} 
                            style={{backgroundColor: '#3b5998'}} 
                            textStyle={{color: '#fff'}}
                            name={'ios-wifi'}>
                            เข้าสู่ระบบด้วย Facebook
                        </Button> 
                        
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center'}}>
                        <TouchableOpacity onPress={null}>
                            <Text style={{  fontSize: 20, textDecorationLine: 'underline', color:'#9932CC', }}>ใช้งานแบบไม่ login</Text>
                        </TouchableOpacity >
                    </CardSection>
                </View>
                    <CardSection style={{ marginTop: 35, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={null}>
                            <Text style={{  fontSize: 20, color:'#9932CC', }}>ลืมรหัสผ่าน</Text>
                            </TouchableOpacity >
                        <TouchableOpacity onPress={null}>
                            <Text style={{  fontSize: 20, color:'#9932CC',  }}>ลงทะเบียน</Text>
                        </TouchableOpacity >
                    </CardSection>
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