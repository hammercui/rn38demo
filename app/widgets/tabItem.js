/**
 * Created by Gaohan on 17/1/12.
 */
'use strict';

import React, {PropTypes} from 'react';
import {View, Platform} from 'react-native';
import BaseComponent from '../reduxVersion/baseComponent';
import Icon from './icon';
import Text from './text';
import enhanceProps from '../utils/enhanceProps';


export default class TabItem extends BaseComponent {

  static propTypes = {
    tabIcon: PropTypes.string,
    selected: PropTypes.bool,
    title: PropTypes.string,
  };

  getInitialStyle() {
    return {
      iconStyle: {
        alignSelf:'center',
        fontSize: this.thisTheme().tabBarItemIconSize,
        color:this.thisTheme().tabBarItemColor,
      },
      activeIconStyle: {
        alignSelf:'center',
        fontSize: this.thisTheme().tabBarItemIconSize,
        color:this.thisTheme().tabBarItemActiveColor,
      },
      textStyle: {
        marginTop: 4,
        textAlign: 'center',
        fontSize:this.thisTheme().tabBarItemFontSize,
        color:this.thisTheme().tabBarItemColor,
      },
      activeTextStyle: {
        marginTop: 4,
        textAlign: 'center',
        fontSize:this.thisTheme().tabBarItemFontSize,
        color:this.thisTheme().tabBarItemActiveColor,
      }
    }
  }

  render() {
    return (
      <View ref={c => this._root = c}>
        <Icon name={this.props.selected ? this.props.tabIcon + 'Activity' : this.props.tabIcon }
              style={this.props.selected ? this.getInitialStyle().activeIconStyle : this.getInitialStyle().iconStyle}/>
        <Text style={this.props.selected ? this.getInitialStyle().activeTextStyle : this.getInitialStyle().textStyle}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
