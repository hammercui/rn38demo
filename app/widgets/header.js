/**
 * Created by Gaohan on 16/12/22.
 */
'use strict';

import React, {PropTypes} from 'react';
import ReactNative, {Platform, View} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';
import _ from 'lodash';
import {Button, Icon, Text} from './index';

export default class Header extends BaseComponent {

  static propTypes = {
  };


  constructor(props) {
    super(props);
    this.state = {};
  }

  getInitialStyle() {
    return {
      navbar: {
        backgroundColor: this.thisTheme().navBarBgColor,
        justifyContent: (!Array.isArray(this.props.children) && Platform.OS == 'ios') ? 'center' : 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: (!Array.isArray(this.props.children) && Platform.OS == 'android') ? 30 : undefined,
        paddingHorizontal: 10,
        paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
        shadowColor: this.thisTheme().baseAssistColor,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.9,
        shadowRadius: 2,
        height: this.thisTheme().navBarHeight,
        elevation: 3,
        position: 'relative',
        borderBottomColor: this.thisTheme().baseAssistColor,
        borderBottomWidth: this.thisTheme().borderWidth,
      },
      toolbarButton: {
        paddingHorizontal: 10
      }
    }
  }

  prepareRootProps() {
    var defaultProps = {
      style: this.getInitialStyle().navbar
    };
    return enhanceProps(this.props, defaultProps);

  }

  renderChildren() {
    if(!Array.isArray(this.props.children)) {
      return this.props.children;
    }

    else if (Array.isArray(this.props.children)) {
      var newChildren = [];
      var childrenArray = React.Children.toArray(this.props.children);

      var buttons = [];
      buttons = _.remove(childrenArray, function(item) {
        if(item.type == Button) {
          return true;
        }
      });

      var title = [];
      title = _.remove(childrenArray, function(item) {
        if(item.type == Text) {
          return true;
        }
      });

      if (buttons.length == 1 && this.props.iconRight) {
        newChildren.push(
          <View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center',
            alignItems: 'center', justifyContent: 'center'}}>
            {[title[0]]}
          </View>
        );
        newChildren.push(
          <View key='btn1' style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            marginRight: -10
          }}>
            {React.cloneElement(buttons[0], {
              color: this.thisTheme().navBarLeftBtnColor,
              style: this.getInitialStyle().toolbarButton
            })}
          </View>
        );
      }
      else if (buttons.length >= 1) {
        newChildren.push(
          <View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center',
            alignItems: 'center', justifyContent: 'center'}}>
            {[title[0]]}
          </View>
        );
        newChildren.push(
          <View key='btn1'
                style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -10}}>
            {React.cloneElement(buttons[0], {
              color: this.thisTheme().navBarLeftBtnColor,
              style: this.getInitialStyle().toolbarButton
            })}
          </View>
        );
        if (buttons.length > 1) {
          for (let i = 1; i < buttons.length; i++) {
            newChildren.push(
              <View key={'btn' + (i + 1)} style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginRight: -10
              }}>
                {React.cloneElement(buttons[i], {
                  color: this.thisTheme().navBarRightBtnColor,
                  style: this.getInitialStyle().toolbarButton
                })}
              </View>
            )
          }
        }
      }
      else {
        newChildren.push(
          <View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center',
            alignItems: 'center', justifyContent: 'center'}}>
            {[title[0]]}
          </View>
        );
        if (childrenArray.length>1) {
          for (let i = 1; i < childrenArray.length; i++) {
            newChildren.push(
              <View key={'btn' + (i + 1)} style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginRight: -10
              }}>
                {React.cloneElement(childrenArray[i], {})}
              </View>
            )
          }
        }
      }
      return newChildren;
    }
  }

  render() {
    return(
      <View ref={c => this._root = c} {...this.prepareRootProps()} >
        {this.renderChildren()}
      </View>
    );
  }
}
