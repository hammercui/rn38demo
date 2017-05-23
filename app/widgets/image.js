/**
 * Created by cly on 17/1/4.
 */
import React, { Component, PropTypes } from 'react'
import {View,Image, Platform} from 'react-native';
import BaseComponent from "../core/baseComponent";
import _ from 'lodash';
import {Button, Icon, Text} from './index';
import enhanceProps from '../utils/enhanceProps';
import {toPx} from "../utils/tools";
import ReactNativePropRegistry from 'react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry';



export default  class ImageNew extends BaseComponent {
    static defaultProps = {
        style: null,
        getImageInfo: false,
        getImageInfoTwo: false,
        full:true  //默认模式
    };


    static propTypes = {
        local: PropTypes.bool,
        thumb: PropTypes.bool,
        full:  PropTypes.bool,
        fullCut:PropTypes.bool,

        style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        ...Image.propTypes
    };


    //生成七牛使用的uri
    makeQNUrl () {
        let remote7Url = this.props.source.uri;
        //local full不裁切模式
        if(!(this.props.thumb || this.props.fullCut))
            return remote7Url;

        //thumb fullCut进行裁切
        if (this.props.source.uri != undefined && this.props.source.uri.length > 0) {
            let imageStyle = {};
            if(typeof this.props.style == 'number') {
                imageStyle = ReactNativePropRegistry.getByID(this.props.style);
            } else {
                imageStyle =  this.props.style;
            }
            let w = imageStyle.width  != undefined?"/w/".concat(toPx(imageStyle.width)):"";
            let h = imageStyle.height != undefined?"/h/".concat(toPx(imageStyle.height)):"";
            let mode = this.props.thumb?0:(this.props.full?4:(this.props.fullCut?5:-1));
            let qiniuParams = this.props.local?"":"?imageView2/" + mode + w + h;
            remote7Url = remote7Url.concat(qiniuParams);
        }
        //console.log("裁切后remote7Url:",remote7Url);
        return remote7Url;
    }


    constructor(props) {
        super(props);
        this.state = {
            androidDefaultShow:Platform.OS == "android",
        };
    }

    //获得主题属性
    prepareRootProps() {
        let type = {backgroundColor:"transparent"};//主题布局属性
        let defaultProps = {
            style: type,
            //resizeMode: 'contain', //如何缩放图片enum('cover', 'contain', 'stretch', 'repeat', 'center')
            defaultSource:require('../assets/defaultImage.png') //默认图片
        };
        let rootProps = enhanceProps(this.props, defaultProps);

        //本地图片
        if(this.props.local){
            return rootProps;
        }
        //网络图片
        else{
            return {...rootProps,source:{"uri":this.makeQNUrl()}};
        }

        //return this.fixAndroidImageRadius(rootProps);
    }


    fixAndroidImageRadius(rootProps){
        if(Platform.OS == "ios")return rootProps;

        let newStyle =  ["borderRadius","borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"];
        newStyle.map(item=>{
            if(rootProps.style[item]){
                rootProps.style[item] =  rootProps.style[item] * 2;
            }
        });
        return rootProps;
    }

    renderChildren(){
        if(typeof this.props.children == "string" ){
            return <Text style={{backgroundColor:"#00000000"}}>{this.props.children}</Text>
        }
        else{
            if(this.props.children){
                return React.cloneElement(this.props.children);
            }
        }
    }
    render() {
        this.rootProps = this.prepareRootProps();
        return(
          <View style={{width:this.rootProps.style.width,height:this.rootProps.style.height}}>
              <Image {... this.rootProps}
                     onError={this._imageLoadFail.bind(this)}
                     onLoad={this._imageLoadSucc.bind(this)} >
                  {this.renderChildren()}
              </Image>
              {this._renderAndroidDefault()}
          </View>

        )
    }

    //渲染Android默认占位图
    _renderAndroidDefault(){
        if(this.state.androidDefaultShow){
            return <Image style={[this.rootProps.style, {position: "absolute",top:0,bottom:1,left:0,right:0}]}
                          source={this.rootProps.defaultSource}>
                  {this.renderChildren()}
                </Image>
        }
        return null;
    }

    _imageLoadSucc(){
        if(Platform.OS == "android"){
            this.setState({androidDefaultShow:false});
        }
        //this.setState({"progress":"加载成功"});
    }
    _imageLoadFail(){
        //console.log("加载失败的图片srouce:",this.rootProps.source);
        //this.setState({"progress":"加载失败"});
    }
};


