import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    Image,
    ListView,
    Linking,
    TouchableOpacity} from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';

const listData = [
    {'id': '1', 'section':'วิธีค้นหาสถานที่และหมวดหมู่ของร้านค้า', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/index.html' },
    {'id': '2', 'section':'วิธีเข้าสู่สถานที่จากหน้าแผนที่', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/help2.html' },
    {'id': '3', 'section':'วิธีการรีวิวอละจัดการรีวิว', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/help3.html' },
    {'id': '4', 'section':'วิธีการสร้างทริป', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/help4.html' },
    {'id': '5', 'section':'วิธีการปักหมุดตำแหน่งที่ตั้ง', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/help5.html' },
    {'id': '6', 'section':'วิธีการตั้งค่าแอปพลิเคชัน', 'url':'https://uat-shop.digitalventures.co.th/rattanakosin/th/help6.html' },
]

    INITIAL_STATE= {
        dataSource : '',
}

export class HowToUseScreen extends Component {

    static navigationOptions = {header: null}
    state=INITIAL_STATE

    componentWillMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})
        this.setState({dataSource:ds.cloneWithRows(listData)})
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }
   
    render(){

        return ( 
            <View>
                <Header headerText="วิธีการใช้งาน" 
                backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
            
                return (
                   
                    <TouchableOpacity onPress={() => Linking.openURL(rowData.url)}>
                        <View style={styles.listViewContainer}>
                            <View style={styles.listViewTextContainer}>
                                <Text style={styles.listViewTextStyle}>{rowData.section}</Text>
                            </View>
                            <View style={styles.chevronContainerStyle}>
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

