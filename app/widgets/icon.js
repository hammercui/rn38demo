/**
 * Created by Gaohan on 17/1/4.
 */
import React, {PropTypes} from 'react';
import ReactNative, {Platform} from 'react-native';
import BaseComponent from '../reduxVersion/baseComponent';
import enhanceProps from '../utils/enhanceProps';

import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Foundation from 'react-native-vector-icons/Foundation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';

import Right2Car from '../libs/rightCarIcon'

export default class IconNew extends BaseComponent {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    switch(this.thisTheme().iconFamily) {
      // case 'Ionicons':
      //   this.Icon = Ionicons;
      //   break;
      // case 'Entypo':
      //   this.Icon = Entypo;
      //   break;
      // case 'FontAwesome':
      //   this.Icon = FontAwesome;
      //   break;
      // case 'Foundation':
      //   this.Icon = Foundation;
      //   break;
      // case 'MaterialIcons':
      //   this.Icon = MaterialIcons;
      //   break;
      // case 'Octicons':
      //   this.Icon = Octicons;
      //   break;
      // case 'Zocial':
      //   this.Icon = Zocial;
      //   break;
      case 'right2Car':
        this.Icon = Right2Car;
        break;
      default:
        this.Icon = Ionicons;
    }
  }

  prepareRootProps() {
    var defaultProps = {
      style: {
        fontSize: this.thisTheme().iconFontSize,
        color: this.thisTheme().textColor,
      }
    };

    return enhanceProps(this.props, defaultProps);

  }

  render() {
    return(
      <this.Icon ref={c => this._root = c} {...this.prepareRootProps()}/>
    );
  }
}

