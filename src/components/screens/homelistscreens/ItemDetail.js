import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from '../../common/Button';
import { Card  } from '../../common/Card';
import { CardSection } from '../../common/CardSection';




const ItemDetail = ({ items }) => {

    const { Sequence, Name, Scale } = items;
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnaiContainerStyle,
        headerTextStyle,
        imageStyle
    } = styles;
    return(
        <Card>
            <CardSection>
            <View style={headerContentStyle}>
                <Text style={headerTextStyle} >{Scale}</Text>
                <Text style={headerTextStyle}> ดูทั้งหมด </Text>
            </View>
            </CardSection>
            <CardSection >
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false} >
                    
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                    <Image
                    style={{width: 66, height: 58}}
                    source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                    />

                            <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                    <Image
                    style={{width: 66, height: 58}}
                    source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                    />
                    <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                   
                </ScrollView>
            </CardSection>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingButtom: 5
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle:{
        height: 50,
        width: 50
    },
    thumbnaiContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        width: null,
        flex: 1
    }
};



export default ItemDetail;