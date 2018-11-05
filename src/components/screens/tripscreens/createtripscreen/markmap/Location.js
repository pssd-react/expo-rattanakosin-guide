import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'
import { CardSection, Header } from '../../../../common'
import { ButtonTrip } from '../../../../common/ButtonTrip'
import { createStackNavigator } from 'react-navigation'
import { HeaderBackButton } from 'react-navigation'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200


const INITAL_STATE = {
    textbox: 'ตำแหน่งที่ปักหมุด',
    textBT:'เพิ่มตำแหน่ง',
    login: 0
}

export class Location extends Component {
    state = INITAL_STATE;
    static navigationOptions = { header: null }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    onMarkLocation() {
        console.log("click!")
        this.props.navigation.navigate('markmap')
    }

    render() {
        return (
            <View>
                <Header headerText="สถานที่ปักหมุด"
                    backgroundImage={require('../../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ScrollView>
                    <View>
                        <ImageBackground
                        style={{width: ImgWidth, height: ImgHeight}}
                        source={require('../../../../images/drawable-hdpi/bg_position_sticky_small.webp')}
                        >
                        <View style= {styles.overlayContainer}>
                            <View style = {styles.top}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            
                            <View style = {{flex: 1, alignItems:"center", justifyContent: 'center',}}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={() => this.onMarkLocation()}
                                 > 
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                        </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
       // color: '#FFFFFF'
    },
    container: {
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff',
        flex: 1
    },
    viewBlockStyle: {
        marginTop: 60,
        flex: 1,
        
    },
    header: {
        color: '#000000',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#ffc94c',
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    top: {
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center'
    },
})

const Locations = createStackNavigator({
    Home: { 
        screen: Location, navigationOptions:{header:null} 
    },
})


export {Locations}