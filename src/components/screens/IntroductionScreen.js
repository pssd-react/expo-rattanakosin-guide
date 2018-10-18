import React, {Component} from 'react'
import {View, Image, ImageBackground, Dimensions} from 'react-native'

class IntroductionScreen extends Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate('mainApp')
        },2000)
    }

    render(){
        return (
            <View style={styles.imageContainerStyle}>
                <ImageBackground
                style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
                source={require('./../images/drawable-hdpi/bg_welcome_splash.webp')}
                >

                </ImageBackground>
            </View>
        )
    }
}

const styles = {
    imageContainerStyle: {
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'}
};

export default IntroductionScreen