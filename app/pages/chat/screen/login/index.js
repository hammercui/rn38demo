/**
 * 登录页
 * Created by cly on 2017/5/22.
 */

import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';
import {Badge} from "../../../../widgets";


import BaseComponent from "../../../../core/baseComponent";

import Icon from 'react-native-vector-icons/Ionicons';

import styles from "./styles";

export default class LoginScreen extends PureComponent{

  static navigationOptions = {
    title:"登录"
  };


  render(){
    //const {navigate,goBack} = this.props.navigation;
    return(
      <View style={styles.container} >
        <Text >  账号 </Text>
        <Text >  密码 </Text>
        
        <View style={{margin:20,flexDirection:"column",alignItems:"center"}}>
          <Button
            onPress={() => this.props.navigation.navigate('ChatScreen', { user: 'hammer' })}
            title="Chat with hammer"
          />
          <Button title="登录" onPress={()=>this.props.navigation.goBack()}/>
          <Button title="注册" onPress={()=>this.props.navigation.navigate("RegisterScreen")}/>
        </View>

      </View>
    );
  }
}
