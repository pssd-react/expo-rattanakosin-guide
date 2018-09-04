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
import {HeaderBackButton } from 'react-navigation'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../../common';
import { SocialIcon } from 'react-native-elements'


const listData = [
    {'id': '1', 'section':'ไทย', 'language': 'ไทย', 'image': require('../../../images/drawable-hdpi/ic_correct_lang.webp')},
    {'id': '2', 'section':'English', 'language': 'English', 'image': null},
    {'id': '3', 'section':'中文', 'language': '中文', 'image': null},
]

class SettingLanguage extends Component{
    static navigationOptions = {header: null}
    constructor(){
        super()
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})

        this.state = {
            dataSource : ds.cloneWithRows(listData),
        }
    }
    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    onRowPress(rowData){
        if(rowData.id === '1'){
           // this.props.navigation.navigate('Setting');
        }else if(rowData.id === '2'){
           // this.props.navigation.navigate('HowToUse');
        }else if(rowData.id === '3'){
           // this.props.navigation.navigate('AboutRattanakosin');
        }
    }

    render(){
        return (
            <View>
            <Header headerText="ภาษา" 
                backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
            
                return (
                <TouchableOpacity onPress={()=>this.onRowPress(rowData)}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>{rowData.language}</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ rowData.image } /> 
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
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    thumbnailStyle: {
        height: '57%',
        width:'100%'
    },
    listViewTextContainer:{
        flex: 6
    },
    listViewTextStyle:{
        fontSize: 18
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