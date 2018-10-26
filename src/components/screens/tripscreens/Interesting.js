import React, {Component} from 'react'
import { 
    Card, 
    CardSection, 
    TripImg, 
    Button, 
    Spinner 
} from '../../common'
import Carousel from 'react-native-carousel-view'
import {
    View,
    Text, 
    StyleSheet,
    Image, 
    Dimensions,
    ScrollView
} from 'react-native'

const BannerWidth = Dimensions.get('window').width
const BannerHeight = 200

const images = [
    "https://thumbs.dreamstime.com/b/museum-siam-located-sanamchai-road-bangkok-thailand-set-inside-very-large-neoclassical-house-57946193.jpg",
    "https://www.smartsme.co.th/wp-content/uploads/2017/10/SCB-%E0%B8%A2%E0%B9%88%E0%B8%AD-%E0%B8%A2%E0%B8%B7%E0%B8%94-%E0%B8%82%E0%B8%A2%E0%B8%B2%E0%B8%A2.jpg",
];

class Interesting extends Component{

    renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        )
    }

    renderButton() {

        if(this.props.loading){
            return <Spinner size='small'/>;
        }
        return ( 
            <Button>
                + ติดตาม
            </Button>
        )
    }

    render(){
        return (
            <View style={styles.container}>
            <ScrollView>
            <Carousel
                autoplay
                delay={3000}
                indicatorAtBottom={true}
                indicatorSize={20}
                indicatorColor="purple"
                width={BannerWidth}
            >
                {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
            
                <Card>
                
                    <CardSection>
                        <Image style={{width: 300, height: 250, flex: 1 }} source={{ uri: 'https://static.blog.playstation.com/wp-content/uploads/2018/05/41361756725_2aad0e6831_h-755x425.jpg' }} />
                    </CardSection>
                    <View>
                    <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../../images/drawable-hdpi/ic_category_food.webp')}
                            />
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../../images/drawable-hdpi/ic_category_shop.webp')}
                            />
                        </View>  
                        <Text style={{ fontSize: 22 }}>
                            Cyberlife Tour
                        </Text>
                        <Text>รายละเอียด</Text>
                        <Text>รายละเอียด</Text>
                        <Text>รายละเอียด</Text> 
                        <Text>รายละเอียด</Text>

                        
                        <View>
                            {this.renderButton()}
                        </View>
                        

                    </View>
                </Card>
            </ScrollView>
            </View>
                    
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        justifyContent:'center',
        backgroundColor: 'white',
        
    },
    text:{
        textAlign:'center',
        backgroundColor: '#d35400',
        fontSize: 20
    },
    
    
    
})

export {Interesting}
