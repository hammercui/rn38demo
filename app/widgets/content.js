/**
 * Created by Gaohan on 17/1/5.
 */
import React, {PropTypes} from 'react';
import { KeyboardAwareScrollView } from '../vendor/react-native-keyboard-aware-scroll-view';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';
import {isEqual} from 'lodash';


export default class Content extends BaseComponent {

  static propTypes = {
    padded: React.PropTypes.bool,
    style : PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    dismissToTop: React.PropTypes.bool
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  }

  prepareRootProps() {
    var type = {
      backgroundColor: 'transparent',
      flex: 1
    };
    var defaultProps = {
      style: type,
      resetScrollToCoords: (this.props.dismissToTop) ? {
        x: 0,
        y: 0
      } : null
  };
    return enhanceProps(this.props, defaultProps);
  }

  render() {
    const contentContainerStyle = this.props.contentContainerStyle || {};
    contentContainerStyle.padding = (this.props.padded) ? this.thisTheme().contentPadding : 0;
    return(
      <KeyboardAwareScrollView automaticallyAdjustContentInsets={false} ref={(c) => {this._scrollview = c; this._root = c;}} {...this.prepareRootProps()} contentContainerStyle={contentContainerStyle}>{this.props.children}</KeyboardAwareScrollView>
    );
  }
}