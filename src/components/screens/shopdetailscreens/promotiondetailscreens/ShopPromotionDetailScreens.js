import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, TouchableOpacity, Image } from 'react-native';
import moment from 'moment'
import {  HeaderBackButton } from 'react-navigation'
import { Header } from '../../../common'
import I18n from '../../../config/i18n'
class ShopPromotionDetailScreens extends Component {

    onButtonGoBack() {
        this.props.navigation.goBack()
    }

    CreatedDate(key) {

        // console.log("Date", key) 
        const resDateStart = key.StartDate.substring(0, 10)
        const resEndDate = key.EndDate.substring(0, 10)
        // const resT = key.substring(11, 16)
        const DateBeforeS = resDateStart.split("/")
        const DateBeforeE = resEndDate.split("/")

        // console.log("Date DateBefore", DateBeforeS)
        // // console.log("resT ", resT)

        const DateAfterS = DateBeforeS[2] + '-' + DateBeforeS[1] + '-' + DateBeforeS[0]
        const DateAfterE = DateBeforeE[2] + '-' + DateBeforeE[1] + '-' + DateBeforeE[0]

        // const formattedDataS = moment(DateAfterS).format("D MMM YYYY")
        const formattedDataE = moment(DateAfterE).format("D MMM YYYY")
        // console.log("Date formattedDataS", formattedDataS);
        // console.log("Date formattedDataE", formattedDataE);

        // console.log("Date DateBeforeS[2]", DateBeforeS[2]);

        if (DateBeforeS[2] === DateBeforeE[2]) {
            const formattedDate = moment(DateAfterS).format("D MMM")
            let isDatePromo = ''
            isDatePromo = formattedDate
            return (
                <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedDataE} </Text>

            )
        } else {
            const formattedDate = moment(DateAfterS).format("D MMM YYYY")
            // this.setState({ isDatePromo: formattedDate })
            return (
                <Text style={{ fontSize: 18, color: '#a6a6a6' }}> {formattedDate} - {formattedDataE} </Text>
            )
        }

    }
    render() {
        const Promotion = this.props.navigation.getParam('Promotion');
        // console.log(Promotion)
        return (
            <View style={{ flex: 1 }}>
             <Header headerText={"Promotion Detail"}
                    backgroundImage={require('../../../images/drawable-hdpi/bg_more.webp')}
                    headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />} />
                <Image
                    style={{ width: '100%', height: 250, }}
                    source={{ uri: Promotion.ShopImageUrl }}
                />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: '5%', marginTop: 10 }}>
                        {Promotion.Name}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: '5%', marginTop: 10 }}>
                    <Image
                        source={require('../../../../components/images/drawable-hdpi/ic_clock_promotion.webp/')}
                    />
                    {this.CreatedDate(Promotion)}


                </View>
                <View style={{paddingLeft: '5%',marginTop: 10}}>
                    <Text>
                        {Promotion.Description}
                    </Text>
                </View>
            </View>

        );
    }
}

export {ShopPromotionDetailScreens}