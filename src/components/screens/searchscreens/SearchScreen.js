import React, {Component} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native'
import { List, ListItem,SearchBar } from "react-native-elements"


const INITAL_STATE = {
    text: 'คำที่เคยค้นหา'
}



class SearchScreen extends Component{

    state = INITAL_STATE

   
    componentDidMount() {
        this.makeRemoteRequest()
    }
    
      makeRemoteRequest = () => {
        this.setState({ loading: true })
    
        // getUsers()
        //   .then(users => {
        //     this.setState({
        //       loading: false,
        //       data: users
        //     })
        //   })
        //   .catch(error => {
        //     this.setState({ error, loading: false })
        //   })
      }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        )
      }

    renderHeader () {
        return <SearchBar
            showLoading
            placeholder='Search'
            lightTheme
            onChangeText={(value) => this.renderState(value)}
        />
    }

    renderFooter = () => {
        if (!this.state.loading) return null
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        )
    }

    renderState  ( text ) {
        console.log( text )
        this.setState({
           text: 'คำที่ต้องการค้นหา'
        })
    }

    

    render() {
        return (
          <SafeAreaView>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
              />
            </List>
            <View  style= {styles.container}>
                <Text style= {styles.textStyle}> {this.state.text} </Text>
            </View>
          </SafeAreaView>
        )
      }
}
const styles = StyleSheet.create({
    textStyle:{
        color: '#a6a6a6',
        fontSize : 16,
        textDecorationLine: 'underline'
       // color: '#FFFFFF'
    },
    overlayContainer:{
        flex:1,
       // color: '#FFFFFF'
    },
  container:{
      flex: 1,
      padding: 10,
      marginTop: 15,
      marginBottom: 15,
      
  },
  stretch: {
    flex:1,
    width: 200,
    height: 500
    },
    header: {
        color: '#FFFFFF',
        fontSize: 25,
        paddingLeft: 40,
        paddingRight: 40,
        fontWeight: 'bold',
    },
})
export default SearchScreen