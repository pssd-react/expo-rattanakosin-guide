import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ListView,
    Image,
    ImageBackground,
    Linking,
    WebView,
    TouchableOpacity} from 'react-native'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../common';
import firebase from 'firebase'
import { SocialIcon } from 'react-native-elements'
import {createStackNavigator} from 'react-navigation'
import {SettingScreen, LanguageMenu, HowToUseScreen, AboutRattanakosinScreen, AboutAppScreen} from './profilescreen'
import {StoreGlobal} from '../config/GlobalState'

import LoginMenu from './profilescreen/loginscreens/LoginForm'
import {RegisterForm} from './profilescreen/loginscreens/RegisterForm';
import { ScrollView } from '../../../node_modules/react-native-gesture-handler';
import Modal from "react-native-modal";

const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
        apiKey: "AIzaSyAcl5k2W8F5BWDpzSYBkI_jTiYPfi8yLnM",
        authDomain: "rattanakosin-5112f.firebaseapp.com",
        databaseURL: "https://rattanakosin-5112f.firebaseio.com",
        projectId: "rattanakosin-5112f",
        storageBucket: "rattanakosin-5112f.appspot.com",
        messagingSenderId: "796800591279"
};

firebase.initializeApp(firebaseConfig);

const BACKGROUND_URI = require('../images/drawable-hdpi/bg_more.webp/')

class ProfileScreenMain extends Component{
    state= {
    userInfo: '',
    dataSource : '',
    loading : false,
    isModalVisible: false,
    //status_login: false,
}
    static navigationOptions = {header: null}

    componentWillMount(){
        this.setState({ isModalVisible: false });
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null){
                console.log(user)
            }
        }) 
        this.setState({ isModalVisible: false });
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _activeModal = () => this.setState({ isModalVisible: true });
    _deactiveModal = () => this.setState({ isModalVisible: false });

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
        ('287789215160486', { permissions: ['public_profile'] })

        if(type === 'success'){
            /* const credentail = firebase.auth.FacebookAuthProvider.credentail(token)
            firebase.auth().signInWithCredential(credentail).catch((error) => {
                console.log(error)
            }) */
            
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfoFB = await response.json();
           this.setState({ userInfoFB });
           this.state.userInfo = userInfoFB
            console.log('****')
            console.log(this.state.userInfo)
         
        }
    }

    onButtonLoginNumber(){
       this.props.navigation.navigate('Login')
    }

    onButtonRegister(){
        this.props.navigation.navigate('Register')
    }

    _renderUserInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <CardSection style={{ justifyContent: 'center', marginTop: 20}}>
                </CardSection>
                <CardSection style={{paddingLeft:30, paddingRight:30}}>
                    <Image 
                    source={{ uri: this.state.userInfoFB.picture.data.url }}
                    style={{ width: 150, height: 150 }}
                    />
                </CardSection>
                <CardSection style={{paddingLeft:30, paddingRight:30}}>
                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>{this.state.userInfoFB.name}</Text>
                </CardSection>
                <CardSection style={{justifyContent: 'space-between', marginTop: 20}}>
                    <View style={{flex: 1, alignItems: 'center', marginLeft: 20}}>
                        <TouchableOpacity onPress={null}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 25, height: 30 }}
                            source={ require('../images/drawable-hdpi/ic_report_review_item.webp')}
                            />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 16 , color: '#fff'}}>ประวัติการรีวิว</Text>
                                <Text style={{ fontSize: 20 , color: '#fff'}}>0</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 22, height: 28 }}
                            source={ require('../images/drawable-hdpi/ic_report_coupon.webp')}
                            />
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={{ fontSize: 16 , color: '#fff'}} >คูปอง</Text>
                            </View>
                        </View>
                    </View>
                </CardSection>
            </View>
        );
    }

    _renderProfile(){
        return (
                <View>
                    <CardSection style={{ justifyContent: 'center', marginTop: 60}}>
                        <Text style={{  fontSize: 22, color: '#fff'  }}>ยังไม่ได้เข้าสู่ระบบ</Text>
                    </CardSection>
                    <CardSection style={{paddingLeft:30, paddingRight:30}}>
                        <Button onPress={() => this.onButtonLoginNumber()} 
                            style={{backgroundColor: '#ffc94c'}} 
                            textStyle={{color: '#000'}}>
                            เข้าสู่ระบบด้วยหมายเลขโทรศัพท์
                        </Button>
                    </CardSection>
                    <CardSection style={{paddingLeft:30, paddingRight:30}}>
                        <SocialIcon style={{ flex: 1, borderRadius: 5 }}
                        title='เข้าสู่ระบบด้วย Facebook'
                        fontStyle={{fontSize:16 }}
                        button
                        type='facebook'
                        onPress={() => this.loginWithFacebook()}
                        />
                    </CardSection>
                    <CardSection style={{ justifyContent: 'center', marginTop: 18}}>
                        <TouchableOpacity onPress={() => this.onButtonRegister()}>
                            <Text style={{  fontSize: 16, textDecorationLine: 'underline', color:'#fff', }}>ลงทะเบียน</Text>
                        </TouchableOpacity>
                    </CardSection>
                </View>
            );
    }

    renderButtonFB(){
        if((!this.state.userInfoFB)|| this.state.userInfoFB === ""){
            return(
                this._renderProfile()
            )
        }
        if(this.state.userInfoFB){
            return(
                 this._renderUserInfo()
            )            
        }
    }
    
    renderBlock(){
        if(this.state.userInfoFB){
             return (<View style={styles.viewBlockStyle}/>)
        }
       
    }
    renderButtonLogOut(){
       
        if(this.state.userInfoFB){
            return (
                <TouchableOpacity onPress={() => this.onListLogOut()}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.iconContainerStyle}>
                                <Image style={{width:22, height:22}}
                                source={ require('../images/drawable-hdpi/ic_more_logout.webp') } /> 
                            </View>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>ออกจากระบบ</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Image 
                                source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                            </View>
                        </View>
                </TouchableOpacity>
            );     
        }else{
            return (<View></View>);
        }
        
    }

    onListSetting(){
        this.props.navigation.navigate('Setting');
    }
    onListHowToUse(){
        this.props.navigation.navigate('HowToUse');
    }
    onListAboutRattanakosin(){
        this.props.navigation.navigate('AboutRattanakosin');
    }
    onListAboutApp(){
        this.props.navigation.navigate('AboutApp');
    }

    modalRender(){
        console.log('this is loading : '+this.state.loading)
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
        return (
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
                    <Image source={require('../images/drawable-hdpi/ic_logout_jj.webp')}
                            style={{width: 70, height: 70}}/>
                </CardSection>
                <CardSection style={{paddingLeft:20}}>
                    <Text style={{ fontSize: 24}}>ออกจากระบบ</Text>
                </CardSection>
                <CardSection style={{paddingLeft:20}}>
                    <Text style={{ fontSize: 16}}>ต้องการออกจากระบบหรือไม่</Text>
                </CardSection>
                <CardSection style={{flex:1, justifyContent: 'flex-end', padding: 0, marginTop:60}}>
                    <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderRightWidth: 0.5, borderColor:'#aaa', height: 50}} 
                        onPress={() => this._deactiveModal()}>
                            <Text style={{ fontSize: 16}}>ยกเลิก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center',  borderTopWidth: 1, borderLeftWidth: 0.5, borderColor:'#aaa', height: 50}} 
                        onPress={() => this.onLogOutModal()}>
                            <Text style={{ fontSize: 16}}>ยืนยัน</Text>
                    </TouchableOpacity>
                </CardSection>
                
            </View>
        )

    }
    //LogOut
    renderModalLogOut(){
        return(
                <Modal isVisible={this.state.isModalVisible} style={{flex:1}}>
                    {this.modalRender()}
                </Modal>
        )
    }

    onLogOutModal(){
        this.state.loading = true
        this._deactiveModal()
        this._activeModal()
        setTimeout(()=>{
           this._toggleModal(),
           this.state.loading = false,
           this.onLogoutSuccess()
        },3000)
        
        
    }
    onListLogOut(){
        this._activeModal()
    }

    onLogoutSuccess(){
        this.state.userInfoFB = undefined
        this.setState({loading: false})
        
    }

    onLoginSuccess(){
        this.setState({loading: false})
    }

    renderPage(){
        return (
            <View>
            <ImageBackground
            source={ BACKGROUND_URI}
            style={styles.thumbnailStyle}
            > 
                {this.renderModalLogOut()}
                {this.renderButtonFB()}
            </ImageBackground>
            <ScrollView 
                showsVerticalScrollIndicator={false}> 
                <TouchableOpacity onPress={()=>this.onListSetting()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.iconContainerStyle}>
                            <Image style={{width:22, height:22}}
                            source={ require('../images/drawable-hdpi/ic_more_setting.webp') } /> 
                        </View>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>ตั้งค่า</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.onListHowToUse()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.iconContainerStyle}>
                            <Image style={{width:22, height:22}}
                            source={ require('../images/drawable-hdpi/ic_more_how_to_use.webp') } /> 
                        </View>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>วิธีการใช้งาน</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.onListAboutRattanakosin()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.iconContainerStyle}>
                            <Image style={{width:22, height:22}}
                            source={ require('../images/drawable-hdpi/ic_more_about_jj.webp') } /> 
                        </View>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>เกี่ยวกับรัตนโกสินทร์</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this.onListAboutApp()}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.iconContainerStyle}>
                            <Image style={{width:22, height:22}}
                            source={ require('../images/drawable-hdpi/ic_about_jj.webp') } /> 
                        </View>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>เกี่่ยวกับแอปพลิเคชัน</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                        </View>
                    </View>
                </TouchableOpacity>

                {this.renderButtonLogOut()}
            </ScrollView>
                {this.renderBlock()}
                
            </View>
        )
    }

    render(){
        return(this.renderPage());
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    listViewContainer:{
        padding: 10,
        marginBottom: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    thumbnailStyle: {
        height: 360,
        width:'100%'
    },
    listViewTextContainer:{
        flex: 6
    },
    listViewTextStyle:{
        fontSize: 16
    },
    viewBlockStyle: {
        height: '18%'
    },
    iconStyle:{
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chevronContainerStyle:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    chevronIconStyle:{
        justifyContent: 'center',
        alignItems : 'center'
    }
})

export const ProfileMenu = createStackNavigator({
    Main : {
        screen : ProfileScreenMain
    },
    Setting : {
        screen : LanguageMenu, navigationOptions:{header:null}
    },
    HowToUse : {
        screen : HowToUseScreen
    },
    AboutRattanakosin : {
        screen : AboutRattanakosinScreen
    },
    AboutApp : {
        screen : AboutAppScreen
    },
    Login : {
        screen : LoginMenu, navigationOptions:{header:null}
    },
    Register : {
        screen : RegisterForm
    }
})