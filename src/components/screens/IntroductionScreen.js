import React, {Component} from 'react'
import {
    View, 
    Image, 
    ImageBackground, 
    Dimensions,
    Text} from 'react-native'

class IntroductionScreen extends Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.changeAccessingState()
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
                    <View style={styles.imageContainerStyle}>
                        <Image
                        style={{
                            aspectRatio: 0.75, 
                            resizeMode: 'contain',}}
                        source={require('./../images/drawable-hdpi/ic_splash_platinum.webp')}
                        />
                        <Text
                        style={{fontSize:30, fontWeight:'bold', color:'white',}}
                        >
                            SERN Trip Guide</Text>
                    </View>
                    <Text style={{position:'absolute', bottom:10, alignSelf:'center',color:'white',}}>Powered By Digital Ventures.</Text>
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