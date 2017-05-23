/**
 * Created by Gaohan on 17/1/4.
 */
'use strict';

import React, {PropTypes} from 'react';
import {View} from 'react-native';
import BaseComponent from '../core/baseComponent';
import enhanceProps from '../utils/enhanceProps';


import {Button, Icon, Text, TextInput, Picker} from './index';
import _ from 'lodash';

export default class InputFrame extends BaseComponent {

  static propTypes = {
    borderType: PropTypes.string,
    iconRight: PropTypes.bool,
    inlineLabel: PropTypes.string,
    required: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
  };


  getInitialStyle() {
    return {
      textInput: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderColor: (this.props.error) ? this.thisTheme().inputErrorBorderColor : (this.props.success) ? this.thisTheme().inputSuccessBorderColor : this.thisTheme().inputBorderColor,
        paddingRight: 5,
        alignItems: 'center'
      },

      underline: {
        position: 'relative',
        borderWidth: this.thisTheme().borderWidth,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
      },

      bordered: {
        position: 'relative',
        borderWidth: this.thisTheme().borderWidth
      },

      rounded: {
        position: 'relative',
        borderWidth: this.thisTheme().borderWidth,
        borderRadius: this.thisTheme().inputBorderRadiusRound,
      }
    }
  }

  pickerPresent() {
    var pickerComponentPresent = false;
    React.Children.forEach(this.props.children, function (child) {
      if(child && _.get(child, 'type', null) == Picker)
        pickerComponentPresent = true;
    });

    return pickerComponentPresent;
  }

  inlinePresent() {
    var inlineComponentPresent = false;
    if (this.props && this.props.inlineLabel) {
      inlineComponentPresent = true;
    }
    return inlineComponentPresent;
  }

  getPickerProps(picker) {
    var defaultStyle = {
      alignSelf: 'center',
      paddingRight: 5,
    };

    var defaultProps = {
      style: defaultStyle,
      key: 'picker',
    };
    return enhanceProps(picker.props, defaultProps);
  }

  prepareRootProps() {
    var type = {
      paddingLeft: (this.props.borderType === 'rounded' && !_.get(this.props.children, 'type', null) == Icon) ? 15 :
        ( _.get(this.props.children, 'type', null) == Icon ) ? this.thisTheme().inputPaddingLeft : 5
    };

    var defaultStyle = (this.props.borderType === 'regular') ? this.getInitialStyle().bordered : (this.props.borderType === 'rounded') ? this.getInitialStyle().rounded : this.getInitialStyle().underline;

    type = _.merge(type, defaultStyle);

    var addedProps = _.merge(this.getInitialStyle().textInput, type);

    var defaultProps = {
      style: addedProps,
      key: 'inpGroup'
    };

    return enhanceProps(this.props, defaultProps);
  }

  getIconProps(icon) {
    var defaultStyle = {
      fontSize: this.thisTheme().iconFontSize,
      alignSelf: 'center',
      paddingRight: 5,
    };

    var defaultProps = {
      style: defaultStyle,
      key: 'icon'
    };

    return enhanceProps(icon.props, defaultProps);
  }

  getButtonProps(button) {
    var defaultStyle = {
      alignSelf: 'center',
      paddingRight: 5,
    };

    var defaultProps = {
      style: defaultStyle,
      key: 'button',
      inputButton: true
    };
    return enhanceProps(button.props, defaultProps);
  }

  renderChildren() {
    var inputProps = {};
    var newChildren = [];
    var childrenArray = React.Children.toArray(this.props.children);

    let iconElement = _.remove(childrenArray, function (item) {
      if (_.get(item, 'type', null) == Icon) {
        return true;
      }
    });

    let buttonElement = _.remove(childrenArray, function (item) {
      if (_.get(item, 'type', null) == Button) {
        return true;
      }
    });

    let pickerElement = _.remove(childrenArray, function(item) {
      if(_.get(item, 'type', null) == Picker) {
        return true;
      }
    });

    var inp = _.find(childrenArray, function (item) {
      if (item && (_.get(item, 'type', null) == TextInput)) {
        return true;
      }
    });

    if (inp) {
      inputProps = inp.props;
      var clonedInp = React.cloneElement(
        inp,
        {
          ...this.inputProps,
          key: 'inp',
          //editable: this.props.disabled ? false : true,
          editable:!this.props.disabled
        }
      )
    }

    if (Array.isArray(this.props.children)) {

      if (this.props.iconRight && iconElement.length > 0 && !this.pickerPresent() && !this.inlinePresent()) {
        if (clonedInp) {
          newChildren.push(clonedInp);
        }
        newChildren.push(React.cloneElement(iconElement[0], this.getIconProps(iconElement[0])));
      }
      else if (this.pickerPresent()) {
        if (this.inlinePresent()) {
          newChildren.push(
            <View key='inputFrame0' style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flex: 0.34,
              paddingLeft: this.thisTheme().inputPaddingLeft,
              alignItems: 'center',
              height: this.thisTheme().inputHeight
            }}>
              <Text style={{lineHeight: this.thisTheme().inputLineHeight, color: this.thisTheme().textColor}}>
                <Text style={{color: this.props.required ? this.thisTheme().colorPrimary : 'transparent' } }>{'* '}</Text>
                {this.props.inlineLabel}
              </Text>
            </View>
          );
        }
        if (clonedInp) {
          newChildren.push(clonedInp);
        }
        newChildren.push(React.cloneElement(pickerElement[0], this.getPickerProps(pickerElement[0])));
      }
      else if (buttonElement.length > 0 && !this.inlinePresent()) {
        if (iconElement.length > 0) {
          newChildren.push(React.cloneElement(
            iconElement[0],
            {
              ...this.getIconProps(iconElement[0]),
              key: 'icon0'
            }
          ));
        }

        if (clonedInp) {
          newChildren.push(clonedInp);
        }
        newChildren.push(React.cloneElement(
          buttonElement[0],
          {
            ...this.getButtonProps(buttonElement[0]),
            key: 'button1'
          }
        ));
      }

      else if (this.inlinePresent()) {
        newChildren.push(
          <View key='inputFrame0' style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 0.34,
            paddingLeft: this.thisTheme().inputPaddingLeft,
            alignItems: 'center',
            height: this.thisTheme().inputHeight
          }}>
            <Text style={{lineHeight: this.thisTheme().inputLineHeight, color: this.thisTheme().textColor}}>
              <Text style={{color: this.props.required ? this.thisTheme().colorPrimary : 'transparent' } }>{'* '}</Text>
              {this.props.inlineLabel}
            </Text>
          </View>
        );

        if (clonedInp) {
          newChildren.push(clonedInp);
        }
      }

      else {
        if (iconElement.length > 1) {
          newChildren.push(React.cloneElement(
            iconElement[0],
            {
              ...this.getIconProps(iconElement[0]),
              key: 'icon0'
            }
          ));
          if (clonedInp) {
            newChildren.push(clonedInp);
          }
          newChildren.push(React.cloneElement(
            iconElement[1],
            {
              ...this.getIconProps(iconElement[1]),
              key: 'icon1'
            }
          ));
        } else {
          if (iconElement.length > 0) {
            newChildren.push(React.cloneElement(iconElement[0], this.getIconProps(iconElement[0])));
          }
          if (clonedInp) {
            newChildren.push(clonedInp);
          }
        }
      }
    }

    else {
      if (this.inlinePresent()) {
        newChildren.push(
          <View key='inputFrame0' style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flex: 0.34,
            paddingLeft: this.thisTheme().inputPaddingLeft,
            alignItems: 'center',
            height: this.thisTheme().inputHeight
          }}>
            <Text style={{lineHeight: this.thisTheme().inputLineHeight, color: this.thisTheme().textColor}}>
              <Text style={{color: this.props.required ? this.thisTheme().colorPrimary : 'transparent' } }>{'* '}</Text>
              {this.props.inlineLabel}
            </Text>
          </View>
        );

        if (clonedInp) {
          newChildren.push(clonedInp);
        }
      }
      else if (clonedInp) {
        newChildren.push(clonedInp);
      }
    }


    return newChildren;
  }

  render() {
    return (
      <View ref={c => this._root = c} {...this.prepareRootProps()} >
        {this.renderChildren()}
      </View>
    );
  }
}