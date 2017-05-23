/**
 * 路由使用的生成工厂
 * Created by cly on 2017/5/19.
 */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button,TouchableOpacity,Dimensions,Platform} from "react-native";
import BaseStyleSheet from"../../core/baseStyleSheet";
const tabBarWidth = Dimensions.get('window').width * 0.25;
//默认tabBar的路由属性
const defaultTabNavigatorConfig = {
  tabBarOptions:{
    activeTintColor: BaseStyleSheet.thisTheme().colorPrimary,
    inactiveTintColor:BaseStyleSheet.thisTheme().inverseTextColor,
    showIcon:true,
    upperCaseLabel:false,//关闭标签大写
    scrollEnabled:false,//android 关闭滚动
    indicatorStyle:{height:0}, //android指示器，设置height = 0来屏蔽
    pressColor:BaseStyleSheet.thisTheme().colorPrimary,
    pressOpacity:0.8,
    style:{backgroundColor:"#ffffff",height:56,padding:0,margin:0},
    iconStyle:{width:tabBarWidth,height:Platform.OS==="ios"?40:30,backgroundColor:"#ffffff",margin:0,padding:0},
    labelStyle:{width:tabBarWidth,height:16,backgroundColor:"#ffffff",margin:0,padding:0}
    //flexDirection:"column", justifyContent:"center", alignItems:"center"
  },
  tabBarPosition:"bottom", //top bottom
  swipeEnabled:false,//是否允许在标签之间进行滑动(ios android都适用)
  lazy:true,
  backBehavior:true,
  animationEnabled:false,
};

//默认堆栈的页面属性
const defaultStackOption = {
  headerTruncatedBackTitle:"返回", //默认返回
  headerTitleStyle:{fontSize:20,color:BaseStyleSheet.thisTheme().colorPrimary,fontWeight:'500'},
  headerBackTitle:false, // 默认不带返回文字
};



/**
 * 生成tabBar使用的Icon
 * @param params
 * @returns {Function}
 */
function GenTabBarIcon(params) {
  return function (props) {
    //props.color = props.tintColor;
    const newProps = Object.assign({},{color:props.tintColor},params);
    // console.log(newProps);
    return <Icon {...newProps}/>
  }
}

/**
 * 生成TabBar的路由属性
 * @param config
 * @returns {{}}
 */
function tabNavigatorConfig(config) {
  if(config){
    if(config.hasOwnProperty("tabBarOptions")){
      var assignOptions = {...defaultTabNavigatorConfig.tabBarOptions,...config.tabBarOptions};
      config.tabBarOptions = assignOptions;
    }
    else{
      config.tabBarOptions = defaultTabNavigatorConfig.tabBarOptions;
    }
    //合并后config
    var assignConfig = {...defaultTabNavigatorConfig,...config};
    return assignConfig;
  }
  return defaultTabNavigatorConfig;
}


//tabBar的页面属性
function tabNavigationOptions({navigation},options) {
  let {state}  = navigation;
  // let tabBarIcon = ()=>{};
  //根据参数生成TabIcon
  if(options.hasOwnProperty("tabBarIcon") &&  (typeof options.tabBarIcon === "object") ){
     //let tabBarIcon = GenTabBarIcon(options.tabBarIcon);
     options.tabBarIcon = GenTabBarIcon(options.tabBarIcon);
  }
  //

  return {...defaultStackOption,...options};
}


//模态页的页面属性
function modalStackNavigationOptions({navigation},options) {
  let {state,goBack} = navigation;
  const headerLeft = (
    <TouchableOpacity onPress={()=>{goBack()}} >
      <Icon
        name='ios-close'
        size={30}
        color={BaseStyleSheet.thisTheme().colorPrimary}
        style={{marginLeft:13}}
      />
    </TouchableOpacity>
  );

  const assignOptions = {...defaultStackOption,headerLeft};
  return{...assignOptions,...options}
}

//堆栈页的页面属性
function stackNavigationOptions({navigation},options) {
  let {state,goBack} = navigation;
  console.log("state",state);
  const headerLeft = (
    <TouchableOpacity onPress={()=>{goBack()}} >
      <Icon
        name='ios-arrow-back'
        size={30}
        color={BaseStyleSheet.thisTheme().colorPrimary}
        style={{marginLeft:13}}
      />
    </TouchableOpacity>
  );

  //const headerTitle = options.title?options.title:null;
  const assignOptions = {...defaultStackOption,headerLeft};

  return{...assignOptions,...options}
}


export {tabNavigatorConfig,modalStackNavigationOptions,stackNavigationOptions,tabNavigationOptions};