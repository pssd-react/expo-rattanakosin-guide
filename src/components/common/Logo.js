import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Logo = ({ source, children }) => {
	const { container, logoText } = styles;
		return(
			<View style={container}>
				<Image  style={{width:40, height: 70}}
          			source={source}/>
          		<Text style={logoText}></Text>	
  			</View>
			);
};

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  logoText : {
  	marginVertical: 5,
  	fontSize:18,
  	color:'rgba(255, 255, 255, 0.7)'
  }
});

export { Logo };