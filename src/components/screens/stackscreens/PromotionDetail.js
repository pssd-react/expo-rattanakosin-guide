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
import { Icon } from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'
import ViewMoreText from 'react-native-view-more-text';
import { ButtonStar,ButtonLocal , ButtonHighlight} from '../../common';
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common';



export class PromotionDetail extends Component {
    
    render(){

        return(
            <View>
                <Text>  PromotionDetail  </Text>
            </View>
        )
    }

}

