import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import StarRating from 'react-native-star-rating';
import  { LabelInput } from '../../../../components/common/LabelInput';
import { Button } from 'react-native-elements';
import axios from 'axios'
import _ from 'lodash'
import { Header } from '../../../common';
import I18n from './../../../config/i18n'

class writereviwe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            ReviewContent: '',
            shopId: '',
            userId: 'none',
            userDisplay: '',
            token: ''
        };
    }

    componentDidMount(){
        this.setState({
            shopId : this.props.navigation.getParam('shopId', ''),
            userId : this.props.navigation.getParam('userId', 'none'),
            userDisplay : this.props.navigation.getParam('userDisplay', ''),
            token : this.props.navigation.getParam('token', '')
        })
    }
 
    onPost() {
        if(this.state.userId === 'none'){
            this.props.navigation.goBack()
        }
        const data = {
            "RqAppID": "1234",
            "ShopID": this.state.shopId,
            "UserID": this.state.userId,
            "Rating": this.state.starCount,
            "DisplayName": this.state.userDisplay,
            "ReviewContent": this.state.ReviewContent,
            "SessionToken": this.state.token
        }
        const config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type': 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateShopReviewService',
            data, config)
            .then(response => { 
                this.setState({ Review: response.data })
                if(response.data.ResponseDetail === 'Success'){
                    console.log('Successsssssss');
                    this.props.navigation.state.params.returnData()
                    this.props.navigation.goBack()
                }
            })
            .catch((error) => {
                console.log('axios error:', error);
            });
            
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     console.log('---------')
    //     console.log('prev state')
    //     console.log(prevState)
    //     console.log('---------')
    //     console.log('this state')
    //     console.log(this.state)
    //     console.log('---------')
    // }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });

    }
    render() {
        return (
            <View style={{ flex: 1 }}>
            <Header 
            headerText={'Write Review'} 
            backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.props.navigation.goBack()} />}/>
                <View style={{ flexDirection: 'column', height: '30%', backgroundColor: '#595959' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 20, flexDirection: 'column', flex: 1, marginTop: '5%' }}>
                            <View >
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={'yellow'}
                                    containerStyle={{ width: '40%', alignSelf: 'center' }}
                                    starSize={30}
                                />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#b3b3b3' }}>
                                    {I18n.t('tap_star')}
                            </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginLeft: '5%' }}>
                        <LabelInput
                            label={I18n.t('write_here_place_holder')}
                            value={this.state.ReviewContent}
                            onChangeText={ReviewContent => this.setState({ ReviewContent })}
                        />
                    </View>
                </View>

                <View>
                    <Button
                        title={I18n.t('post_btn')}
                        onPress={() => this.onPost()}
                    />
                </View>
            </View>

        );
    }
}

export default writereviwe;