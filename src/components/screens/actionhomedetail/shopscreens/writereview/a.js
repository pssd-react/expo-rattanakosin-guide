import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

class ModalExample extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{width: 300,height: 300}}>
                <Modal
                    style={{flex: 1,}}
                    backdropColor='transparent'
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ 
                        flex: 1, 
                        backgroundColor: '#fff', 
                        marginBottom:270, 
                        marginTop:270,
                        marginLeft:140,
                        marginRight:140,
                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 5, height: 5 },
                        shadowRadius: 5,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View >
                            <Text>Hello World!</Text>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default ModalExample;