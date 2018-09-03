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

var  data = {
        'RqAppID':'1234',
        'UserLanguage':'EN',
        'MarketID':'3',
        'Version':'1.1.4'
    }
var config = {
    headers: {  
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
            }
};



class HomeScreen extends Component{
    state = { 
<<<<<<< HEAD
        items: [],
        datas: [],
        Menu: [ 
    
        ]
=======
        item: ''
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
    };

    componentWillMount(){
        axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryMenuGuideService',
        data , config )
<<<<<<< HEAD
        .then(response => {this.setState({ items: response.data } ) })
=======
        .then(response => {this.setState({ item : response.data } ) })
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
        .catch((error) => {
            console.log('axios error:',error);
        });
       
    }
<<<<<<< HEAD

   

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
        
=======
    
    renderItem(){
       //console.log(this.state.item)
            const hellow =  _.map((this.state), (items) => {
                return (<ItemDetail items={ items.MenuList } />)
            })
        
        return  hellow 
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
    }



  render(){
<<<<<<< HEAD
        {this.renderData()}
        return (
            <View>
                    {this.renderItem(this.state.Menu)}
            </View>
=======
        //console.log(this.state)
        return (
            <Card style={{flex:1}}>
                <CardSection>
                    <View style={{height:'30%'}}>

                    </View>
                </CardSection>
                <CardSection>
                    {this.renderItem()}
                </CardSection>
            </Card>
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
            
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
<<<<<<< HEAD

=======
    state = {
        item : []
    }
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
    // renderImg(){
    //     console.log(this.state.datas)
    //     return this.state.datas.map(items => 
    //         <ItemImg key={items.Name} items={items}/>
    //     );
    // }

<<<<<<< HEAD
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
=======
    renderImg(imgs){
        //if scale blah blah
        const base_url = 'https://uat-shop.digitalventures.co.th'

            return _.map(imgs.SliderList, imgSlider=>{
               return (<Image
                        style={{width: 150, height: 100, borderRightWidth: 5}}
                        source={{uri: 'https://images-na.ssl-images-amazon.com/images/I/51Gji7jFNjL._SX425_.jpg'}}
                        />)
            })
 
    }

    renderData(){
        return _.map(this.props.items, item =>{
            return (
                <Card  style={{ flex: 4}}>
                    <CardSection  style={{ flex: 1}}>
                    <View style={headerContentStyle}>
                        <CardSection style={{flexDirection:'row', flex:1}}>
                        <Text style={headerTextStyle} >{item.Name}</Text>
                        <Text style={{justifyContent:'flex-end'}} >ดูทั้งหมด</Text>
                        </CardSection>
                    </View>
                    </CardSection>
                    <CardSection >
                        <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        >
                        {this.renderImg(item)}
                        </ScrollView>
                    </CardSection>
                </Card>
            )
        })
    }

    render(){
        return (
            <ScrollView>
                {this.renderData()}
>>>>>>> 78d081117fb010a1cca648e4f8d6c3738a15bcf6
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