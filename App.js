/**
 * 使用react-navigation的入口
 * Created by cly on 2017/5/18.
 */
import React,{Component,PureComponent} from 'react';
import {
  AppRegistry,
  Platform
} from 'react-native';
//import { StackNavigator } from 'react-navigation';

import Router from "./app/pages/chat/index";


const prefix = 'rnFavorite://';

class App extends PureComponent{

  render(){
    return <Router uriPrefix={prefix} />
  }
}

//AppRegistry.registerComponent('rnFavoriteApp', () => <Root uriPrefix={prefix} />);
AppRegistry.registerComponent('rnFavoriteApp', () => App);