/**
 * Created by Gaohan on 17/1/5.
 */


'use strict';

import React, {PropTypes} from 'react';
import {Text, View, Platform} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';


export default class Badge extends BaseComponent {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  };

  prepareRootProps() {

    var type = {
      backgroundColor: this.thisTheme().colorPrimary,
      padding: (Platform.OS === 'ios') ? 1 : 0,
      paddingHorizontal: 3.8,
      alignSelf: 'center',
      borderRadius: (this.thisTheme().badgeLineHeight+4)*0.5,
      justifyContent: "center",
      alignItems: "center",
      height: this.thisTheme().badgeLineHeight+4,
      borderWidth: 0.5,
      borderColor:"white",

    };

    var defaultProps = {
      style: type
    };

    return enhanceProps(this.props, defaultProps);

  }
  render() {
    return(
      <View ref={c => this._root = c} {...this.prepareRootProps()}>
        <Text style={[ this.props.textStyle, {
          color: (this.props.textStyle && this.props.textStyle.color) ? this.props.textStyle.color : this.thisTheme().textColor,
          fontSize: (this.props.textStyle && this.props.textStyle.fontSize) ? this.props.textStyle.fontSize : this.thisTheme().badgeTextFont,
          lineHeight: (this.props.textStyle && this.props.textStyle.lineHeight) ? this.props.textStyle.lineHeight : this.thisTheme().badgeLineHeight,
          textAlign: 'center'
        } ]}>{this.props.children}
        </Text>
      </View>
    );
  }

}