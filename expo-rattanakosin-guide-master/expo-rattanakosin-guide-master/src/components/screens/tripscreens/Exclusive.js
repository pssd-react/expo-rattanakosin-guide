import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Image,
    Dimensions
} from 'react-native'

class Exclusive extends Component{

        render(){
            return (
                <View style={{flex:1, flexDirection: 'column',}}>
                    <View>
                        <Image
                            style={{width: Dimensions.get('window').width,
                                height: 150}}
                            source={{uri: 'http://www.wikalenda.com/images/business_owner_image/main/MDAwMDAwMDAx_NTc0MjcwODIwMDkzNzAwNDU1MzAwNDc3.bmp'}}
                        />
                    
                    </View>
                    <View style={styles.container}>
                            <Image
                            style={{width: 300 , height: 60}}
                            source={require('../../images/drawable-hdpi/ic_line_exclusive.webp')}
                        />
                    </View>
                </View>
                
            )
        }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
    },
    text:{
        textAlign:'center',
        fontSize : 20
    }
})

export {Exclusive}