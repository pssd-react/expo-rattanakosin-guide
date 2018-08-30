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
import firebase from 'firebase'; 
import { SocialIcon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {createStackNavigator} from 'react-navigation'
import {SettingScreen, HowToUseScreen, AboutRattanakosinScreen, AboutAppScreen} from './profilescreen'

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

const listDataLogin = [
    {'id': '1', 'section':'Setting', 'name': require('../images/drawable-hdpi/ic_more_setting.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '2', 'section':'How to use', 'name': require('../images/drawable-hdpi/ic_more_how_to_use.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '3', 'section':'About Rattanakosin', 'name': require('../images/drawable-hdpi/ic_more_about_jj.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '4', 'section':'About this App', 'name': require('../images/drawable-hdpi/ic_about_jj.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '5', 'section':'Logout', 'name':require('../images/drawable-hdpi/ic_more_logout.webp/'), 'url': ''}
]

const listDataNoLogin = [
    {'id': '1', 'section':'Setting', 'name': require('../images/drawable-hdpi/ic_more_setting.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '2', 'section':'How to use', 'name': require('../images/drawable-hdpi/ic_more_how_to_use.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '3', 'section':'About Rattanakosin', 'name': require('../images/drawable-hdpi/ic_more_about_jj.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
    {'id': '4', 'section':'About this App', 'name': require('../images/drawable-hdpi/ic_about_jj.webp/'), 'url': 'http://dv.co.th/rattanakosin-guide/terms.html'},
]

const BACKGROUND_URI = require('../images/drawable-hdpi/bg_more.webp/')

INITIAL_STATE= {
    userInfo: '',
    dataSource : '',
    
}

class ProfileScreen extends Component{
    static navigationOptions = {header: null}
    state=INITIAL_STATE

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})
        this.setState({dataSource:ds.cloneWithRows(listDataNoLogin)})
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null){
                console.log(user)
            }
        })
    }

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
        ('1886750428085436', { permissions: ['public_profile'] })

        if(type === 'success'){
            /* const credentail = firebase.auth.FacebookAuthProvider.credentail(token)

            firebase.auth().signInWithCredential(credentail).catch((error) => {
                console.log(error)
            }) */
            
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`);
            const userInfo = await response.json();
            this.setState({ userInfo });
           // console.log(userInfo)
         
        }
    }

    _renderUserInfo() {
        return (
            <View style={{ alignItems: 'center' }}>
                <CardSection style={{ justifyContent: 'center', marginTop: 40}}>
                </CardSection>
                <CardSection style={{paddingLeft:30, paddingRight:30}}>
                    <Image 
                    source={{ uri: this.state.userInfo.picture.data.url }}
                    style={{ width: 150, height: 150 }}
                    />
                </CardSection>
                <CardSection style={{paddingLeft:30, paddingRight:30}}>
                    <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>{this.state.userInfo.name}</Text>
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

    renderButtonFB(status=1){
        console.log(status)
        if(status === 0){
           console.log("เข้า status 0")
            return ( 
                <View>
                    <CardSection style={{ justifyContent: 'center', marginTop: 60}}>
                        <Text style={{  fontSize: 22, color: '#fff'  }}>ยังไม่ได้เข้าสู่ระบบ</Text>
                    </CardSection>
                    <CardSection style={{paddingLeft:30, paddingRight:30}}>
                        <Button onPress={null} 
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
                        <TouchableOpacity onPress={null}>
                            <Text style={{  fontSize: 16, textDecorationLine: 'underline', color:'#fff', }}>ลงทะเบียน</Text>
                        </TouchableOpacity >
                    </CardSection>
                </View>
            );
        }else if((!this.state.userInfo)){
            return (
                <View>
                    <CardSection style={{ justifyContent: 'center', marginTop: 60}}>
                        <Text style={{  fontSize: 22, color: '#fff'  }}>ยังไม่ได้เข้าสู่ระบบ</Text>
                    </CardSection>
                    <CardSection style={{paddingLeft:30, paddingRight:30}}>
                        <Button onPress={null} 
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
                        <TouchableOpacity onPress={null}>
                            <Text style={{  fontSize: 16, textDecorationLine: 'underline', color:'#fff', }}>ลงทะเบียน</Text>
                        </TouchableOpacity >
                    </CardSection>
                </View>
            );
        }
            return (
                this._renderUserInfo()
            );
        
    }

    renderListmenu(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})

        if(!this.state.userInfo){
            console.log(this.state.userInfo)
            this.state = {
                dataSource : ds.cloneWithRows(listDataNoLogin),
            }
            return this.state.dataSource;

        }else{
            console.log(this.state.userInfo)
            this.state = {
                dataSource : ds.cloneWithRows(listDataLogin),
            }
            return this.state.dataSource;
        }
    }

    onRowPress(rowData){
        if(rowData.id === '1'){
            this.props.navigation.navigate('Setting');
        }else if(rowData.id === '2'){
            this.props.navigation.navigate('HowToUse');
        }else if(rowData.id === '3'){
            this.props.navigation.navigate('AboutRattanakosin');
        }else if(rowData.id === '4'){
            this.props.navigation.navigate('AboutApp');
        }else if(rowData.id === '5'){
            this.renderButtonFB(0);
            console.log()
        }
    }

    render(){
        return (
            <View>
            <ImageBackground
            source={ BACKGROUND_URI}
            style={styles.thumbnailStyle}
            > 
                {this.renderButtonFB()}
            </ImageBackground>

            <ListView
            dataSource={this.renderListmenu()}
            renderRow={(rowData) => {
            
            return (
            <TouchableOpacity onPress={()=>this.onRowPress(rowData)}>
                <View style={styles.listViewContainer}>
                    <View style={styles.iconContainerStyle}>
                    <Image style={{width:22, height:22}}
                    source={ rowData.name } /> 
                    </View>
                    <View style={styles.listViewTextContainer}>
                    <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                    </View>
                    <View style={styles.chevronContainerStyle}>
                    <Image 
                    source={ require('../images/drawable-hdpi/ic_arrow_right.webp/') } /> 
                    </View>
                </View>
            </TouchableOpacity>
            )
            }}
            contentContainerStyle={{width:'100%', backgroundColor: '#DDDDDD'}}
            
            />
            <View style={styles.viewBlockStyle}/>
            </View>
        )
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
        flexDirection: 'row'
    },
    thumbnailStyle: {
        height: '57%',
        width:'100%'
    },
    listViewTextContainer:{
        flex: 6
    },
    listViewTextStyle:{
        fontSize: 16
    },
    viewBlockStyle: {
        height: '10%'
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

const ProfileMenu = createStackNavigator({
    Main : {
        screen : ProfileScreen
    },
    Setting : {
        screen : SettingScreen
    },
    HowToUse : {
        screen : HowToUseScreen
    },
    AboutRattanakosin : {
        screen : AboutRattanakosinScreen
    },
    AboutApp : {
        screen : AboutAppScreen
    }
})

export default ProfileMenu