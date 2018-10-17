import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ScrollView} from 'react-native'

export class DetailScreen extends Component{
    constructor() {
		super();
		this.state = {
			content: {}
		};
	}
    getListItems = count => {
        const items = [];
        let i = 0;
      
        while (i < count) {
          i++;
          items.push(
            <View key={i} style={{ backgroundColor: i % 2 === 0 ? '#eee5ff' : '#ceebfd', height: 64 }}>
              <Text style={{ color: '#999' }}>{`List Item ${i}`}</Text>
            </View>
          );
        }
      
        return items;
      };

    render(){
        return (
            <View style={styles.container}>
                <ScrollView
                	onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                    onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                    onScrollEndDrag={(e) => { this.setState({ content: {} }); }}> 
                    
                {this.getListItems(20)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        padding: 20,
    },
    text:{
        textAlign:'center',
        backgroundColor: '#d35400'
    },
    
})


