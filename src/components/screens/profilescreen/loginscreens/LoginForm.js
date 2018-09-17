import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ImageBackground, BackHandler } from 'react-native'
import {LabelInput, Button, CardSection,} from '../../../common'
import {createStackNavigator} from 'react-navigation'
import { SocialIcon } from 'react-native-elements'
import { ProfileScreenMain } from '../../ProfileScreenMain'
import {StoreGlobal} from '../../../config/GlobalState'

class LoginForm extends Component {
    static navigationOptions = { header: null }
    state ={ name: '', phone: '', password: '', confirm_password: '', error: '', loading: false,  userInfo: '', user: '' };

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
        ('287789215160486', { permissions: ['public_profile'] })

        if(type === 'success'){
           
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            this.setState({ userInfo });
            //console.log(userInfo)
            StoreGlobal({type: 'set', key: 'userInfo', value: userInfo})
           // return this.state.userInfo.map(userInfo => 
               // console.log(this.state.userInfo)

               // <ProfileScreenMain key={userInfo.id} userInfo={userInfo}/>
           // );
            this.onButtonToProfile()
        }
    }

    /*onButtonFacebook(){
        this.lo
        this.onButtonToProfile()
    }*/

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
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            /> 
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.onButtonToProfile()} 
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