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

var data = {
    "RqAppID":"1234",
    "UserLanguage":"EN",
    "UserID":"1",
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


export class FlashSalePromotion extends Component{
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



  renderPresent(){
    let num = 0;
    let count = null;
    if(this.state.numPresent === undefined){
    _.map((this.state.item.StaticLocation), (items) => {
      var Ctime = items.CurrentDateTime;
      var Stime = items.StartDate;
      var Etime = items.EndDate;
      var Cres = Ctime.substring(0, 10);
      var Sres = Stime.substring(0, 10);
      var Eres = Etime.substring(0, 10);
      var Cress = new Date(Cres);
      var Sress = new Date(Sres);
      var Eress = new Date(Eres);
      console.log(Cress,'>=',Sress, '=',Cress >= Sress)
      if(items.Is_FlashSale === 'N' ){
       num++
      }
      this.setState({numPresent: num})
   })
  }else if(this.state.numPresent){
       count = _.map((this.state.item.StaticLocation), (items) => {
        
       if(items.Is_FlashSale === 'N'){
            return (
                    <View style={styles.content}>
                        <View style={{ flex: 6 }}>
                            <View style={{ flexDirection: 'column'}}>
                                <View style={{ flex: 1 , border: 5 , marginBottom: 5}}>
                                    <Text style = {{ fontWeight: 'bold' , fontSize: 20}}> {items.Name} </Text>
                                </View>
                                <View style={{ flex: 1, border: 5, flexDirection: 'row'}}>
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

  renderComming(){

    let num = 0;
    let count = null;
    if(this.state.numComming === undefined){
    _.map((this.state.item.StaticLocation), (items) => {
     // console.log(num)
      if(items.Is_FlashSale === 'N'){
           num++ 
       }
       this.setState({numComming: num})
   })
  }else if(this.state.numComming){
       count = _.map((this.state.item.StaticLocation), (items) => {
      // console.log(num)
       if(items.Is_FlashSale === 'N'){
            num++
            return (
                    <View style={styles.content}>
                        <View style={{ flex: 6 }}>
                            <View style={{ flexDirection: 'column'}}>
                                <View style={{ flex: 1 , border: 5 , marginBottom: 5}}>
                                    <Text style = {{ fontWeight: 'bold' , fontSize: 20}}> {items.Name} </Text>
                                </View>
                                <View style={{ flex: 1, border: 5, flexDirection: 'row'}}>
                                  <Image
                                  source={ require('../../images/drawable-hdpi/ic_clock_promotion.webp/') } 
                                  />
                                  <Text style = {{  fontSize: 18 , color: '#a6a6a6'}}> 09 เม.ย - 30 ก.ย. 2561 </Text>
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



  render() {
    
    // var d1 = '01/12/2018';
    // var d2 = '10/12/2018';
    // var d1 = new Date(d1);
    // var d2 = new Date(d2);
    // console.log(d1,'>',d2,'=',d1 >  d2); // false
    // console.log(d1,'<',d2,'=',d1 <  d2); // True
    // console.log(d1,'>=',d2,'=',d1 >=  d2); // false
    // console.log(d1,'<=',d2,'=',d1 <=  d2); // false

    return (
            
            <View style={styles.container}>
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
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    flex: 1,
    backgroundColor: '#e6e6e6',
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
