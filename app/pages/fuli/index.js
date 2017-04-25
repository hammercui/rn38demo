/**
 * Created by cly on 16/12/27.
 */

import React,{Component, StyleSheet} from "react";
import {Text, View,FlatList,ActivityIndicator, Image, Platform, Dimensions} from "react-native";
import axios from "axios";

var ITEM_HEIGHT = 120;

export default class Study extends Component{

    constructor(props){
      super(props);
      this.state={
        loading:false,
        girlData:[]
      }
    }

  componentDidMount() {
    var url = "http://bxu2359140729.my3w.com/?type=1,1000";
   // var baidu = "http://www.dytt8.net/";
    axios.get(url)
      .then(response=>{
        if(response.status==200)
          return Promise.resolve(response.data.data);
        else
          return Promise.reject(response);
      })
      .then(arrayData=>{
        //console.log("success",arrayData);
        var withKeyData = arrayData.map((item,index)=>{return {...item,key:index}});
        this.setState({loading:true,girlData:withKeyData});
      })
      .catch(error=>{
        console.log("error",error);
      });
  }

    render(){
      if(this.state.loading){
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

    _renderItem(info){
      var {item,index} = info;
      //  console.log(info.item);
        return(
          <View style={{width:Dimensions.width,height:ITEM_HEIGHT, flexDirection:"row",
            alignItems:"center"
          }}>
            <Image source={{uri:item.imageUrl}} resizeMethod="auto" style={{width:ITEM_HEIGHT*4/3,height:ITEM_HEIGHT}}/>
            <Text  style={{fontSize:15,color:"black", marginLeft:20}}>测试index{item.id}</Text>
          </View>
        )
    }
}
