import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions
} from 'react-native'
import { ButtonTrip } from '../../../common/ButtonTrip'
import { CardSection, Header, Card } from '../../../common'
import { HeaderBackButton } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import { AddTripScreen } from './addtrip/AddTripScreen'

const ImgWidth = Dimensions.get('window').width
const ImgHeight = 200

const INITAL_STATE = {
    textbox: 'ทริปของฉัน',
    textBT: 'เพิ่มทริป',
    login: 0
};

class CreateTripScreen extends Component {
    state = INITAL_STATE;

    onButtonGoBack() {
        this.props.navigation.popToTop()
    }
    
    onAddTrip() {
        console.log('onAddTrip()')
        this.props.navigation.navigate('Add_Trip')
    }

    render() {
        return (
            <View>
                <Header headerText="ทริปของฉัน"
                    backgroundImage={require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                    <Card>
                        <CardSection>
                            <ImageBackground
                            style={{ width: 400, height: ImgHeight, flex:1 }}
                            source={require('../../../images/drawable-hdpi/bg_add_trip.webp')}
                            />
                            <View style = {styles.top}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={() => this.onAddTrip()}
                                 > 
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                        </CardSection>
                    </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff'
    },
    top: {
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center'
    },
    buttonStyle: {
        //color: '#131313',
        //fontSize: 18,
        backgroundColor: '#F8E21C',
        width: 100,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 150,
        marginBottom: 20
    },
})

const CreateTrip = createStackNavigator({
    Home: { 
        screen: CreateTripScreen, navigationOptions:{header:null} 
    },
    Add_Trip: {
        screen: AddTripScreen
    }
})


export {CreateTripScreen, CreateTrip} 