import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    Image,
    ListView,
    TouchableOpacity} from 'react-native'
import {createStackNavigator, HeaderBackButton } from 'react-navigation'
import SettingLanguage from './settingscreens/SettingLanguage'

const listData = [
    {'id': '1', 'section':'ภาษา', 'language':'ไทย' },
]

 INITIAL_STATE= {
        dataSource : '',
}

class SettingScreen extends Component {
    
    static navigationOptions = { title: "ตั้งค่า", headerLeft: <HeaderBackButton onPress={() => this.props.navigation.goBack(null)} />,}
    state=INITIAL_STATE

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})
        this.setState({dataSource:ds.cloneWithRows(listData)})
    }
   
    onRowPress(rowData){
        if(rowData.id === '1'){
            this.props.navigation.navigate('Language');
        }
    }

    render(){

        return ( 
            <View>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
            
                return (
                   
                    <TouchableOpacity onPress={()=>this.onRowPress(rowData)}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
                                <Text style={[styles.listViewTextStyle, style={color: '#aaa'} ]}>{rowData.language}</Text>
                                <Image 
                                source={ require('../../images/drawable-hdpi/ic_arrow_right.webp') } /> 
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
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    chevronIconStyle:{
        justifyContent: 'center',
        alignItems : 'center'
    }
})

const LanguageMenu = createStackNavigator({
    Main : {
        screen : SettingScreen
    },
    Language : {
        screen : SettingLanguage
    }
} )

export {SettingScreen, LanguageMenu}