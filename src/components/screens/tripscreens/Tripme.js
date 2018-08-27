import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Image,
    ImageBackground
} from 'react-native'
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { ButtonTrip } from '../../common/ButtonTrip';
// import  LoginForm   from '../../authen/LoginForm'
import { Actions } from 'react-native-router-flux';


const INITAL_STATE = {
    textbox: 'เลือกร้านค้าและสร้างทริป         ส่วนตัวได้ที่นี่',
    textBT: 'เริ่มสร้างทริป',
    login: 0
};


export class Tripme extends Component{
   state = INITAL_STATE;

   onButtonPress = ()=>{
        console.log(this.state.login);
        if(this.state.login == '0'){
            console.log("เข้า IF");
            // Actions.LoginForm();
        }else { 
            console.log("เข้า Else");
        }
    }






    render(){
        return (
            <Card>
                <CardSection>         
                    <ImageBackground
                        source={{uri: 'http://www.wikalenda.com/images/business_owner_image/main/MDAwMDAwMDAx_NTc0MjcwODIwMDkzNzAwNDU1MzAwNDc3.bmp'}}
                        style={styles.stretch}
                        >
                      <View style= {styles.overlayContainer}>

                            <View style = {styles.top}>
                                <Text style={styles.header}> {this.state.textbox}</Text>
                            </View>
                            <View style = {styles.top}>
                                <ButtonTrip style={styles.buttonStyle}
                                 onPress={this.onButtonPress}
                                 onIndexChange={index => this.setState({ login })}
                                 > 
                                    {this.state.textBT}
                                 </ButtonTrip>
                            </View>
                      </View>
                    </ImageBackground> 
                </CardSection>
            </Card>
            
        )
    }
}






const styles = StyleSheet.create({
    overlayContainer:{
        flex:1,
       // color: '#FFFFFF'
    },
    stretch: {
        flex:1,
        width: 400,
        height: 150
    },
    header: {
        color: '#FFFFFF',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
    },
    buttonStyle: {
        color: '#131313',
        fontSize: 18,
        backgroundColor: '#F8E21C',
        width: 100,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 150,
        marginBottom: 20
    },
    top: {
        alignItems: 'center',
        height: '50%',
        justifyContent: 'center'
    },

})


export default Tripme