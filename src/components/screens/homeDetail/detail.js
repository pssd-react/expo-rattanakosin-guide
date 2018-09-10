import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Dimensions,
    Animated,
    Image,
    TouchableOpacity
    } from 'react-native'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { DetailScreen, ProScreen, MapScreen, ReviewScreen } from './navigationDetail'    
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

HEADER_MAX_HEIGHT = 120
HEADER_MIN_HEIGHT = 60
BG_IMAGE_HEIGHT = Dimensions.get('window').height-20
BG_IMAGE_WIDTH = Dimensions.get('window').width


/*const INITAL_STATE = { 
    index: 0,
    routes: [
        { key: 'first',  title: 'รายละเอียด' },
        { key: 'second', title: 'โปรโมชัน'},
        { key: 'third',  title: 'แผนที่'},
        { key: 'four',   title: 'รีวิว'}
    ],
};*/

export class detail extends Component {
    static navigationOptions = {header: null}
   // state = INITAL_STATE;

    constructor(props){
        super(props)
        this.state = {
            scrollY: new Animated.Value(0),
            fadeAnim: new Animated.Value(1),
            index: 0,
    routes: [
        { key: 'first',  title: 'รายละเอียด' },
        { key: 'second', title: 'โปรโมชัน'},
        { key: 'third',  title: 'แผนที่'},
        { key: 'four',   title: 'รีวิว'}
    ],
        }
    }

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    componentDidMount(){
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue:0,
                duration:5000,
            }
        ).start();
    }

    render(){
        let {fadeAnim} = this.state;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange : [0,BG_IMAGE_HEIGHT],
            outputRange: [BG_IMAGE_HEIGHT,HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const opacityImageHeight = this.state.scrollY.interpolate({
            inputRange : [0,20],
            outputRange: [20,0],
            extrapolate: 'clamp'
        })

        const headerTitle = this.state.scrollY.interpolate({
            inputRange : [0,BG_IMAGE_HEIGHT],
            outputRange: [BG_IMAGE_HEIGHT,0],
            extrapolate: 'clamp'
        })

        /*const positionHeader = this.state.scrollY.interpolate({
            inputRange : [null,'absolute'],
            outputRange: ['absolute',null],
            extrapolate: 'clamp'
        })*/

        return (
            <View style={{flex: 1,}}>
                
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  //  height: headerHeight,
                    alignItems: 'center',
                }}> 
                    <View style={{}}>
                        <Header headerText="ตั้งค่า" 
                            backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                            headerLeft={<HeaderBackButton tintColor='#fff' 
                            onPress={() => this.onButtonGoBack()} />}/>
                    </View>
                </Animated.View> 
                   {/**/}

               
                <ScrollView style={{flex: 1, }}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                      [ {nativeEvent:{ contentOffset:{y:this.state.scrollY}}}],
                    )}
                >
                   <Animated.View style={{
                       height: BG_IMAGE_HEIGHT,
                       width: BG_IMAGE_WIDTH,
                      //backgroundColor: "transparent"
                   }}>
                        <ImageBackground source={require('../../images/drawable-hdpi/bg_more.webp')}
                            style={{ flex:1, width: null, height: null}} >
                            <View style={{ justifyContent: 'flex-start', alignItems:'center',paddingTop: 5,marginLeft:10, marginTop:40, backgroundColor:'#000', opacity:0.5,  width: 30,height:30,borderRadius: 25}}>
                                <TouchableOpacity onPress={() => this.onButtonGoBack()}>
                                    <Image source={require('../../images/drawable-hdpi/ic_arrow_back_black.webp')}  style={{tintColor:'#fff', width:20, height:20, alignItems: 'center'}}/>
                                </TouchableOpacity>
                            </View>
                         <Animated.View style={{
                                flex:1, 
                                justifyContent: 'flex-end',
                                marginLeft: opacityImageHeight,
                                marginRight: opacityImageHeight,}}>
                            <View style={{flex:3}}/>
                            <View style={{ 
                                flex:1, 
                                backgroundColor:'#000', 
                                alignItems: 'center', 
                                opacity: 0.5, 
                                width: '100%'}}>

                                <Text style={{ fontSize: 30, fontWeigth: 'bold',color: "#fff" }}>Text</Text>
                             
                            </View>
                        </Animated.View>
                        </ImageBackground>
                    </Animated.View>
                    
                {/*-------Navigation-------*/}
                    <View style={{flex: 1, height:BG_IMAGE_HEIGHT-110}}>
                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: DetailScreen,
                                second: ProScreen,
                                third: MapScreen,
                                four: ReviewScreen
                            })}
                            onIndexChange={index => this.setState({ index })}
                            initialLayout={{ width: Dimensions.get('window').width }}
                        />        
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff'
    }
  })