import React, { Component } from 'react'
import { Text, View, TextInput, Image, TouchableWithoutFeedback } from 'react-native'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../common'
import I18n from '../config/i18n'

class SearchScreen extends Component {
    state = {
        searchText: ''
    }
    onButtonGoBack() {
        this.props.navigation.goBack()
    }
    onClearPress(){
        this.setState({
            searchText: ''
        })
    }

    renderHeader() {
        return (
            <Header headerText=""
                backgroundImage={require('../images/drawable-hdpi/bg_more.webp')} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {this.renderHeader()}
                <View
                    style={{ height: 100, bottom: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
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
                            flex: 1
                        }}>
                            <TouchableWithoutFeedback onPress={() => this.onButtonGoBack()}>
                                <Image
                                    source={require('../images/drawable-hdpi/ic_back_search_home.webp')}
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 4 }}>
                            <TextInput
                                returnKeyType={"search"}
                                underlineColorAndroid={'transparent'}
                                value={this.state.searchText}
                                onChangeText={(searchText)=> this.setState({searchText: searchText})}
                                placeholder={I18n.t('main_search')}
                                placeholderTextColor={'grey'}
                                onSubmitEditing={() => this.props.navigation.navigate({
                                    routeName: 'resSearchScreen',
                                    params: {
                                        searchText: this.state.searchText
                                    },
                                    key: 'searchText_' + this.state.searchText
                                })}
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1
                        }}>
                        <TouchableWithoutFeedback onPress={()=> this.onClearPress()}>
                            <Image
                                source={require('../images/drawable-hdpi/ic_clear_text_searc.webp')}
                                style={{ height: 20, width: 20 }}
                            />
                            </TouchableWithoutFeedback>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
        )
    }
}

export default SearchScreen