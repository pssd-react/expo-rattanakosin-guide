import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ListView,
    Image,
    ImageBackground,
    TouchableOpacity} from 'react-native'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../common';
import { SocialIcon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

const listViewData = [
    {'id': '1', 'section':'Setting', 'name':'ios-settings'},
    {'id': '2', 'section':'How to use', 'name':'ios-help-circle'},
    {'id': '3', 'section':'About Rattanakosin', 'name':'ios-planet'},
    {'id': '4', 'section':'About this App', 'name':'ios-phone-portrait'},
    {'id': '5', 'section':'Logout', 'name':'ios-power'}
]

const BACKGROUND_URI = 'https://scontent.fbkk1-5.fna.fbcdn.net/v/t1.15752-9/40231303_293778361409035_3921667967200264192_n.jpg?_nc_fx=fbkk1-2&_nc_cat=0&oh=5848dd2bad55cb3ad2db545779bf04bd&oe=5C04E144'

class ProfileScreen extends Component{
    constructor(){
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})

        this.state = {
            dataSource : ds.cloneWithRows(listViewData)
        }
    }

    render(){
        return (
            <View>
            <ImageBackground
            source={{uri : BACKGROUND_URI}}
            style={styles.thumbnailStyle}
            > 
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
                    <SocialIcon style={{flex: 1, borderRadius: 5, fontSize: 16 }}
                    title='เข้าสู่ระบบด้วย Facebook'
                    button
                    type='facebook'
                    />
                </CardSection>
                <CardSection style={{ justifyContent: 'center', marginTop: 18}}>
                    <TouchableOpacity onPress={null}>
                        <Text style={{  fontSize: 16, textDecorationLine: 'underline', color:'#fff', }}>ลงทะเบียน</Text>
                    </TouchableOpacity >
                </CardSection>
            </ImageBackground>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
            
            return (
            <TouchableOpacity>
                <View style={styles.listViewContainer}>
                    <View style={styles.iconContainerStyle}>
                    <Ionicons name={rowData.name} size={20} style={styles.iconStyle}/>
                    </View>
                    <View style={styles.listViewTextContainer}>
                    <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                    </View>
                    <View style={styles.chevronContainerStyle}>
                    <Ionicons name={'ios-arrow-forward'} size={20} style={styles.chevronIconStyle}/> 
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
        marginBottom: 2,
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

export default ProfileScreen