import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import { Button  } from '../common/Button';
import { Card  } from '../common/Card';
import { CardSection } from '../common/CardSection';
import { Icon} from 'react-native-elements'
import axios from 'axios'
import _ from 'lodash'

var token = 'Basic Z3Vlc3Q6cGFzc3dvcmQ=';
var  data = {
        'RqAppID':'1234',
        'UserLanguage':'EN',
        'MarketID':'3',
        'Version':'1.1.4'
    }
var config = {
    headers: {  
        'Authorization': token,
        'Content-Type': 'application/json'
            }
};



class HomeScreen extends Component{
    state = { 
        items: [],
        datas: [],
        Menu: [ 
    
        ]
    };

    componentWillMount(){
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
        data , config )
        .then(response => {this.setState({ items: response.data } ) })
        .catch((error) => {
            console.log('axios error:',error);
        });
       
    }

   

    renderData(){
        let i=1
        _.map((this.state.items.MenuList), (val)=>{
            if(val.Sequence !== '1'){
                this.state.Menu[i] = val;
            }
            _.each((val.SliderList), (why) => {
                this.state.datas[i] = why;
               // console.logthis.state.datas.Name)
            })
            i++
        })
       
    }
    

    
    renderItem( Menu ){

        return <ItemDetail Menu={ Menu } />;
        
    }



  render(){
        {this.renderData()}
        return (
            <View>
                    {this.renderItem(this.state.Menu)}
            </View>
            
        );
    }


}

const styles = StyleSheet.create({
    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 4,
        paddingBottom: 5
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
        width: '100%',
        flex: 1
    }
})

const {
    thumbnailStyle,
    headerContentStyle,
    thumbnaiContainerStyle,
    headerTextStyle,
    imageStyle
} = styles;


class ItemDetail extends Component {

    // renderImg(){
    //     console.log(this.state.datas)
    //     return this.state.datas.map(items => 
    //         <ItemImg key={items.Name} items={items}/>
    //     );
    // }

    render(){
        return (
            <ScrollView>
                <Card  style={{ flex: 4}}>
                    <CardSection  style={{ flex: 1}}>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle} >{Menu}</Text>
                        <Text style={headerTextStyle}> ดูทั้งหมด </Text>
                    </View>
                    </CardSection>
                    <CardSection >
                      
                    </CardSection>
                </Card>
            </ScrollView>
        )
    }
}





// const ItemImg = ({ items }) => {
 
//     return (
        
//                     <ScrollView horizontal={true}
//                         showsHorizontalScrollIndicator={false} >
//                     <Image
//                         style={{width: 150, height: 100, borderRightWidth: 5}}
//                         source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
//                         />
//                         <Image
//                         style={{width: 150, height: 100 ,borderRightWidth: 5}}
//                         source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
//                         />
//                         <Image
//                         style={{width: 150, height: 100,borderRightWidth: 5}}
//                         source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
//                         />
//                         <Image
//                         style={{width: 150, height: 100,borderRightWidth: 5}}
//                         source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
//                         />
//                     </ScrollView>
//     )
// }





export default HomeScreen