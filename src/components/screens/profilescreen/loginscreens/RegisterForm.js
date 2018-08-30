import React, {Component} from 'react';
import {AppRegistry, Text, View, StatusBar, TextInput, Animated } from 'react-native';
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../common';

export default class RegisterForm extends Component {
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false };
    
    onButtonPress(){
        const { email, password } = this.state;
        this.setState({error: '', loading: true });

        
    }

    onLoginFail(){
        this.setState({ error: 'Authentication Failed.', loading: false});
    }

    onLoginSuccess(){
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton(){
        if(this.state.loading){
            return <Spinner size="small"/>;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)} style={{backgroundColor: '#CDC9C9'}} textStyle={{color: '#8B8989'}}>
                ต่อไป
            </Button> 
        );
    }

    render() {
        const { container, containerStyle, alignButton, signupTextCont } = styles
        return (
            <View style={container}>
                <View style={containerStyle}>
                    
                </View>
                {/* <View style={container}> */}
                    <View style={containerStyle} >
                        <LabelInput 
                        label="ชื่อผู้ใช้งาน"
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        autoFocus={true}
                        /> 
                    </View>
                    <View style={containerStyle} >
                        <LabelInput 
                        label="หมายเลขโทรศัพท์"
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                        /> 
                    </View>
                    <View style={containerStyle} >
                        <LabelInput 
                        label="รหัสผ่าน"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        /> 
                    </View>
                    <View style={containerStyle} >
                        <LabelInput 
                        label="ยืนยันรหัสผ่าน"
                        value={this.state.confirm_password}
                        onChangeText={confirm_password => this.setState({ confirm_password })}
                        /> 
                    </View>
                    <View style={containerStyle} > 
                        <SignButton label="I Agree to the " sign="Term of user" /> 
                    </View> 
               {/*  </View> */}
                <View style={signupTextCont}>
                   {this.renderButton()}
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

      /*   {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingRight: 30,
            paddingLeft: 30,
          } */
       
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row',
        marginTop: 100 
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