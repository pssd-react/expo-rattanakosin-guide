import React, {Component} from 'react'
import { View, Text,StyleSheet, Image} from 'react-native'

class ShopPromotionScreen extends Component{

    render(){
        return (<View style={styles.container}>
                    <View style={styles.containerflex}>
          <Image
            source={require('../../../components/images/drawable-hdpi/ic_no_flash_sale_foun.webp')}
          />
          <Text style={{ fontSize: 18, color: '#a6a6a6' }} > ไม่อยู่ในช่วงโปรโมชัน </Text>
        </View>
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    containerflex: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  
export {ShopPromotionScreen}