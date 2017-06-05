/**
 * Created by Gaohan on 17/1/5.
 */
'use strict';

import React, {PropTypes} from 'react';
import {View} from 'react-native';
import BaseComponent from '../reduxVersion/baseComponent';


export default class ViewNew extends BaseComponent {

  static propTypes = {
  };

  render() {
    return(
      <View ref={c => this._root = c} {...this.props}>{this.props.children}</View>
    );
  }

}