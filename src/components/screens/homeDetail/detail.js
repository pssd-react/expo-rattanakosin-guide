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
    Platform,
    TouchableOpacity
    } from 'react-native'
import { Header } from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { DetailScreen, ProScreen, MapScreen, ReviewScreen } from './navigationDetail'    
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AnimatedHeader from '../../common/react-native-animated-header'

const ios = Platform.OS === 'ios';
const {width, height} = Dimensions.get('window');
// from native-base
const isIphoneX = ios && (height === 812 || width === 812);
const iphoneXTopInset = 24;
const initToolbarHeight = ios ? 46 : 60;

const paddingTop = ios ? 18 : 0;
const topInset =  isIphoneX ? iphoneXTopInset : 0;
const headerHeight = height;
const toolbarHeight = initToolbarHeight + topInset + paddingTop;

export class detail extends Component {
    static navigationOptions = {header: null}
    constructor(props){
        super(props)
        this.state = {
            scrollY: new Animated.Value(0),
            bottomSize: 250,
            index: 0,
            fontSize: 60,
            opacityBox: 20,
            marginTopBox:230,
            statusButton: false,
            statusIcon: false,
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

    _getBackButton(){
        if(this.state.statusButton === true){
            return (
                <View style={{flex:1, flexDirection:"column", justifyContent: 'flex-end'}}>
                    <HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()}
                        style={{position: 'absolute'}} />
                </View>
            )
        }
    }

    _getTitleHeader(){
        const { titleStyle } = this.props;
        if(this.state.statusButton === true){
            return (
                <View style={{flex:3, justifyContent: 'center', alignItems:'center'}}> 
                    <Animated.Text style={[titleStyle, {
                        position: 'absolute',
                        //left: this.state.leftSize,
                        justifyContent: 'center', 
                        alignItems:'center',
                        bottom: this.state.bottomSize,
                        fontSize:this.state.fontSize,
                        color: "#fff"
                    }]}>
                        Text
                    </Animated.Text>
                </View>
            )
        }
        return (
            <View style={{flex:3}}> 
                <Animated.Text style={[titleStyle, {
                    position: 'absolute',
                    left: 20,
                    justifyContent: 'center', 
                    alignItems:'center',
                    bottom: this.state.bottomSize,
                    fontSize:this.state.fontSize,
                    color: "#fff"
                }]}>
                    Text
                </Animated.Text>
            </View>
        )
    }

    _getIconButton(){
        if(this.state.statusIcon === false){
            return (
                <View style={{flex:1, marginTop: 20, justifyContent: "center", flexDirection: "row", }}></View>
            )
       }else{
            if(this.state.statusButton === true){
                return (
                    <View style={{flex:1, marginRight:15, marginTop: 175, justifyContent: "center", flexDirection: "row", }}>
                        <TouchableOpacity>
                            <Image style={{width:25,height:30}} source={require('../../images/drawable-xhdpi/ic_fav_trip_unselected.webp')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:10,}}>
                            <Image style={{width:21,height:30}} source={require('../../images/drawable-xhdpi/ic_share_merchant.webp')}/>
                        </TouchableOpacity>
                    </View>
                )
            }
            return (
                <View style={{flex:1, marginTop: 20, justifyContent: "center", flexDirection: "row", }}>
                    <TouchableOpacity>
                        <Image style={{width:25,height:30}} source={require('../../images/drawable-xhdpi/ic_fav_trip_unselected.webp')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:10,}}>
                        <Image style={{width:21,height:30}} source={require('../../images/drawable-xhdpi/ic_share_merchant.webp')}/>
                    </TouchableOpacity>
                </View>
            )
       }
        
    }

    render(){
        return (
            <View style={{flex: 1,}}>
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                }}> 
               </Animated.View> 
                  
                <ScrollView style={{flex: 1, }}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                      [ {nativeEvent:{ contentOffset:{y:this.state.scrollY}}}],
                      {
                        //useNativeDriver: true,
                        listener: event => {
                         const offsetY = event.nativeEvent.contentOffset.y
                          console.log(offsetY)
                          if(offsetY <= 300){
                            this.setState({fontSize:60, bottomSize:250, statusButton:false, opacityBox: 20, marginTopBox:230, statusIcon: false});
                          }else if(offsetY >= 550){
                            console.log("Yes")
                            this.setState({fontSize:20, bottomSize:15, statusButton:true, opacityBox: 0, marginTopBox:350, statusIcon: true});

                          }else{
                            this.setState({fontSize:50, bottomSize:150, statusButton:false, opacityBox: 0, marginTopBox:350, statusIcon: true});
                          }
                        },
                      },
                    )}
                >
                   <Animated.View style={{
                       height: height,
                       width: width,
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
                                marginLeft: this.state.opacityBox,
                                marginRight: this.state.opacityBox,
                                marginTop: this.state.marginTopBox
                            }}>
                                <Animated.View style={{ 
                                    flex:1, 
                                    backgroundColor:'#000', 
                                    opacity: 0.5, 
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                 
                                    {this._getBackButton()}
                                    {this._getTitleHeader()}
                                    {this._getIconButton()}
                                    
                                </Animated.View>
                        </Animated.View> 
                   
                        </ImageBackground>
                    </Animated.View>
             
                    <View style={{flex: 1, height:height-130}}>
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

Header.defaultProps = {
    opacityStyle: {margin: 20, opacity: 0.5, },
    titleStyle: { fontSize: 50, fontWeigth: 'bold',color: "#fff", },
    backTextStyle:{fontSize: 20, color: "#fff"},
}