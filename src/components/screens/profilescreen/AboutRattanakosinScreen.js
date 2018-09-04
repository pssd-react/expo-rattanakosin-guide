import React, {Component} from 'react'
import {
    View, 
    Text,
    StyleSheet,
    ScrollView,
    } from 'react-native'
import {LabelInput, Button, Card, CardSection, Input, Spinner, SignButton, Header} from '../../common';
import { HeaderBackButton } from 'react-navigation'

export class AboutRattanakosinScreen extends Component {
    static navigationOptions = {header: null}

    onButtonGoBack(){
        this.props.navigation.popToTop()
    }

    render(){
        return (
            <View>
            <Header headerText="เกี่ยวกับรัตนโกสินทร์" 
                backgroundImage= {require('../../images/drawable-hdpi/bg_more.webp')}
                headerLeft={<HeaderBackButton tintColor='#fff' onPress={() => this.onButtonGoBack()} />}/>
            <ScrollView>
                <View style={styles.container}>
                <CardSection>
                    <Text style={{ fontSize: 30 }}>รัตนโกสินทร์</Text>
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 18 }}>
                    เกาะรัตนโกสินทร์สถานที่ท่องเที่ยวใจกลางกรุงสุดฮิป 
                    เป็นหนึ่งในแลนด์มาร์คด้านการท่องเที่ยวที่สำคัญ ได้ชื่อว่าเกาะเพราะบริเวณนี้มีแม่น้ำล้อมรอบ 
                    และมีขอบเขตอยู่ระหว่างแม่น้ำเจ้าพระยาทางตะวันตก กับคลองหลอด หรือคลองคูเมืองเดิมทางตะวันออก 
                    </Text>                
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 18 }}>
                    เกาะนี้เป็นเมืองเก่าซึ่งเป็นศูนย์กลางของอารยธรรมที่แสดงให้เห็นถึงความเจริญรุ่งเรืองทางศิลปะของกรุงรัตนโกสินทร์ 
                    ผสมผสานความทันสมัยควบคู่กับกลิ่นอายของวิถีชีวิตแบบดั้งเดิม อีกทั้งสถาปัตยกรรมและวัฒนธรรมของคนกรุง 
                    ที่สองฝั่งข้างทางเต็มไปด้วยร้านค้ามากมาย ทั้งร้านอาหารแนวสตรีทไปจนถึงระดับมิชลินสตาร์ 
                    มีคาเฟ่หลากหลาย แต่ละร้านมีสไตล์การตกแต่งที่โดดเด่นและเป็นเอกลักษณ์เฉพาะตัวไม่ซ้ำกัน 
                    นอกจากนี้ ยังมีวัดวาอาราม พิพิธภัณฑ์ที่ทันสมัย ถ้าต้องการหลบอากาศร้อนก็แวะมานั่งอ่านหนังสือตากแอร์เย็นฉ่ำที่หอสมุดกรุงเทพฯ
                    </Text>                
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 18 }}>
                    หรือ จะเรียนรู้เรื่องราวของสยามประเทศที่นิทรรศน์รัตนโกสินทร์ แล้วไปชมวิวแม่น้ำเจ้าพระยาที่ท่ามหาราช 
                    เมื่อเหนื่อยล้าจากการช้อปปิ้งยังมีร้านนวด/สปาคอยบริการ ตกดึกก็มีผับ บาร์ เพิ่มสีสันให้กับค่ำคืนที่แสนยาวนาน 
                    อยากนอนพักก็มีโรงแรมและโฮสเทลมากมายที่รองรับนักท่องเที่ยวได้หลายรูปแบบ 
                    หากได้มาลองสัมผัสแล้วจะหลงรักเอกลักษณ์ความเป็นไทยที่ไม่เหมือนใครของ เกาะรัตนโกสินทร์
                    </Text>                
                </CardSection>
                </View>
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 5,
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: '#fff'
    }
  })