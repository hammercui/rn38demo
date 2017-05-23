/**
 * Created by cly on 2017/5/22.
 */
import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import {Badge,ScrollView} from"../../../../widgets";
import styles from "./styles";

import BaseComponent from "../../../../core/baseComponent";

import Icon from 'react-native-vector-icons/Ionicons';
import {tabBarIcon} from "../../RouterFactory";
const tabBarWidth = Dimensions.get('window').width * 0.25;
export default class HomeScreen extends PureComponent{

  // static navigationOptions = ({navigation})=>
  //   (
  //     { tabBarLabel: "首页222",
  //       tabBarIcon: ({tintColor,focused})=>(
  //         <View  style={{flex:1,backgroundColor:"orange"}}>
  //           <Icon name={"ios-home"} size={30} color={tintColor}/>
  //           <Badge style={{position:"absolute",top:0,right:-10}}>
  //             <Text style={{fontSize:8,color:"white"}} >111</Text>
  //           </Badge>
  //         </View>
  //       ),
  //       header:null,
  //     }
  //   );

  static navigationOptions = ({navigation})=>
    (
      {
        tabBarLabel: "首页",
        tabBarIcon: ({tintColor,focused})=>(
          <View style={{width:tabBarWidth,height:Platform.OS==="ios"?40:30,margin:0,padding:0,
            alignItems:"center", justifyContent:"center"}}>
            <Icon name={"ios-home"} size={30} color={tintColor}/>
            <Badge style={{position:"absolute",top:2,right:tabBarWidth*0.25}}>
              <Text style={{fontSize:8,color:"white"}} >111</Text>
            </Badge>
          </View>
        ),

        header:null,
      }
    );





  constructor(props){
    super(props);
    //const { navigate } = this.props.navigation;
    //this.navigate = navigate;
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>这是首页</Text>
        <Button
          onPress={() => navigate('ChatScreen', { user: 'hammer' })}
          title="Chat with hammer"
        />
        
        <Button title="登录" onPress={()=>navigate("LoginScreen")} />

    </View>)
  }

}
