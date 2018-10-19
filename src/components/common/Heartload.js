import React, {Component} from 'react';
import { 
    View , 
    ActivityIndicator, 
    Image,
    Modal,
    StyleSheet
} from 'react-native';
import _ from 'lodash'

class Heartload  extends Component {

    state ={
        item:'',
        num: 0
    }
 

    componentWillMount(){
        var image = [];
        image[0] = require('../images/drawable/heartload_00000.png');
        image[1] = require('../images/drawable/heartload_00001.png');
        image[2] = require('../images/drawable/heartload_00002.png');
        image[3] = require('../images/drawable/heartload_00003.png');
        image[4] = require('../images/drawable/heartload_00004.png');
        image[5] = require('../images/drawable/heartload_00005.png');
        image[6] = require('../images/drawable/heartload_00006.png');
        image[7] = require('../images/drawable/heartload_00007.png');
        image[8] = require('../images/drawable/heartload_00008.png');
        image[9] = require('../images/drawable/heartload_00009.png');
        image[10] = require('../images/drawable/heartload_00010.png');
        image[11] = require('../images/drawable/heartload_00011.png');

        this.state.item = image;
        //console.log(this.state.item)
    }



    renderLoop(){
            return _.map((this.state.item), (items) => {
                setTimeout(() => {
                    return(
                        <Image style={{ width: 50, height: 50 }}
                            source={items}
                        />
                    )
                }, 50);
            })
    }

  
  

    render(){
        return (
            <Modal
            transparent={true}
            animationType={'none'}
            visible={true}
            onRequestClose={() => {console.log('close modal')}}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size= 'large' color= '#CC2EFA'  />
                    </View>
                </View>
            </Modal>
        )
    }
}






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


export { Heartload };