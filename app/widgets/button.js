/**
 * Created by Gaohan on 17/1/4.
 */
import React, {PropTypes} from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';
import _ from 'lodash';
import ReactNativePropRegistry from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry';

import {Icon, Text} from './index';

export default class ButtonNew extends BaseComponent {

  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    textStyle : PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    block : PropTypes.bool,
    bordered : PropTypes.bool,
    disabled : PropTypes.bool,
    rounded : PropTypes.bool,
    transparent: PropTypes.bool,
  };


  constructor(props) {
    super(props);
    this.state = {};
  }

  prepareRootProps() {
    var type = {
      backgroundColor: ((this.props.transparent) || (this.props.bordered)) ? 'rgba(0,0,0,0)' :
                    (this.props.disabled) ? this.thisTheme().btnDisabledBgColor : this.thisTheme().colorPrimary,
      borderRadius: (this.props.rounded) ? this.thisTheme().btnBorderRadiusRound : this.thisTheme().btnBorderRadiusBase,
      borderWidth: (this.props.bordered) ? this.thisTheme().borderWidth : 0,
      borderColor:  (this.props.disabled) ? this.thisTheme().btnDisabledBgColor : this.thisTheme().colorPrimary,
      height: this.thisTheme().btnHeight,
      alignSelf: (this.props.block) ? 'auto' : 'flex-start',
      alignItems: 'center',

      paddingVertical: this.thisTheme().btnPadding,
      paddingHorizontal: this.thisTheme().btnPadding + 2,
      justifyContent: (this.props.block) ? 'center' : 'space-around',
      flexDirection:  'row',
      elevation: (this.props.transparent || this.props.bordered || this.props.disabled) ? 0 : 2,
      shadowColor: (this.props.transparent || this.props.bordered || this.props.disabled) ? undefined : '#000',
      shadowOffset: (this.props.transparent || this.props.bordered || this.props.disabled) ? undefined : {width: 0, height: 2},
      shadowOpacity: (this.props.transparent || this.props.bordered || this.props.disabled) ? undefined : 0.2,
      shadowRadius: (this.props.transparent || this.props.bordered || this.props.disabled) ? undefined : 2

    };

    var defaultProps = {
      style: type
    };

    return enhanceProps(this.props, defaultProps);
  }

  getTextStyle() {
    var mergedStyle = {};
    var btnType = {
      color: this.thisTheme().textColor,
      fontSize: this.thisTheme().btnTextSize,
      lineHeight: this.thisTheme().btnLineHeight
    };
    if(typeof this.props.textStyle == 'number') {
      return _.merge(mergedStyle, btnType, ReactNativePropRegistry.getByID(this.props.textStyle));
    } else {
      return _.merge(mergedStyle, btnType, this.props.textStyle);
    }
  }

  getIconProps(icon) {

    var defaultStyle = {
      color: (this.props.bordered) ? this.thisTheme().colorPrimary :
                    (this.props.color) ? this.props.color :
                      (this.props.transparent) ? this.thisTheme().baseFgColor:
                              this.thisTheme().inverseTextColor,
      margin: this.thisTheme().iconMargin,
      fontSize: this.thisTheme().iconFontSize,
      lineHeight: this.thisTheme().iconLineHeight
    };

    var defaultProps = {
      style: defaultStyle
    };

    return enhanceProps(icon.props, defaultProps);
  }


  renderChildren() {
    if(typeof this.props.children == 'string') {
      return <Text style={this.getTextStyle()}>{this.props.children}</Text>
    }

    else if(this.props.children.type == Icon) {
      return React.cloneElement(this.props.children, this.getIconProps(this.props.children));
    }

    else if(Array.isArray(this.props.children)) {
      var newChildren = [];

      var childrenArray = React.Children.toArray(this.props.children);

      var iconElement = [];
      iconElement = _.remove(childrenArray, function(item) {
        if(item.type == Icon) {
          return true;
        }
      });

      if(this.props.iconRight) {
        if (childrenArray[0].type==undefined) {
          newChildren.push(<Text key='label' style={this.getTextStyle()}>{childrenArray[0]}</Text>);
        } else {
          newChildren.push(<Text key='label' style={this.getTextStyle()}>{childrenArray[0].props.children}</Text>);
        }

        newChildren.push(React.cloneElement(iconElement[0], this.getIconProps(iconElement[0])));
      }

      else if(this.props.iconLeft || iconElement.length>0) {
        newChildren.push(React.cloneElement(iconElement[0], this.getIconProps(iconElement[0])));

        if (childrenArray[0].type==undefined) {
          newChildren.push(<Text key='label' style={this.getTextStyle()}>{childrenArray[0]}</Text>);
        } else {
          newChildren.push(<Text key='label' style={this.getTextStyle()}>{childrenArray[0].props.children}</Text>);
        }
      }
      else {
        return <Text style={this.getTextStyle()}>{this.props.children}</Text>
      }

      return newChildren;

    }

    else
      return React.cloneElement(this.props.children);

  }

  render() {
    return(
      <TouchableOpacity ref={c => this._root = c} {...this.prepareRootProps()} activeOpacity={0.5} >
        {this.renderChildren()}
      </TouchableOpacity>
    );
  }

}
