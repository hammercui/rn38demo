/**
 * Created by cly on 2017/5/18.
 */
import React from 'react';
import {
  Text,
  View,
  Button,
} from 'react-native';

import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
//import {StackNavigator,TabNavigator,DrawerNavigator} from "../../vendor/react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import {tabNavigationOptions,tabNavigatorConfig,modalStackNavigationOptions,stackNavigationOptions} from "./routerConfig"

//引入Screen
import ChatScene from "../pages/chat/screen/ChatScene"
import HomeScene from "../pages/chat/screen/InfoScene";
//import {RecentChatsScreen,AllContactsScreen} from "./screen/TabHomeScene";
import DrawerScene from "../pages/chat/screen/DrawerScene";
import HomeScreen from "../pages/chat/screen/home/index";
import MyselfScreen from "../pages/chat/screen/myself/index";
import CategoryScreen from "../pages/chat/screen/category/index";
import MessageScreen from "../pages/chat/screen/message/index";
import LoginScreen from "../pages/chat/screen/login/index";
import RegisterScreen from "../pages/chat/screen/login/RegisterScreen";
//tabBar导航
const  MainScreenNavigator = TabNavigator(
  //路由
  {
    HomeScreen: {
      name:"tabBar导航-首页",
      screen: HomeScreen ,
    },
    CategoryScreen:{
      name:"tabBar导航-分类",
      screen: CategoryScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "分类", tabBarIcon:{name: "ios-trophy", size: 30}})
    },
    MessageScreen:{
      name:"tabBar导航-消息",
      screen: MessageScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "消息", tabBarIcon:{name: "ios-albums", size: 30}})
    },
    MyselfScreen: {
      name:"tabbar导航-我的",
      screen: MyselfScreen ,
      navigationOptions:props=>tabNavigationOptions(props,{title: "我的", tabBarIcon:{name: "ios-person", size: 30}})
    },
  },

  tabNavigatorConfig({initialRouteName:"HomeScreen"})
);


//堆栈导航
const StackNavRoot = StackNavigator(
  //路由
  {
    MainScreen: {
      name:"堆栈导航-首页",
      screen: MainScreenNavigator,
    },
    ChatScreen: {
      screen: ChatScene,
      path:"chat/:user",
      navigationOptions:props=>stackNavigationOptions(props),
    },
    InfoScreen: {
      screen: HomeScene,
      path:"info",
      navigationOptions:props=>stackNavigationOptions(props),
    },
  },
  //StackNavigatorConfig
  {mode:"card",}
);

// 模态页堆栈导航
const ModalNavigator = StackNavigator(
  //路由
  {
    StackNavRoot:{
      screen:StackNavRoot,
      navigationOptions: ({navigation}) => ({header:null}),
    },
    LoginScreen:{
      screen:LoginScreen,
      navigationOptions:props=>modalStackNavigationOptions(props),
    },
    RegisterScreen:{
      name:"注册页",
      screen:RegisterScreen,
      navigationOptions:props=>stackNavigationOptions(props),
    },
  },
  //StackNavigatorConfig
  {mode:"modal"}
);

//抽屉导航
const DrawerRoot = DrawerNavigator(
  //路由
  {
    RootNavigator: {screen: StackNavRoot},
  },
  //DrawerNavigatorConfig
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent:props=><DrawerScene {...props}/> //配置抽屉
  }
);


export default ModalNavigator;