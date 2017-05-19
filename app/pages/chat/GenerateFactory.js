/**
 * 生成工厂
 * Created by cly on 2017/5/19.
 */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * 生成tabBar使用的Icon
 * @param params
 * @returns {Function}
 */
function tabBarIcon(params) {
  return function (props) {
    //props.color = props.tintColor;
    const newProps = Object.assign({},{color:props.tintColor},params);
    console.log(newProps);
    return <Icon {...newProps}/>
  }
}

export {tabBarIcon};