import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import StarRating from 'react-native-star-rating';
import  { LabelInput } from '../../../../components/common/LabelInput';
import { Button } from 'react-native-elements';
import axios from 'axios'
import _ from 'lodash'

class writereviwe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            ReviewContent: ''
        };
    }

 
    onPost() {
        console.log(this.state)
        const data = {
            "RqAppID": "1234",
            "ShopID": "108428",
            "UserID": "1",
            "Rating": this.state.starCount,
            "DisplayName": "test",
            "ReviewContent": this.state.ReviewContent,
            "SessionToken": ""
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
                                <Text style={{ fontSize: 16, fontStyle: 'bold', color: '#b3b3b3' }}>
                                    Tap on star to give rating
                            </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, marginLeft: '5%' }}>
                        <LabelInput
                            label="Write review here..."
                            value={this.state.ReviewContent}
                            onChangeText={ReviewContent => this.setState({ ReviewContent })}
                        />
                    </View>
                </View>

                <View>
                    <Button
                        title='post'
                        onPress={() => this.onPost()}
                    />
                </View>
            </View>

        );
    }
}

export default writereviwe;