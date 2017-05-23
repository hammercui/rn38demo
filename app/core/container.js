/**
 * Created by Gaohan on 16/12/26.
 */
import React, {PropTypes, Component} from 'react';
import ReactNative, {View, InteractionManager} from 'react-native';
import enhanceProps from '../utils/enhanceProps';
import BaseComponent from './baseComponent';
import {Actions, ActionConst} from 'react-native-router-flux';

import Spinner from 'react-native-spinkit';

import errorManager from '../error/errorManager';
import {Button, Header, Text, Icon} from '../widgets';
import {DropdownAlertHandler} from "../components/dropdownAlert";
import _ from 'lodash';

/** 注册-例外不刷新页面 **/
const exceptionPage = ['HomePage', 'LoginPage', 'DealPage', 'ManagePage', 'DiscoveryPage', 'RestPage', 'DemoPage',"QRTemplate"];

export default class Container extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      isSpinnerShow: true,

    };
    this.transitionOver = false;
  }

  
  showErrorMsg(error, message) {
    errorManager.handleErr(error, message);
  }
  //展示成功通知
  showSuccessMsg(message) {
    DropdownAlertHandler.showSuccess(message);
  }


  _checkLogin() {
    if (typeof global.access_token == 'undefined' || global.access_token == '') {
      if (typeof this.props.name != 'undefined' || this.props.name != '') {
        if (exceptionPage.indexOf(this.props.name) == -1) {
          return false;
        }
      }
    }
    return true;
  }

  _redoLogin() {
    return Actions.LoginPage({type: ActionConst.REPLACE});
  }

  //进入登录页
  gotoLogin(){
    Actions.LoginPage();
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // console.info("sceneKey:" + this.props.name);
      // console.log(this.setState);

      this.componentDoingMount().then(resolve=>{
        //console.log("测试container resolve",resolve);
        this.setState({canRenderContent: true, isSpinnerShow: false});
        if (!this._checkLogin() ) this._redoLogin();
      });


    });
  }

  //过渡动画中，执行耗时操作
  componentDoingMount(){
     return Promise.resolve();
  }


  componentWillUnmount() {
    this.setState({canRenderContent: true, isSpinnerShow: false});
  }

  renderPlaceholder() {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner isSpinnerShow={this.state.isSpinnerShow} size={100} type='Wave' color={this.thisTheme().colorPrimary}/>
      </View>
    );
  }

  renderHeader() {
    return (
      this.state.hasNavBar && this.renderNavBar()
    );
  }

  renderContent() {
    return (<View style={{flex: 1, paddingTop:5}}><Text>{this.props.title}</Text></View>);
  }

  renderFooter() {
    return (
      this.state.hasTabBar && this.renderTabBar()
    );
  }

  prepareRootProps() {
    var type = {
      flex: 1,
      backgroundColor: this.thisTheme().baseBgColor,
    };
    var defaultProps = {
      style: type
    };
    return enhanceProps(this.props, defaultProps);
  }

  render() {
    let content = this.state.canRenderContent ? this.renderContent() : this.renderPlaceholder();

    return (
      <View ref={c => this._root = c} {...this.prepareRootProps()}>
        {this.renderHeader()}
        {content}
        {this.renderFooter()}
      </View>
    );
  }

  renderNavBar() {
    return (
      <Header>
        {!this.state.hasTabBar &&
          <Button transparent onPress={()=>{Actions.pop()}} >
            <Icon name='iconBack'/>
          </Button>
        }
        <Text style={{fontWeight: 'bold',color: this.thisTheme().navBarTitleColor}}>{this.props.title}</Text>
      </Header>
    );
  }

  renderTabBar() {
    return (
      <View style={{height: this.thisTheme().tabBarHeight}} />
    );
  }

  createWidget(widget, props, children) {
    return React.createElement(widget, {...this.props, ...props}, children);
  }
}