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

class SettingLanguage extends Component{
    static navigationOptions = {header: null}
    
    constructor(){
        super()
        this.state = {
            setLanguage : "EN"
        }
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    onLanguageTH(){
        if(this.state.setLanguage === "TH"){
            return (
                <TouchableOpacity onPress={() => this.setState({setLanguage : "TH"}) }>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>ไทย</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../../../images/drawable-hdpi/ic_correct_lang.webp') } /> 
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity onPress={() => this.setState({setLanguage : "TH"}) }>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>ไทย</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ null } /> 
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        
    }

    onLanguageENG(){
        if(this.state.setLanguage === "EN"){
            return (
                <TouchableOpacity onPress={() => this.setState({setLanguage : "EN"})}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>English</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image 
                            source={ require('../../../images/drawable-hdpi/ic_correct_lang.webp') } /> 
                        </View>
                    </View>
                </TouchableOpacity> 
            )
        }else{
            return(
                <TouchableOpacity onPress={() => this.setState({setLanguage : "EN"}) }>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>English</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image source={ null } /> 
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    onLanguageCHAIN(){
        if(this.state.setLanguage === "CHAIN"){
            return (
                <TouchableOpacity onPress={() => this.setState({setLanguage : "CHAIN"}) }>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>中文</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image source={ require('../../../images/drawable-hdpi/ic_correct_lang.webp') } /> 
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity onPress={() => this.setState({setLanguage : "CHAIN"}) }>
                    <View style={styles.listViewContainer}>
                        <View style={styles.listViewTextContainer}>
                            <Text style={styles.listViewTextStyle}>中文</Text>
                        </View>
                        <View style={styles.chevronContainerStyle}>
                            <Image source={ null } /> 
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
        
    }

    render(){
        console.log(this.state.setLanguage)
        return (
            <View>
            <Header headerText="ภาษา" 
                backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
                {this.onLanguageTH()}
                {this.onLanguageENG()}
                {this.onLanguageCHAIN()}
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
        height: 58,
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