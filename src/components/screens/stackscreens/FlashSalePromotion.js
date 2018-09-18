import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableHighlight,
    Animated,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import axios from 'axios'
import _ from 'lodash'
import { createStackNavigator } from 'react-navigation'
import  PromotionDetail  from './PromotionDetail'
import {StoreGlobal} from './../../config/GlobalState'


var data = {
    "RqAppID":"1234",
    "UserLanguage":"TH",
    "UserID":"",
    "ClientTime":"",
    "MarketID":"3",
    "ShopPromotionType":"A"
}
    
var config = {
    headers: {
        'Authorization': 'Basic Z3Vlc3Q6cGFzc3dvcmQ=',
        'Content-Type': 'application/json'
    }
};


class FlashSalePromotion extends Component{
  state = {
    item: '',
    activeSection: false,
    collapsed: true,
    collapsedC: true,

    icons:{    
        'up'    : require('../../images/drawable-hdpi/ic_arrow_expanable_up.webp'),
        'down'  : require('../../images/drawable-hdpi/ic_arrow_expanable_down.webp')
    },
    numPresent: undefined,
    numComming: undefined

  };


  componentWillMount() {
    axios.post('https://uat-shop.digitalventures.co.th/wp-json/jj/dvservice/v1/InquiryFlashSaleService',
        data, config)
        .then(response => { this.setState({ item: response.data}) })
        .catch((error) => {
            console.log('axios error:', error);
    });
  }




  togglePresen = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  toggleComming = () => {
    this.setState({ collapsedC: !this.state.collapsedC });
  };

  

  setSection = section => {
    this.setState({ activeSection: section });
  };

  renderheaderPresent(){
    
    return(
      <Text style={styles.headerText}>ปัจจุบัน ({this.state.numPresent})</Text>
    )

  }

  renderheaderComming(){
    return(
      <Text style={styles.headerText}>เร็วๆ นี้ ({this.state.numComming})</Text>
    )
  }

  onPresentPress(){
    // StoreGlobal({type:'set',key:'flashState',value:'false'})
    // console.log(StoreGlobal({type:'get',key:'flashState'}))
    this.props.navigation.navigate('PromotionDetailScreen')
  }

  renderPresent(){
    let num = 0;
    let count = null;
    if(this.state.numPresent === undefined){
    _.map((this.state.item.StaticLocation), (items) => {      
      var d1 = items.CurrentDateTime.split(' ');
      var a1 = d1[0].split('/');
      var a2 = d1[1].split(':');
      var Ctime = new Date( a1[2],a1[1],a1[0],a2[0],a2[1],a2[2])
  
      var d2 = items.StartDate.split(' ');
      var b1 = d2[0].split('/');
      var b2 = d2[1].split(':');
      var Stime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])

      var d2 = items.EndDate.split(' ');
      var b1 = d2[0].split('/');
      var b2 = d2[1].split(':');
      var Etime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])

      if(Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'N' ){
       num++
      }
      this.setState({numPresent: num})
   })
  }else if(this.state.numPresent){
       count = _.map((this.state.item.StaticLocation), (items) => {
        var d1 = items.CurrentDateTime.split(' ');
        var a1 = d1[0].split('/');
        var a2 = d1[1].split(':');
        var Ctime = new Date( a1[2],a1[1],a1[0],a2[0],a2[1],a2[2])
    
        var d2 = items.StartDate.split(' ');
        var b1 = d2[0].split('/');
        var b2 = d2[1].split(':');
        var Stime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])

        var d2 = items.EndDate.split(' ');
        var b1 = d2[0].split('/');
        var b2 = d2[1].split(':');
        var Etime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])
       if(Ctime >= Stime && Ctime <= Etime && items.Is_FlashSale === 'N'){
            return (
                    <TouchableOpacity style={styles.content} key={items.Name} onPress={()=> this.onPresentPress()}>
                        <View style={{ flex: 6 }}>
                            <View style={{ flexDirection: 'column'}}>
                                <View style={{ flex: 1 , marginBottom: 5}}>
                                    <Text style = {{ fontWeight: 'bold' , fontSize: 20}}> {items.Name} </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                  <Image
                                  source={ require('../../images/drawable-hdpi/ic_clock_promotion.webp/') } 
                                  />
                                  {this.renderDate(items)}
                                </View>
                          </View>
                        </View>
                        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Image                
                                source={ require('../../images/drawable-hdpi/ic_arrow_right.webp/') } 
                            /> 
                        </View>
                    </TouchableOpacity>    
            ) 
        }
    })
  }
    return count;
  }

  renderComming(){

    let num = 0;
    let count = null;
    if(this.state.numComming === undefined){
    _.map((this.state.item.StaticLocation), (items) => {
      var d1 = items.CurrentDateTime.split(' ');
      var a1 = d1[0].split('/');
      var a2 = d1[1].split(':');
      var Ctime = new Date( a1[2],a1[1],a1[0],a2[0],a2[1],a2[2])
  
      var d2 = items.StartDate.split(' ');
      var b1 = d2[0].split('/');
      var b2 = d2[1].split(':');
      var Stime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])

      var d2 = items.EndDate.split(' ');
      var b1 = d2[0].split('/');
      var b2 = d2[1].split(':');
      var Etime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])
      if(Ctime <= Stime && items.Is_FlashSale === 'N'){
           num++ 
       }
       this.setState({numComming: num})
   })
  }else if(this.state.numComming){
       count = _.map((this.state.item.StaticLocation), (items) => {
        var d1 = items.CurrentDateTime.split(' ');
        var a1 = d1[0].split('/');
        var a2 = d1[1].split(':');
        var Ctime = new Date( a1[2],a1[1],a1[0],a2[0],a2[1],a2[2])
    
        var d2 = items.StartDate.split(' ');
        var b1 = d2[0].split('/');
        var b2 = d2[1].split(':');
        var Stime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])
  
        var d2 = items.EndDate.split(' ');
        var b1 = d2[0].split('/');
        var b2 = d2[1].split(':');
        var Etime = new Date( b1[2],b1[1],b1[0],b2[0],b2[1],b2[2])
       if(Ctime <= Stime && items.Is_FlashSale === 'N'){
            num++
            return (
                    <View key={items.Name} style={styles.content}>
                        <View style={{ flex: 6 }}>
                            <View style={{ flexDirection: 'column'}}>
                                <View style={{ flex: 1, marginBottom: 5}}>
                                    <Text style = {{ fontWeight: 'bold' , fontSize: 20}}> {items.Name} </Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row'}}>
                                  <Image
                                  source={ require('../../images/drawable-hdpi/ic_clock_promotion.webp/') } 
                                  />
                                  {this.renderDate(items)}
                                </View>
                          </View>
                        </View>
                        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'flex-end'}}>
                            <Image 
                              
                                source={ require('../../images/drawable-hdpi/ic_arrow_right.webp/') } 
                            /> 
                        </View>
                    </View>    
            ) 
        }
    })
  }
    return count;
  }

  renderArrowPresen(){

    if(this.state.collapsed === true){
      return( 
        <Image style={{width:15, height:10 ,right: 0}}
        source={ this.state.icons.down } 
        /> 
      )
    }else{
      return( 
        <Image style={{width:15, height:10 ,right: 0}}
        source={ this.state.icons.up } 
        /> 
      )
    }

  }

  renderArrowComming(){

    if(this.state.collapsedC === true){
      return( 
        <Image style={{width:15, height:10 ,right: 0}}
        source={ this.state.icons.down } 
        /> 
      )
    }else{
      return( 
        <Image style={{width:15, height:10 ,right: 0}}
        source={ this.state.icons.up } 
        /> 
      )
    }

  }

  renderDate(key){
    const StartDate = key.StartDate;
    const res = StartDate.substring(0, 10);
    const DateBefore = res.split("/");
    const DateAfter = DateBefore[2]+'-'+DateBefore[1]+'-'+DateBefore[0];
   // console.log(key.StartDate, " ======== " ,key.EndDate)
    const EndDate = key.EndDate;
    const ress = EndDate.substring(0, 10);
    const DataBefore = ress.split("/");
    const DataAfter = DataBefore[2]+'-'+DataBefore[1]+'-'+DataBefore[0];
    const formattedData = moment(DataAfter).format("D MMM YYYY");
    if(DateBefore[2] === DataBefore[2]){
      const formattedDate = moment(DateAfter).format("D MMM");
      return(
          <Text style = {{  fontSize: 18 , color: '#a6a6a6'}}> {formattedDate} - {formattedData} </Text>
      )
    }else{
      const formattedDate = moment(DateAfter).format("D MMM YYYY");
      return(
        <Text style = {{  fontSize: 18 , color: '#a6a6a6'}}> {formattedDate} - {formattedData} </Text>
      ) 
    }
  }


  renderMain(){
    if(this.state.numPresent === 0 && this.state.numComming === 0){
      return(
        <View style={styles.containerflex}>
          <Image

            source={ require('../../images/drawable-hdpi/ic_no_flash_sale_foun.webp') } 
          /> 
          <Text style={{ fontSize: 18 , color: '#a6a6a6'}} > ไม่มีรายการโปรโมชั่น</Text>
        </View>
      )
    }else{
      return(
        <ScrollView>
        <TouchableOpacity onPress={this.togglePresen}>
            <View style={styles.header}>
                {this.renderheaderPresent()}
                {this.renderArrowPresen()}
            </View>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.collapsed} align="center">  
            {this.renderPresent()}  
        </Collapsible>
        
        <TouchableOpacity onPress={this.toggleComming}>
            <View style={styles.header}>
                {this.renderheaderComming()}
                {this.renderArrowComming()}
            </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.collapsedC} align="center">
            {this.renderComming()}  
        </Collapsible>
        
      </ScrollView>
      )
    }
  }




  render() {
    
    return (
            <View style={styles.container}>
              {this.renderMain()}
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },  
  containerflex: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row'
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex:1,
    marginBottom: 2
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});

export default FlashSalePromotion