/**
 * 路由
 * Created by cly on 16/12/24.
 */

//使用react-native-flux-router做路由导航
import React,{Component} from "react";
import {Scene,Router,Modal,Reducer} from "react-native-router-flux";
import ReactNative,{Alert, BackAndroid} from "react-native";

import Home from "./home/index";
import Fuli from "./fuli/index";
import Study from "./study/index";
import UserCenter from "./userCenter/index";
import TabBarIcon from "../components/tabBarIcon/index";

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state,actions)=>{
        console.log("SCENE ACTIONS:",actions);
        return defaultReducer(state,actions)
    }
};



const onExitApp = ()=>{
    Alert.alert('退出提示',null,[
        {text:"取消"},
        {text:"Yes", onPress:BackAndroid.exitApp},
    ]);
    return true;
};


export default (
  <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:"transparent"}} onExitApp={onExitApp}>
      <Scene key="modal" component={Modal}>
          <Scene key="root" hideNavBar={true}>


              <Scene key="tabbar" tabs={true} default="tab-home"
                     tabBarStyle={{backgroundColor:"white",borderTopColor:"#f6f6f6",borderTopWidth:1,height:60 }} >

                  <Scene key="tab-home"       component={Home} title="首页" initial={true} hideNavBar={true} icon={TabBarIcon} />
                  <Scene key="tab-fuli"       component={Fuli} title="福利"  hideNavBar={true}  icon={TabBarIcon}/>
                  <Scene key="tab-study"      component={Study} title="学习"  hideNavBar={true}  icon={TabBarIcon}/>
                  <Scene key="tab-userCenter" component={UserCenter} title="用户设置"  hideNavBar={true}  icon={TabBarIcon}/>
              </Scene>

          </Scene>
      </Scene>

  </Router>
);
