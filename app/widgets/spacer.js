/**
 * Created by LD on 17/1/11.
 */
'use strict';

import React, {PropTypes} from 'react';
import {View, Text, PixelRatio} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from "../utils/enhanceProps";


export default class Spacer extends BaseComponent {

  static propTypes = {
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    distance: PropTypes.number,
    color: PropTypes.string,
    showBorder:PropTypes.bool, //是否显示border
  };

  static defaultProps = {
    vertical: true,
    horizontal: false,
    distance:  1 / PixelRatio.get(),
    showBorder:false
  };

  render() {
    return(
      <View {...this.prepareRootProps()}/>
    );
  }

  //获得主题属性
  prepareRootProps() {
    //主题布局属性
    let defaultProps = {
        style: this.getStyle(),
      };
    return enhanceProps(this.props, defaultProps);
  }

  getStyle() {
    let {distance, color, horizontal } = this.props;
    //显示边界线，说明是分割块，不是分割线
    if(this.props.showBorder){
      //水平方向
      if(horizontal) {
        return {
          backgroundColor: color || this.thisTheme().baseSpaceColor,
          width: distance

        };
      } else { //垂直方向
        return {
          backgroundColor: color || this.thisTheme().baseSpaceColor,
          height: distance,
          borderBottomWidth: 1 / PixelRatio.get(),
          borderTopWidth:1 / PixelRatio.get(),
          borderBottomColor:this.thisTheme().baseAssistColor,
          borderTopColor:this.thisTheme().baseAssistColor,
        };
      }
    }
    else{
      //水平方向
      if(horizontal) {
        return {
          backgroundColor: color || this.thisTheme().baseAssistColor,
          width: distance
        };
      } else { //垂直方向
        return {
          backgroundColor: color || this.thisTheme().baseAssistColor,
          height: distance
        };
      }
    }
  }

}