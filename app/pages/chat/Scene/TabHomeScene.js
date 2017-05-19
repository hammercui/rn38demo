/**
 * 带tab的导航
 * Created by cly on 2017/5/18.
 */

import React from 'react';
import {
  Text,
  View,
  Button,
  Image
} from 'react-native';


import BaseComponent from "../../../core/baseComponent";

import Icon from 'react-native-vector-icons/Ionicons';



class RecentChatsScreen extends BaseComponent{

  constructor(props){
    super(props);
    //const { navigate } = this.props.navigation;
    //this.navigate = navigate;
  }

  render() {
    return(<View>
      <Text>这是首页</Text>
      <Button
        onPress={() => this.navigate('Chat', { user: 'hammer' })}
        title="Chat with hammer"
      />
      </View>)
  }

}


class AllContactsScreen extends BaseComponent {
  constructor(props){
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return(<View>
      <Text>这是我的</Text>
      <Icon name="ios-person" size={30} color="#4f4f4f"/>
      <Button
        onPress={() => navigate('Chat', { user: 'hammer2' })}
        title="Chat with hammer1"
      />
    </View>)
  }
}


export {RecentChatsScreen,AllContactsScreen}
//export default MainScreenNavigator;