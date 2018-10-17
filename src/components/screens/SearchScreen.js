import React, {Component} from 'react'
import {Text, View, TextInput, Image, TouchableWithoutFeedback} from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../common'

class SearchScreen extends Component{

    onButtonGoBack() {
        this.props.navigation.goBack()
    }

    renderHeader(){
        return (
            <Header headerText=""
            backgroundImage={require('../images/drawable-hdpi/bg_more.webp')} />
        )
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
            {this.renderHeader()}
                <View
                style={{height:100, bottom: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                <View
                style={{backgroundColor:'white',
                        height: 50,
                        width: '90%',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderColor: '#AFAFAF',
                        borderWidth: 0.5
            }}
                >
                <View style={{
                    justifyContent: 'center',
                        alignItems: 'center',
                        flex:1}}>
                        <TouchableWithoutFeedback onPress={()=> this.onButtonGoBack()}>
                    <Image
                    source={require('../images/drawable-hdpi/ic_back_search_home.webp')}
                    style={{height:20, width: 20}}
                    />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flex:4}}>
                    <TextInput 
                    underlineColorAndroid={'transparent'}
                    placeholder={'ค้นหา'}
                    placeholderTextColor={'grey'}
                    style={{flex:1, fontWeight: '700', backgroundColor: 'white'}}
                    />
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex:1
                    }}>
                <Image
                    source={require('../images/drawable-hdpi/ic_clear_text_searc.webp')}
                    style={{height:20, width: 20}}
                    />
                </View>

                </View>
                </View>
                <View style={{flex:1}}>

                </View>
            </View>
        )
    }
}

export default SearchScreen