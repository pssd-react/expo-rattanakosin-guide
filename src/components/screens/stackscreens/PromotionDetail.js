import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';
import { Icon, Button } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text';
import { ButtonLocal , ButtonHighlight} from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';
import {StoreGlobal} from './../../config/GlobalState';

class PromotionDetail extends Component {
    static navigationOptions = { header: null }

    onButtonGoBack(){
        // StoreGlobal({type:'set',key:'flashState',value:'true'})
        this.props.navigation.navigate('FlashSaleMain')
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>  PromotionDetail  </Text>
                <Button
                title={'Back'}
                onPress={()=>this.onButtonGoBack()}
                containerViewStyle={{position: 'absolute' ,bottom:10, right:0, }}
                buttonStyle={{    
                backgroundColor: "#999999",
                width: 60,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5}}
                />
            </View>
        )
    }

}

export default PromotionDetail

