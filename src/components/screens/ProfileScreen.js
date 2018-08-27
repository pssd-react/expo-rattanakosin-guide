import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ListView,
    Image,
    TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const listViewData = [
    {'id': '1', 'section':'Setting', 'name':'ios-settings'},
    {'id': '2', 'section':'How to use', 'name':'ios-help-circle'},
    {'id': '3', 'section':'About Rattanakosin', 'name':'ios-planet'},
    {'id': '4', 'section':'About this App', 'name':'ios-phone-portrait'},
    {'id': '5', 'section':'Logout', 'name':'ios-power'}
]

const BACKGROUND_URI = 'https://cdn.hipwallpaper.com/i/82/23/X84mwq.png'

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
            <Image
                style = {styles.thumbnailStyle}
                source={{uri : BACKGROUND_URI}} 
            />
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
        height: '60%',
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