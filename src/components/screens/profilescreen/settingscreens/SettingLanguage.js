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
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../../common';
import { SocialIcon } from 'react-native-elements'


const listData = [
    {'id': '1', 'section':'ภาษา', 'language': 'ไทย', 'url': ''},
    {'id': '2', 'section':'ภาษา', 'language': 'ไทย', 'url': ''},
    {'id': '3', 'section':'ภาษา', 'language': 'ไทย', 'url': ''},
]

class SettingLanguage extends Component{
    static navigationOptions = {title: 'Setting'}
    constructor(){
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})

        this.state = {
            dataSource : ds.cloneWithRows(listData),
        }
    }

    render(){
        return (
            /*<View>
            <ListView
            dataSource={this.renderListmenu()}
            renderRow={(rowData) => {
            
                return (
                <TouchableOpacity >
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Text style={styles.listViewTextStyle}>{rowData.language}</Text>
                            <Image 
                            source={ require('../../../images/drawable-hdpi/ic_arrow_right.webp') } /> 
                        </View>
                    </View>
                </TouchableOpacity>
                )
            }}
            contentContainerStyle={{width:'100%', backgroundColor: '#DDDDDD'}}
            />
            <View style={styles.viewBlockStyle}/>
            </View>*/
            <View style={styles.container}>
                <Text>SettingLanguage</Text>
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

export default SettingLanguage