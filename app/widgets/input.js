/**
 * Created by Gaohan on 17/1/4.
 */
'use strict';

import React, {PropTypes} from 'react';
import {View, TextInput, Platform, Text} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';


export default class InputNew extends BaseComponent {

  getInitialStyle() {
    return {
      input: {
        height: this.thisTheme().inputHeight,
        color: this.thisTheme().inputColor,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: this.thisTheme().inputFontSize,
        lineHeight: this.thisTheme().inputLineHeight,
        marginTop: (this.props.inlineLabel) ? ((Platform.OS === 'ios') ? undefined : 5) : undefined
      }
    }
  }

  prepareRootProps() {
    var defaultProps = {
      style: this.getInitialStyle().input
    };

    return enhanceProps(this.props, defaultProps);
  }
  render() {

    return (
      <View style={{ flex: 1, flexDirection:"column", justifyContent:"center", }}>
        {this._renderTexInput()}
      </View>
    );
  }

  _renderTexInput(){
    var rootProps = this.prepareRootProps();
    //可编辑或者ios
    if(this.props.editable || Platform.OS == "ios"){
      return(
        <TextInput ref={(c) => {this._textInput = c; this._root = c;}}
                   {...rootProps}
                   placeholderTextColor={
                     this.props.placeholderTextColor ? this.props.placeholderTextColor : this.thisTheme().inputColorPlaceholder
                   }
                   underlineColorAndroid='transparent' />
      )
    }
    else {//不可编辑 并且android
      var placeholder = !(this.props.value&&this.props.value.length>0);
      var textColor = placeholder?(this.props.placeholderTextColor ? this.props.placeholderTextColor : this.thisTheme().inputColorPlaceholder):
        rootProps.style.color;
      return(<Text ref={(c) => {this._textInput = c; this._root = c;} }
                   {...rootProps} style={[rootProps.style,{color:textColor,textAlignVertical:"center",textAlign:"left"}]}

      >
        {placeholder?this.props.placeholder:this.props.value}
      </Text>)
    }
  }

}