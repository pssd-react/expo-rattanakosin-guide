import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions,
    Image} from 'react-native';
import _ from 'lodash'
import { HeaderBackButton } from 'react-navigation'
import { Header } from '../../common'
import Communications from 'react-native-communications';
import I18n from './../../config/i18n'


class ShopMoreDescriptionScreen extends Component {

  state = {
    detailSec: []
  };

  componentWillMount() {
    const detailSec = this.props.navigation.getParam('detailSec', 'none')
    this.setState({
        detailSec: detailSec
    })
  }

  onButtonGoBack() {
    this.props.navigation.goBack()
}

  renderDescription() {
    //console.log(this.state.detailSec);

    let shopDescription = ''
    let shopPhone = ''

    _.map(this.state.detailSec, items => {
       console.log(items.ShopPhone);
      if (items.ShopDescription !== undefined) {
        shopDescription = items.ShopDescription
      }
      if (items.ShopPhone !== undefined) {
        shopPhone = items.ShopPhone
      }

    })

    if (shopPhone !== '') {
        
        let stThreeDigits = shopPhone.substr(0, 3)
        let ndThreeDigits = shopPhone.substr(3, 3)
        let lastFourDigits = shopPhone.substr(6, 4)
        return (
            <ScrollView>
        <Text
          style={{
            color: 'black', fontSize: 16, textAlign: 'justify',
            lineHeight: 30, marginLeft: 10, marginRight: 10, marginTop: 20
          }}>
          {shopDescription}
        </Text>
        <View style={{
                width: Dimensions.get('window').width,
                height: 50,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white'
            }}>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../../images/drawable-hdpi/ic_phone.webp')}
                />
                <TouchableOpacity onPress={() => Communications.phonecall(shopPhone, true)}>
                    <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 5, color: 'black', textDecorationLine: 'underline' }}>
                        {I18n.t('tel')} {shopPhone.includes('-') ? shopPhone : stThreeDigits+'-'+ndThreeDigits+'-'+lastFourDigits}
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
      </ScrollView>
        )
    } else {
        return (
            <ScrollView>
        <Text
          style={{
            color: 'black', fontSize: 16, textAlign: 'justify',
            lineHeight: 30, marginLeft: 10, marginRight: 10, marginTop: 20
          }}>
          {shopDescription}
        </Text>
        <View style={{
                width: Dimensions.get('window').width,
                height: 50,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#dddddd',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'white'
            }}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../../images/drawable-hdpi/ic_phone.webp')}
                />
                <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 5, color: 'black', textDecorationLine: 'underline' }}>
                    -
                    </Text>
            </View>
            </View>
      </ScrollView>
            
        )
    }
  }

  render() {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header headerText={I18n.t('more_desc_head')}
                    backgroundImage={require('../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
          {this.renderDescription()}
        </View>
    );
  }
}

export {ShopMoreDescriptionScreen};