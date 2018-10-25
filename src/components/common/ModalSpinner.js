import React, {Component} from 'react';
import { 
    View , 
    ActivityIndicator, 
    Image,
    Modal,
    StyleSheet
} from 'react-native';
import _ from 'lodash'

const ModalSpinner = ({ loading }) => {
    return (
        <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size= 'large' color= '#CC2EFA'  />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
});


export { ModalSpinner };