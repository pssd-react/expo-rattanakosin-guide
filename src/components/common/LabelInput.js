import React, {Component} from 'react';
import {AppRegistry, Text, View, StatusBar, TextInput, Animated } from 'react-native';

class LabelInput extends Component {
  state ={
    isFocused: false,
  }

  componentWillMount(){
    this._animatedIsFocused = new Animated.Value(0);
  }

  handleFocus = () => this.setState({  isFocused: true });
  handleBlur = () => this.setState({  isFocused: false });

  componentDidUpdate(){
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render(){
    const { containerStyle, inputBox } = styles;
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const lableStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange:[30, 0]
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 16]
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#aaa']
      }),
    }

    return (
      <View style={containerStyle}>
        <Animated.Text style={lableStyle}>
            {label}
          </Animated.Text>
          <TextInput style={inputBox}
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          underlineColorAndroid='#000' 
          />
      </View>
    );
  }
}


const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 50, 
        width: 330
    },
    containerStyle: {
      flex: 1,
      paddingTop: 18,
    },
    inputBox: {
      height: 60, 
      fontSize: 20, 
      color: '#000', 
      borderBottomColor: '#555',
      
    }  
 
}

export { LabelInput };