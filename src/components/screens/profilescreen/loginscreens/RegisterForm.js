import React, {Component} from 'react';
import {AppRegistry, Text, View, StatusBar, TextInput, Animated } from 'react-native';
import {HeaderBackButton } from 'react-navigation'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../../common';

export class RegisterForm extends Component {
    static navigationOptions = {header: null}
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

    onButtonGoBack(){
        this.props.navigation.popToTop()
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
                <View style={{justifyContent: 'center', marginTop: 20}}>
                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <CardSection>
                            <LabelInput 
                                label="ชื่อผู้ใช้งาน"
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                                autoFocus={false}
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
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                                /> 
                        </CardSection>
                        <CardSection>
                            <LabelInput 
                                label="ยืนยันรหัสผ่าน"
                                value={this.state.confirm_password}
                                onChangeText={confirm_password => this.setState({ confirm_password })}
                                /> 
                        </CardSection>
                        <View  > 
                            <SignButton label="I Agree to the " sign="Term of user" /> 
                        </View> 
                        <View style={signupTextCont}>
                            {this.renderButton()}
                        </View> 
                    </View>
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