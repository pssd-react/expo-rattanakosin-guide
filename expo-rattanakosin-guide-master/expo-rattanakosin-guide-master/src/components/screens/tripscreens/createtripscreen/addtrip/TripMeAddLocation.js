import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'
import { CardSection, Header } from '../../../../common'
import { ButtonTrip } from '../../../../common/ButtonTrip'
import { createStackNavigator } from 'react-navigation'
import { HeaderBackButton } from 'react-navigation'
import  Search  from './Search'
import { ResultSearchLocation } from './ResultSearchLocation'
import { AddTripScreen } from './AddTripScreen'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200


const INITAL_STATE = {
    textbox: 'ทริปของฉัน',
    textbox1: 'ร้านค้าที่ต้องการไป',
    textBT: 'เพิ่มสถานที่',
    login: 0
}

export class TripMeAddLocation extends Component {
    state = INITAL_STATE;
    static navigationOptions = { header: null }

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }

    onCreateTrip() {
        console.log("click!")
        this.props.navigation.navigate('search')
    }

    render() {
        return (
            <View>
                <Header headerText="ทริปของฉัน"
                    backgroundImage={require('../../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <ScrollView>
                    <View>
                        <ImageBackground
                        style={{width: ImgWidth, height: ImgHeight}}
                        source={require('../../../../images/drawable-hdpi/bg_add_trip.webp')}
                        >
                        <View style= {styles.overlayContainer}>
                            <View style = {styles.top}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            
                            <View style = {styles.top}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={()=> this.onCreateTrip()}
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20
    },
    top: {
        alignItems: 'flex-start',
        height: '50%',
        justifyContent: 'center'
    },
})

const TripMeAddLocations = createStackNavigator({
    Home: { 
        screen: TripMeAddLocation, navigationOptions:{header:null} 
    },
})


export  {TripMeAddLocations}