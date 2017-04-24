/**
 * Created by cly on 16/12/27.
 */

import React,{Component, StyleSheet} from "react";
import {Text, View,FlatList,ActivityIndicator, Image, Platform, Dimensions} from "react-native";
import axios from "axios";

var ITEM_HEIGHT = Dimensions.height / 3;

export default class Study extends Component{

    constructor(props){
      super(props);
      this.state={
        loadDateSuccess:false,
        girlData:[]
      }
    }

  componentDidMount() {
    var url = "http://bxu2359140729.my3w.com/?type=1,10";
    var baidu = "http://www.dytt8.net/";
    fetch(baidu)
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        debugger;
        console.log("error",error);
      });
  }

    render(){
      if(this.state.loadDateSuccess){
        return(
          <View style={{flex:1}}>
           <FlatList style={{flex:1}}
                     data={this.state.girlData}
                     renderItem={this._renderItem.bind(this)}
                     getItemLayout={this._getItemLayout.bind(this)}
           >

           </FlatList>
          </View>)
      }
      else{
        return<ActivityIndicator
                                  style={[styles.centering, {height: 80}]}
                                  size="large"/>
      }

    }

  /**
   * 避免动态测量item尺寸的开销 {length: 行高, offset: 行高 * index, index}
   * @param data
   * @param index
   * @private
   */
    _getItemLayout(data,index){
      return { length:ITEM_HEIGHT,offset:ITEM_HEIGHT*index,index}
    }

    _renderItem(item){
        return(
          <View style={{width:Dimensions.width,height:ITEM_HEIGHT, flexDirection:row, justifyContent:"flex-start",
            alignItems:"center"
          }}>
            <Image source={{uri:item.imageUrl}} resizeMethod="center"/>
            <Text>测试</Text>
          </View>
        )
    }
}
