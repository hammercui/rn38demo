/**
 * Created by Gaohan on 16/12/23.
 */
'use strict';

import React, {PropTypes} from 'react';
import {Text} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';


export default class TextNew extends BaseComponent {

  static propTypes = {
  };

  prepareRootProps() {
    var type = {
      color: this.thisTheme().textColor,
      fontSize: this.thisTheme().fontSizeBase,
      lineHeight: this.thisTheme().lineHeight,
    };

    var defaultProps = {
      style: type
    };

    return enhanceProps(this.props, defaultProps);
  }
  render() {
    return(
      <Text allowFontScaling={false} ref={c => this._root = c} {...this.prepareRootProps()}>{this.props.children}</Text>
    );
  }

}