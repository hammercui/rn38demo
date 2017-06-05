/**
 * Created by cly on 2017/5/22.
 */
import React,{PureComponent} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import {Badge,ScrollView} from"../../../../widgets";
import styles from "./styles";

import BaseComponent from "../../../../reduxVersion/baseComponent";

import Icon from 'react-native-vector-icons/Ionicons';
import {tabBarIcon} from "../../../../core/routerConfig";
const tabBarWidth = Dimensions.get('window').width * 0.25;





export default class HomeScreen extends PureComponent{
  static navigationOptions = ({navigation})=>
    (
      {
        tabBarLabel: "首页",
        tabBarIcon: ({tintColor,focused})=>(
          <View style={{width:tabBarWidth,height:Platform.OS==="ios"?40:30,margin:0,padding:0,
            alignItems:"center", justifyContent:"center"}}>
            <Icon name={"ios-home"} size={30} color={tintColor}/>
            <Badge style={{position:"absolute",top:2,right:tabBarWidth*0.25}}>
              <Text style={{fontSize:8,color:"white"}}>{navigation.state.params.count?navigation.state.params.count:0}</Text>
            </Badge>
          </View>
        ),

        header:null,
      }
    );



  constructor(props){
    super(props);
    //const { navigate } = this.props.navigation;
    //this.navigate = navigate;

  }

  componentWillMount(){
    this.props.navigation.setParams({count:20});
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text>这是首页</Text>
        <Button
          onPress={() => navigate('ChatScreen', { user: 'hammer' })}
          title="Chat with hammer"
        />
        
        <Button title="登录"   onPress={()=>navigate("LoginScreen")} />
        <Button title="角标+1" onPress={this.addOne} />
    </View>)
  }


  addOne = ()=>{
    let count = (this.props.navigation.state.params.count || 0)  + 1;
    this.props.navigation.setParams({count:count});
  }

}
