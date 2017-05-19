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
import ChatScene from "./Scene/ChatScene"
import HomeScene from "./Scene/InfoScene";
import {RecentChatsScreen,AllContactsScreen} from "./Scene/TabHomeScene";
import DrawerScene from "./Scene/DrawerScene";
import {tabBarIcon} from "./GenerateFactory"
import Icon from 'react-native-vector-icons/Ionicons';




//tabBar导航
const  MainScreenNavigator = TabNavigator(
  //路由
  {
    RecentChatsScreen: {
      name:"tabbar导航-首页",
      screen: RecentChatsScreen ,
      navigationOptions:({navigation})=>
        (
          { title: "首页",
            tabBarIcon: tabBarIcon({name: "ios-person", size: 30})
          }
        )
    },
    AllContactsScreen: {
      name:"tabbar导航-我的",
      screen: AllContactsScreen ,
      navigationOptions:({navigation})=>
        (
          { title:"我的",
            tabBarIcon: tabBarIcon({name: "ios-person", size: 30})
          }
        )
    },

  },
  //TabNavigatorConfig
  {
    tabBarOptions:{activeTintColor: '#e91e63',showIcon:true},
    tabBarPosition:"bottom", //top bottom
    pressColor:"#4f4f4f",
    pressOpacity:50,
  }
);


//堆栈导航
const StackNavRoot = StackNavigator(
  //路由
  {
    HomeTapBar: {
      name:"堆栈导航-首页",
      screen: MainScreenNavigator,
      navigationOptions: ({navigation}) => ({
       // title: "首页",
        headerLeft:<Button title="Menu" onPress={()=>navigation.navigate("DrawerOpen")}/>
      }),
    },

    Chat: { screen: ChatScene,path:"chat/:user"},
    Info: { screen: HomeScene,path:"info"}
  },
  //StackNavigatorConfig
  {mode:"card",}
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


export default StackNavRoot;