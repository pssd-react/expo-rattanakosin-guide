import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Image
} from 'react-native'
import { Card } from '../../common/Card'
import { CardSection } from '../../common/CardSection'
import { TripImg } from '../../common/TripImg'
export class Exclusive extends Component{
  

        render(){
            return (
                <Card style = {styles.container}>
                    <CardSection>
                        <View >
                            <TripImg />
                        </View>
                    </CardSection>
                    <View style={styles.container}>
                        <Text style={styles.text} >Comming Soon </Text>
                    </View>
                </Card>
                
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
