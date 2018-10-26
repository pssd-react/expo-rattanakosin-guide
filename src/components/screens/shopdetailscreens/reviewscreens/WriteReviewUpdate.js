import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { HeaderBackButton } from 'react-navigation'
import StarRating from 'react-native-star-rating';
import { LabelInput } from '../../../../components/common/LabelInput';
import { Button } from 'react-native-elements';
import axios from 'axios'
import _ from 'lodash'
import { Header } from '../../../common';
import I18n from '../../../config/i18n'

class writereviweUpdate extends Component {

        state = {
            starCount: '',
            ReviewContent: '',
            reviewId: '',
            shopId: '',
            userId: 'none',
            token : ''
        }


    componentDidMount() {
        this.fetDataUpdate()
    }

    fetDataUpdate(){
        const shopId = this.props.navigation.getParam('shopId', '')
        const reviewId = this.props.navigation.getParam('reviewId', 'none');
        const starCount = this.props.navigation.getParam('ratings', 0.0);
        const ReviewContent = this.props.navigation.getParam('reviewContent', 'none');

        this.setState({ 
            reviewId:reviewId,
            starCount:starCount,
            ReviewContent:ReviewContent,
            shopId: shopId,
            userId: this.props.navigation.getParam('userId', 'none'),
            token: this.props.navigation.getParam('token', '')
        })

        console.log(reviewId,starCount,ReviewContent)
        console.log("this.state",this.state)
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
            "ReviewID": this.state.reviewId,
            "ReviewContent": this.state.ReviewContent,
            "SessionToken": this.state.token
        }
        const config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
                'Content-Type': 'application/json'
            }
        }
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/UpdateDataShopReviewService',
            data, config)
            .then(response => {
                this.setState({ Review: response.data })
                if (response.data.ResponseDetail === 'Success') {
                    console.log('Successsssssss');
                    this.props.navigation.state.params.returnData()
                    this.props.navigation.goBack()
                }
            })
            .catch((error) => {
                console.log('axios error:', error);
            });

    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });

    }
    render() { 
      
        return (
            <View style={{ flex: 1 }}>
            <Header 
            headerText={'Edit Review'} 
            backgroundImage= {require('../../../images/drawable-hdpi/bg_more.webp')}
            headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.props.navigation.goBack()} />}/>
                <View style={{ flexDirection: 'column', height: '30%', backgroundColor: '#595959' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ height: 20, flexDirection: 'column', flex: 1, marginTop: '5%' }}>
                            <View >
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={parseFloat(this.state.starCount)}
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

export default writereviweUpdate;